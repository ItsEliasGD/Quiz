const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            currentIndex: 1,
            flashUser: "Chompin",
            score: 0,
            session: {},

            quiz: {
                Id_Quiz: 1,
                Name: "Ejemplo de Quiz Extendido",
                Questions: [
                    {
                        Id_Question: 101,
                        Description: "¿Cuál es la capital de Francia?",
                        Index: 1,
                        Answers: [
                            { Id_Answer: 1001, Description: "París", Index: 1, IsCorrect: true },
                            { Id_Answer: 1002, Description: "Madrid", Index: 2, IsCorrect: false },
                            { Id_Answer: 1003, Description: "Londres", Index: 3, IsCorrect: false },
                            { Id_Answer: 1004, Description: "Berlín", Index: 4, IsCorrect: false }
                        ]
                    },
                    {
                        Id_Question: 102,
                        Description: "¿Cuál es el planeta más cercano al Sol?",
                        Index: 2,
                        Answers: [
                            { Id_Answer: 2001, Description: "Mercurio", Index: 1, IsCorrect: true },
                            { Id_Answer: 2002, Description: "Venus", Index: 2, IsCorrect: false },
                            { Id_Answer: 2003, Description: "Tierra", Index: 3, IsCorrect: false },
                            { Id_Answer: 2004, Description: "Júpiter", Index: 4, IsCorrect: false }
                        ]
                    },
                    {
                        Id_Question: 103,
                        Description: "¿En qué continente está Egipto?",
                        Index: 3,
                        Answers: [
                            { Id_Answer: 3001, Description: "África", Index: 1, IsCorrect: true },
                            { Id_Answer: 3002, Description: "Asia", Index: 2, IsCorrect: false },
                            { Id_Answer: 3003, Description: "Europa", Index: 3, IsCorrect: false },
                            { Id_Answer: 3004, Description: "Oceanía", Index: 4, IsCorrect: false }
                        ]
                    },
                    {
                        Id_Question: 104,
                        Description: "¿Quién escribió 'Cien años de soledad'?",
                        Index: 4,
                        Answers: [
                            { Id_Answer: 4001, Description: "Gabriel García Márquez", Index: 1, IsCorrect: true },
                            { Id_Answer: 4002, Description: "Mario Vargas Llosa", Index: 2, IsCorrect: false },
                            { Id_Answer: 4003, Description: "Pablo Neruda", Index: 3, IsCorrect: false },
                            { Id_Answer: 4004, Description: "Isabel Allende", Index: 4, IsCorrect: false }
                        ]
                    },
                    {
                        Id_Question: 105,
                        Description: "¿Cuál es el elemento químico con símbolo O?",
                        Index: 5,
                        Answers: [
                            { Id_Answer: 5001, Description: "Oxígeno", Index: 1, IsCorrect: true },
                            { Id_Answer: 5002, Description: "Oro", Index: 2, IsCorrect: false },
                            { Id_Answer: 5003, Description: "Osmio", Index: 3, IsCorrect: false },
                            { Id_Answer: 5004, Description: "Oxalato", Index: 4, IsCorrect: false }
                        ]
                    },
                    {
                        Id_Question: 106,
                        Description: "¿Qué idioma se habla en Brasil?",
                        Index: 6,
                        Answers: [
                            { Id_Answer: 6001, Description: "Portugués", Index: 1, IsCorrect: true },
                            { Id_Answer: 6002, Description: "Español", Index: 2, IsCorrect: false },
                            { Id_Answer: 6003, Description: "Inglés", Index: 3, IsCorrect: false },
                            { Id_Answer: 6004, Description: "Francés", Index: 4, IsCorrect: false }
                        ]
                    },
                    {
                        Id_Question: 107,
                        Description: "¿Cuál es la capital de Japón?",
                        Index: 7,
                        Answers: [
                            { Id_Answer: 7001, Description: "Tokio", Index: 1, IsCorrect: true },
                            { Id_Answer: 7002, Description: "Osaka", Index: 2, IsCorrect: false },
                            { Id_Answer: 7003, Description: "Kioto", Index: 3, IsCorrect: false },
                            { Id_Answer: 7004, Description: "Nagoya", Index: 4, IsCorrect: false }
                        ]
                    },
                    {
                        Id_Question: 108,
                        Description: "¿Cuánto es 7 x 8?",
                        Index: 8,
                        Answers: [
                            { Id_Answer: 8001, Description: "56", Index: 1, IsCorrect: true },
                            { Id_Answer: 8002, Description: "54", Index: 2, IsCorrect: false },
                            { Id_Answer: 8003, Description: "64", Index: 3, IsCorrect: false },
                            { Id_Answer: 8004, Description: "49", Index: 4, IsCorrect: false }
                        ]
                    },
                    {
                        Id_Question: 109,
                        Description: "¿Qué animal es conocido como el rey de la selva?",
                        Index: 9,
                        Answers: [
                            { Id_Answer: 9001, Description: "León", Index: 1, IsCorrect: true },
                            { Id_Answer: 9002, Description: "Tigre", Index: 2, IsCorrect: false },
                            { Id_Answer: 9003, Description: "Elefante", Index: 3, IsCorrect: false },
                            { Id_Answer: 9004, Description: "Gorila", Index: 4, IsCorrect: false }
                        ]
                    },
                    {
                        Id_Question: 110,
                        Description: "¿Cuál es el océano más grande del mundo?",
                        Index: 10,
                        Answers: [
                            { Id_Answer: 10001, Description: "Pacífico", Index: 1, IsCorrect: true },
                            { Id_Answer: 10002, Description: "Atlántico", Index: 2, IsCorrect: false },
                            { Id_Answer: 10003, Description: "Índico", Index: 3, IsCorrect: false },
                            { Id_Answer: 10004, Description: "Ártico", Index: 4, IsCorrect: false }
                        ]
                    },
                    {
                        Id_Question: 111,
                        Description: "¿Cuál es la fórmula del agua?",
                        Index: 11,
                        Answers: [
                            { Id_Answer: 11001, Description: "H₂O", Index: 1, IsCorrect: true },
                            { Id_Answer: 11002, Description: "CO₂", Index: 2, IsCorrect: false },
                            { Id_Answer: 11003, Description: "NaCl", Index: 3, IsCorrect: false },
                            { Id_Answer: 11004, Description: "O₂", Index: 4, IsCorrect: false }
                        ]
                    },
                    {
                        Id_Question: 112,
                        Description: "¿En qué año llegó el hombre a la Luna?",
                        Index: 12,
                        Answers: [
                            { Id_Answer: 12001, Description: "1969", Index: 1, IsCorrect: true },
                            { Id_Answer: 12002, Description: "1959", Index: 2, IsCorrect: false },
                            { Id_Answer: 12003, Description: "1979", Index: 3, IsCorrect: false },
                            { Id_Answer: 12004, Description: "1989", Index: 4, IsCorrect: false }
                        ]
                    },
                    {
                        Id_Question: 113,
                        Description: "¿Cuál es el país con más población del mundo?",
                        Index: 13,
                        Answers: [
                            { Id_Answer: 13001, Description: "India", Index: 1, IsCorrect: true },
                            { Id_Answer: 13002, Description: "China", Index: 2, IsCorrect: false },
                            { Id_Answer: 13003, Description: "EE.UU.", Index: 3, IsCorrect: false },
                            { Id_Answer: 13004, Description: "Indonesia", Index: 4, IsCorrect: false }
                        ]
                    },
                    {
                        Id_Question: 114,
                        Description: "¿Qué instrumento mide la temperatura?",
                        Index: 14,
                        Answers: [
                            { Id_Answer: 14001, Description: "Termómetro", Index: 1, IsCorrect: true },
                            { Id_Answer: 14002, Description: "Barómetro", Index: 2, IsCorrect: false },
                            { Id_Answer: 14003, Description: "Higrómetro", Index: 3, IsCorrect: false },
                            { Id_Answer: 14004, Description: "Anemómetro", Index: 4, IsCorrect: false }
                        ]
                    },
                    {
                        Id_Question: 115,
                        Description: "¿Cuál es el metal más liviano?",
                        Index: 15,
                        Answers: [
                            { Id_Answer: 15001, Description: "Litio", Index: 1, IsCorrect: true },
                            { Id_Answer: 15002, Description: "Aluminio", Index: 2, IsCorrect: false },
                            { Id_Answer: 15003, Description: "Sodio", Index: 3, IsCorrect: false },
                            { Id_Answer: 15004, Description: "Magnesio", Index: 4, IsCorrect: false }
                        ]
                    }
                ]
            },

            question: {
            },


        };
    },
    methods: {

        getClasses() {

            if (this.question.Answers.length === 2 || this.question.Answers.length === 4) {
                return 'col-6 d-flex justify-content-center';
            }
            else if (this.question.Answers.length === 3) {
                return 'col-4 d-flex justify-content-center';
            }
        },

        selectAnswer(answer) {

            if (this.currentIndex <= this.quiz.Questions.length) {

                console.log(answer);

                console.log(this.quiz.Questions.length);

                console.log(this.question.Index);


                if (answer.IsCorrect && this.currentIndex <= this.quiz.Questions.length) this.score = this.score + 5;
                if (this.currentIndex === this.quiz.Questions.length) this.generateSession();

                this.currentIndex++;

                if (this.currentIndex <= this.quiz.Questions.length) this.question = this.quiz.Questions.find(q => q.Index === this.currentIndex);

            }

        },

        generateSession() {

            this.session = {

                Score: this.score,
                fk_Quiz: this.quiz.Id_Quiz,
                User: this.flashUser,

            }
            console.log("Sesión: ", this.session);
        },

    },
    mounted() {

        this.question = this.quiz.Questions[0];

    }
});
app.mount('#app');