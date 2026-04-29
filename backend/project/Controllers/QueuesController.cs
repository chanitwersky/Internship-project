


using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Dal.Models;
using Bl.Api;
using Bl.Services;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QueuesController : ControllerBase
    {
        private IQueueService queueService;

        public QueuesController(IQueueService queueService)
        {
            this.queueService = queueService;
        }

        [HttpGet("{doctorId}")]
        [HttpGet("{doctorId}/{date}")]
        public ActionResult<List<Queue>> GetQueuesOfToday(string doctorId ,DateTime? date=null)
        {
            try
            {
                var queues = queueService.GetQueuesOfToday(doctorId, date);
                if (queues == null || !queues.Any())
                {
                    return Ok(new { message = "אין לך תורים להיום" });
                }
                if (queues == null)
                {
                    return NotFound();
                }
                return Ok(queues);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);

            }
        }
    }
}

