using Bl.Models.Booking;

namespace Bl.Api;

public interface ICustomerBookingBl
{
    Task<AvailabilityResponseDto?> GetAvailabilityAsync(string? doctorId, DateTime? date);
}
