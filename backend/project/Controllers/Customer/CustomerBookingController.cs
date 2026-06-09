using Bl.Api;
using Bl.Models.Booking;
using Microsoft.AspNetCore.Mvc;

namespace project.Controllers.Customer;

[ApiController]
[Route("api/CustomerBooking")]
public class CustomerBookingController : ControllerBase
{
    private readonly ICustomerBookingBl _customerBooking;

    public CustomerBookingController(ICustomerBookingBl customerBooking)
    {
        _customerBooking = customerBooking;
    }

    [HttpGet("availability")]
    public async Task<ActionResult<AvailabilityResponseDto>> GetAvailability(
        [FromQuery] string? doctorId,
        [FromQuery] DateTime? date)
    {
        if (string.IsNullOrWhiteSpace(doctorId))
        {
            return BadRequest(new { Message = "doctorId is required. Select a doctor from the list." });
        }

        var availability = await _customerBooking.GetAvailabilityAsync(doctorId, date);
        if (availability == null)
        {
            return NotFound(new { Message = "Doctor not found." });
        }

        return Ok(availability);
    }
}
