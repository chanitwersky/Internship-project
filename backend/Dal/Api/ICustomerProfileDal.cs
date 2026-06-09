using Dal.Models;

namespace Dal.Api;

public interface ICustomerProfileDal
{
    Task<Customer?> GetByIdAsync(string customerId);
    Task<bool> UpdateSettingsAsync(string customerId, Customer updatedFields);
}
