using Bl.Api;
using Bl.Models.Doctor;
using Microsoft.AspNetCore.Mvc;

namespace project.Controllers;

[ApiController]
[Route("api/doctors")]
public class DoctorsController : ControllerBase
{
    private readonly IDoctorsListBl _doctorsList;
    private readonly IWorkerProfileBl _workerProfile;

    public DoctorsController(IDoctorsListBl doctorsList, IWorkerProfileBl workerProfile)
    {
        _doctorsList = doctorsList;
        _workerProfile = workerProfile;
    }

    [HttpGet("list")]
    public async Task<ActionResult<List<DoctorListItemDto>>> GetDoctors()
    {
        var doctors = await _doctorsList.GetAllDoctorsAsync();
        return Ok(doctors);
    }

    [HttpGet("{doctorId}/profile")]
    [HttpGet("/api/doctor/{doctorId}/profile")]
    public async Task<ActionResult<DoctorProfileDto>> GetProfile(string doctorId)
    {
        var profile = await _workerProfile.GetProfileAsync(doctorId);
        if (profile == null)
        {
            return NotFound(new { Message = "Doctor not found." });
        }

        return Ok(profile);
    }

    [HttpPut("{doctorId}/profile")]
    [HttpPut("/api/doctor/{doctorId}/profile")]
    public async Task<IActionResult> UpdateProfile(string doctorId, [FromBody] UpdateDoctorProfileDto profile)
    {
        if (profile == null || string.IsNullOrWhiteSpace(profile.Name) || string.IsNullOrWhiteSpace(profile.Specialty))
        {
            return BadRequest(new { Message = "Name and specialty are required." });
        }

        var updated = await _workerProfile.UpdateProfileAsync(doctorId, profile);
        if (!updated)
        {
            return NotFound(new { Message = "Doctor not found." });
        }

        return NoContent();
    }
}
