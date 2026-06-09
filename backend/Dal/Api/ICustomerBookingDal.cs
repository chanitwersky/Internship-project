namespace Dal.Api;

public interface ICustomerBookingDal
{
    Task<List<DateTime>> GetAvailableSlotsAsync(string doctorId, DateTime date);
    Task<bool> DoctorExistsAsync(string doctorId);
}
