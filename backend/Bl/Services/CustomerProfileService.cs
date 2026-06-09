using Bl.Api;
using Dal.Api;
using Dal.Models;
using Bl.Models.Customer;

namespace Bl.Services;

public class CustomerProfileService : ICustomerProfileBl
{
    private readonly ICustomerProfileDal _customerProfileDal;

    public CustomerProfileService(ICustomerProfileDal customerProfileDal)
    {
        _customerProfileDal = customerProfileDal;
    }

    public async Task<CustomerProfileDto?> GetProfileAsync(string customerId)
    {
        var customer = await _customerProfileDal.GetByIdAsync(customerId);
        if (customer == null)
        {
            return null;
        }

        return new CustomerProfileDto
        {
            CustomerId = customer.CustomerId,
            FirstName = customer.FirstName,
            LastName = customer.LastName,
            Phone = customer.Phone,
            Adress = customer.Adress,
            Email = customer.Email,
            LastVisit = customer.LastVisit
        };
    }

    public async Task<bool> UpdateSettingsAsync(string customerId, UpdateCustomerSettingsDto settings)
    {
        var existing = await _customerProfileDal.GetByIdAsync(customerId);
        if (existing == null)
        {
            return false;
        }

        var updated = new Customer
        {
            FirstName = settings.FirstName ?? existing.FirstName,
            LastName = settings.LastName ?? existing.LastName,
            Phone = settings.Phone ?? existing.Phone,
            Adress = settings.Adress ?? existing.Adress,
            Email = settings.Email ?? existing.Email,
            LastVisit = settings.LastVisit ?? existing.LastVisit
        };

        return await _customerProfileDal.UpdateSettingsAsync(customerId, updated);
    }
}
