using Quiz.Data;
using Quiz.Models;

namespace Quiz.Services
{
    public class Question
    {
        private readonly QuizEntities _db = new();
        public Question() { }

        //Crear las preguntas
        public Response Create(List<Questions> questions)
        {
            Response response = new();

            if (questions != null)
            {
                _db.Questions.AddRange(questions);
                _db.SaveChanges();

                response.success = true;
                response.Message = "Las preguntas han sido creadas correctamente";

            } else response.Message = "No se recibieron preguntas válidas";

            return response;
        }

        //Actualizar una pregunta
        public Response Update(Questions question)
        {
            Response response = new();

            var questionEntity = _db.Questions
                .Where(q => q.Id_Question == question.Id_Question)
                .FirstOrDefault();

            if (questionEntity != null)
            {
                questionEntity.Description = question.Description;
                questionEntity.Index = question.Index;
                _db.SaveChanges();

                response.success = true;
                response.Message = "Pregunta actualizada correctamente";

            } else response.Message = "Pregunta no encontrada";

            return response;
        }

        //Eliminar una pregunta
        public Response Delete(int Id)
        {
            Response response = new();

            var answer = _db.Answers
                .Where(a => a.Id_Answer == Id)
                .FirstOrDefault();

            if (answer != null)
            {
                _db.Answers.Remove(answer);
                _db.SaveChanges();

                response.success = true;
                response.Message = "Pregunta eliminada correctamente";

            } else response.Message = "Pregunta no encontrada";

            return response;
        }

        //Obtener todas las preguntas de un cuestionario
        public object Get(int IdQuiz)
        {
            var Questions = _db.Questions
                .Where(a => a.fk_Quiz == IdQuiz)
                .ToList();

            return Questions;
        }
    }
}