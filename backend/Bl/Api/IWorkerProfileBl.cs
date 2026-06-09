using Bl.Models.Doctor;

namespace Bl.Api;

public interface IWorkerProfileBl
{
    Task<DoctorProfileDto?> GetProfileAsync(string workerId);
    Task<bool> UpdateProfileAsync(string workerId, UpdateDoctorProfileDto profile);
}
