using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace server;

public partial class HCProjectDatabaseMydbMdfContext : DbContext
{
    public HCProjectDatabaseMydbMdfContext()
    {
    }

    public HCProjectDatabaseMydbMdfContext(DbContextOptions<HCProjectDatabaseMydbMdfContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
