class QuestionGenerator {
    generate(level) {
        const questions = [];
        const numQuestions = 10;

        for (let i = 0; i < numQuestions; i++) {
            let question, answer;
            switch (level) {
                case '1': // Primary 1: Addition and Subtraction within 20
                    question = `${Math.floor(Math.random() * 10) + 1} + ${Math.floor(Math.random() * 10) + 1} = ?`;
                    break;
                case '2': // Primary 2: Multiplication and Division
                    question = `${Math.floor(Math.random() * 5) + 2} × ${Math.floor(Math.random() * 5) + 2} = ?`;
                    break;
                case '3': // Primary 3: Four Operations
                    if (Math.random() > 0.5) {
                        question = `${Math.floor(Math.random() * 10) + 1} + ${Math.floor(Math.random() * 10) + 1} × ${Math.floor(Math.random() * 5) + 2} = ?`;
                    } else {
                        question = `(${Math.floor(Math.random() * 10) + 1} + ${Math.floor(Math.random() * 10) + 1}) ÷ ${Math.floor(Math.random() * 5) + 2} = ?`;
                    }
                    break;
                case '4': // Primary 4: Fractions
                     question = `${Math.floor(Math.random() * 5) + 1}/${Math.floor(Math.random() * 5) + 6} + ${Math.floor(Math.random() * 5) + 1}/${Math.floor(Math.random() * 5) + 6} = ?`;
                    break;
                case '5': // Primary 5: Decimals
                    question = `${(Math.random() * 10).toFixed(2)} + ${(Math.random() * 10).toFixed(2)} = ?`;
                    break;
                case '6': // Primary 6: Percentages
                    question = `${Math.floor(Math.random() * 50) + 1}% of ${Math.floor(Math.random() * 100) + 50} = ?`;
                    break;
            }
            questions.push({ question, answer: '?'});
        }
        return questions;
    }
}

class QuestionPaper extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    set questions(questions) {
        this.shadowRoot.innerHTML = `
            <style>
                .question-list {
                    list-style-type: none;
                    padding: 0;
                }
                .question-item {
                    margin-bottom: 1rem;
                    font-size: 1.2rem;
                }
            </style>
            <ol class="question-list">
                ${questions.map((q, i) => `<li class="question-item">${i+1}. ${q.question}</li>`).join('')}
            </ol>
        `;
    }
}

customElements.define('question-paper', QuestionPaper);

const questionGenerator = new QuestionGenerator();



document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const levelSelect = document.getElementById('level-select');
    const testPaperContainer = document.getElementById('test-paper-container');
    const timerDisplay = document.getElementById('timer-display');
    const startTimerBtn = document.getElementById('start-timer-btn');
    const endTimerBtn = document.getElementById('end-timer-btn');

    let timerInterval;
    const totalTime = 15 * 60; // 15 minutes in seconds
    let timeLeft = totalTime;
    let timerRunning = false;

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    function updateTimerDisplay() {
        timerDisplay.textContent = formatTime(timeLeft);
    }

    function startTimer() {
        if (timerRunning) return;

        timerRunning = true;
        timeLeft = totalTime; // Reset timer on start
        updateTimerDisplay();
        startTimerBtn.disabled = true;
        endTimerBtn.disabled = false;

        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                timerRunning = false;
                timerDisplay.textContent = "Time's Up!";
                startTimerBtn.disabled = false;
                endTimerBtn.disabled = true;
                alert("Time's up! The test has ended.");
            }
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
        timerRunning = false;
        startTimerBtn.disabled = false;
        endTimerBtn.disabled = true;
        alert(`Test ended. Time remaining: ${formatTime(timeLeft)}`);
    }

    generateBtn.addEventListener('click', () => {
        const level = levelSelect.value;
        const questions = questionGenerator.generate(level);
        
        testPaperContainer.innerHTML = ''; // Clear previous test
        const questionPaper = document.createElement('question-paper');
        questionPaper.questions = questions;
        testPaperContainer.appendChild(questionPaper);

        // Reset timer if a new test is generated while timer is not running
        if (!timerRunning) {
            timeLeft = totalTime;
            updateTimerDisplay();
        }
    });

    startTimerBtn.addEventListener('click', startTimer);
    endTimerBtn.addEventListener('click', stopTimer);

    // Initial display of timer
    updateTimerDisplay();
});

