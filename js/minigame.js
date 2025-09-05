const questions = [
    { prompt:"If you were a programming language, which one?", options:["Python","JavaScript","C++","Go"] },
    { prompt:"Which coding environment do you prefer?", options:["VS Code","IntelliJ","Vim","Sublime"] },
    { prompt:"Frontend, Backend, or Full-stack?", options:["Frontend","Backend","Full-stack","All of the above"] },
    { prompt:"Preferred team role?", options:["Leader","Support","Innovator","Tester"] },
    { prompt:"Favorite type of project?", options:["Web App","Mobile App","AI","Game Development"] }
];

let currentQuestionIndex = -1; // -1 means game hasn’t started
let selectedAnswer = null;
const answers = [];

const flashcard = document.getElementById('minigame-card');
const questionFront = document.getElementById('card-question');
const questionBack = document.getElementById('card-question-back');
const nextButton = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const optionsContainer = document.getElementById('options-container');

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

function updateCard(){
    if(currentQuestionIndex === -1){
        questionFront.textContent = "Click start to begin!";
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
    } else {
        questionFront.textContent = "All done! Check your compatibility results soon!";
        questionBack.textContent = "";
        flashcard.classList.remove('flipped');
        optionsContainer.innerHTML = '';
        nextButton.style.display = 'none';
        progressBar.style.width = '100%';
        console.log("User answers:", answers);
    }
}

nextButton.addEventListener('click', () => {
    if (currentQuestionIndex > -1 && selectedAnswer === null) {
        alert("Please select an option before proceeding.");
        return;
    }
    
    if(selectedAnswer) answers.push(selectedAnswer);
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
        currentQuestionIndex++;
        updateCard();
    }
});

updateCard();
