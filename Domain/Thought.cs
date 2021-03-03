using System;
using System.Collections.Generic;

namespace Domain
{
    public class Thought
    {
        public Guid Id {get; set; } //Address

        public string Context {get; set;} //Setting

        public string Content {get ; set;} //Wat transpired 

        public string Tags {get;set;} //A way of referencing thoughts

        public string Category { get ; set; } //Idea, Observation, Comment, Pervasive, 

        public DateTime DateRecorded {get;set;}

        public DateTime DateLastAccessed { get; set; }

        public bool Resolved { get; set;} //If a thought is opened and not completed 

        public bool Anchored {get; set;} //Anchored if it's a common thought


        public bool Desirable { get ; set; } //Desirable or Undesirable

        public int Desirability { get ; set; } //A measure from 0 - 100

    }
}