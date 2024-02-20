using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace testAvaib.Models;

public partial class MarksDbContext : DbContext
{
    public MarksDbContext()
    {
    }

    public MarksDbContext(DbContextOptions<MarksDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<StdMarks> StdMarks { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=.;Database=MarksDb;Integrated Security=True;Trusted_Connection=True;Trust Server Certificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<StdMarks>(entity =>
        {
            entity.ToTable("std_marks");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.FeePaid).HasColumnName("feePaid");
            entity.Property(e => e.Marks).HasColumnName("marks");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .HasColumnName("name");
            entity.Property(e => e.Pass).HasColumnName("pass");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
