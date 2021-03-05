using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Thoughts
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Thought Thought { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {

                var thought = await _context.Thoughts.FindAsync(request.Thought.Id);

                //Update activity properties that have changed. Step in AUTOMAPPER
                _mapper.Map(request.Thought, thought);
                
                await _context.SaveChangesAsync();

                return Unit.Value;
            }




        }
    }
}