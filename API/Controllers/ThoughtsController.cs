using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ThoughtsController : BaseApiController
    {
        private readonly DataContext _context;
        public ThoughtsController(DataContext context)
        {
            _context = context;

        }

        [HttpGet]
        public async Task<ActionResult<List<Thought>>> GetThoughts()
        {
            return await _context.Thoughts.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Thought>> GetThought(Guid id)
        {
            return await _context.Thoughts.FindAsync(id);
        }
    }
}