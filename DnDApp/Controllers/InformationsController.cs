using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DnDApp.Models;
using DnDApp.Models.Data;

namespace DnDApp.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("ReactPolicy")]
    public class InformationsController
    {
        private readonly DnDContext _context;
        public InformationsController(DnDContext context)
        {
            this._context = context;
        }

        [HttpGet("Races")]
        public async Task<ActionResult<IEnumerable<Race>>> Races()
        {
            return await _context.Races.Include(x => x.RacialSkillAdj).ToListAsync();

        }

        [HttpGet("Professions")]
        public async Task<ActionResult<IEnumerable<Profession>>> Professions()
        {
            return await _context.Professions.ToListAsync();

        }
    }
}
