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

        public async Task UpdateAppointment(string treatmentDescription,string id)
        {
            try
            {
                var appointment = await _context.Queues.FindAsync(int.Parse(id));
                if (appointment == null)
                {
                    throw new KeyNotFoundException($"Appointment with ID {id} not found.");
                }
                appointment.TreatmentDescription = treatmentDescription;
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to update DB", ex);
            }

        }

        public async Task<Queue?> GetAppointmentByAppointmentId(string appointmentId)
        {
            var queue = await _context.Queues.FirstOrDefaultAsync(s => s.Id == int.Parse(appointmentId));
            return queue;
        }

        //public async Task<bool> DeleteOppointmentByAppointmentId(string appointmentId)
        //{
        //    var queue = await _context.Queues.FirstOrDefaultAsync(s => s.Id == appointmentId);
        //    if (queue == null)
        //        return false;

        //    _context.Queues.Remove(queue);

        //    await _context.SaveChangesAsync();
        //    return true;
        //}

        public async Task FinishAppointment(string appointmentId)
        {
            var id = int.Parse(appointmentId);
            var appointment = await _context.Queues
                .FirstOrDefaultAsync(x => x.Id == id);

            if (appointment == null)
                throw new Exception("Appointment not found");

            // 1. העברה להיסטוריה
            var history = new QueueHistory
            {
                Id = appointment.Id,
                WorkerId = appointment.WorkerId,
                CustomerId = appointment.CustomerId,
                Date = appointment.Date,
                TreatmentDescription = appointment.TreatmentDescription
            };

            _context.QueueHistories.Add(history);

            // 2. מחיקה מהטבלה הראשית
            _context.Queues.Remove(appointment);

            await _context.SaveChangesAsync();
        }
    }
}
