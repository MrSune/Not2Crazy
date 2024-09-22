const quizData = [
    {
        question: 'What does HTML stand for?',
        options: ['HyperText Markup Language', 'HighText Machine Language', 'HyperTool Multi Language', 'HyperText Markup Library'],
        answer: 'HyperText Markup Language',
    },
    {
        question: 'Which language is used for styling web pages?',
        options: ['HTML', 'CSS', 'JavaScript', 'PHP'],
        answer: 'CSS',
    },
    {
        question: 'What is the purpose of JavaScript?',
        options: ['To style HTML', 'To create interactive web pages', 'To structure content', 'To manage databases'],
        answer: 'To create interactive web pages',
    },
    {
        question: 'Which of the following is a JavaScript framework?',
        options: ['Django', 'Flask', 'React', 'Ruby on Rails'],
        answer: 'React',
    },
    {
        question: 'What is a CSS preprocessor?',
        options: ['LESS', 'HTML', 'JavaScript', 'SQL'],
        answer: 'LESS',
    },
    {
        question: 'What does DOM stand for?',
        options: ['Document Object Model', 'Data Object Model', 'Document Oriented Model', 'Dynamic Object Model'],
        answer: 'Document Object Model',
    },
    {
        question: 'Which tag is used to define an internal style sheet?',
        options: ['<style>', '<css>', '<script>', '<stylesheet>'],
        answer: '<style>',
    },
    {
        question: 'What is the correct way to add a comment in JavaScript?',
        options: ['// This is a comment', '<!-- This is a comment -->', '# This is a comment', '/* This is a comment */'],
        answer: '// This is a comment',
    },
    {
        question: 'What does API stand for?',
        options: ['Application Programming Interface', 'Application Programming Integration', 'Applied Programming Interface', 'Applied Programming Integration'],
        answer: 'Application Programming Interface',
    },
    {
        question: 'Which HTML attribute is used to define inline styles?',
        options: ['style', 'class', 'font', 'styles'],
        answer: 'style',
    },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function displayQuestion() {
    const questionData = quizData[currentQuestion];

    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;

    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';

    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);

    for (let i = 0; i < shuffledOptions.length; i++) {
        const option = document.createElement('label');
        option.className = 'option';

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'quiz';
        radio.value = shuffledOptions[i];

        const optionText = document.createTextNode(shuffledOptions[i]);

        option.appendChild(radio);
        option.appendChild(optionText);
        optionsElement.appendChild(option);
    }

    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
        const answer = selectedOption.value;
        if (answer === quizData[currentQuestion].answer) {
            score++;
        } else {
            incorrectAnswers.push({
                question: quizData[currentQuestion].question,
                incorrectAnswer: answer,
                correctAnswer: quizData[currentQuestion].answer,
            });
        }
        currentQuestion++;
        selectedOption.checked = false;
        if (currentQuestion < quizData.length) {
            displayQuestion();
        } else {
            displayResult();
        }
    }
}

function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
}

function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';

    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
        incorrectAnswersHtml += `
            <p>
                <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
                <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
                <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
            </p>
        `;
    }

    resultContainer.innerHTML = `
        <p>You scored ${score} out of ${quizData.length}!</p>
        <p>Incorrect Answers:</p>
        ${incorrectAnswersHtml}
    `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();
