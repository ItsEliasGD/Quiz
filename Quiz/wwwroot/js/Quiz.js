const app = Vue.createApp({
    data() {
        return {
            currentIndex: 1,
            flashUser: "",
            score: 0,
            quizFinished: false,
            session: {},
            quiz: {},
            question: {}
        };
    },
    methods: {
        save() {
            axios.post(Save, {
                fk_Quiz: this.quiz.Id_Quiz,
                User: this.flashUser,
                Score: this.score,
            }).then(response => {

                if (response.data.success) {
                    Swal.fire({
                        title: 'Success',
                        text: response.data.Message,
                        icon: 'success',
                        timer: 2000,
                    })
                        .then(() => window.location.href = ViewIndex);
                }
            });
        },

        getQuiz() {
            console.log(Quiz);
            axios.get(Quiz, {
                params: {
                   IdQuiz: idQuiz,
                }
            }).then(response => {
                this.quiz = response.data;
                console.log(response.data);
                this.question = this.quiz.Questions[0];
            })
        },

        getClasses() {
            const count = this.question.Answers.length;
            if (count === 2 || count === 4) return 'col-6 d-flex justify-content-center';
            if (count === 3) return 'col-4 d-flex justify-content-center';
        },

        selectAnswer(answer) {
            if (this.currentIndex <= this.quiz.Questions.length) {
                if (answer.IsCorrect) {
                    this.score += 5;
                }

                if (this.currentIndex === this.quiz.Questions.length) {
                    this.generateSession(); // opcional
                    this.quizFinished = true; // ✅ Mostrar mensaje final
                } else {
                    this.currentIndex++;
                    this.question = this.quiz.Questions.find(q => q.Index === this.currentIndex);
                }
            }
        },

        generateSession() {
            this.session = {
                Score: this.score,
                fk_Quiz: this.quiz.Id_Quiz,
                User: this.flashUser
            };
            console.log("Sesión:", this.session);
        },
    },
    mounted() {
        this.getQuiz();
    }
});
app.mount("#app");
