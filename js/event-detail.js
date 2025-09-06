import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp, query, where, getDocs } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Firebase config
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Elements
const form = document.getElementById('createTeamForm');
const statusMsg = document.getElementById('statusMsg');
const teamListEl = document.getElementById('teamList');

// Get event ID from URL query parameter
const params = new URLSearchParams(window.location.search);
const eventId = params.get('id');

// --- Load registered teams for this event ---
async function loadTeams() {
  if (!eventId) return;

  const q = query(collection(db, 'teams'), where('eventId', '==', eventId));
  const querySnapshot = await getDocs(q);

  teamListEl.innerHTML = ""; // Clear existing

  querySnapshot.forEach(doc => {
    const team = doc.data();
    const li = document.createElement('li');
    li.textContent = `${team.teamName} - Members: ${team.members.join(", ")}`;
    teamListEl.appendChild(li);
  });
}

// --- Handle form submission ---
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const teamName = document.getElementById('teamName').value.trim();
    const members = document.getElementById('members').value.split(',').map(m => m.trim());

    if (!teamName || members.length === 0 || !eventId) {
      statusMsg.textContent = "Please fill all fields.";
      statusMsg.style.color = "red";
      return;
    }

    try {
      // Add new team to Firebase
      await addDoc(collection(db, 'teams'), {
        teamName,
        members,
        eventId,
        createdAt: serverTimestamp()
      });

      // Append new team immediately
      const li = document.createElement('li');
      li.textContent = `${teamName} - Members: ${members.join(", ")}`;
      teamListEl.appendChild(li);

      statusMsg.textContent = "Team created successfully!";
      statusMsg.style.color = "green";
      form.reset();

    } catch (err) {
      console.error(err);
      statusMsg.textContent = "Error creating team. Try again!";
      statusMsg.style.color = "red";
    }
  });
}

// Load teams when page loads
loadTeams();
