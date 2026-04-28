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
    }

    }
}