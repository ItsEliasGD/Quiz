using Quiz.Data;
using Quiz.Models;

namespace Quiz.Services
{
    public class Answer
    {
        private readonly QuizEntities _db = new();
        public Answer() { }

        //Crear una respuestas
        public Response Create(List<Answers> answers)
        {
            Response response = new();

            if (answers != null)
            {
                _db.Answers.AddRange(answers);
                _db.SaveChanges();

                response.success = true;
                response.Message = "Respuestas creadas correctamente";

            } else response.Message = "No se recibieron respuestas válidas";

            return response;
        }

        //Actualizar una respuesta
        public Response Update(Answers answer) 
        {
            Response response = new();

            var answerEntity = _db.Answers
                .Where(a => a.Id_Answer == answer.Id_Answer)
                .FirstOrDefault();
            if (answerEntity != null)
            {
                answerEntity.Description = answer.Description;
                answerEntity.IsCorrect = answer.IsCorrect;
                answerEntity.Index = answer.Index;
                _db.SaveChanges();

                response.success = true;
                response.Message = "Respuesta actualizada correctamente";

            } else response.Message = "Respuesta no encontrada";

            return response;
        }

        //Actualizar una respuesta
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
                response.Message = "Respuesta eliminada correctamente";

            } else response.Message = "Respuesta no encontrada";

            return response;
        }

        //Obtener todas las respuestas
        public object Get(int IdQuestion) 
        { 
            var answers = _db.Answers
                .Where(a => a.fk_Question == IdQuestion)
                .ToList();

            return answers;
        }
    }
}