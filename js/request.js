document.getElementById("joinForm").addEventListener("submit", function(e){
  e.preventDefault();
  alert(`Request sent!\nName: ${this.name.value}\nEmail: ${this.email.value}`);
  this.reset();
});