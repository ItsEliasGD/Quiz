app = Vue.createApp({
            data() {
                return {
                    createMode: false,
                    editMode: false,
                    questions: [],
                    question: {
                        fk_Quiz: quizId,
                        Description: '',
                        Index: 0,
                    },  
                    indexList: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
                };
            },
            methods: {

                createQuestion() {
                    Swal.showLoading();

                    axios.post(Create, this.question)
                        .then(response => {
                            if (response.data.success) {
                                Swal.fire({
                                    title: 'Success',
                                    text: response.data.Message,
                                    icon: 'success',
                                    timer: 2000,
                                });
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
                    // Implement edit functionality
                    console.log('Edit question:', question);
                },

                deleteQuestion(question) {
                    // Implement delete functionality
                    console.log('Delete question:', question);
                },

                addAnswers(question) {
                    // Implement add answers functionality
                    console.log('Add answers to question:', question);
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

            }
        });
app.mount('#app');