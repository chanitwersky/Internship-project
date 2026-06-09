using Dal.Api;
using Dal.Models;
using Microsoft.EntityFrameworkCore;

namespace Dal.Services;

public class CustomerProfileDal : ICustomerProfileDal
{
    private readonly Datamanager _context;

    public CustomerProfileDal(Datamanager context)
    {
        _context = context;
    }

    public async Task<Customer?> GetByIdAsync(string customerId)
    {
        return await _context.Customers
            .AsNoTracking()
            .FirstOrDefaultAsync(c => c.CustomerId == customerId);
    }

    public async Task<bool> UpdateSettingsAsync(string customerId, Customer updatedFields)
    {
        var customer = await _context.Customers.FindAsync(customerId);
        if (customer == null)
        {
            return false;
        }

        customer.FirstName = updatedFields.FirstName;
        customer.LastName = updatedFields.LastName;
        customer.Phone = updatedFields.Phone;
        customer.Adress = updatedFields.Adress;
        customer.Email = updatedFields.Email;
        customer.LastVisit = updatedFields.LastVisit;

        await _context.SaveChangesAsync();
        return true;
    }
}
