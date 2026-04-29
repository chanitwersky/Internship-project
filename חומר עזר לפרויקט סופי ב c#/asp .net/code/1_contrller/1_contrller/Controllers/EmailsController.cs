using _1_contrller.Models;
using _1_contrller.Services;
using Microsoft.AspNetCore.Mvc;

namespace _1_contrller.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class EmailsController: ControllerBase
    {
        private EmailsService _emailsService;
        public EmailsController(EmailsService service)
        {
            _emailsService = service;
        }

        [HttpGet]
        public ActionResult<List<Email>> GetAll()
        {
            return _emailsService.GetAll();
        }

        [HttpGet("{id}")]
        public ActionResult<Email> GetOne(int id)
        {
            var email = _emailsService.GetById(id);
            if (email == null)
            {
                return NotFound();
            }
            return email;
        }

        [HttpPost]
        public ActionResult<string> CreateEmail([FromBody] Email email)
        {
            _emailsService.Add(email);
            return Created();
        }

        [HttpDelete("{id}")]
        public ActionResult<bool> DeleteEmail(int id)
        {
            var result = _emailsService.Remove(id);
            if (!result)
            {
                return NotFound();
            }
            return result;
        }

        //[HttpPut("{id}")]
        //public ActionResult<string> CreateEmail(int id, [FromQuery] string user, [FromBody] Email email)
        //{

        //    return $"User {user} updated email id {id}";
        //}
    }
}
