using Dal.Models;
using Dal.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Services
{
    public class DoctorService
    {
        private readonly DoctorDal _DoctorService;

        public DoctorService(DoctorDal doctorService)
        {
            _DoctorService = doctorService;
        }

        public async Task<List<Customer>> GetAllpait(string doctorId)
        {
            return await _DoctorService.GetAllpait(doctorId);
        }
    }
}
