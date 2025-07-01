const app = Vue.createApp({
    data() {
        return {
            isJoinRoom: true,      // Mostrar "Unirse a sala" al inicio
            isLogin: true,         // Luego puedes alternar login/registro

            roomCode: '',

            credentials: {
                Email: '',
                Password: '',
            },

            Authorization: {
                Success: false,
                User: null,
            },

            newUser: {
                id_User: 0,
                name: '',
                email: '',
                password: '',
                phone: '',
                fk_Sex: '',
                fk_Role: 2,
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

            axios.post(JoinRoom, { code: this.roomCode })
                .then(response => {
                    Swal.fire("Éxito", "Te has unido a la sala correctamente", "success");
                    // Aquí podrías redirigir si es necesario
                    // window.location.href = "/sala?id=" + response.data.roomId;
                })
                .catch(error => {
                    console.error(error);
                    Swal.fire("Error", "No se pudo unir a la sala", "error");
                });
        },

        login() {
            // (igual a tu versión actual)
        },

        register() {
            // (igual a tu versión actual)
        },

        goToIndex(idUser) {
            const root = window.index || null;
            if (root) window.location.href = `${root}?id=${idUser}`;
        }
    },
    mounted() { }
});

app.mount('#app');
