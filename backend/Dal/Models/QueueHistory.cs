using System;
using System.Collections.Generic;

namespace Dal.Models;

public partial class QueueHistory
{
    public int Id { get; set; }

    public string WorkerId { get; set; } = null!;

    public string CustomerId { get; set; } = null!;

    public string TreatmentDescription { get; set; } = null!;

    public DateTime Date { get; set; }

    public virtual Customer Customer { get; set; } = null!;

    public virtual Worker Worker { get; set; } = null!;
}
