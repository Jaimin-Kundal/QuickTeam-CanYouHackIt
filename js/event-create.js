// Replace with your Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Form elements
const form = document.getElementById("createEventForm");
const statusMsg = document.getElementById("statusMsg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const eventName = document.getElementById("eventName").value.trim();
  const eventType = document.getElementById("eventType").value;
  const eventDate = document.getElementById("eventDate").value;
  const eventSlots = parseInt(document.getElementById("eventSlots").value);
  const teamMembers = document.getElementById("teamMembers").value
                        .split(",")
                        .map(name => name.trim());

  if (!eventName || !eventType || !eventDate || !eventSlots || teamMembers.length === 0) {
    alert("Please fill all fields correctly.");
    return;
  }

  try {
    // Add new event to Firestore
    await db.collection("events").add({
      name: eventName,
      type: eventType,
      date: eventDate,
      remainingSlots: eventSlots,
      teamMembers: teamMembers,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    statusMsg.textContent = "Event created successfully!";
    statusMsg.style.color = "green";
    form.reset();

  } catch (error) {
    console.error("Error adding event: ", error);
    statusMsg.textContent = "Error creating event. Try again!";
    statusMsg.style.color = "red";
  }
});