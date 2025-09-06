import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { 
  getFirestore, collection, addDoc, getDoc, getDocs, doc, query, where, serverTimestamp 
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// 🔹 Firebase config
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

// 🔹 Get eventId from URL
const params = new URLSearchParams(window.location.search);
const eventId = params.get("id");

// 🔹 DOM elements
const eventNameDisplay = document.getElementById("eventNameDisplay");
const eventTypeDisplay = document.getElementById("eventTypeDisplay");
const eventDateDisplay = document.getElementById("eventDateDisplay");
const eventSlotsDisplay = document.getElementById("eventSlotsDisplay");
const eventDescDisplay = document.getElementById("eventDescDisplay");
const teamListEl = document.getElementById("teamList");
const createTeamBtn = document.getElementById("createTeamBtn");

// --- Load Event Details ---
async function loadEvent() {
  if (!eventId) return;

  const eventRef = doc(db, "events", eventId);
  const eventSnap = await getDoc(eventRef);

  if (eventSnap.exists()) {
    const eventData = eventSnap.data();
    eventNameDisplay.textContent = eventData.name;
    eventTypeDisplay.textContent = eventData.type;
    eventDateDisplay.textContent = eventData.date;
    eventSlotsDisplay.textContent = eventData.slots || "N/A";
    eventDescDisplay.textContent = eventData.description;

    // update link
    createTeamBtn.href = `create-team.html?id=${eventId}`;
  } else {
    eventNameDisplay.textContent = "Event not found";
  }
}

// --- Load Teams Registered For This Event ---
async function loadTeams() {
  if (!eventId) return;

  const q = query(collection(db, "teams"), where("eventId", "==", eventId));
  const querySnapshot = await getDocs(q);

  teamListEl.innerHTML = ""; // Clear previous

  if (querySnapshot.empty) {
    teamListEl.innerHTML = "<p>No teams registered yet.</p>";
    return;
  }

  querySnapshot.forEach((teamDoc) => {
    const team = teamDoc.data();

    const teamDiv = document.createElement("div");
    teamDiv.classList.add("team-card");

    teamDiv.innerHTML = `
      <h4>${team.teamName}</h4>
      <p><strong>Leader:</strong> ${team.leader || "N/A"}</p>
      <p><strong>Members:</strong> ${team.members ? team.members.join(", ") : "None"}</p>
    `;

    teamListEl.appendChild(teamDiv);
  });
}

// --- Initialize ---
loadEvent();
loadTeams();
