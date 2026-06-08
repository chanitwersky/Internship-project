using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Api
{
    public interface IDoctorBl
    {
        Task<List<Customer>> GetAllpait(string doctorId);
        Task<List<Shift>> GetShiftsByDoctorId(string doctorId);
        Task UpdateAppointment(string treatmentDescription, string id);
        Task<Queue?> GetAppointmentByAppointmentId(string appointmentId);
        //Task<bool> DeleteOppointmentByAppointmentId(string appointmentId)
        Task FinishAppointment(string appointmentId);

    }
}
