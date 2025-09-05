const eventsData = [
  {id:1, name:"Hackathon 2025", date:"2025-10-15", slots:5, team:["Megha","Jaimin","Bhavya"]},
  {id:2, name:"AI/ML Sprint", date:"2025-10-20", slots:3, team:["Jaimin","Bhavya"]},
  {id:3, name:"Frontend Frenzy", date:"2025-11-05", slots:4, team:["Megha","Maritreye"]},
  {id:4, name:"Backend Bonanza", date:"2025-11-10", slots:2, team:["Jaimin","Bhavya"]},
];

const eventId = parseInt(localStorage.getItem("selectedEventId"));
const event = eventsData.find(e => e.id === eventId);

document.getElementById("eventName").innerText = event.name;
document.getElementById("eventDate").innerText = event.date;
document.getElementById("eventSlots").innerText = event.slots;

const teamDiv = document.getElementById("teamMembers");
event.team.forEach(member => {
  const div = document.createElement("div");
  div.className = "member";
  div.innerHTML = `<img src="images/${member.toLowerCase()}.jpg" alt="${member}"><h4>${member}</h4>`;
  teamDiv.appendChild(div);
});

document.getElementById("requestBtn").addEventListener("click", () => {
  if(event.slots > 0){
    event.slots--;
    document.getElementById("eventSlots").innerText = event.slots;
    alert("Request sent successfully!");
  } else {
    alert("Sorry, no slots remaining!");
  }
});