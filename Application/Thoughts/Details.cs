using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Thoughts
{
    public class Details
    {
        public class Query : IRequest<Thought>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Thought>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Thought> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Thoughts.FindAsync(request.Id);
            }
        }

    }
}