using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using DnDApp.Models;

namespace DnDApp.Models.Data
{
    public class CharRepository : IRepository<Character>
    {
        protected DnDContext _context;

        public CharRepository(DnDContext context)
        {
            _context = context;
        }

        public async Task<List<Character>> GetAll()
        {
        
            return await _context.Characters.ToListAsync();
        }


        public async Task<Character>GetById(int id)
        {
            return await _context.Characters.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task Create(Character entity)
        {
            _context.Add(entity);
            await _context.SaveChangesAsync();

            return;
        }

        public async Task Delete(Character entity)
        {
            _context.Remove(entity);
            await _context.SaveChangesAsync();

            return;
        }

        public async Task Update(Character entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return;
        }

        public bool Exists(int id)
        {
            return _context.Characters.Any(x => x.Id == id);
        }
        
    }
}
