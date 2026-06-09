using Bl.Models.Doctor;

namespace Bl.Api;

public interface IDoctorsListBl
{
    Task<List<DoctorListItemDto>> GetAllDoctorsAsync();
}
