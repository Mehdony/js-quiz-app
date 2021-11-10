class Question {
    constructor(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }
    isCorrectAnswer(choice) {
        return this.answer === choice;
    }
}
let questions = [
    new Question("Hawaï appartient à quel pays ?", ["Cuba", "Mexique", "Usa", "Portugal"], "Usa"),
    new Question("Quel est le plus long fleuve de France ? ", ["Rhône", "Loire", "Garonne", "Rhin"], "Rhin"),
    new Question("Combien d'États y-a-t-il aux États-Unis ? ", ["49", "50", "51", "52"], "50"),
    new Question("En quelle année a été signée la déclaration des droits de l'homme et du citoyen ? ", ["A partir de 1789", "A partir de 1885", "A partir de 1901", "A partir de 1968"], "(A partir de 1789)"),
    new Question("Quel est le plus grand océan du monde ? ", ["L'océan Atlantique", "L'océan Pacifique", "L'océan Océanique", "L'océan Arctique"], "(L'océan Pacifique)"),
    new Question("Quand la Seconde Guerre mondiale a-t-elle pris fin ? ", ["En 1918", "En 1939", "En 1945", "En 1949"], "En 1945"),
    new Question("Quel est le pays le plus peuplé du monde (compte plus de 1.350.000.000 d'habitants) ? ", ["la Chine", "la Russie", "Usa", "l'Inde"], "(la Chine)"),
    new Question("Quelle est l'oeuvre littéraire la plus célèbre de Antoine de Saint-Exupéry ? ", ["L'Aviateur", "Terre des hommes ", "Le petit prince", "Lettre à un otage"], "(Le petit prince)"),
    new Question("Où a été inventé le volley ?  ", ["États-Unis", "France", "Danemark", "Japon"], "(États-Unis)"),
    new Question("Quel est le premier film de Disney ?  ", ["Mickey", "Blanche-neige", "La Belle aux bois dormant", "Les 3 petits cochons"], "(Blanche-neige)"),
];

class Quiz {
    constructor(questions) {
        this.score = 0;
        this.questions = questions;
        this.currentQuestionIndex = 0;
    }
    getCurrentQuestion() {
        return this.questions[this.currentQuestionIndex];
    }
    guess(answer) {
        if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
            this.score++;
        }
        this.currentQuestionIndex++;
    }
    hasEnded() {
        return this.currentQuestionIndex >= this.questions.length;
    }
}

// regroupe toutes les fonctions qui ont un rapport avec l'affichage de l'aplication 

const display = {
    elementShown: function (id, text) {
        let element = document.getElementById(id);
        element.innerHTML = text;
    },
    endQuiz: function () {
        endQuizHTML = `
        <h1>Quiz terminé !</h1>
        <h3>Votre score est de : ${quiz.score} / ${quiz.questions.length}</h3>`;
        this.elementShown("quiz", endQuizHTML);
    },
    question: function () {
        this.elementShown("question", quiz.getCurrentQuestion().text);
    },
    choices: function () {
        let choices = quiz.getCurrentQuestion().choices;

        guessHandler = (id, guess) => {
            document.getElementById(id).onclick = function () {
                quiz.guess(guess);
                quizApp();
            }
        }
        for (let i = 0; i < choices.length; i++) {
            this.elementShown("choice" + i, choices[i]);
            guessHandler("guess" + i, choices[i]);
        }
    },
    progress: function () {
        let currentQuestionNumber = quiz.currentQuestionIndex + 1;
        this.elementShown('progress', "Question " + currentQuestionNumber + " sur " + quiz.questions.length);
    }
}

// Logique du jeu

quizApp = () => {
    if (quiz.hasEnded()) {
        display.endQuiz();
    } else {
        display.question();
        display.choices();
        display.progress();
    }

}


// Créer un quiz
let quiz = new Quiz(questions);
quizApp();
console.log(quiz);

