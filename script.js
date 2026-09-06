
        // --------------------------------
        // QUESTIONS DATA
        // --------------------------------

        const questions = [

            {
                question: "Which keyword is used to declare a variable in JavaScript?",

                options: [
                    "var",
                    "variable",
                    "declare",
                    "define"
                    
                ],

                answer: "var"
            },


            {
                question: "Which method is used to add an element at the end of an array?",

                options: [
                    "push()",
                    "pop()",
                    "shift()",
                    "unshift()"
                ],

                answer: "push()"
            },


            {
                question: "Which value represents the absence of a value in JavaScript?",

                options: [
                    "null",
                    "empty",
                    "zero",
                    "false"
                ],

                answer: "null"
            },


            {
                question: "Which method creates a new array by transforming every element?",

                options: [
                    "map()",
                    "filter()",
                    "find()",
                    "forEach()"
                ],

                answer: "map()"
            },


            {
                question: "Which keyword refers to the current object in a method?",

                options: [
                    "this",
                    "self",
                    "current",
                    "object"
                ],

                answer: "this"
            }

        ];


        // --------------------------------
        // VARIABLES
        // --------------------------------

        let currentQuestion = 0;

        let score = 0;

        let selectedAnswer = null;

        let answerSubmitted = false;


        // --------------------------------
        // DOM ELEMENTS
        // --------------------------------

        const questionElement =
            document.getElementById("question");

        const optionsElement =
            document.getElementById("options");

        const questionNumberElement =
            document.getElementById("questionNumber");

        const scoreElement =
            document.getElementById("score");

        const submitBtn =
            document.getElementById("submitBtn");

        const nextBtn =
            document.getElementById("nextBtn");

        const quizElement =
            document.getElementById("quiz");

        const resultElement =
            document.getElementById("result");

        const finalScoreElement =
            document.getElementById("finalScore");

        const restartBtn =
            document.getElementById("restartBtn");


        // --------------------------------
        // SHOW QUESTION
        // --------------------------------

        function showQuestion() {

            selectedAnswer = null;

            answerSubmitted = false;

            submitBtn.disabled = true;

            submitBtn.style.display = "inline-block";

            nextBtn.style.display = "none";


            const current =
                questions[currentQuestion];


            questionElement.textContent =
                current.question;


            questionNumberElement.textContent =
                `Question ${currentQuestion + 1} of ${questions.length}`;


            optionsElement.innerHTML = "";


            current.options.forEach(option => {

                const button =
                    document.createElement("button");


                button.classList.add("option");


                button.textContent =
                    option;


                button.addEventListener(
                    "click",
                    () => selectOption(button, option)
                );


                optionsElement.appendChild(button);

            });

        }


        // --------------------------------
        // SELECT OPTION
        // --------------------------------

        function selectOption(button, option) {

            // Answer already submitted
            if (answerSubmitted) {
                return;
            }


            // Remove previous selection

            const allOptions =
                document.querySelectorAll(".option");


            allOptions.forEach(optionButton => {

                optionButton.classList.remove("selected");

            });


            // Select current option

            button.classList.add("selected");


            selectedAnswer = option;


            submitBtn.disabled = false;

        }


        // --------------------------------
        // SUBMIT ANSWER
        // --------------------------------

        submitBtn.addEventListener(
            "click",
            submitAnswer
        );


        function submitAnswer() {

            if (!selectedAnswer) {
                return;
            }


            // Lock answer

            answerSubmitted = true;


            const current =
                questions[currentQuestion];


            const allOptions =
                document.querySelectorAll(".option");


            allOptions.forEach(button => {

                const option =
                    button.textContent;


                // Correct answer becomes GREEN

                if (option === current.answer) {

                    button.classList.add("correct");

                }


                // Selected wrong answer becomes RED

                if (
                    option === selectedAnswer &&
                    selectedAnswer !== current.answer
                ) {

                    button.classList.add("wrong");

                }


                // Disable buttons

                button.disabled = true;

            });


            // --------------------------------
            // SCORE
            // --------------------------------

            if (
                selectedAnswer === current.answer
            ) {

                score += 2;

            } else {

                score -= 0.50 ;

            }


            // Avoid negative score

            if (score < 0) {
                score = 0;
            }


            scoreElement.textContent =
                `Score: ${score} / 10`;


            submitBtn.style.display = "none";


            // Show next button

            if (
                currentQuestion <
                questions.length - 1
            ) {

                nextBtn.style.display =
                    "inline-block";

            } else {

                nextBtn.textContent =
                    "View Result →";

                nextBtn.style.display =
                    "inline-block";

            }

        }


        // --------------------------------
        // NEXT QUESTION
        // --------------------------------

        nextBtn.addEventListener(
            "click",
            () => {

                currentQuestion++;


                if (
                    currentQuestion <
                    questions.length
                ) {

                    showQuestion();

                } else {

                    showResult();

                }

            }
        );


        // --------------------------------
        // SHOW RESULT
        // --------------------------------

        function showResult() {

            quizElement.style.display =
                "none";


            resultElement.style.display =
                "block";


            finalScoreElement.textContent =
                `${score} / 10`;

        }


        // --------------------------------
        // RESTART QUIZ
        // --------------------------------

        restartBtn.addEventListener(
            "click",
            () => {

                currentQuestion = 0;

                score = 0;

                quizElement.style.display =
                    "block";

                resultElement.style.display =
                    "none";

                scoreElement.textContent =
                    "Score: 0 / 10";

                showQuestion();

            }
        );


        // --------------------------------
        // START QUIZ
        // --------------------------------

        showQuestion();
