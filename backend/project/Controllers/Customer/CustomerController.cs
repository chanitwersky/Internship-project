using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dal.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace project.Controllers.Customer;

[ApiController]
[Route("api/customer")]
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

        return Ok(history);
    }

    [HttpPut("appointments/{customerId}/{appointmentId}")]
    public async Task<IActionResult> PutAppointment(
        string customerId,
        int appointmentId,
        [FromBody] UpdateAppointmentDto appointmentDto)
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

    public class UpdateAppointmentDto
    {
        public string WorkerId { get; set; } = null!;
        public string TreatmentDescription { get; set; } = null!;
        public DateTime Date { get; set; }
    }
}
