using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Dal.Models;

public partial class Datamanager : DbContext
{
    public Datamanager()
    {
    }

    public Datamanager(DbContextOptions<Datamanager> options)
        : base(options)
    {
    }

    public virtual DbSet<Customer> Customers { get; set; }

    public virtual DbSet<Queue> Queues { get; set; }

    public virtual DbSet<QueueHistory> QueueHistories { get; set; }

    public virtual DbSet<Shift> Shifts { get; set; }

    public virtual DbSet<Worker> Workers { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename='H:\\c# project\\database\\MyDb.mdf';Integrated Security=True;Connect Timeout=30");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Customer>(entity =>
        {
            entity.HasKey(e => e.CustomerId).HasName("PK__tmp_ms_x__B611CB7D72F27420");

            entity.ToTable("customers");

            entity.Property(e => e.CustomerId)
                .HasMaxLength(9)
                .HasColumnName("customerId");
            entity.Property(e => e.Adress)
                .HasMaxLength(50)
                .HasColumnName("adress");
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .HasColumnName("email");
            entity.Property(e => e.FirstName)
                .HasMaxLength(50)
                .HasColumnName("firstName");
            entity.Property(e => e.LastName)
                .HasMaxLength(50)
                .HasColumnName("lastName");
            entity.Property(e => e.LastVisit)
                .HasColumnType("datetime")
                .HasColumnName("lastVisit");
            entity.Property(e => e.Phone)
                .HasMaxLength(10)
                .HasColumnName("phone");
        });

        modelBuilder.Entity<Queue>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Queues__3214EC07380D2570");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CustomerId)
                .HasMaxLength(9)
                .HasColumnName("customerId");
            entity.Property(e => e.Date)
                .HasColumnType("datetime")
                .HasColumnName("date");
            entity.Property(e => e.WorkerId)
                .HasMaxLength(9)
                .HasColumnName("workerId");

            entity.HasOne(d => d.Customer).WithMany(p => p.Queues)
                .HasForeignKey(d => d.CustomerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Queues_ToTable_1");

            entity.HasOne(d => d.Worker).WithMany(p => p.Queues)
                .HasForeignKey(d => d.WorkerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Queues_ToTable");
        });

        modelBuilder.Entity<QueueHistory>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__QueueHis__3214EC07DF823B06");

            entity.ToTable("QueueHistory");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CustomerId)
                .HasMaxLength(9)
                .HasColumnName("customerId");
            entity.Property(e => e.Date)
                .HasColumnType("datetime")
                .HasColumnName("date");
            entity.Property(e => e.WorkerId)
                .HasMaxLength(9)
                .HasColumnName("workerId");

            entity.HasOne(d => d.Customer).WithMany(p => p.QueueHistories)
                .HasForeignKey(d => d.CustomerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_QueueHistory_ToTable_1");

            entity.HasOne(d => d.Worker).WithMany(p => p.QueueHistories)
                .HasForeignKey(d => d.WorkerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_QueueHistory_ToTable");
        });

        modelBuilder.Entity<Shift>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Shifts__3214EC077AB664F7");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CheckInTime).HasColumnName("checkInTime");
            entity.Property(e => e.Day)
                .HasMaxLength(50)
                .HasColumnName("day");
            entity.Property(e => e.EndTime).HasColumnName("endTime");
            entity.Property(e => e.WorkerId)
                .HasMaxLength(9)
                .HasColumnName("workerId");

            entity.HasOne(d => d.Worker).WithMany(p => p.Shifts)
                .HasForeignKey(d => d.WorkerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Shifts_ToTable");
        });

        modelBuilder.Entity<Worker>(entity =>
        {
            entity.HasKey(e => e.WorkerId).HasName("PK__tmp_ms_x__3CF2059181A08196");

            entity.Property(e => e.WorkerId)
                .HasMaxLength(9)
                .HasColumnName("workerId");
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .HasColumnName("email");
            entity.Property(e => e.FirstName)
                .HasMaxLength(50)
                .HasColumnName("firstName");
            entity.Property(e => e.LastName)
                .HasMaxLength(50)
                .HasColumnName("lastName");
            entity.Property(e => e.LengthOfTreatment)
                .HasMaxLength(50)
                .HasColumnName("lengthOfTreatment");
            entity.Property(e => e.Phone)
                .HasMaxLength(10)
                .HasColumnName("phone");
            entity.Property(e => e.Specialization)
                .HasMaxLength(50)
                .HasColumnName("specialization");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
