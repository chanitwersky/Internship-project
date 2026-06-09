using Bl.Api;
using Bl.Models;
using Dal.Services;

namespace Bl.Services;

public class AuthBL : IAuthBL
{
    private readonly AuthDal _authDal;
    private readonly JwtService _jwtService;

    public AuthBL(AuthDal authDal, JwtService jwtService)
    {
        _authDal = authDal;
        _jwtService = jwtService;
    }

    public async Task<LoginResult?> Login(string id)
    {
        var doctor = await _authDal.GetDById(id);
        if (doctor != null)
        {
            return new LoginResult
            {
                UserId = id,
                UserType = "Doctor",
                Token = _jwtService.GenerateToken(id, "Doctor")
            };
        }

        var patient = await _authDal.GetPById(id);
        if (patient != null)
        {
            return new LoginResult
            {
                UserId = id,
                UserType = "Patient",
                Token = _jwtService.GenerateToken(id, "Patient")
            };
        }

        return null;
    }
}
