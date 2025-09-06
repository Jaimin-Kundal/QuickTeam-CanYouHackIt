import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCJdzL6hBxD2JwsXdb2QD6rhJK_MIlFfdg",
  authDomain: "synapse-ee716.firebaseapp.com",
  projectId: "synapse-ee716",
  storageBucket: "synapse-ee716.firebasestorage.app",
  messagingSenderId: "894940754670",
  appId: "1:894940754670:web:88cedd500b4dca5dc9f9ff",
  measurementId: "G-PW7HGF2LTE"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get eventId from URL
const params = new URLSearchParams(window.location.search);
const eventId = params.get("id");

const form = document.getElementById("createTeamForm");
const statusMsg = document.getElementById("teamStatusMsg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const teamName = document.getElementById("teamName").value.trim();
  const teamLeader = document.getElementById("teamLeader").value.trim();
  const teamMembers = document.getElementById("teamMembers").value
                        .split(",")
                        .map(m => m.trim());

  if (!teamName || !teamLeader || teamMembers.length === 0 || !eventId) {
    statusMsg.textContent = "Please fill all fields.";
    statusMsg.style.color = "red";
    return;
  }

  try {
    await addDoc(collection(db, "teams"), {
      teamName,
      leader: teamLeader,
      members: teamMembers, // store UIDs here ideally
      eventId,
      createdAt: serverTimestamp()
    });

    statusMsg.textContent = "Team created successfully!";
    statusMsg.style.color = "green";
    form.reset();

    // Redirect back to event details
    window.location.href = `event-detail.html?id=${eventId}`;

  } catch (error) {
    console.error("Error creating team: ", error);
    statusMsg.textContent = "Error creating team.";
    statusMsg.style.color = "red";
  }
});
