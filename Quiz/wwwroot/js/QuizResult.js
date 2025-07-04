const app = Vue.createApp({
    data() {
        return {
            quiz: {
                Name: "Resultados del Quiz",
                User: "",
                Score: 0
            },
            totalScore: 15 * 5
        };
    },
    mounted() {
        const sessionData = JSON.parse(sessionStorage.getItem("quizResult"));

        if (sessionData) {
            this.quiz.User = sessionData.User || "Desconocido";
            this.quiz.Score = sessionData.Score || 0;
            this.quiz.Name = "Resultado del Quiz #" + sessionData.fk_Quiz;
        } else {
            this.quiz.Name = "Sin datos de resultado 😕";
        }

        // Esperar al renderizado antes de iniciar DataTable
        this.$nextTick(() => {
            $(this.$refs.table).DataTable({
                paging: false,
                searching: false,
                ordering: true,
                responsive: true,
                lengthChange: false,
                scrollCollapse: true,
                language: {
                    processing: "Procesando...",
                    search: "Buscar:",
                    lengthMenu: "Mostrar _MENU_ registros",
                    info: "Tabla de resultados",
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
        });
    }
});

app.mount("#app");
