using System;
using DnDApp.Models;
using Microsoft.EntityFrameworkCore;
namespace DnDApp.Models.Data
{
    public class DnDContext : DbContext
    {
        public DnDContext(DbContextOptions<DnDContext> options)
            :base(options)
        {
        }

        public DbSet<Character> Characters { get; set; }
        public DbSet<Race> Races { get; set; }
        public DbSet<Profession> Professions { get; set; }
    }
}
