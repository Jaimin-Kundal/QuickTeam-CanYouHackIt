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

const form = document.getElementById("createTeamForm");
const statusMsg = document.getElementById("teamStatusMsg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const teamName = document.getElementById("teamName").value.trim();
  const teamLeader = document.getElementById("teamLeader").value.trim();
  const teamMembers = document.getElementById("teamMembers").value.split(",").map(m => m.trim());

  if (!teamName || !teamLeader || teamMembers.length === 0) {
    statusMsg.textContent = "⚠️ Please fill all fields.";
    statusMsg.style.color = "red";
    return;
  }

  try {
    const docRef = await addDoc(collection(db, "teams"), {
      teamName,
      leader: teamLeader,
      members: teamMembers,
      createdAt: serverTimestamp()
    });

    // Redirect to team details page with the teamId
    window.location.href = `team_details.html?teamId=${docRef.id}`;
  } catch (error) {
    console.error("❌ Error creating team:", error);
    statusMsg.textContent = "❌ Error creating team.";
    statusMsg.style.color = "red";
  }
});
