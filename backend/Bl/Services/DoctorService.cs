using Bl.Api;
using Dal.Models;
using Dal.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Services
{
    public class DoctorService: IDoctorBl
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

        public async Task<List<Shift>> GetShiftsByDoctorId(string doctorId)
        {
            return await _DoctorService.GetShiftsByDoctorId(doctorId);
        }

        public async Task UpdateAppointment(string treatmentDescription, string id)
        {
            await _DoctorService.UpdateAppointment(treatmentDescription,id);
        }

        public async Task<Queue> GetAppointmentByAppointmentId(int appointmentId)
        {
            return await _DoctorService.GetAppointmentByAppointmentId(appointmentId);
        }

        //public async Task<bool> DeleteOppointmentByAppointmentId(string appointmentId)
        //{
        //    return await _DoctorService.DeleteOppointmentByAppointmentId(appointmentId);
        //}
        public async Task FinishAppointment(int appointmentId)
        {
            await _DoctorService.FinishAppointment(appointmentId);
        }
    }
}
