const events = [
  {id:1, name:"Hackathon 2025", date:"2025-10-15", slots:5, type:"Hackathon"},
  {id:2, name:"AI/ML Sprint", date:"2025-10-20", slots:3, type:"AI/ML"},
  {id:3, name:"Frontend Frenzy", date:"2025-11-05", slots:4, type:"Frontend"},
  {id:4, name:"Backend Bonanza", date:"2025-11-10", slots:2, type:"Backend"},
  {id:5, name:"Design Sprint", date:"2025-11-12", slots:6, type:"UI/UX"},
  {id:6, name:"Mobile Hack", date:"2025-11-15", slots:3, type:"Mobile"},
  {id:7, name:"AI Challenge", date:"2025-11-18", slots:5, type:"AI/ML"},
  {id:8, name:"Fullstack Fest", date:"2025-11-20", slots:4, type:"Frontend"},
  {id:9, name:"Cloud Wars", date:"2025-11-22", slots:2, type:"Backend"},
  {id:10, name:"Game Jam", date:"2025-11-25", slots:3, type:"Frontend"},
];

const eventList = document.getElementById("eventList");
const filter = document.getElementById("filterType");

function displayEvents(eventsArray){
  eventList.innerHTML = "";
  eventsArray.forEach(event => {
    const card = document.createElement("div");
    card.className = "event-card";
    card.innerHTML = `
      <div>
        <h3>${event.name}</h3>
        <p>Date: ${event.date}</p>
        <p>Remaining Slots: <span class="slots">${event.slots}</span></p>
      </div>
      <button onclick="goToDetails(${event.id})">View Details</button>
    `;
    eventList.appendChild(card);
  });
}

filter.addEventListener("change", () => {
  const selected = filter.value;
  const filteredEvents = selected === "all" ? events : events.filter(e => e.type === selected);
  displayEvents(filteredEvents);
});

displayEvents(events);

function goToDetails(id) {
  localStorage.setItem("selectedEventId", id);
  window.location.href = "event-details.html";
}