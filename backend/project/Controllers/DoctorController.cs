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

            if (result == null || result.Count == 0)
            {
                return NotFound("לא נמצאו מטופלים לרופא זה");
            }

            return Ok(result);
        }

        [HttpGet("{doctorId}/shifts")]
        public async Task<ActionResult<List<Shift>>> GetShiftsByDoctorId(string doctorId)
        {
            var result = await _BlDoctorS.GetShiftsByDoctorId(doctorId);

            if (result == null || result.Count == 0)
            {
                return NotFound("לא נמצאו משמרות לרופא זה");
            }

            return Ok(result);
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

                return Ok(new { message = "תיאור התור עודכן בהצלחה" });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch
            {
                return StatusCode(500, "אירעה שגיאה בעת עדכון התור");
            }
        }

        [HttpGet("appointments/{appointmentId}")]
        public async Task<ActionResult<Queue>> GetOppointmentByAppointmentId(int appointmentId)
        {
            var result = await _BlDoctorS.GetAppointmentByAppointmentId(appointmentId);

            if (result == null)
            {
                return NotFound("התור לא נמצא");
            }

            return Ok(result);
        }

        [HttpPost("finish/{appointmentId}")]
        public async Task<IActionResult> FinishAppointment(int appointmentId)
        {
            try
            {
                await _BlDoctorS.FinishAppointment(appointmentId);

                return Ok(new { message = "הטיפול הסתיים בהצלחה" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}