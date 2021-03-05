using System;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Thoughts
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
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

                var thought = await _context.Thoughts.FindAsync(request.Id);

                //Update activity properties that have changed. Step in AUTOMAPPER

                _context.Remove(thought);
                await _context.SaveChangesAsync();

                return Unit.Value;
            }




        }
    }
}