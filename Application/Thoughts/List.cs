using System.Collections.Generic;
using System.Threading;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Thoughts
{
    public class List
    {
        public class Query : IRequest<List<Thought>> { }

        public class Handler : IRequestHandler<Query, List<Thought>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async System.Threading.Tasks.Task<List<Thought>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Thoughts.ToListAsync();
            }
        }
    }
}