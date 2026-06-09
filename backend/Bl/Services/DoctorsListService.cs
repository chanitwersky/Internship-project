using Bl.Api;
using Bl.Models.Doctor;
using Dal.Api;

namespace Bl.Services;

public class DoctorsListService : IDoctorsListBl
{
    private readonly IDoctorsListDal _doctorsListDal;

    public DoctorsListService(IDoctorsListDal doctorsListDal)
    {
        _doctorsListDal = doctorsListDal;
    }

    public async Task<List<DoctorListItemDto>> GetAllDoctorsAsync()
    {
        var workers = await _doctorsListDal.GetAllDoctorsAsync();

        return workers.Select(w => new DoctorListItemDto
        {
            Id = w.WorkerId,
            Name = ResolveName(w),
            Specialty = w.Specialty ?? string.Empty
        }).ToList();
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
