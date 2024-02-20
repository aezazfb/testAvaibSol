using System;
using System.Collections.Generic;

namespace testAvaib.Models;

public partial class StdMarks
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public int? Marks { get; set; }

    public bool? FeePaid { get; set; }

    public bool? Pass { get; set; }
}
