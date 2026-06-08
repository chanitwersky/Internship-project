using Dal.Api;
using Dal.Models;
using Microsoft.EntityFrameworkCore;

namespace Dal.Services
{
    public class CustomerDal : ICustomerDal
    {
        private readonly Datamanager _context;

        public CustomerDal(Datamanager context)
        {
            _context = context;
        }

        public async Task<List<Queue>> GetAppointments(string customerId)
        {
            return await _context.Queues
                .AsNoTracking()
                .Where(q => q.CustomerId == customerId)
                .OrderBy(q => q.Date)
                .ToListAsync();
        }

        public async Task<List<QueueHistory>> GetHistory(string customerId)
        {
            return await _context.QueueHistories
                .AsNoTracking()
                .Where(q => q.CustomerId == customerId)
                .OrderByDescending(q => q.Date)
                .ToListAsync();
        }

        public async Task<Customer?> GetCustomerDetails(string customerId)
        {
            return await _context.Customers
                .AsNoTracking()
                .FirstOrDefaultAsync(c => c.CustomerId == customerId);
        }

        public async Task<Queue> CreateAppointment(string customerId, Queue appointment)
        {
            try
            {
                var nextId = await GetNextAppointmentId();

                appointment.Id = nextId;
                appointment.CustomerId = customerId;

                _context.Queues.Add(appointment);
                await _context.SaveChangesAsync();

                return appointment;
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException("Failed to create appointment.", ex);
            }
        }

        public async Task<bool> UpdateAppointment(string customerId, int appointmentId, Queue appointment)
        {
            var existingAppointment = await _context.Queues
                .FirstOrDefaultAsync(q => q.Id == appointmentId && q.CustomerId == customerId);

            if (existingAppointment == null)
            {
                return false;
            }

            existingAppointment.WorkerId = appointment.WorkerId;
            existingAppointment.TreatmentDescription = appointment.TreatmentDescription;
            existingAppointment.Date = appointment.Date;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateCustomerSettings(string customerId, Customer settings)
        {
            var customer = await _context.Customers.FindAsync(customerId);

            if (customer == null)
            {
                return false;
            }

            customer.FirstName = settings.FirstName;
            customer.LastName = settings.LastName;
            customer.Phone = settings.Phone;
            customer.Adress = settings.Adress;
            customer.Email = settings.Email;
            customer.LastVisit = settings.LastVisit;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> CompleteAppointment(string customerId, int appointmentId, string treatmentDescription)
        {
            // Atomic move: insert into history and delete from active queue in one transaction.
            await using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                var appointment = await _context.Queues
                    .FirstOrDefaultAsync(q => q.Id == appointmentId && q.CustomerId == customerId);

                if (appointment == null)
                {
                    return false;
                }

                var history = new QueueHistory
                {
                    Id = appointment.Id,
                    WorkerId = appointment.WorkerId,
                    CustomerId = appointment.CustomerId,
                    Date = appointment.Date,
                    TreatmentDescription = treatmentDescription
                };

                _context.QueueHistories.Add(history);
                _context.Queues.Remove(appointment);

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                return true;
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                throw new InvalidOperationException("Failed to complete appointment transaction.", ex);
            }
        }

        private async Task<int> GetNextAppointmentId()
        {
            var maxQueueId = await _context.Queues
                .Select(q => (int?)q.Id)
                .MaxAsync() ?? 0;

            var maxHistoryId = await _context.QueueHistories
                .Select(q => (int?)q.Id)
                .MaxAsync() ?? 0;

            return Math.Max(maxQueueId, maxHistoryId) + 1;
        }
    }
}
