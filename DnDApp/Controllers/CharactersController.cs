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
    public class CharactersController : ControllerBase
    {
        private readonly CharRepository _repository;

        public CharactersController(DnDContext context)
        {
            _repository = new CharRepository(context);
        }

        // GET: api/Characters
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Character>>> GetCharacters()
        {
            return await _repository.GetAll();

        }

        // GET: api/Characters/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Character>> GetCharacter(int id)
        {
            var character = await _repository.GetById(id);

            if (character == null)
            {
                return NotFound();
            }

            return character;
        }

        // PUT: api/Characters/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCharacter(int id, [Bind("Id",
                                                                        "CharacterName",
                                                                        "Race",
                                                                        "Class",
                                                                        "Strength",
                                                                        "Dexterity",
                                                                        "Constitution",
                                                                        "Intelligence",
                                                                        "Wisdom",
                                                                        "Charisma")] Character character)
        {
            if (id != character.Id)
            {
                return BadRequest();
            }

            try
            {
                await _repository.Update(character);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CharacterExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Characters
        [HttpPost]
        public async Task<ActionResult<Character>> PostCharacter([Bind("Id",
                                                                        "CharacterName",
                                                                        "Race",
                                                                        "Class",
                                                                        "Strength",
                                                                        "Dexterity",
                                                                        "Constitution",
                                                                        "Intelligence",
                                                                        "Wisdom",
                                                                        "Charisma")] Character character)
        {
            await _repository.Create(character);

            return CreatedAtAction("GetCharacter", new { id = character.Id }, character);
        }

        // DELETE: api/Characters/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Character>> DeleteCharacter(int id)
        {
            var character = await _repository.GetById(id);
            if (character == null)
            {
                return NotFound();
            }

            await _repository.Delete(character);

            return character;
        }

        private bool CharacterExists(int id)
        {
            return _repository.Exists(id);
        }
    }
}
