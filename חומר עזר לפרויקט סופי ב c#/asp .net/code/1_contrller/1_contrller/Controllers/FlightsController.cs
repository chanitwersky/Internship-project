using Microsoft.AspNetCore.Mvc;

namespace _1_contrller.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class FlightsController: ControllerBase
    {
        [HttpGet]
        public ActionResult<List<string>> GetFlights()
        {
            return new List<string> { "flight1" };
        }

        [HttpGet("getById/{id=500}")]
        public ActionResult<string> GetFlight(int id)
        {
            if (id > 1000 || id < 1)
            {
                return BadRequest($"ID is invalid: {id}");
            }
            return $"Flight {id}";
        }

        [HttpGet("getByIdOptional/{id?}")]
        public ActionResult<string> GetFlight(int? id)
        {
            if (id > 1000 || id < 1)
            {
                return BadRequest($"ID is invalid: {id}");
            }
            return $"Flight {id}";
        }

        [HttpGet("[action]/{id:range(1,1000)}")]
        public ActionResult<string> GetFlightValidation(int id)
        {
            return $"Flight {id}";
        }

        [HttpGet("{id}/ticket")]
        public ActionResult DownloadTicket(int id)
        {
            var path = "P:\\תמונות jpg\\מלחמה\\מטוסים ומלחמה (70).jpg";
            return PhysicalFile(path, "image/jpeg");
        }

        [HttpGet("orderFlight")]
        public ActionResult OrderFlight()
        {
            return Redirect("https://learn.microsoft.com/en-us/answers/questions/1033258/download-file-in-c-net-core");
        }


    }
}
