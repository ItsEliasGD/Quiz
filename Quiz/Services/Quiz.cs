using Quiz.Data;
using Quiz.Models;

namespace Quiz.Services
{
    public class Quiz
    {
        private readonly QuizEntities _db = new();
        public Quiz() { }

        //Crear un Quiz
        public Response Create(Quizes quiz)
        {
            Response response = new();
            if (quiz != null) 
            {
                quiz.Active = true;
                _db.Quizes.Add(quiz);
                _db.SaveChanges();

                response.success = true;
                response.Message = "El Quiz ha sido creado correctamente.";
            }
            else response.Message = "No ha sido posible crear el Quiz";

            return response;
        }

        // Eliminar un Quiz
        public Response Delete(int Id)
        {
            Response response = new();

            var quiz = _db.Quizes
                .Where(q => q.Id_Quiz == Id)
                .FirstOrDefault();

            if (quiz != null)
            {
                var questions = _db.Questions
                    .Where(q => q.fk_Quiz == quiz.Id_Quiz)
                    .ToList();

                if (questions.Count > 0)
                {
                    var answers = _db.Answers
                        .Where(a => questions.Select(q => q.Id_Question).Contains(a.fk_Question))
                        .ToList();

                    if (answers.Count > 0) _db.Answers.RemoveRange(answers);
                    _db.Questions.RemoveRange(questions);
                }

                _db.Quizes.Remove(quiz);
                _db.SaveChanges();

                response.success = true;
                response.Message = "El Quiz ha sido eliminado correctamente.";
            }
            else response.Message = "El quiz no ha sido encontrado";
                
            return response;
        }

        // Actualizar un Quiz
        public Response Update(Quizes quiz)
        {
            Response response = new();

            if(quiz != null)
            {
                var quizEntity = _db.Quizes
                    .Where(q => q.Id_Quiz == quiz.Id_Quiz)
                    .FirstOrDefault();

                if (quizEntity != null)
                {
                    quizEntity.Name = quiz.Name; 
                    quizEntity.Description = quiz.Description; 
                    quizEntity.Active = quiz.Active; 
                    _db.SaveChanges();

                    response.success = true;
                    response.Message = "El Quiz ha sido actualizado correctamente.";

                } else response.Message = "El quiz no ha sido encontrado";
            }

            return response;
        }

        //Lógica de presentación
        public object? Get(int Id)
        {
            var quiz = _db.Quizes
                .Where(q => q.Id_Quiz == Id && q.Active)
                .Select(q => new
                {
                    q.Id_Quiz,
                    q.Name,
                    Questions = q.Questions.Select(qs => new
                    {
                        qs.Id_Question,
                        qs.Description,
                        qs.Index,
                        Answers = qs.Answers.Select(a => new
                        {
                            a.Id_Answer,
                            a.Description,
                            a.Index,
                            a.IsCorrect,
                        }).ToList()
                    }).ToList(),
                })
                .FirstOrDefault();

            return quiz;
        }
    }
}