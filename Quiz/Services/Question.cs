using Quiz.Data;
using Quiz.Models;

namespace Quiz.Services
{
    public class Question
    {
        private readonly QuizEntities _db = new();
        public Question() { }

        //Crear las preguntas
        public Response Create(Questions question)
        {
            Response response = new();

            if (question != null)
            {
                _db.Questions.Add(question);
                _db.SaveChanges();

                response.success = true;
                response.Message = "La pregunta han sido creadas correctamente";

            } else response.Message = "No se recibió una pregunta válida";

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


            var question = _db.Questions
                .Where(q => q.Id_Question == Id)
                .FirstOrDefault();

            if (question != null)
            {
                var answers = _db.Answers
                    .Where(a => a.fk_Question == question.Id_Question)
                    .ToList();

                if (answers != null) _db.Answers.RemoveRange(answers);

                _db.Questions.Remove(question);
                _db.SaveChanges();

                response.success = true;
                response.Message = "Pregunta eliminada correctamente";
            }
            else response.Message = "La pregunta no fue encontrada";

            return response;
        }

        //Obtener todas las preguntas de un cuestionario
        public object Get(int IdQuiz)
        {
            var Questions = _db.Questions
                .Where(a => a.fk_Quiz == IdQuiz)
                .Select(q => new
                {
                    q.Id_Question,
                    q.Description,
                    q.Index,
                })
                .ToList();

            return Questions;
        }
    }
}