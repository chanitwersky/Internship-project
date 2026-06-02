using Bl.Services;
using Dal.Models;
using Microsoft.AspNetCore.Mvc;

namespace _1_contrller.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class DoctorController : ControllerBase
    {
        private DoctorService _BlDoctorS;
        public DoctorController(DoctorService BlDoctorS)
        {
            _BlDoctorS = BlDoctorS;
        }

        [HttpGet("{doctorId}")]
        public async Task<ActionResult<List<Customer>>> GetAllpait(string doctorId)
        {
            var result = await _BlDoctorS.GetAllpait(doctorId);

            if (result == null || result.Count == 0)
            {
                return NotFound("לא נמצאו פציינטים לרופא זה");
            }

            return Ok(result);
        }

        [HttpGet("{doctorId}")]
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
        public async Task<IActionResult> putDescription(string id, [FromBody] string description)
        {
            if (string.IsNullOrEmpty(description))
            {
                return BadRequest("Description cannot be empty");
            }

            try
            {
                await _BlDoctorS.UpdateAppointment(description, id);

                return Ok(new { message = "Appointment description updated successfully" });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception e)
            {
                return StatusCode(500, "An error occurred while updating the appointment");
            }

        }

        [HttpGet("appointments/{appointmentId}")]
        public async Task<ActionResult<Queue>> GetOppointmentByAppointmentId(string appointmentId)
        {
            var result = await _BlDoctorS.GetAppointmentByAppointmentId(appointmentId);
            if (result == null )
            {
                return NotFound("התור לא נמצא");
            }

            return Ok(result);
        }

        //[HttpDelete("appointments/{appointmentId}")]
        //public async Task<ActionResult<bool>> DeleteOppointmentByAppointmentId(string appointmentId)
        //{
        //    var result = await _BlDoctorS.DeleteOppointmentByAppointmentId(appointmentId);
        //    if (!result)
        //    {
        //        return NotFound("התור לא נמצא");
        //    }

        //    return Ok("התור נמחק בהצלחה");
        //}

        [HttpPost("finish/{appointmentId}")]
        public async Task<IActionResult> FinishAppointment(string appointmentId)
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