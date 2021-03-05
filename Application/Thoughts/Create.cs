using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Thoughts
{
    public class Create
    {
        public class Command : IRequest
        {
            public Thought Thought { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Thoughts.Add(request.Thought);
                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        



        }
    }
}