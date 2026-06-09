using Bl.Services;
using Microsoft.AspNetCore.Mvc;
using project.Dtos.Auth;

namespace project.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthBL _authBL;

    public AuthController(AuthBL authBL)
    {
        _authBL = authBL;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest? request)
    {
        var id = request?.Id?.Trim();
        if (string.IsNullOrWhiteSpace(id))
        {
            return BadRequest(new { Message = "ID is required. Send JSON: { \"id\": \"123456789\" }" });
        }

        var result = await _authBL.Login(id);

        if (result == null)
        {
            return Unauthorized();
        }

        return Ok(result);
    }
}
