// Import Firebase SDK modules (use inside <script type="module"> in HTML)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// ✅ Your Firebase config (replace with your project’s config)
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

const eventList = document.getElementById("eventList");
const filter = document.getElementById("filterType");
const createForm = document.getElementById("createEventForm");
const modal = document.getElementById("createEventModal");
const closeBtn = document.querySelector(".close");

let events = [];

// ✅ Load events from Firestore
async function loadEvents() {
  events = [];
  const querySnapshot = await getDocs(collection(db, "events"));
  querySnapshot.forEach((doc) => {
    events.push({ id: doc.id, ...doc.data() });
  });
  displayEvents(events);
}

// ✅ Display events
function displayEvents(eventsArray) {
  eventList.innerHTML = "";

  if (eventsArray.length === 0) {
    eventList.innerHTML = "<p>No events found.</p>";
    return;
  }

  eventsArray.forEach(event => {
    const card = document.createElement("div");
    card.className = "event-card";

    const details = document.createElement("div");
    details.innerHTML = `
      <h3>${event.name}</h3>
      <p><b>Type:</b> ${event.type}</p>
      <p><b>Date:</b> ${event.date}</p>
      <p><b>Remaining Slots:</b> <span class="slots">${event.slots}</span></p>
    `;

    const btn = document.createElement("button");
    btn.textContent = "View Details";
    btn.addEventListener("click", () => goToDetails(event.id));

    card.appendChild(details);
    card.appendChild(btn);
    eventList.appendChild(card);
  });
}

// ✅ Filter
filter.addEventListener("change", () => {
  const selected = filter.value;
  const filteredEvents = selected === "all" ? events : events.filter(e => e.type === selected);
  displayEvents(filteredEvents);
});

// ✅ Create new event → Firestore
if (createForm) {
  createForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("eventName").value;
    const type = document.getElementById("eventType").value;
    const date = document.getElementById("eventDate").value;

    const newEvent = {
      name,
      type,
      date,
      slots: 5
    };

    try {
      await addDoc(collection(db, "events"), newEvent);
      await loadEvents(); // reload list
      modal.style.display = "none";
      createForm.reset();
    } catch (err) {
      console.error("Error adding event:", err);
    }
  });
}

// ✅ Close modal
if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
}

// ✅ Navigate to details page
function goToDetails(id) {
  localStorage.setItem("selectedEventId", id);
  window.location.href = "event-details.html";
}

// ✅ Load events on page load
loadEvents();
