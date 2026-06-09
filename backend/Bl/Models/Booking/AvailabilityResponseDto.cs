namespace Bl.Models.Booking;

public class AvailabilityResponseDto
{
    public string DoctorId { get; set; } = null!;
    public DateTime Date { get; set; }
    public List<DateTime> Slots { get; set; } = new();
}
