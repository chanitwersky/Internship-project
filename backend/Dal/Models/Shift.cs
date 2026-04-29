using System;
using System.Collections.Generic;

namespace Dal.Models;

public partial class Shift
{
    public int Id { get; set; }

    public string WorkerId { get; set; } = null!;

    public string Day { get; set; } = null!;

    public TimeOnly CheckInTime { get; set; }

    public TimeOnly EndTime { get; set; }

    public virtual Worker Worker { get; set; } = null!;
}
