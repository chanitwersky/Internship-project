using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Api
{
    public interface IDoctorDal
    {
        Task<List<Customer>> GetAllpait(string doctorId);
        Task<List<Shift>> GetShiftsByDoctorId(string doctorId);
        Task UpdateAppointment(string treatmentDescription, string id);
        Task<Queue> GetAppointmentByAppointmentId(int appointmentId);
        //Task<bool> DeleteOppointmentByAppointmentId(string appointmentId);
        Task FinishAppointment(int appointmentId);

    }
}
