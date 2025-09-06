document.getElementById("profileForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const bio = document.getElementById("bio").value;
  const contact = document.getElementById("contact").value;

  // Save user profile in localStorage
  let user = JSON.parse(localStorage.getItem("currentUser")) || {};
  user.bio = bio;
  user.contact = contact;
  localStorage.setItem("currentUser", JSON.stringify(user));

  alert("Profile saved successfully ✅");

  // Redirect to login
  window.location.href = "login_Page.html";
});
