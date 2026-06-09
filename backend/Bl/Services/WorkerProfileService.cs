using Bl.Api;
using Bl.Models.Doctor;
using Dal.Api;

namespace Bl.Services;

public class WorkerProfileService : IWorkerProfileBl
{
    private readonly IWorkerProfileDal _workerProfileDal;

    public WorkerProfileService(IWorkerProfileDal workerProfileDal)
    {
        _workerProfileDal = workerProfileDal;
    }

    public async Task<DoctorProfileDto?> GetProfileAsync(string workerId)
    {
        var worker = await _workerProfileDal.GetByIdAsync(workerId);
        if (worker == null)
        {
            return null;
        }

        return new DoctorProfileDto
        {
            Id = worker.WorkerId,
            Name = ResolveName(worker),
            Specialty = worker.Specialty ?? string.Empty
        };
    }

    public async Task<bool> UpdateProfileAsync(string workerId, UpdateDoctorProfileDto profile)
    {
        if (string.IsNullOrWhiteSpace(profile.Name) || string.IsNullOrWhiteSpace(profile.Specialty))
        {
            return false;
        }

        return await _workerProfileDal.UpdateProfileAsync(workerId, profile.Name, profile.Specialty);
    }

    private static string ResolveName(Dal.Models.Worker worker)
    {
        if (!string.IsNullOrWhiteSpace(worker.Name))
        {
            return worker.Name.Trim();
        }

        return $"{worker.FirstName} {worker.LastName}".Trim();
    }
}
