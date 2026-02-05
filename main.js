document.addEventListener('DOMContentLoaded', () => {
    const levelSelect = document.getElementById('level-select');
    const topicsCheckboxes = document.getElementById('topics-checkboxes');
    const generateBtn = document.getElementById('generate-btn');
    const startBtn = document.getElementById('start-btn');
    const endBtn = document.getElementById('end-btn');
    const timerEl = document.getElementById('timer');
    const testPaper = document.getElementById('test-paper');
    const resultsSummary = document.getElementById('results-summary');
    const setupContainer = document.getElementById('setup-container');
    const testContainer = document.getElementById('test-container');
    const resultsContainer = document.getElementById('results-container');

    let timerInterval;
    let questions = [];

    const topicsByLevel = {
        p1: ['Numbers', 'Addition', 'Subtraction'],
        p2: ['Numbers', 'Addition', 'Subtraction', 'Multiplication', 'Division'],
        p3: ['Numbers', 'Fractions', 'Measurement'],
        p4: ['Fractions', 'Decimals', 'Geometry'],
        p5: ['Ratio', 'Percentage', 'Area and Perimeter'],
        p6: ['Algebra', 'Speed', 'Circles']
    };

    function updateTopics() {
        const selectedLevel = levelSelect.value;
        const topics = topicsByLevel[selectedLevel];
        topicsCheckboxes.innerHTML = '';
        topics.forEach(topic => {
            const checkbox = document.createElement('div');
            checkbox.innerHTML = `<input type="checkbox" id="${topic}" name="topic" value="${topic}"><label for="${topic}">${topic}</label>`;
            topicsCheckboxes.appendChild(checkbox);
        });
    }

    function generateTest() {
        const selectedTopics = Array.from(document.querySelectorAll('input[name="topic"]:checked')).map(cb => cb.value);
        if (selectedTopics.length === 0) {
            alert('Please select at least one topic.');
            return;
        }

        setupContainer.classList.add('hidden');
        testContainer.classList.remove('hidden');

        questions = [];
        testPaper.innerHTML = '';

        for (let i = 0; i < 10; i++) {
            const question = generateQuestion(levelSelect.value, selectedTopics);
            questions.push(question);
            const questionEl = document.createElement('div');
            questionEl.classList.add('question');
            questionEl.innerHTML = `
                <p>${i + 1}. ${question.text}</p>
                <input type="text" class="answer-input" disabled>
            `;
            testPaper.appendChild(questionEl);
        }
    }

    function generateQuestion(level, topics) {
        // This is a simplified question generator.
        // A more robust implementation would be needed for a real application.
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const topic = topics[Math.floor(Math.random() * topics.length)];
        let question = {};

        switch (topic) {
            case 'Addition':
                question.text = `What is ${num1} + ${num2}?`;
                question.answer = num1 + num2;
                break;
            case 'Subtraction':
                question.text = `What is ${num1 > num2 ? num1 : num2} - ${num1 > num2 ? num2 : num1}?`;
                question.answer = Math.abs(num1 - num2);
                break;
            case 'Multiplication':
                question.text = `What is ${num1} * ${num2}?`;
                question.answer = num1 * num2;
                break;
            case 'Division':
                 question.text = `What is ${num1 * num2} / ${num2}?`;
                question.answer = num1;
                break;
            default:
                 question.text = `What is ${num1} + ${num2}?`;
                question.answer = num1 + num2;
                break;

        }
        return question;

    }

    function startTest() {
        startBtn.disabled = true;
        endBtn.disabled = false;
        const answerInputs = document.querySelectorAll('.answer-input');
        answerInputs.forEach(input => input.disabled = false);

        let timeLeft = 15 * 60;
        timerInterval = setInterval(() => {
            timeLeft--;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

            if (timeLeft <= 0) {
                endTest();
            }
        }, 1000);
    }

    function endTest() {
        clearInterval(timerInterval);
        endBtn.disabled = true;
        const answerInputs = document.querySelectorAll('.answer-input');
        answerInputs.forEach(input => input.disabled = true);

        let correctAnswers = 0;
        questions.forEach((question, index) => {
            const userAnswer = parseInt(answerInputs[index].value, 10);
            if (userAnswer === question.answer) {
                correctAnswers++;
            }
        });

        testContainer.classList.add('hidden');
        resultsContainer.classList.remove('hidden');
        resultsSummary.innerHTML = `You got <strong>${correctAnswers}</strong> out of <strong>10</strong> questions correct.`

    }

    levelSelect.addEventListener('change', updateTopics);
    generateBtn.addEventListener('click', generateTest);
    startBtn.addEventListener('click', startTest);
    endBtn.addEventListener('click', endTest);

    updateTopics();
});
