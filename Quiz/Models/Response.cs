using Quiz.Data;

namespace Quiz.Models
{
    public class Response
    {
        public bool success { get; set; } = false;
        public string Message { get; set; } = "";
        public Users? Users { get; set; }
    }
}
