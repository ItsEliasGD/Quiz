using Quiz.Data;
using Quiz.Models;

namespace Quiz.Services
{
    public class Rooms
    {
        private readonly QuizEntities _db = new();

        public Rooms() { }

        public Response Join (string password)
        {
            Response response = new();

            var room = _db.Rooms.Where(r => r.Password == password);

            if (room != null)
            {
                response.success = true;
                response.Message = "Se ha unido a la sala";
            }
            else
            {
                response.success = false;
                response.Message = "La sala no fue encontrada";
            }

            return response;
        }

        //Create a room
        //Update room
        //Delete room
    }
}
