// =============================
// Firebase Setup
// =============================
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// ✅ Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCJdzL6hBxD2JwsXdb2QD6rhJK_MIlFfdg",
  authDomain: "synapse-ee716.firebaseapp.com",
  projectId: "synapse-ee716",
  storageBucket: "synapse-ee716.firebasestorage.app",
  messagingSenderId: "894940754670",
  appId: "1:894940754670:web:88cedd500b4dca5dc9f9ff",
  measurementId: "G-PW7HGF2LTE"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// =============================
// Game Data
// =============================
const questions = [
    { prompt:"If you were a programming language, which one?", options:["Python","JavaScript","C++","Go"] },
    { prompt:"Which coding environment do you prefer?", options:["VS Code","IntelliJ","Vim","Sublime"] },
    { prompt:"Frontend, Backend, or Full-stack?", options:["Frontend","Backend","Full-stack","All of the above"] },
    { prompt:"Preferred team role?", options:["Leader","Support","Innovator","Tester"] },
    { prompt:"Favorite type of project?", options:["Web App","Mobile App","AI","Game Development"] }
];

let currentQuestionIndex = -1;
let selectedAnswer = null;
let currentUser = 1; // Track User 1 or User 2
const user1Answers = [];
const user2Answers = [];

// =============================
// DOM Elements
// =============================
const flashcard = document.getElementById('minigame-card');
const questionFront = document.getElementById('card-question');
const questionBack = document.getElementById('card-question-back');
const nextButton = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const optionsContainer = document.getElementById('options-container');

// =============================
// Helper Functions
// =============================
function showOptions(options){
    optionsContainer.innerHTML = '';
    selectedAnswer = null;
    options.forEach(opt => {
        const btn = document.createElement('div');
        btn.className = 'option-card';
        btn.textContent = opt;
        btn.addEventListener('click', () => {
            selectedAnswer = opt;
            document.querySelectorAll('.option-card').forEach(el => el.classList.remove('selected'));
            btn.classList.add('selected');
        });
        optionsContainer.appendChild(btn);
    });
}

function updateCard() {
    if(currentQuestionIndex === -1){
        questionFront.textContent = `User ${currentUser}: Click start to begin!`;
        questionBack.textContent = "";
        flashcard.classList.remove('flipped');
        optionsContainer.innerHTML = '';
        progressBar.style.width = '0%';
        nextButton.textContent = "Start Game";
        return;
    }

    if(currentQuestionIndex < questions.length){
        const q = questions[currentQuestionIndex];
        questionFront.textContent = q.prompt;
        questionBack.textContent = q.prompt;
        showOptions(q.options);
        progressBar.style.width = `${((currentQuestionIndex + 1)/questions.length) * 100}%`;
        nextButton.textContent = "Next";
    }
}

function calculateCompatibility() {
    let matches = 0;
    for(let i=0; i<questions.length; i++){
        if(user1Answers[i] === user2Answers[i]) matches++;
    }
    const percentage = Math.round((matches / questions.length) * 100);

    let message = "";
    if(percentage >= 80) message = "You two are highly compatible!";
    else if(percentage >= 60) message = "You two are fairly compatible!";
    else if(percentage >= 40) message = "Some differences exist, but can work together.";
    else message = "You two might face challenges working together.";

    return { percentage, message };
}

// =============================
// Firestore Save Request
// =============================
async function saveRequest(score) {
    const eventId = localStorage.getItem("selectedEventId"); 
    if (!eventId) {
        console.error("No eventId found in localStorage");
        return;
    }

    const user = auth.currentUser;
    if (!user) {
        alert("You must log in first to submit request.");
        return;
    }

    const userName = user.displayName || user.email || "Unknown";

    try {
        await addDoc(collection(db, "events", eventId, "requests"), {
            userId: user.uid,
            userName,
            score,
            answers: { user1: user1Answers, user2: user2Answers }, // save answers too
            status: "pending",
            createdAt: serverTimestamp()
        });

        alert("✅ Your request has been submitted to the team leader!");
        // Optionally: redirect back
        // window.location.href = "event-details.html";
    } catch (err) {
        console.error("Error saving request:", err);
        alert("❌ Could not send request. Try again.");
    }
}

// =============================
// Show Results
// =============================
function showResults() {
    document.querySelector('.flashcard-wrapper').style.display = 'none';
    nextButton.style.display = 'none';
    progressBar.parentElement.style.display = 'none';

    const results = calculateCompatibility();
    document.getElementById('compatibility-percentage').textContent = `${results.percentage}%`;
    document.getElementById('compatibility-message').textContent = results.message;
    document.getElementById('compatibility-result').style.display = 'block';

    // ✅ Save to Firestore
    saveRequest(results.percentage);

    document.getElementById('restart-btn').addEventListener('click', () => {
        window.location.reload();
    });
}

// =============================
// Button Events
// =============================
nextButton.addEventListener('click', () => {
    if(currentQuestionIndex > -1 && selectedAnswer === null) {
        alert("Please select an option before proceeding.");
        return;
    }

    // Save answer for current user
    if(selectedAnswer){
        if(currentUser === 1) user1Answers.push(selectedAnswer);
        else user2Answers.push(selectedAnswer);
    }

    selectedAnswer = null;

    if(currentQuestionIndex === -1){
        currentQuestionIndex = 0;
        flashcard.classList.add('flipped');
        setTimeout(updateCard, 300);
    } else if(currentQuestionIndex < questions.length - 1){
        currentQuestionIndex++;
        flashcard.classList.remove('flipped');
        setTimeout(() => {
            updateCard();
            flashcard.classList.add('flipped');
        }, 300);
    } else {
        // Switch to User 2 if currentUser is 1
        if(currentUser === 1){
            currentUser = 2;
            currentQuestionIndex = -1; 
            flashcard.classList.remove('flipped');
            setTimeout(updateCard, 300);
        } else {
            // Both users finished → show results
            showResults();
        }
    }
});

// =============================
// Auth Guard
// =============================
onAuthStateChanged(auth, (user) => {
    if (!user) {
        alert("Please log in to play this game and submit requests.");
        // window.location.href = "login_Page.html";
    }
});

// =============================
// Init
// =============================
updateCard();
