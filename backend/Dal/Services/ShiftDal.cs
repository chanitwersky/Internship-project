using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal.Api;
using Dal.Models;



namespace Dal.Services
{
    public class ShiftDal : IShiftDal
    {
        private readonly Datamanager _context;
        public ShiftDal(Datamanager context)
        {
            _context = context;
        }
        public List<Shift> GetShiftsByDoctorId(string doctorId)
        {
            List<Shift> shifts = _context.Shifts.Where(s => s.WorkerId == doctorId).ToList();
            return shifts;
        }
    }
}
