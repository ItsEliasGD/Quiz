const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            quizzes: [],
            editMode: false,
            createMode: false,
            table: false,
            selectedQuiz: null,
            quiz: {
                fk_User: userId,
                Name: '',
                Description: '',
            },
        };
    },
    methods: {
        getQuizzes() {
            console.log("Fetching quizzes for user:", userId);
            axios.get(Quizzes, {
                params: {
                    IdUser: userId,
                }

            })
                .then(response => {
                    console.log("Quizzes fetched successfully:", this.quizzes);

                    this.quizzes = response.data;
                    this.table = true;

                    this.$nextTick(() => {
                        this.generateTable();
                    });
                })
                .catch(error => {
                    console.error("Error fetching quizzes:", error);
                });
        },

        createQuiz() {
            Swal.showLoading();

            axios.post(Create, this.quiz)
                .then(response => {
                    if (response.data.success) {
                        Swal.fire({
                            title: 'Success',
                            text: response.data.Message,
                            icon: 'success',
                            timer: 2000,
                        })

                        this.quizzes.push(this.quiz);
                        this.quiz = {
                            fk_User: userId,
                            Name: '',
                            Description: '',
                        };
                        this.createMode = false;
                        console.log("Quiz created successfully");
                    }
                })
                .catch(error => {
                    console.error("Error creating quiz:", error);
                });
        },

        editToggle(quiz) {
            this.quiz = {
                Id_Quiz: quiz.Id_Quiz,
                fk_User: quiz.fk_User,
                Name: quiz.Name,
                Description: quiz.Description,
            };

            this.editMode = true;
        },

        editQuiz() {
            Swal.showLoading();

            axios.post(Update, this.quiz)
                .then(response => {
                    if (response.data.success) {
                        Swal.fire({
                            title: 'Success',
                            text: response.data.Message,
                            icon: 'success',
                            timer: 2000,
                        });
                        this.getQuizzes();
                        this.editMode = false;

                        console.log("Quiz edited successfully");
                    }
                })
                .catch(error => {
                    console.error("Error editing quiz:", error);
                });
        },

        deleteQuiz(quiz) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.showLoading();

                    axios.post(Delete, quiz)
                        .then(response => {
                            if (response.data.success) {
                                Swal.fire({
                                    title: 'Listo!',
                                    text: response.data.Message,
                                    icon: 'success',
                                    timer: 2000,
                                });
                                this.getQuizzes();
                                console.log("Quiz deleted successfully");
                            }
                        })
                        .catch(error => {
                            console.error("Error deleting quiz:", error);
                        });
                }
            });
        },

        toggleCreateMode() {
            this.createMode = !this.createMode;
            this.newQuiz = {
                fk_User: userId,
                Name: '',
                Description: '',
            };
        },

        viewQuestions(quiz) {
            window.location.href = `${ViewQuestions}/${quiz.Id_Quiz}`;
        },

        toggleEditMode(quiz) {
            this.editMode = !this.editMode;
            this.selectedQuiz = quiz;
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
        this.getQuizzes();
    }
});
app.mount('#app');