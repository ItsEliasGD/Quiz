const app = Vue.createApp({
    data() {
        return {
            table: false,
            createMode: false,
            editMode: false,
            addAnswersMode: false,
            editAnswerMode: false,
            questions: [],
            answers: [],
            answer: {
                Id_Answer: 0,
                fk_Question: 0,
                Description: '',
                IsCorrect: false,
                Index: 0,
            },
            question: {
                fk_Quiz: quizId,
                Description: '',
                Index: 0,
            },
            indexList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],

        };
    },

    watch: {
        createMode(val) {
            this.toggleBodyScroll(val || this.editMode || this.addAnswersMode);
        },
        editMode(val) {
            this.toggleBodyScroll(val || this.createMode || this.addAnswersMode);
        },
        addAnswersMode(val) {
            this.toggleBodyScroll(val || this.createMode || this.editMode);
        }
    },

    methods: {
        getQuestions() {

            axios.get(Questions, {
                params: {
                    IdQuiz: quizId,
                }
            })
                .then(response => {

                    this.questions = response.data;
                    this.table = true;

                    console.log("questions", this.questions);
                    this.$nextTick(() => {
                        this.generateTable();
                    });
                })
                .catch(error => {
                    console.error("Error fetching questions:", error);
                    Swal.fire({
                        title: 'Error',
                        text: 'An error occurred while fetching questions.',
                        icon: 'error',
                    });
                })
        },

        toggleBodyScroll(isModalOpen) {
            if (isModalOpen) {
                document.body.classList.add('modal-open');
            } else {
                document.body.classList.remove('modal-open');
            }
        },

        closeQuestionModal() {
            this.createMode = false;
            this.editMode = false;
            this.question = {
                fk_Quiz: quizId,
                Description: '',
                Index: 0,
            };
        },

        closeAnswerModal() {
            this.addAnswersMode = false;
            this.editAnswerMode = false;
            this.answer = {
                Id_Answer: 0,
                fk_Question: 0,
                Description: '',
                IsCorrect: false,
                Index: 0,
            };
        },


        createQuestion() {
            Swal.fire({
                text: 'Creating question...',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            axios.post(Create, this.question)
                .then(response => {
                    if (response.data.success) {
                        Swal.fire({
                            title: 'Success',
                            text: response.data.Message,
                            icon: 'success',
                            timer: 2000,
                        });
                        this.createMode = false;
                        this.questions.push(this.question);
                        this.question = {
                            fk_Quiz: quizId,
                            Description: '',
                            Index: 0,
                        };
                    } else {
                        Swal.fire({
                            title: 'Error',
                            text: response.data.Message,
                            icon: 'error',
                        });
                    }
                })
                .catch(error => {
                    console.error("Error creating question:", error);
                    Swal.fire({
                        title: 'Error',
                        text: 'An error occurred while creating the question.',
                        icon: 'error',
                    });
                });
        },

        editToggle(question) {
            this.editMode = true;
            this.question = {
                Id_Question: question.Id_Question,
                fk_Quiz: question.fk_Quiz,
                Description: question.Description,
                Index: question.Index,
            };
        },

        showModalAnswers(question) {
            this.addAnswersMode = true;
            this.answer.fk_Question = question.Id_Question;

            this.getAnswers(question.Id_Question);
        },

        createAnswres() {
            Swal.fire({
                text: 'Creating answers...',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            axios.post(CreateAnswers, this.answers)
                .then(response => {
                    if (response.data.success) {
                        Swal.fire({
                            title: 'Success',
                            text: response.data.Message,
                            icon: 'success',
                            timer: 2000,
                        });
                        this.addAnswersMode = false;
                        this.getAnswers(this.answers[0].fk_Question);
                    } else {
                        Swal.fire({
                            title: 'Error',
                            text: response.data.Message,
                            icon: 'error',
                        });
                    }
                })
                .catch(error => {
                    console.error("Error creating answers:", error);
                    Swal.fire({
                        title: 'Error',
                        text: 'An error occurred while creating the answers.',
                        icon: 'error',
                    });
                });
        },

        editQuestion() {
            Swal.fire({
                text: 'Editing question...',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            axios.post(Update, this.question)
                .then(response => {
                    if (response.data.success) {
                        Swal.fire({
                            title: 'Success',
                            text: response.data.Message,
                            icon: 'success',
                            timer: 2000,
                        });
                        const index = this.questions.findIndex(q => q.Id_Question === this.question.Id_Question);
                        if (index !== -1) {
                            this.questions.splice(index, 1, this.question);
                        }
                        this.editMode = false;
                        this.question = {
                            fk_Quiz: quizId,
                            Description: '',
                            Index: 0,
                        };
                    }
                })
                .catch(error => {
                    console.error("Error editing question:", error);
                    Swal.fire({
                        title: 'Error',
                        text: 'An error occurred while editing the question.',
                        icon: 'error',
                    });
                });
        },

        deleteQuestion(question) {
            Swal.fire({
                text: 'Are you sure you want to delete this question?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.post(Delete, question)
                        .then(response => {
                            if (response.data.success) {
                                Swal.fire({
                                    title: 'Deleted',
                                    text: response.data.Message,
                                    icon: 'success',
                                    timer: 2000,
                                });

                                const index = this.questions.findIndex(q => q.Id === question.Id);
                                if (index !== -1) {
                                    this.questions.splice(index, 1);
                                }
                            } else {
                                Swal.fire({
                                    title: 'Error',
                                    text: response.data.Message,
                                    icon: 'error',
                                });
                            }
                        })
                        .catch(error => {
                            console.error("Error deleting question:", error);
                            Swal.fire({
                                title: 'Error',
                                text: 'An error occurred while deleting the question.',
                                icon: 'error',
                            });
                        });
                }
            });
        },

        addAnswers(fkQuestion) {
            this.answers.push(this.answer);
            console.log("nueva respuesta", this.answer);
            console.log("lista actualizada", this.answers);

            this.answer = {
                Id_Answer: 0,
                fk_Question: fkQuestion,
                Description: '',
                IsCorrect: false,
                Index: 0,
            };
        },

        deleteAnswer(answer) {
            if (answer.Id_Answer === 0) this.answers = this.answers.filter(a => a !== answer);
            else {
                Swal.fire({
                    text: 'Are you sure you want to delete this answer?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, delete it!',
                    cancelButtonText: 'No, cancel!',
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.post(DeleteAnswer, answer)
                            .then(response => {
                                if (response.data.success) {
                                    Swal.fire({
                                        title: 'Deleted',
                                        text: response.data.Message,
                                        icon: 'success',
                                        timer: 2000,
                                    });
                                    this.answers = this.answers.filter(a => a !== answer);
                                } else {
                                    Swal.fire({
                                        title: 'Error',
                                        text: response.data.Message,
                                        icon: 'error',
                                    });
                                }
                            })
                            .catch(error => {
                                console.error("Error deleting answer:", error);
                                Swal.fire({
                                    title: 'Error',
                                    text: 'An error occurred while deleting the answer.',
                                    icon: 'error',
                                });
                            });
                    }
                });
            }
        },

        editAnswer(answer) {
            this.editAnswerMode = true;
            this.answer = {
                Id_Answer: answer.Id_Answer,
                fk_Question: answer.fk_Question,
                Description: answer.Description,
                IsCorrect: answer.IsCorrect,
                Index: answer.Index,
            };
        },

        saveAnswer() {
            Swal.fire({
                text: 'Saving answer...',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            })

            axios.post(UpdateAnswer, this.answer)
                .then(response => {
                    if (response.data.success) {
                        Swal.fire({
                            title: 'Success',
                            text: response.data.Message,
                            icon: 'success',
                            timer: 2000,
                        });
                        const index = this.answers.findIndex(a => a.Id_Answer === this.answer.Id_Answer);
                        if (index !== -1) {
                            this.answers.splice(index, 1, this.answer);
                        } else {
                            this.answers.push(this.answer);
                        }
                        this.editAnswerMode = false;
                        this.answer = {
                            Id_Answer: 0,
                            fk_Question: 0,
                            Description: '',
                            IsCorrect: false,
                            Index: 0,
                        };
                    } else {
                        Swal.fire({
                            title: 'Error',
                            text: response.data.Message,
                            icon: 'error',
                        });
                    }
                })
                .catch(error => {
                    console.error("Error saving answer:", error);
                    Swal.fire({
                        title: 'Error',
                        text: 'An error occurred while saving the answer.',
                        icon: 'error',
                    });
                })

        },

        getAnswers(idQuestion) {
            axios.get(GetAnswers, {
                params: {
                    IdQuestion: idQuestion,
                }
            })
                .then(response => {
                    this.answers = response.data;
                    console.log("answers", this.answers);
                })
                .catch(error => {
                    console.error("Error fetching answers:", error);
                    Swal.fire({
                        title: 'Error',
                        text: 'An error occurred while fetching answers.',
                        icon: 'error',
                    });
                });
        },

        generateTable() {
            $(this.$refs.table).DataTable({
                paging: true,
                searching: true,
                ordering: true,
                responsive: true,
                scrollY: '600px',
                scrollCollapse: true,
                language: {
                    processing: "Procesando...",
                    search: "Buscar:",
                    lengthMenu: "Mostrar _MENU_ registros",
                    info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
                    infoEmpty: "No hay registros disponibles",
                    infoFiltered: "(filtrado de _MAX_ registros en total)",
                    loadingRecords: "Cargando...",
                    zeroRecords: "No se encontraron registros",
                    emptyTable: "No hay datos disponibles en la tabla",
                    paginate: {
                        first: "Primero",
                        previous: "Anterior",
                        next: "Siguiente",
                        last: "Último"
                    },
                    aria: {
                        sortAscending: ": activar para ordenar ascendente",
                        sortDescending: ": activar para ordenar descendente"
                    }
                }
            });
        },
    },
    mounted() {
        this.getQuestions();
    }
});
app.mount('#app');