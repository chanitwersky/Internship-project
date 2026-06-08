

using Bl.Services;
using Microsoft.AspNetCore.Mvc;

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
    public async Task<IActionResult> Login(string id, string password)
    {
        var result = await _authBL.Login(id, password);

        if (result == null)
            return Unauthorized();

        return Ok(result);
    }
}