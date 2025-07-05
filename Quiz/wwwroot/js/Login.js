const app = Vue.createApp({
    data() {
        return {
            isJoinRoom: true,      // Mostrar "Unirse a sala" al inicio
            isLogin: true,         // Luego puedes alternar login/registro
            roomCode: '',
            room: {},

            credentials: {
                Email: '',
                Password: '',
            },

            newUser: {
                Name: '',
                Email: '',
                Password: '',
            },

            confirmPassword: '',
        };
    },
    methods: {
        showLoginRegister() {
            this.isJoinRoom = false;
            this.isLogin = true;
        },

        joinRoom() {
            if (!this.roomCode.trim()) {
                Swal.fire("Código vacío", "Por favor escribe un código de sala válido", "warning");
                return;
            }

            Swal.fire({
                title: "Uniéndote a la sala...",
                text: `Código: ${this.roomCode}`,
                allowOutsideClick: false,
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            axios.get(JoinRoom, {
                params: {
                    Password: this.roomCode,
                }
            })
                .then(response => {
                    Swal.fire("Éxito", "Te has unido a la sala correctamente", "success");
                    console.log("Unirse a una sala",response.data);
                    // Aquí podrías redirigir si es necesario
                    window.location.href = `${ViewQuiz}/${response.data.Object.IdQuiz}`
                })
                .catch(error => {
                    console.error(error);
                    Swal.fire("Error", "No se pudo unir a la sala", "error");
                });
        },

        login() {
            Swal.fire({
                title: "Iniciando sesión...",
                allowOutsideClick: false,
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            axios.post(Login, this.credentials)
                .then(response => {
                    if (response.data && response.data.Users) {
                        Swal.fire("Éxito", "Has iniciado sesión correctamente", "success");
                        window.location.href = `${ViewQuizzes}/${response.data.Users.Id_User}`;
                    } else {
                        Swal.fire("Error", "Credenciales incorrectas", "error");
                    }
                })
                .catch(error => {
                    console.error(error);
                    Swal.fire("Error", "No se pudo iniciar sesión", "error");
                }); 

        },

        register() {
            Swal.fire({
                title: "Registrando usuario...",
                allowOutsideClick: false,
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            axios.post(Register, this.newUser)
                .then(response => {
                    if (response.data && response.data.success) {
                        Swal.fire("Éxito", "Has iniciado sesión correctamente", "success");
                        window.location.reload();
                    } else {
                        Swal.fire("Error", "Credenciales incorrectas", "error");
                    }
                })
                .catch(error => {
                    console.error(error);
                    Swal.fire("Error", "No se pudo iniciar sesión", "error");
                }); 
        },
    },
    mounted() { }
});

app.mount('#app');
