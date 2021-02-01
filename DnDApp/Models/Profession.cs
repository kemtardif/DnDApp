using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace DnDApp.Models
{
    public class Profession
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }
        public int HDType { get; set; }
        public int BaseAttackBonus { get; set; }
        public int FortSave { get; set; }
        public int RefSave { get; set; }
        public int WillSave { get; set; }

    }
}
