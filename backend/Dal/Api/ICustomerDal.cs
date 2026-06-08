using Dal.Models;

namespace Dal.Api
{
    public interface ICustomerDal
    {
        Task<List<Queue>> GetAppointments(string customerId);
        Task<List<QueueHistory>> GetHistory(string customerId);
        Task<Customer?> GetCustomerDetails(string customerId);
        Task<Queue> CreateAppointment(string customerId, Queue appointment);
        Task<bool> UpdateAppointment(string customerId, int appointmentId, Queue appointment);
        Task<bool> UpdateCustomerSettings(string customerId, Customer settings);
        Task<bool> CompleteAppointment(string customerId, int appointmentId, string treatmentDescription);
    }
}
