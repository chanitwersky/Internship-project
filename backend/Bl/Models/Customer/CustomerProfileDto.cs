namespace Bl.Models.Customer;

public class CustomerProfileDto
{
    public string CustomerId { get; set; } = null!;
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public string Phone { get; set; } = null!;
    public string Adress { get; set; } = null!;
    public string Email { get; set; } = null!;
    public DateTime LastVisit { get; set; }
}
