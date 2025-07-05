using Microsoft.EntityFrameworkCore;
using Quiz.Data;
using Quiz.Models;

namespace Quiz.Services
{
    public class Room
    {
        private readonly QuizEntities _db = new();

        public Room() { }

        //Unirse a una sala
        public Response Join (string password)
        {
            Response response = new();

            var room = _db.Rooms
                .Where(r => r.Password == password && r.Active)
                .FirstOrDefault();

            if (room != null)
            {
                response.success = true;
                response.Message = "Se ha unido a la sala";
                response.Object = new
                {
                    room.Id_Room,
                    room.Name,
                    room.Password,
                    IdQuiz = _db.RoomQuizes
                        .Where(rq => rq.fk_Room == room.Id_Room)
                        .Select(rq => rq.fk_Quiz)
                        .FirstOrDefault()
                };

            } else response.Message = "La sala no fue encontrada";
            return response;
        }

        //Crear una sala
        public Response Create(Rooms room)
        {
            Response response = new();

            if (room != null)
            {
                var existingRoom = _db.Rooms
                    .Where(r => r.Name == room.Name && r.fk_User == room.fk_User)
                    .FirstOrDefault();

                if (existingRoom == null)
                {
                    room.Active = true;
                    _db.Rooms.Add(room);
                    _db.SaveChanges();

                    response.success = true;
                    response.Message = "Sala creada correctamente";

                } else response.Message = "Ya existe una sala con ese nombre para este usuario";
            } else response.Message = "Los datos de la sala son inválidos";

            return response;
        }

        //Actualizar una sala
        public Response Update(Rooms room)
        {
            Response response = new();
            if (room != null)
            {
                var roomEntity = _db.Rooms
                    .Where(r => r.Id_Room == room.Id_Room)
                    .FirstOrDefault();

                if(roomEntity != null)
                {
                    roomEntity.Name = room.Name;
                    roomEntity.Description = room.Description;
                    roomEntity.Active = room.Active;
                    roomEntity.Password = room.Password;
                    _db.SaveChanges();

                    response.success = true;
                    response.Message = "Sala actualizada correctamente";

                } else response.Message = "La sala no fue encontrada";
            }
            return response;
        }

        //Eliminar una sala
        public Response Delete(int Id)
        {
            Response response = new();

            var room = _db.Rooms
                .Where(r => r.Id_Room == Id)
                .FirstOrDefault();

            if (room != null)
            {
                var roomQuizes = _db.RoomQuizes
                    .Where(rq => rq.fk_Room == room.Id_Room)
                    .ToList();

                if (roomQuizes.Count < 0) _db.RoomQuizes.RemoveRange(roomQuizes);
                _db.Rooms.Remove(room);
                _db.SaveChanges();

                response.success = true;
                response.Message = "Sala eliminada correctamente";

            } else response.Message = "No se ha encontrado la sala";

            return response;
        }

        //Obtener todas las salas
        public object Get(int IdUser)
        {
            var rooms = _db.Rooms
                .Where(r => r.fk_User == IdUser)
                .Select(r => new
                {
                    r.Id_Room,
                    r.fk_User,
                    r.Name,
                    r.Description,
                    r.Password,
                    r.Active
                })
                .ToList();

            return rooms;
        }
    }
}