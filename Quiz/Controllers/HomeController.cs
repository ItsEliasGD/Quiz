using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Quiz.Models;
using Quiz.Services;
using System.Text.Json;
using Rooms = Quiz.Services.Rooms;
using Quiz.Data;

namespace Quiz.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly Login _LoginServices = new();
        private readonly Rooms _RoomServices = new();

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        public Response Login([FromBody] Credentials credentials)
        {
            Response response = new();
            if (!string.IsNullOrEmpty(credentials.email))
            {
                response = _LoginServices.SignIn(credentials);
            }
            return response;
        }

        public Response Logout([FromBody] int IdUser)
        {
            Response response = new();
            if (IdUser > 0)
            {
                response = _LoginServices.SignOut(IdUser);
            }
            return response;
        }

        public Response Register([FromBody] Users newUser )
        {
            Response response = new();
            if (newUser != null)
            {
                response = _LoginServices.Register(newUser);
            }
            return response;
        }

        public Response JoinRoom([FromBody] string password)
        {
            Response response = new();
            if (!string.IsNullOrEmpty(password))
            {
                response = _RoomServices.Join(password);
            }
            return response;
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
