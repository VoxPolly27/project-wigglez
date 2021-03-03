using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
public class Seed
    {
        public static async Task SeedData(DataContext context) //By making this method static we can run this function without creating an instance of Seed First
        {
            if (context.Thoughts.Any()) return;

            var Thoughts = new List<Thought>
            {
                new Thought
                {
                    Context = "At home in the office",
                    DateRecorded = DateTime.Now.AddMonths(2),
                    DateLastAccessed = DateTime.Now.AddMonths(2),
                    Content = "To create Hoomanz",
                    Category = "Idea",
                    Tags = "development",
                    Resolved = false,
                    Anchored = true,
                    Desirable = true,
                    Desirability = 90,
                },
                new Thought
                {
                    Context = "In the garden",
                    DateRecorded = DateTime.Now.AddMonths(0),
                    DateLastAccessed = DateTime.Now.AddMonths(0),
                    Content = "To become a yogi",
                    Category = "Habit",
                    Tags = "health",
                    Resolved = false,
                    Anchored = true,
                    Desirable = true,
                    Desirability = 80,
                },
                new Thought
                {
                    Context = "In the shower",
                    DateRecorded = DateTime.Now.AddMonths(-1),
                    DateLastAccessed = DateTime.Now.AddMonths(-1),
                    Content = "Don't forget to brush teeth",
                    Category = "Memory",
                    Tags = "health",
                    Resolved = true,
                    Anchored = true,
                    Desirable = true,
                    Desirability = 25,
                },
                new Thought
                {
                    Context = "In the shower",
                    DateRecorded = DateTime.Now.AddMonths(5),
                    DateLastAccessed = DateTime.Now.AddMonths(5),
                    Content = "I should get some new body lotion",
                    Category = "Memory",
                    Tags = "misc",
                    Resolved = false,
                    Anchored = false,
                    Desirable = false,
                    Desirability = 10,
                },
                new Thought
                {
                    Context = "While driving",
                    DateRecorded = DateTime.Now.AddMonths(1),
                    DateLastAccessed = DateTime.Now.AddMonths(1),
                    Content = "I'd love to make a podcost",
                    Category = "Desire",
                    Tags = "misc",
                    Resolved = false,
                    Anchored = false,
                    Desirable = true,
                    Desirability = 50,
                },
                new Thought
                {
                    Context = "In the car",
                    DateRecorded = DateTime.Now.AddMonths(7),
                    DateLastAccessed = DateTime.Now.AddMonths(7),
                    Content = "I feel sweaty and gross",
                    Category = "Feeling",
                    Tags = "health",
                    Resolved = false,
                    Anchored = false,
                    Desirable = false,
                    Desirability = 50,
                },
            };

            await context.Thoughts.AddRangeAsync(Thoughts);
            await context.SaveChangesAsync();
        }
    }
}