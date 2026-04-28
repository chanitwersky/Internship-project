using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bl.Api;
using Dal.Api;
using Dal.Models;
using Dal.Services;

namespace Bl.Services
{
    public class ShiftBi : IShiftBi
    {
        private readonly IShiftDal _shiftDal;
        public ShiftBi(IShiftDal shiftDal)
        {
            _shiftDal = shiftDal;
        }
        public List<Shift> GetShiftsByDoctorId(string doctorId)
        {
            return _shiftDal.GetShiftsByDoctorId(doctorId);
        }
    }
}
