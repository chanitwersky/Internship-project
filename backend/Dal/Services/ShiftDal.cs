using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal.Models;

using MyContext = Dal.Models.HCProjectDatabaseMyDbMdfContext;

namespace Dal.Services
{
    public class ShiftDal : IShiftDal
    {
        private readonly MyContext _context;
        public ShiftDal(MyContext context)
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
