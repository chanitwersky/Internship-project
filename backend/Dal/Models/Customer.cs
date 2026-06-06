using System;
using System.Collections.Generic;

namespace Dal.Models;

public partial class Customer
{
    public string CustomerId { get; set; } = null!;

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public string Adress { get; set; } = null!;

    public DateTime LastVisit { get; set; }

    public string Email { get; set; } = null!;

    public virtual ICollection<QueueHistory> QueueHistories { get; set; } = new List<QueueHistory>();

    public virtual ICollection<Queue> Queues { get; set; } = new List<Queue>();
}
