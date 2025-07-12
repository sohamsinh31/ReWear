using Microsoft.EntityFrameworkCore;
using ReWear.Models;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    // Define your DbSets
    public DbSet<User> Users { get; set; }
}
