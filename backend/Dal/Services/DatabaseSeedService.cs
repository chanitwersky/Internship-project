using Dal.Models;
using Microsoft.EntityFrameworkCore;

namespace Dal.Services;

public static class DatabaseSeedService
{
    public static async Task SeedAsync(Datamanager context)
    {
        if (!await context.Customers.AnyAsync())
        {
            context.Customers.AddRange(
                new Customer
                {
                    CustomerId = "123456789",
                    FirstName = "ישראל",
                    LastName = "ישראלי",
                    Phone = "0501234567",
                    Adress = "רחוב הרצל 1, תל אביב",
                    Email = "israel@example.com",
                    LastVisit = DateTime.Today.AddMonths(-1)
                },
                new Customer
                {
                    CustomerId = "987654321",
                    FirstName = "שרה",
                    LastName = "כהן",
                    Phone = "0527654321",
                    Adress = "רחוב ויצמן 10, חיפה",
                    Email = "sara@example.com",
                    LastVisit = DateTime.Today.AddDays(-14)
                },
                new Customer
                {
                    CustomerId = "111222333",
                    FirstName = "דוד",
                    LastName = "לוי",
                    Phone = "0541112233",
                    Adress = "שדרות רוטשילד 5, תל אביב",
                    Email = "david@example.com",
                    LastVisit = DateTime.Today.AddDays(-3)
                }
            );
        }

        if (!await context.Workers.AnyAsync())
        {
            context.Workers.Add(CreateDefaultDoctor());
        }
        else
        {
            var doctor = await context.Workers.FirstOrDefaultAsync(w => w.WorkerId == "000000001");
            if (doctor != null)
            {
                if (string.IsNullOrWhiteSpace(doctor.Name))
                {
                    doctor.Name = "משה רופא";
                }

                if (string.IsNullOrWhiteSpace(doctor.Specialty))
                {
                    doctor.Specialty = "רפואת משפחה";
                }
            }
        }

        if (!await context.Shifts.AnyAsync())
        {
            var workDays = new[] { "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday" };
            var shiftId = 1;

            foreach (var day in workDays)
            {
                context.Shifts.Add(new Shift
                {
                    Id = shiftId++,
                    WorkerId = "000000001",
                    Day = day,
                    CheckInTime = new TimeOnly(8, 0),
                    EndTime = new TimeOnly(16, 0)
                });
            }
        }

        await context.SaveChangesAsync();
    }

    private static Worker CreateDefaultDoctor()
    {
        return new Worker
        {
            WorkerId = "000000001",
            Name = "משה רופא",
            FirstName = "משה",
            LastName = "רופא",
            Phone = "0530000001",
            Email = "doctor@example.com",
            LengthOfTreatment = "30",
            Specialty = "רפואת משפחה"
        };
    }
}
