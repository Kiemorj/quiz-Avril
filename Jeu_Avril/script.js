(function() {
    const myQuestions = [
        {
            question: "What is my favorite sport?",
            answers: {
                a: "Basketball",
                b: "Soccer",
                c: "Natation"
            },
            correctAnswer: "b",
            feedback: "Soccer is my favorite sport!"
        },
        {
            question: "What is Quebec's national dish?",
            answers: {
                a: "Maple Syrup",
                b: "Tourtière",
                c: "Poutine"
            },
            correctAnswer: "c",
            feedback: "Poutine is the national dish of Québec!"
        },
        {
            question: "Which of these 3 stickers annoy me the most?",
            answers: {
                a: "<img src='img/douard1.png' alt='Sticker 1'>",
                b: "<img src='img/douard2.png' alt='Sticker 2'>",
                c: "<img src='img/douard3.png' alt='Sticker 3'>"
            },
            correctAnswer: "a",
            feedback: "The 2nd sticker is the one that annoys me the most!"
        },
        {
            question: "Where is my dream destination with you?",
            answers: {
                a: "Japan",
                b: "Italy",
                c: "France"
            },
            correctAnswer: "b",
            feedback: "Italy is my dream destination!"
        },
        {
            question: "Who is my favorite artist?",
            answers: {
                a: "Nujabes",
                b: "Drake",
                c: "Kendrick Lamar"
            },
            correctAnswer: "a",
            feedback: "Nujabes is my favorite artist!"
        },
        {
            question: "Do I prefer cats or dogs?",
            answers: {
                a: "Cats",
                b: "Dogs",
                c: "Both"
            },
            correctAnswer: "a",
            feedback: "I prefer cats!"
        },
        {
            question: "Which instrument did I play when I was younger?",
            answers: {
                a: "Violin",
                b: "Piano",
                c: "Cello"
            },
            correctAnswer: "c",
            feedback: "I played the cello when I was younger!"
        }
    ];

    const introContainer = document.querySelector('.intro-container');
    const quizContainer = document.querySelector('.quiz-container');
    const startButton = document.getElementById('start-quiz');
    const userNameInput = document.getElementById('user-name');
    const resultsContainer = document.getElementById('results');

    let currentQuestionIndex = 0;
    let numCorrect = 0;

    startButton.addEventListener('click', () => {
        const userName = userNameInput.value;
        if (userName) {
            introContainer.style.display = 'none';
            quizContainer.style.display = 'block';
            showQuestion(currentQuestionIndex);
        } else {
            alert('Please enter your name.');
        }
    });

    function showQuestion(index) {
        const currentQuestion = myQuestions[index];
        const answers = [];
        for (let letter in currentQuestion.answers) {
            answers.push(
                `<label>
                    <input type="radio" name="question${index}" value="${letter}">
                    ${letter} :
                    ${currentQuestion.answers[letter]}
                </label>`
            );
        }
        quizContainer.innerHTML = `
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join('')} </div>
        `;

        const answerInputs = quizContainer.querySelectorAll('input');
        answerInputs.forEach(input => {
            input.addEventListener('click', () => {
                const userAnswer = input.value;
                const nextIndex = index + 1;
                if (userAnswer === currentQuestion.correctAnswer) {
                    numCorrect++;
                }

                if (nextIndex < myQuestions.length) {
                    window.location.href = userAnswer === currentQuestion.correctAnswer 
                        ? `good_response.html?next=${nextIndex}&score=${numCorrect}`
                        : `bad_response.html?next=${nextIndex}&score=${numCorrect}`;
                } else {
                    window.location.href = `EndGame.html?score=${numCorrect}`;
                }
            });
        });
    }

    // Load the correct question if we come from the response pages
    window.onload = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const questionIndex = urlParams.get('next');
        const score = urlParams.get('score');
        if (questionIndex !== null) {
            currentQuestionIndex = parseInt(questionIndex, 10);
            numCorrect = parseInt(score, 10);
            introContainer.style.display = 'none';
            quizContainer.style.display = 'block';
            showQuestion(currentQuestionIndex);
        }
    };
})();
