using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Thoughts;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ThoughtsController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Thought>>> GetThoughts()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Thought>> GetThought(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<IActionResult> CreateThought([FromBody] Thought thought)
        {
            return Ok(await Mediator.Send(new Create.Command {Thought = thought}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditThought(Guid id, Thought thought)
        {
            thought.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{Thought = thought }));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteThought(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}