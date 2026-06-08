using System;
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
        [HttpGet("getbyid/appointments/{customerId}")]
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
        [HttpGet("getbyid/history/{customerId}")]
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

        [HttpGet("{customerId}")]
        public async Task<ActionResult<object>> GetCustomerDetails(string customerId)
        {
            var customer = await _context.Customers
                .AsNoTracking()
                .Where(c => c.CustomerId == customerId)
                .Select(c => new
                {
                    c.CustomerId,
                    c.FirstName,
                    c.LastName,
                    c.Phone,
                    c.Adress,
                    c.Email,
                    c.LastVisit
                })
                .FirstOrDefaultAsync();

            if (customer == null)
            {
                return NotFound(new { Message = "Customer not found." });
            }

            return Ok(customer);
        }

        [HttpPut("appointments/{customerId}/{appointmentId}")]
        public async Task<IActionResult> PutAppointment(string customerId, int appointmentId, [FromBody] UpdateAppointmentDto appointmentDto)
        {
            if (appointmentDto == null)
            {
                return BadRequest(new { Message = "Appointment data is required." });
            }

            var appointment = await _context.Queues.FindAsync(appointmentId);
            if (appointment == null)
            {
                appointment = new Queue
                {
                    Id = appointmentId,
                    CustomerId = customerId,
                    WorkerId = appointmentDto.WorkerId,
                    TreatmentDescription = appointmentDto.TreatmentDescription,
                    Date = appointmentDto.Date
                };

                _context.Queues.Add(appointment);
            }
            else
            {
                if (!string.Equals(appointment.CustomerId, customerId, StringComparison.OrdinalIgnoreCase))
                {
                    return BadRequest(new { Message = "Appointment does not belong to the specified customer." });
                }

                appointment.WorkerId = appointmentDto.WorkerId;
                appointment.TreatmentDescription = appointmentDto.TreatmentDescription;
                appointment.Date = appointmentDto.Date;
                _context.Queues.Update(appointment);
            }

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("settings/{customerId}")]
        public async Task<IActionResult> PutCustomerSettings(string customerId, [FromBody] UpdateCustomerSettingsDto settingsDto)
        {
            if (settingsDto == null)
            {
                return BadRequest(new { Message = "Customer settings data is required." });
            }

            var customer = await _context.Customers.FindAsync(customerId);
            if (customer == null)
            {
                return NotFound(new { Message = "Customer not found." });
            }

            customer.FirstName = settingsDto.FirstName ?? customer.FirstName;
            customer.LastName = settingsDto.LastName ?? customer.LastName;
            customer.Phone = settingsDto.Phone ?? customer.Phone;
            customer.Adress = settingsDto.Adress ?? customer.Adress;
            customer.Email = settingsDto.Email ?? customer.Email;
            customer.LastVisit = settingsDto.LastVisit ?? customer.LastVisit;

            _context.Customers.Update(customer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        public class UpdateAppointmentDto
        {
            public string WorkerId { get; set; } = null!;
            public string TreatmentDescription { get; set; } = null!;
            public DateTime Date { get; set; }
        }

        public class UpdateCustomerSettingsDto
        {
            public string? FirstName { get; set; }
            public string? LastName { get; set; }
            public string? Phone { get; set; }
            public string? Adress { get; set; }
            public string? Email { get; set; }
            public DateTime? LastVisit { get; set; }
        }
    }
}
