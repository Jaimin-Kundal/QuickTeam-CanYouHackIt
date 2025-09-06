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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// Form elements
const form = document.getElementById("createTeamForm");
const statusMsg = document.getElementById("teamStatusMsg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const teamName = document.getElementById("teamName").value.trim();
  const teamLeader = document.getElementById("teamLeader").value.trim();
  const teamMembers = document.getElementById("teamMembers").value
                        .split(",")
                        .map(name => name.trim());
  const associatedEvent = document.getElementById("associatedEvent").value.trim();

  if (!teamName || !teamLeader || teamMembers.length === 0 || !associatedEvent) {
    alert("Please fill all fields correctly.");
    return;
  }

  try {
    await db.collection("teams").add({
      teamName,
      teamLeader,
      teamMembers,
      associatedEvent,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      createdBy: auth.currentUser ? auth.currentUser.uid : "anonymous"
    });

    statusMsg.textContent = "Team created successfully!";
    statusMsg.style.color = "green";
    form.reset();

  } catch (error) {
    console.error("Error creating team: ", error);
    statusMsg.textContent = "Error creating team. Try again!";
    statusMsg.style.color = "red";
  }
});
