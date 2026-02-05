class QuestionGenerator {
    generate(level) {
        const questions = [];
        const numQuestions = 10;

        for (let i = 0; i < numQuestions; i++) {
            let question, answer;
            let num1, num2, num3;

            switch (level) {
                case '1': // Primary 1: Addition and Subtraction within 20
                    num1 = Math.floor(Math.random() * 10) + 1;
                    num2 = Math.floor(Math.random() * 10) + 1;
                    if (Math.random() > 0.5) {
                        question = `${num1} + ${num2} =`;
                        answer = num1 + num2;
                    } else {
                        // Ensure subtraction doesn't go below 0 for simpler cases
                        if (num1 < num2) [num1, num2] = [num2, num1]; // Swap to ensure num1 >= num2
                        question = `${num1} - ${num2} =`;
                        answer = num1 - num2;
                    }
                    break;
                case '2': // Primary 2: Multiplication and Division
                    num1 = Math.floor(Math.random() * 5) + 2;
                    num2 = Math.floor(Math.random() * 5) + 2;
                    if (Math.random() > 0.5) {
                        question = `${num1} × ${num2} =`;
                        answer = num1 * num2;
                    } else {
                        // Ensure division results in an integer
                        answer = num1 * num2; // This is the dividend
                        question = `${answer} ÷ ${num1} =`; // Divisor is num1
                        answer = num2; // Quotient is num2
                    }
                    break;
                case '3': // Primary 3: Four Operations
                    num1 = Math.floor(Math.random() * 10) + 1;
                    num2 = Math.floor(Math.random() * 10) + 1;
                    num3 = Math.floor(Math.random() * 5) + 2;
                    if (Math.random() > 0.5) {
                        question = `${num1} + ${num2} × ${num3} =`;
                        answer = num1 + (num2 * num3);
                    } else {
                        let tempSum = num1 + num2;
                        // Adjust num3 so that tempSum is divisible by num3
                        while (tempSum % num3 !== 0) {
                            num3 = Math.floor(Math.random() * 5) + 2;
                        }
                        question = `(${num1} + ${num2}) ÷ ${num3} =`;
                        answer = tempSum / num3;
                    }
                    break;
                case '4': // Primary 4: Fractions (simplified to addition of decimals for now)
                    let numerator1 = Math.floor(Math.random() * 5) + 1;
                    let denominator1 = Math.floor(Math.random() * 5) + 6;
                    let numerator2 = Math.floor(Math.random() * 5) + 1;
                    let denominator2 = Math.floor(Math.random() * 5) + 6;

                    // To simplify, let's just make denominators the same for easier calculation and display
                    let commonDenominator = denominator1 * denominator2;
                    let newNumerator1 = numerator1 * denominator2;
                    let newNumerator2 = numerator2 * denominator1;

                    question = `${numerator1}/${denominator1} + ${numerator2}/${denominator2} =`;
                    answer = (newNumerator1 + newNumerator2) / commonDenominator;
                    answer = parseFloat(answer.toFixed(2)); // Keep it as a decimal for now
                    break;
                case '5': // Primary 5: Decimals
                    num1 = parseFloat((Math.random() * 10).toFixed(2));
                    num2 = parseFloat((Math.random() * 10).toFixed(2));
                    if (Math.random() > 0.5) {
                        question = `${num1} + ${num2} =`;
                        answer = parseFloat((num1 + num2).toFixed(2));
                    } else {
                        if (num1 < num2) [num1, num2] = [num2, num1]; // Swap
                        question = `${num1} - ${num2} =`;
                        answer = parseFloat((num1 - num2).toFixed(2));
                    }
                    break;
                case '6': // Primary 6: Percentages
                    num1 = Math.floor(Math.random() * 50) + 1; // Percentage value
                    num2 = Math.floor(Math.random() * 100) + 50; // Of this number
                    question = `${num1}% of ${num2} =`;
                    answer = (num1 / 100) * num2;
                    answer = parseFloat(answer.toFixed(2));
                    break;
            }
            questions.push({ question, answer });
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
        this._questions = questions; // Store questions internally for later access
        this.shadowRoot.innerHTML = `
            <style>
                .question-list {
                    list-style-type: none;
                    padding: 0;
                }
                .question-item {
                    margin-bottom: 1rem;
                    font-size: 1.2rem;
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap; /* Allow wrapping on smaller screens */
                }
                .question-item span {
                    margin-right: 0.5rem;
                }
                .question-input {
                    width: 80px;
                    padding: 5px;
                    margin-left: 10px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    font-size: 1.1rem;
                    text-align: center;
                }
                .question-input:focus {
                    border-color: #007bff;
                    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
                    outline: none;
                }
                .result-display {
                    margin-left: 1rem;
                    font-weight: bold;
                }
            </style>
            <ol class="question-list">
                ${questions.map((q, i) => `
                    <li class="question-item">
                        <span>${i+1}. ${q.question}</span>
                        <input type="number" class="question-input" id="q${i}-input" data-question-index="${i}" disabled>
                        <span class="result-display" id="q${i}-result"></span>
                    </li>
                `).join('')}
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
    let currentQuestions = []; // Declare currentQuestions here

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    function updateTimerDisplay() {
        timerDisplay.textContent = formatTime(timeLeft);
    }

    function enableInputs(enable) {
        const questionPaper = testPaperContainer.querySelector('question-paper');
        if (questionPaper && questionPaper.shadowRoot) {
            const inputs = questionPaper.shadowRoot.querySelectorAll('.question-input');
            inputs.forEach(input => {
                input.disabled = !enable;
                if (!enable) {
                    input.classList.remove('active-input'); // Remove active styling
                } else {
                    input.classList.add('active-input'); // Add active styling
                }
            });
        }
    }

    function startTimer() {
        if (timerRunning) return;

        // If no questions are generated yet, generate them before starting
        if (currentQuestions.length === 0) {
            const level = levelSelect.value;
            currentQuestions = questionGenerator.generate(level);
            
            testPaperContainer.innerHTML = ''; // Clear previous test
            const questionPaper = document.createElement('question-paper');
            questionPaper.questions = currentQuestions;
            testPaperContainer.appendChild(questionPaper);
        }

        enableInputs(true); // Enable all input fields
        generateBtn.disabled = true; // Disable generate button
        levelSelect.disabled = true; // Disable level select during test

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
                // Automatically end the test when time is up
                stopTimer(); 
            }
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
        timerRunning = false;
        startTimerBtn.disabled = false;
        endTimerBtn.disabled = true;
        generateBtn.disabled = false; // Re-enable generate button
        levelSelect.disabled = false; // Re-enable level select

        enableInputs(false); // Disable input fields

        // Alert message moved after scoring
        // alert(`Test ended. Time remaining: ${formatTime(timeLeft)}`);
        
        // This is where the scoring logic will be called
        // For now, let's just show an alert
        // alert("Test ended. Time to score!");
        scoreTest(); // Call the scoring function
    }

    function scoreTest() {
        let correctAnswers = 0;
        const questionPaper = testPaperContainer.querySelector('question-paper');
        if (!questionPaper || !questionPaper.shadowRoot) {
            console.error("Question paper or shadowRoot not found for scoring.");
            return;
        }

        currentQuestions.forEach((q, i) => {
            const inputElement = questionPaper.shadowRoot.querySelector(`#q${i}-input`);
            const resultDisplay = questionPaper.shadowRoot.querySelector(`#q${i}-result`);

            if (inputElement) {
                const userAnswer = parseFloat(inputElement.value);
                const correctAnswer = q.answer;

                // Compare user answer with correct answer
                if (userAnswer === correctAnswer) {
                    correctAnswers++;
                    resultDisplay.textContent = '✔️ Correct';
                    resultDisplay.style.color = 'green';
                } else {
                    resultDisplay.textContent = `❌ Incorrect (Ans: ${correctAnswer})`;
                    resultDisplay.style.color = 'red';
                }
            }
        });

        const score = (correctAnswers / currentQuestions.length) * 100;
        alert(`Test completed! You scored ${correctAnswers} out of ${currentQuestions.length} (${score.toFixed(2)}%).`);
    }

    generateBtn.addEventListener('click', () => {
        const level = levelSelect.value;
        currentQuestions = questionGenerator.generate(level);
        
        testPaperContainer.innerHTML = ''; // Clear previous test
        const questionPaper = document.createElement('question-paper');
        questionPaper.questions = currentQuestions;
        testPaperContainer.appendChild(questionPaper);

        // Ensure start button is enabled, end button is disabled
        startTimerBtn.disabled = false;
        endTimerBtn.disabled = true;
        enableInputs(false); // Inputs should be disabled after generation until test starts
    });

    startTimerBtn.addEventListener('click', startTimer);
    endTimerBtn.addEventListener('click', stopTimer);

    // Initial setup on DOMContentLoaded
    updateTimerDisplay();
    startTimerBtn.disabled = true; // Initially disable start until a test is generated
    endTimerBtn.disabled = true; // Initially disable end button

