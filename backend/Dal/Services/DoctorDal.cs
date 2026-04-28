using Dal.Models;
using Microsoft.EntityFrameworkCore;
using server;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Services
{
    public class DoctorDal
    {
        private readonly HCProjectDatabaseMydbMdfContext _context;

        public DoctorDal(HCProjectDatabaseMydbMdfContext context)
        {
            _context = context;
        }

        public async Task<List<Customer>> GetAllpait(string doctorId)
        {
            return await _context.QueueHistory
                .Where(q => q.WorkerId == doctorId) 
                .Select(q => q.Customer)           
                .Distinct()
                .ToListAsync();
        }
    }
}
