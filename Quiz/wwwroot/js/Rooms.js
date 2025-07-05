const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            rooms: [],
            quizzes: [],
            quiz: {
                Id_Quiz: 0,
                fk_User: 0,
                Name: '',
                Description: '',
            },
            roomQuiz: {},
            editMode: false,
            createMode: false,
            table: false,
            idQuiz: 0,
            room: {
                fk_User: userId,
                Name: '',
                Description: '',
                Password: '',
                Active: false,
            },
        };
    },
    methods: {
        getRooms() {
            console.log("Fetching rooms for user:", userId);
            axios.get(Rooms, {
                params: {
                    IdUser: userId,
                }
            })
                .then(response => {
                    this.rooms = response.data;
                    this.table = true;

                    console.log("salas: ", this.rooms);
                    this.$nextTick(() => {
                        this.generateTable();
                    });
                })
                .catch(error => {
                    console.error("Error fetching rooms:", error);
                });
        },

        getQuizzes() {
            console.log("Fetching quizzes for user:", userId);
            axios.get(Quizzes, {
                params: {
                    IdUser: userId,
                }
            })
                .then(response => {
                    this.quizzes = response.data;
                    console.log("quizzes: ", this.quizzes);
                })
                .catch(error => {
                    console.error("Error fetching quizzes:", error);
                });
        },

        getRoomQuiz(idRoom) {
            axios.get(RoomQuiz, {
                params: {
                    roomId: this.room.Id_Room,
                }
            })
                .then(response => {
                    if (response.data) this.quiz = this.quizzes.find(q => q.Id_Quiz === response.data.fk_Quiz);
                    this.roomQuiz = response.data;

                    console.log("RoomQuiz: ", this.roomQuiz);
                })
                .catch(error => {
                    console.error("Error fetching RoomQuiz:", error);
                });
        },

        createRoomQuiz() {
            axios.post(CreateRoomQuiz, {
                fk_Room: this.room.Id_Room,
                fk_Quiz: this.quiz.Id_Quiz,
            })
                .then(response => console.log(response.data.Message))
                .catch(error => {
                    console.error("Error creando RoomQuiz:", error);
                });
        },

        createRoom(e) {
            e.preventDefault();
            Swal.showLoading();

            axios.post(Create, this.room)
                .then(response => {
                    if (response.data.success) {
                        Swal.fire({
                            title: 'Éxito',
                            text: response.data.Message,
                            icon: 'success',
                            timer: 2000,
                        });

                        this.rooms.push(this.room);
                        this.resetForm();
                        this.createMode = false;
                        window.location.reload();
                        console.log("Room creado exitosamente");
                    }
                })
                .catch(error => {
                    console.error("Error creando room:", error);
                });
        },

        editToggle(room) {
            this.room = {
                Id_Room: room.Id_Room,
                fk_User: room.fk_User,
                Name: room.Name,
                Description: room.Description,
                Password: room.Password,
                Active: room.Active,
            };

            this.getRoomQuiz();

            this.$nextTick(() => {
                if (this.roomQuiz) {
                    this.quiz = this.quizzes.find(q => q.Id_Quiz === this.roomQuiz.fk_Quiz)
                }
            });
            this.editMode = true;
        },

        editRoom(e) {
            e.preventDefault();
            Swal.showLoading();

            this.createRoomQuiz();
            axios.post(Update, this.room)
                .then(response => {
                    if (response.data.success) {
                        Swal.fire({
                            title: 'Éxito',
                            text: response.data.Message,
                            icon: 'success',
                            timer: 2000,
                        });
                        this.getRooms();
                        this.editMode = false;
                        this.resetForm();
                        console.log("Room editado exitosamente");
                    }
                })
                .catch(error => {
                    console.error("Error editando room:", error);
                });
        },

        deleteRoom(room) {
            console.log("sala: ", room);

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

                    axios.post(Delete, room)
                        .then(response => {
                            if (response.data.success) {
                                Swal.fire({
                                    title: 'Eliminado',
                                    text: response.data.Message,
                                    icon: 'success',
                                    timer: 2000,
                                });
                                this.getRooms();
                                console.log("Room eliminado exitosamente");
                            }
                        })
                        .catch(error => {
                            console.error("Error eliminando room:", error);
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
            this.room = {
                fk_User: userId,
                Name: '',
                Description: '',
                Password: '',
                Active: false,
            };
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
        this.getRooms();
        this.getQuizzes();
    }
});

app.mount('#app');