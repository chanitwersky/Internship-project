using Dal.Api;
using Dal.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Services
{
    public class DoctorDal: IDoctorDal
    {
        private readonly Datamanager _context;

        public DoctorDal(Datamanager context)
        {
            _context = context;
        }

        public async Task<List<Customer>> GetAllpait(string doctorId)
        {
            return await _context.QueueHistories
                .Where(q => q.WorkerId == doctorId) 
                .Select(q => q.Customer)           
                .Distinct()
                .ToListAsync();
        }

        public async Task<List<Shift>> GetShiftsByDoctorId(string doctorId)
        {
            List<Shift> shifts = await _context.Shifts.Where(s => s.WorkerId == doctorId).ToListAsync();
            return shifts;
        }

        public async void putQueue(string TreatmentDescription,string id)
        {

        }


    }
}
