using Bl.Models.Customer;

namespace Bl.Api;

public interface ICustomerProfileBl
{
    Task<CustomerProfileDto?> GetProfileAsync(string customerId);
    Task<bool> UpdateSettingsAsync(string customerId, UpdateCustomerSettingsDto settings);
}
