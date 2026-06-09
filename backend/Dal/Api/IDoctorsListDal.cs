using Dal.Models;

namespace Dal.Api;

public interface IDoctorsListDal
{
    Task<List<Worker>> GetAllDoctorsAsync();
}
