using Bl.Services;
using Dal.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace _1_contrller.Controllers
{
    [Authorize(Policy = "DoctorOnly")]
    [ApiController]
    [Route("api/[controller]")]
    public class DoctorController : ControllerBase
    {
        private readonly DoctorService _BlDoctorS;

        public DoctorController(DoctorService BlDoctorS)
        {
            _BlDoctorS = BlDoctorS;
        }

        [HttpGet("{doctorId}/patients")]
        public async Task<ActionResult<List<Customer>>> GetAllpait(string doctorId)
        {
            var result = await _BlDoctorS.GetAllpait(doctorId);
            return Ok(result ?? new List<Customer>());
        }

        [HttpGet("{doctorId}/shifts")]
        public async Task<ActionResult<List<Shift>>> GetShiftsByDoctorId(string doctorId)
        {
            var result = await _BlDoctorS.GetShiftsByDoctorId(doctorId);
            return Ok(result ?? new List<Shift>());
        }

        [HttpGet("{doctorId}/appointments/today")]
        public async Task<ActionResult<List<Queue>>> GetTodayAppointments(string doctorId)
        {
            var result = await _BlDoctorS.GetTodayAppointments(doctorId);
            return Ok(result ?? new List<Queue>());
        }

        [HttpPatch("update-description/{id}")]
        public async Task<IActionResult> PutDescription(int id, [FromBody] string description)
        {
            if (string.IsNullOrEmpty(description))
            {
                return BadRequest("Description cannot be empty");
            }

            try
            {
                await _BlDoctorS.UpdateAppointment(description, id);

                return Ok(new { message = "Treatment description updated successfully" });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch
            {
                return StatusCode(500, "Failed to update treatment description");
            }
        }

        [HttpGet("appointments/{appointmentId}")]
        public async Task<ActionResult<Queue>> GetOppointmentByAppointmentId(int appointmentId)
        {
            var result = await _BlDoctorS.GetAppointmentByAppointmentId(appointmentId);

            if (result == null)
            {
                return NotFound("Appointment not found");
            }

            return Ok(result);
        }

        [HttpPost("finish/{appointmentId}")]
        public async Task<IActionResult> FinishAppointment(int appointmentId)
        {
            try
            {
                await _BlDoctorS.FinishAppointment(appointmentId);

                return Ok(new { message = "Appointment finished successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
