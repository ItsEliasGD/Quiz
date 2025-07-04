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

        createQuiz(e) {
            e.preventDefault();
            Swal.showLoading();

            axios.post(Create, this.quiz)
                .then(response => {
                    if (response.data.success) {
                        Swal.fire({
                            title: 'Éxito',
                            text: response.data.Message,
                            icon: 'success',
                            timer: 2000,
                        });

                        this.quizzes.push(this.quiz);
                        this.resetForm();
                        this.createMode = false;
                        console.log("Quiz creado exitosamente");
                    }
                })
                .catch(error => {
                    console.error("Error creando quiz:", error);
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

        editQuiz(e) {
            e.preventDefault();
            Swal.showLoading();

            axios.post(Update, this.quiz)
                .then(response => {
                    if (response.data.success) {
                        Swal.fire({
                            title: 'Éxito',
                            text: response.data.Message,
                            icon: 'success',
                            timer: 2000,
                        });
                        this.getQuizzes();
                        this.editMode = false;
                        this.resetForm();
                        console.log("Quiz editado exitosamente");
                    }
                })
                .catch(error => {
                    console.error("Error editando quiz:", error);
                });
        },

        deleteQuiz(quiz) {
            Swal.fire({
                title: '¿Estás seguro?',
                text: "¡No podrás revertir esto!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.showLoading();

                    axios.post(Delete, quiz)
                        .then(response => {
                            if (response.data.success) {
                                Swal.fire({
                                    title: 'Eliminado',
                                    text: response.data.Message,
                                    icon: 'success',
                                    timer: 2000,
                                });
                                this.getQuizzes();
                                console.log("Quiz eliminado exitosamente");
                            }
                        })
                        .catch(error => {
                            console.error("Error eliminando quiz:", error);
                        });
                }
            });
        },

        toggleCreateMode() {
            this.resetForm();
            this.createMode = true;
        },

        cancelForm() {
            this.resetForm();
            this.createMode = false;
            this.editMode = false;
        },

        resetForm() {
            this.quiz = {
                fk_User: userId,
                Name: '',
                Description: '',
            };
        },

        viewQuestions(quiz) {
            window.location.href = `${ViewQuestions}/${quiz.Id_Quiz}`;
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
