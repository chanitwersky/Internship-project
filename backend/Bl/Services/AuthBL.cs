using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Services
{
    public class AuthBL : IAuthBL
    {
        private readonly AuthDal _authDal;
        private readonly JwtService _jwtService;

        public AuthBL(AuthDal authDal, JwtService jwtService)
        {
            _authDal = authDal;
            _jwtService = jwtService;
        }
        public async Task<LoginResult?> Login(string id, string password)
        {
            // חיפוש רופא
            var doctor = await _authDal.GetDById(id);

            if (doctor != null)
            {
                if (doctor.password == password)
                {
                    var token =
                        _jwtService.GenerateToken(
                            id,
                            "Doctor");

                    return new LoginResult
                    {
                        UserId = id,
                        UserType = "Doctor",
                        Token = token
                    };
                }
            }

            // חיפוש מטופל
            var patient = await _authDal.GetPById(id);

            if (patient != null)
            {
                if (patient.password == password)
                {
                    var token =
                        _jwtService.GenerateToken(
                            id,
                            "Patient");

                    return new LoginResult
                    {
                        UserId = id,
                        UserType = "Patient",
                        Token = token
                    };

                }
            }

            return null;
        }
    }


}
