// ✅ Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// ✅ Firebase config (replace with your values from Firebase console)
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

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const eventDetails = document.getElementById("eventDetails");
const requestBtn = document.getElementById("requestBtn");

const eventId = localStorage.getItem("selectedEventId");
let currentEvent = null;

// Load event details
async function loadEvent() {
  if (!eventId) {
    eventDetails.innerHTML = "<p>No event selected.</p>";
    return;
  }

  try {
    const docRef = doc(db, "events", eventId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      currentEvent = { id: docSnap.id, ...docSnap.data() };
      displayEvent(currentEvent);
    } else {
      eventDetails.innerHTML = "<p>Event not found.</p>";
    }
  } catch (err) {
    console.error("Error fetching event:", err);
    eventDetails.innerHTML = `<p style="color:red;">Failed to load event details. Check console.</p>`;
  }
}

// Display event info
function displayEvent(event) {
  eventDetails.innerHTML = `
    <h2>${event.name}</h2>
    <p><b>Type:</b> ${event.type}</p>
    <p><b>Date:</b> ${event.date}</p>
    <p><b>Remaining Slots:</b> <span id="slotCount">${event.slots}</span></p>
  `;
  requestBtn.style.display = "block";
}

// Handle request to join
if (requestBtn) {
  requestBtn.addEventListener("click", async () => {
    if (!currentEvent) return;

    if (currentEvent.slots > 0) {
      const newSlots = currentEvent.slots - 1;

      try {
        await updateDoc(doc(db, "events", currentEvent.id), {
          slots: newSlots
        });

        currentEvent.slots = newSlots;
        document.getElementById("slotCount").textContent = newSlots;

        alert("✅ You successfully joined the event!");
      } catch (err) {
        console.error("Error updating slots:", err);
        alert("❌ Failed to join event. Try again.");
      }
    } else {
      alert("⚠️ No slots available.");
    }
  });
}

// Load event on page start
loadEvent();
