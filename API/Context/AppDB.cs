using Microsoft.EntityFrameworkCore;
using ReWear.Models;

namespace ReWear.Context
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Item> Items { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Lowercase all table and column names to avoid PostgreSQL casing issues
            foreach (var entity in modelBuilder.Model.GetEntityTypes())
            {
                // Table name to lowercase
                entity.SetTableName("t_" + entity.GetTableName()!.ToLower());

                // Column names to lowercase
                foreach (var property in entity.GetProperties())
                {
                    property.SetColumnName("c_" + property.Name.ToLower());
                }

                // Primary keys and other constraints
                foreach (var key in entity.GetKeys())
                {
                    key.SetName(key.GetName()!.ToLower());
                }

                foreach (var fk in entity.GetForeignKeys())
                {
                    fk.SetConstraintName(fk.GetConstraintName()!.ToLower());
                }

                foreach (var index in entity.GetIndexes())
                {
                    index.SetDatabaseName(index.GetDatabaseName()!.ToLower());
                }
            }

            base.OnModelCreating(modelBuilder);
        }
    }
}
