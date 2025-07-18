﻿using Microsoft.EntityFrameworkCore;
using Quiz.Data;
using Quiz.Models;

namespace Quiz.Services
{
    public class Login
    {
        private readonly QuizEntities _db = new();
        public Login() { }

        //Inicia sesión con las credenciales del usuario
        public Response SignIn(Credentials credentials)
        {
            Response response = new();

            var user = _db.Users
                .Where(u => u.Email == credentials.email)
                .FirstOrDefault();

            if (user != null)
            {
                if(user.Password == credentials.password)
                {
                    user.Login = true;
                    _db.SaveChanges();

                    response.success = true;
                    response.Message = "Se ha iniciado sesión.";
                    response.Users = new Users
                    {
                        Id_User = user.Id_User,
                        Name = user.Name,
                        Email = user.Email,
                        Login = user.Login,
                    };
                }
                else response.Message = "La contraseña es incorrecta.";
            } else response.Message = "El email es incorrecto o el usuario no existe.";

            return response;
        }

        //Cierra sesión del usuario
        public Response SignOut(int id_user)
        {
            Response response = new();
            var user = _db.Users
                .Where(u => u.Id_User == id_user)
                .FirstOrDefault();

            if (user != null)
            {
                user.Login = false;
                _db.SaveChanges();

                response.success = true;
                response.Message = "Se ha cerrado sesión.";

            } else response.Message = "El usuario no existe.";

            return response;
        }

        //Registra un nuevo usuario
        public Response Register(Users newUser)
        {
            Response response = new();

            var existingUser = _db.Users
                .Where(u => u.Email == newUser.Email)
                .FirstOrDefault();
           
            if (existingUser == null)
            {
                _db.Users.Add(newUser);
                _db.SaveChanges();

                response.success = true;
                response.Message = "Se ha registrado el usuario correctamente.";

            } else response.Message = "El email ya está registrado.";

            return response;
        }
    }
}