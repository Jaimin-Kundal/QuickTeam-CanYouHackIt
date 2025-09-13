import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

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

// Get teamId from URL
const params = new URLSearchParams(window.location.search);
const teamId = params.get("teamId");

async function loadTeamDetails() {
  try {
    const teamRef = doc(db, "teams", teamId);
    const teamSnap = await getDoc(teamRef);

    if (!teamSnap.exists()) {
      document.querySelector(".team-card").innerHTML = "<p>Team not found.</p>";
      return;
    }

    const team = teamSnap.data();

    document.getElementById("teamName").textContent = team.teamName;
    document.getElementById("leader").textContent = team.leader;
    document.getElementById("members").textContent = team.members.join(", ");
    document.getElementById("createdAt").textContent = team.createdAt?.toDate().toLocaleString() || "N/A";

  } catch (err) {
    console.error("Error loading team:", err);
  }
}

loadTeamDetails();
