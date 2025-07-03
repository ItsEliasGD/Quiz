using Microsoft.AspNetCore.Mvc;
using Quiz.Data;
using Quiz.Models;
using Quiz.Services;
using System.Diagnostics;
using QuizService = Quiz.Services.Quiz;

namespace Quiz.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly Login _LoginServices = new();
        private readonly Room _RoomServices = new();
        private readonly QuizService _QuizServices = new();
        private readonly Question _QuestionServices = new();
        private readonly Answer _AnswerServices = new();

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        //Vistas ---------------------------------------------------------------------------------------------------
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Quiz()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        public IActionResult Rooms(int id)
        {
            return View(id);
        }

        public IActionResult Quizzes(int id)
        {
            return View(id);
        }

        public IActionResult Questions(int id)
        {
            return View(id);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }


        //Servicios Login ------------------------------------------------------------------------------------------------
        [HttpPost]
        public ActionResult Login([FromBody] Credentials credentials)
        {
            Response response = new();
            if (!string.IsNullOrEmpty(credentials.email)) response = _LoginServices.SignIn(credentials);
            return Json(response);
        }

        [HttpPost]
        public ActionResult Logout([FromBody] int IdUser)
        {
            Response response = new();
            if (IdUser > 0) response = _LoginServices.SignOut(IdUser);
            return Json(response);
        }

        [HttpPost]
        public ActionResult Register([FromBody] Users newUser )
        {
            Response response = new();
            if (newUser != null) response = _LoginServices.Register(newUser);
            return Json(response);
        }

        //Servicios Rooms ------------------------------------------------------------------------------------------------
        [HttpGet]
        public ActionResult JoinRoom(string password)
        {
            Response response = new();
            if (!string.IsNullOrEmpty(password)) response = _RoomServices.Join(password);
            return Json(response);
        }

        [HttpPost]
        public ActionResult CreateRoom([FromBody] Rooms room)
        {
            Response response = new();
            if (room != null) response = _RoomServices.Create(room);
            return Json(response);
        }

        [HttpPost]
        public ActionResult UpdateRoom([FromBody] Rooms room)
        {
            Response response = new();
            if (room != null) response = _RoomServices.Update(room);
            return Json(response);
        }

        [HttpPost]
        public ActionResult DeleteRoom([FromBody] int IdRoom)
        {
            Response response = new();
            if (IdRoom > 0) response = _RoomServices.Delete(IdRoom);
            return Json(response);
        }

        [HttpGet]
        public ActionResult GetRooms(int IdRoom)
        {
            object? room = _RoomServices.Get(IdRoom);
            return Json(room);
        }

        //Servicios Quizzes ------------------------------------------------------------------------------------------------
        [HttpGet]
        public ActionResult GetQuiz(int IdQuiz)
        {
            object? quiz = _QuizServices.Get(IdQuiz);
            return Json(quiz);
        }

        [HttpGet]
        public ActionResult GetQuizzes(int IdUser)
        {
            object quizzes = _QuizServices.Quizzes(IdUser);
            return Json(quizzes);
        }

        [HttpPost]
        public ActionResult CreateQuiz([FromBody] Quizes quiz)
        {
            Response response = new();
            if (quiz != null) response = _QuizServices.Create(quiz);
            return Json(response);
        }

        [HttpPost]
        public ActionResult UpdateQuiz([FromBody] Quizes quiz)
        {
            Response response = new();
            if (quiz != null) response = _QuizServices.Update(quiz);
            return Json(response);
        }

        [HttpPost]
        public ActionResult DeleteQuiz([FromBody] int IdQuiz)
        {
            Response response = new();
            if (IdQuiz > 0) response = _QuizServices.Delete(IdQuiz);
            return Json(response);
        }

        [HttpPost]
        public ActionResult SaveQuiz([FromBody] Session session)
        {
            Response response = new();
            if (session != null) response = _QuizServices.Save(session);
            return Json(response);
        }

        [HttpGet]
        public ActionResult GetSessions(int IdQuiz)
        {
            object list = new();
            if (IdQuiz > 0) list = _QuizServices.Sessions(IdQuiz);
            return Json(list);
        }

        //Servicios Answer ------------------------------------------------------------------------------------------------
        [HttpPost]
        public ActionResult CreateAnswers([FromBody] List<Answers> answers)
        {
            Response response = new();
            if (answers != null) response = _AnswerServices.Create(answers);
            return Json(response);
        }

        [HttpPost]
        public ActionResult UpdateAnswer([FromBody] Answers answers)
        {
            Response response = new();
            if (answers != null) response = _AnswerServices.Update(answers);
            return Json(response);
        }

        [HttpPost]
        public ActionResult DeleteAnswers([FromBody] int IdAnswer)
        {
            Response response = new();
            if (IdAnswer > 0) response = _AnswerServices.Delete(IdAnswer);
            return Json(response);
        }

        [HttpGet]
        public ActionResult GetAnswers(int IdQuestion) 
        {   
            object? answers = null;
            if (IdQuestion > 0) answers = _AnswerServices.Get(IdQuestion);
            return Json(answers);
        }

        //Servicios Question ------------------------------------------------------------------------------------------------
        [HttpPost]
        public ActionResult CreateQuestion([FromBody] List<Questions> question)
        {
            Response response = new();
            if (question != null) response = _QuestionServices.Create(question);
            return Json(response);
        }

        [HttpPost]
        public ActionResult UpdateQuestion([FromBody] Questions question)
        {
            Response response = new();
            if (question != null) response = _QuestionServices.Update(question);
            return Json(response);
        }

        [HttpPost]
        public ActionResult DeleteQuestion([FromBody] int IdQuestion)
        {
            Response response = new();
            if (IdQuestion > 0) response = _QuestionServices.Delete(IdQuestion);
            return Json(response);
        }

        [HttpGet]
        public ActionResult GetQuestions(int IdQuiz)
        {
            object? questions = null;
            if (IdQuiz > 0) questions = _QuestionServices.Get(IdQuiz);
            return Json(questions);
        }
    }
}