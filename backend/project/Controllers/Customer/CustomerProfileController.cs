using Bl.Api;
using Bl.Models.Customer;
using Microsoft.AspNetCore.Mvc;

namespace project.Controllers.Customer;

[ApiController]
[Route("api/customer")]
public class CustomerProfileController : ControllerBase
{
    private readonly ICustomerProfileBl _customerProfile;

    public CustomerProfileController(ICustomerProfileBl customerProfile)
    {
        _customerProfile = customerProfile;
    }

    [HttpGet("{customerId}")]
    public async Task<ActionResult<CustomerProfileDto>> GetCustomerDetails(string customerId)
    {
        var customer = await _customerProfile.GetProfileAsync(customerId);
        if (customer == null)
        {
            return NotFound(new { Message = "Customer not found." });
        }

        return Ok(customer);
    }

    [HttpPut("settings/{customerId}")]
    public async Task<IActionResult> PutCustomerSettings(
        string customerId,
        [FromBody] UpdateCustomerSettingsDto settingsDto)
    {
        if (settingsDto == null)
        {
            return BadRequest(new { Message = "Customer settings data is required." });
        }

        var updated = await _customerProfile.UpdateSettingsAsync(customerId, settingsDto);
        if (!updated)
        {
            return NotFound(new { Message = "Customer not found." });
        }

        return NoContent();
    }
}
