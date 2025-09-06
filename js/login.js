document.querySelector("form").addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const user = JSON.parse(localStorage.getItem("currentUser"));

  if(user && user.email === email && user.password === password) {
    alert("Login successful!");
    // Redirect to home page
    window.location.href = "index.html";
  } else {
    alert("Invalid credentials!");
  }
});
