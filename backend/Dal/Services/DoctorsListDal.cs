using Dal.Api;
using Dal.Models;
using Microsoft.EntityFrameworkCore;

namespace Dal.Services;

public class DoctorsListDal : IDoctorsListDal
{
    private readonly Datamanager _context;

    public DoctorsListDal(Datamanager context)
    {
        _context = context;
    }

    public Task<List<Worker>> GetAllDoctorsAsync()
    {
        return _context.Workers
            .OrderBy(w => w.Name)
            .ThenBy(w => w.LastName)
            .ToListAsync();
    }
}
