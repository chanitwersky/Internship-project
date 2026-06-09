using Bl.Api;
using Bl.Models.Booking;
using Dal.Api;

namespace Bl.Services;

public class CustomerBookingService : ICustomerBookingBl
{
    private readonly ICustomerBookingDal _customerBookingDal;

    public CustomerBookingService(ICustomerBookingDal customerBookingDal)
    {
        _customerBookingDal = customerBookingDal;
    }

    public async Task<AvailabilityResponseDto?> GetAvailabilityAsync(string? doctorId, DateTime? date)
    {
        if (string.IsNullOrWhiteSpace(doctorId))
        {
            return null;
        }

        var normalizedDoctorId = doctorId.Trim();
        var exists = await _customerBookingDal.DoctorExistsAsync(normalizedDoctorId);
        if (!exists)
        {
            return null;
        }

        var targetDate = (date ?? DateTime.Today).Date;
        var slots = await _customerBookingDal.GetAvailableSlotsAsync(normalizedDoctorId, targetDate);

        return new AvailabilityResponseDto
        {
            DoctorId = normalizedDoctorId,
            Date = targetDate,
            Slots = slots
        };
    }
}
