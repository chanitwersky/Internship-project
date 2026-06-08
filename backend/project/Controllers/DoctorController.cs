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
    public class DoctorController : ControllerBase
    {
        private readonly Datamanager _context;

        public DoctorController(Datamanager context)
        {
            _context = context;
        }

        [HttpGet("{doctorId}/appointments/today")]
        public async Task<ActionResult<IEnumerable<object>>> GetTodayAppointments(string doctorId)
        {
            var today = DateTime.Today;
            var tomorrow = today.AddDays(1);

            var appointments = await _context.Queues
                .AsNoTracking()
                .Where(q => q.WorkerId == doctorId && q.Date >= today && q.Date < tomorrow)
                .OrderBy(q => q.Date)
                .Select(q => new
                {
                    q.Id,
                    q.CustomerId,
                    q.WorkerId,
                    q.TreatmentDescription,
                    q.Date,
                })
                .ToListAsync();

            if (!appointments.Any())
            {
                return NotFound(new { Message = "No appointments found for doctor today." });
            }

            return Ok(appointments);
        }

        [HttpGet("{doctorId}/schedule/week")]
        public async Task<ActionResult<IEnumerable<object>>> GetWeeklySchedule(string doctorId)
        {
            var shifts = await _context.Shifts
                .AsNoTracking()
                .Where(s => s.WorkerId == doctorId)
                .OrderBy(s => s.Day)
                .Select(s => new
                {
                    s.Id,
                    s.Day,
                    CheckInTime = s.CheckInTime.ToString("HH:mm"),
                    EndTime = s.EndTime.ToString("HH:mm"),
                })
                .ToListAsync();

            if (!shifts.Any())
            {
                return NotFound(new { Message = "No schedule found for this doctor." });
            }

            return Ok(shifts);
        }

        [HttpGet("patients/{doctorId}")]
        public async Task<ActionResult<IEnumerable<object>>> GetDoctorPatients(string doctorId)
        {
            var patients = await _context.Queues
                .AsNoTracking()
                .Where(q => q.WorkerId == doctorId)
                .Include(q => q.Customer)
                .Select(q => new
                {
                    q.Customer.CustomerId,
                    q.Customer.FirstName,
                    q.Customer.LastName,
                    q.Customer.Phone,
                    q.Customer.Email,
                })
                .GroupBy(p => new { p.CustomerId, p.FirstName, p.LastName, p.Phone, p.Email })
                .Select(g => g.Key)
                .ToListAsync();

            if (!patients.Any())
            {
                return NotFound(new { Message = "No patients found for this doctor." });
            }

            return Ok(patients);
        }

        [HttpGet("appointment/{appointmentId}")]
        public async Task<ActionResult<object>> GetAppointmentById(int appointmentId)
        {
            var appointment = await _context.Queues
                .AsNoTracking()
                .Where(q => q.Id == appointmentId)
                .Select(q => new
                {
                    q.Id,
                    q.CustomerId,
                    q.WorkerId,
                    q.TreatmentDescription,
                    q.Date,
                })
                .FirstOrDefaultAsync();

            if (appointment == null)
            {
                return NotFound(new { Message = "Appointment not found." });
            }

            return Ok(appointment);
        }
    }
}
