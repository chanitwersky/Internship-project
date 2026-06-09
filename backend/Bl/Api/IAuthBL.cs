using Bl.Models;

namespace Bl.Api;

public interface IAuthBL
{
    Task<LoginResult?> Login(string id);
}
