using Microsoft.EntityFrameworkCore;
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

            } else response.Message = "El quiz no ha sido encontrado";
                
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
                .Where(q => q.Id_Quiz == Id)
                .Select(q => new
                {
                    q.Id_Quiz,
                    q.Name,
                    Questions = _db.Questions
                        .Where(qs => qs.fk_Quiz == Id)
                        .Select(qs => new
                        {
                            qs.Id_Question,
                            qs.Description,
                            qs.Index,
                            Answers = _db.Answers
                                .Where(a => a.fk_Question == qs.Id_Question)
                                .Select(a => new
                                {
                                    a.Id_Answer,
                                    a.Description,
                                    a.IsCorrect,
                                    a.Index,
                                })
                                .ToList()
                        })
                        .ToList(),
                })
                .FirstOrDefault();

            return quiz;
        }

        public object Quizzes(int IdUser)
        {
            var quizzes = _db.Quizes
                .Where(q => q.fk_User == IdUser)
                .Select(q => new
                {
                    q.Id_Quiz,
                    q.Name,
                    q.Description,
                    q.Active,
                })
                .ToList();

            return quizzes;
        }

        public object Sessions(int IdQuiz)
        {
            var quiz = _db.Session
                .Where(q => q.fk_Quiz == IdQuiz)
                .Select(q => new
                {
                    q.Id_Session,
                    q.User,
                    q.Score,
                    q.Date,
                })
                .ToList();

            return quiz;
        }

        public object? roomQuizzes(int roomId)
        {
            var roomQuiz = _db.RoomQuizes
                .Include(rq => rq.fk_QuizNavigation)
                .Where(q => q.fk_Room == roomId)
                .Select(q => new
                {
                    q.Id_RoomQuize,
                    q.fk_Room,
                    q.fk_Quiz,
                    QuizName = q.fk_QuizNavigation.Name,
                })
                .FirstOrDefault();

            return roomQuiz;
        }

        public Response CreateroomQuiz(RoomQuizes roomQuiz)
        {
            Response response = new();

            if (roomQuiz != null)
            {
                var existingRoomQuiz = _db.RoomQuizes
                    .FirstOrDefault(rq => rq.fk_Room == roomQuiz.fk_Room);

                if (existingRoomQuiz != null) _db.RoomQuizes.Remove(existingRoomQuiz);

                _db.RoomQuizes.Add(roomQuiz);
                _db.SaveChanges();

                response.success = true;
                response.Message = "El Quiz ha sido añadido a la sala correctamente.";
            }
            else response.Message = "No ha sido posible añadir el Quiz a la sala.";

            return response;
        }

        public Response Save(Session session)
        {
            Response response = new();

            if (session != null)
            {
                session.Date = DateTime.Now;
                _db.Session.Add(session);
                _db.SaveChanges();

                response.success = true;
                response.Message = "La sesión ha sido guardada correctamente.";

            } else response.Message = "No ha sido posible guardar la sesión.";

            return response;
        }
    }
}