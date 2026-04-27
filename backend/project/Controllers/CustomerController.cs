using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dal.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace project.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomerController : ControllerBase
    {
        private readonly Datamanager _context;

        public CustomerController(Datamanager context)
        {
            _context = context;
        }

        [HttpGet("appointments/{customerId}")]
        public async Task<ActionResult<IEnumerable<object>>> GetCustomerAppointments(string customerId)
        {
            var appointments = await _context.Queues
                .AsNoTracking()
                .Where(q => q.CustomerId == customerId)
                .Select(q => new
                {
                    q.Id,
                    q.WorkerId,
                    q.CustomerId,
                    q.TreatmentDescription,
                    q.Date
                })
                .ToListAsync();

            if (!appointments.Any())
            {
                return NotFound(new { Message = "No upcoming appointments found for this customer." });
            }

            return Ok(appointments);
        }

        [HttpGet("history/{customerId}")]
        public async Task<ActionResult<IEnumerable<object>>> GetCustomerHistory(string customerId)
        {
            var history = await _context.QueueHistories
                .AsNoTracking()
                .Where(q => q.CustomerId == customerId)
                .Select(q => new
                {
                    q.Id,
                    q.WorkerId,
                    q.CustomerId,
                    q.TreatmentDescription,
                    q.Date
                })
                .ToListAsync();

            if (!history.Any())
            {
                return NotFound(new { Message = "No appointment history found for this customer." });
            }

            return Ok(history);
        }
    }
}
