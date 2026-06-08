using Bl.Api;
using Dal.Models;
using Dal.Services;

namespace Bl.Services
{
    public class CustomerService : ICustomerBl
    {
        private readonly CustomerDal _customerService;

        public CustomerService(CustomerDal customerService)
        {
            _customerService = customerService;
        }

        public async Task<List<Queue>> GetAppointments(string customerId)
        {
            return await _customerService.GetAppointments(customerId);
        }

        public async Task<List<QueueHistory>> GetHistory(string customerId)
        {
            return await _customerService.GetHistory(customerId);
        }

        public async Task<Customer?> GetCustomerDetails(string customerId)
        {
            return await _customerService.GetCustomerDetails(customerId);
        }

        public async Task<Queue> CreateAppointment(string customerId, Queue appointment)
        {
            try
            {
                return await _customerService.CreateAppointment(customerId, appointment);
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"Unable to create appointment for customer {customerId}.", ex);
            }
        }

        public async Task<bool> UpdateAppointment(string customerId, int appointmentId, Queue appointment)
        {
            try
            {
                return await _customerService.UpdateAppointment(customerId, appointmentId, appointment);
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"Unable to update appointment {appointmentId}.", ex);
            }
        }

        public async Task<bool> UpdateCustomerSettings(string customerId, Customer settings)
        {
            try
            {
                return await _customerService.UpdateCustomerSettings(customerId, settings);
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"Unable to update settings for customer {customerId}.", ex);
            }
        }

        public async Task<bool> CompleteAppointment(string customerId, int appointmentId, string treatmentDescription)
        {
            try
            {
                return await _customerService.CompleteAppointment(customerId, appointmentId, treatmentDescription);
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"Unable to complete appointment {appointmentId}.", ex);
            }
        }
    }
}
