using System;
using System.Collections.Generic;

namespace Dal.Models;

public partial class Worker
{
    public string WorkerId { get; set; } = null!;

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string LengthOfTreatment { get; set; } = null!;

    public string Specialization { get; set; } = null!;

    public virtual ICollection<QueueHistory> QueueHistories { get; set; } = new List<QueueHistory>();

    public virtual ICollection<Queue> Queues { get; set; } = new List<Queue>();

    public virtual ICollection<Shift> Shifts { get; set; } = new List<Shift>();
}
