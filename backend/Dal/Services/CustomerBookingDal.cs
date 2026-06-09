using Dal.Api;
using Dal.Models;
using Microsoft.EntityFrameworkCore;

namespace Dal.Services;

public class CustomerBookingDal : ICustomerBookingDal
{
    private readonly Datamanager _context;

    public CustomerBookingDal(Datamanager context)
    {
        _context = context;
    }

    public Task<bool> DoctorExistsAsync(string doctorId)
    {
        return _context.Workers.AnyAsync(w => w.WorkerId == doctorId);
    }

    public async Task<List<DateTime>> GetAvailableSlotsAsync(string doctorId, DateTime date)
    {
        var worker = await _context.Workers.FirstOrDefaultAsync(w => w.WorkerId == doctorId);
        if (worker == null)
        {
            return new List<DateTime>();
        }

        var slotMinutes = int.TryParse(worker.LengthOfTreatment, out var parsed) && parsed > 0
            ? parsed
            : 30;

        var dayName = date.DayOfWeek.ToString();
        var shifts = await _context.Shifts
            .Where(s => s.WorkerId == doctorId && s.Day == dayName)
            .ToListAsync();

        if (shifts.Count == 0)
        {
            return new List<DateTime>();
        }

        var dayStart = date.Date;
        var booked = await _context.Queues
            .Where(q => q.WorkerId == doctorId && q.Date.Date == dayStart)
            .Select(q => q.Date)
            .ToListAsync();

        var slots = new List<DateTime>();

        foreach (var shift in shifts)
        {
            var current = dayStart.Add(shift.CheckInTime.ToTimeSpan());
            var shiftEnd = dayStart.Add(shift.EndTime.ToTimeSpan());

            while (current.AddMinutes(slotMinutes) <= shiftEnd)
            {
                var slotEnd = current.AddMinutes(slotMinutes);
                var conflicts = booked.Any(bookedStart =>
                    current < bookedStart.AddMinutes(slotMinutes) && slotEnd > bookedStart);

                if (!conflicts)
                {
                    slots.Add(current);
                }

                current = current.AddMinutes(slotMinutes);
            }
        }

        return slots.OrderBy(s => s).ToList();
    }
}
