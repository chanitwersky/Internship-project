using Dal.Models;

namespace Dal.Api;

public interface IWorkerProfileDal
{
    Task<Worker?> GetByIdAsync(string workerId);
    Task<bool> UpdateProfileAsync(string workerId, string name, string specialty);
}
