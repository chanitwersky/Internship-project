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
        Task<List<Queue>> GetTodayAppointments(string doctorId);
        Task UpdateAppointment(string treatmentDescription, int id);
        Task<Queue> GetAppointmentByAppointmentId(int appointmentId);
        //Task<bool> DeleteOppointmentByAppointmentId(string appointmentId)
        Task FinishAppointment(int appointmentId);

    }
}
