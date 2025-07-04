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

        // DataTable
        this.$nextTick(() => {
            $('#resultTable').DataTable();
        });
    }
});

app.mount("#app");
