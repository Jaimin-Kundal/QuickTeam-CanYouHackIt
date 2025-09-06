// inside signup.js
try {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await setDoc(doc(db, "users", user.uid), {
    firstName: fname,
    lastName: lname,
    email: email,
    createdAt: new Date()
  });

  alert("Signup successful! 🎉");
  // ✅ Redirect to Login
  window.location.href = "ProfilePage.html";
} catch (err) {
  console.error(err);
  alert("Error: " + err.message);
}
