using _4_full.Models;
using Microsoft.EntityFrameworkCore;

namespace _4_full.Data
{
    public class StoreDbContext: DbContext
    {
        public StoreDbContext(DbContextOptions<StoreDbContext> options): base(options) { }

        public DbSet<Costume> Costumes { get; set; }
    }
}
