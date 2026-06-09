using Dal.Api;
using Dal.Models;
using Microsoft.EntityFrameworkCore;

namespace Dal.Services;

public class WorkerProfileDal : IWorkerProfileDal
{
    private readonly Datamanager _context;

    public WorkerProfileDal(Datamanager context)
    {
        _context = context;
    }

    public Task<Worker?> GetByIdAsync(string workerId)
    {
        return _context.Workers.FirstOrDefaultAsync(w => w.WorkerId == workerId);
    }

    public async Task<bool> UpdateProfileAsync(string workerId, string name, string specialty)
    {
        var worker = await _context.Workers.FirstOrDefaultAsync(w => w.WorkerId == workerId);
        if (worker == null)
        {
            return false;
        }

        worker.Name = name.Trim();
        worker.Specialty = specialty.Trim();

        var nameParts = name.Trim().Split(' ', 2, StringSplitOptions.RemoveEmptyEntries);
        worker.FirstName = nameParts.Length > 0 ? nameParts[0] : name.Trim();
        worker.LastName = nameParts.Length > 1 ? nameParts[1] : string.Empty;

        await _context.SaveChangesAsync();
        return true;
    }
}
