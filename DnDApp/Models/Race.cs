using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
namespace DnDApp.Models
{
    public class Race
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }
        public string Size { get; set; }
        public int BaseSpeed { get; set; }
        public string FavoredClass { get; set; }
        public List<string> Language { get; set; }
        public List<string> BonusLanguage { get; set; }
        public List<int> RacialAttributeAdj { get; set; }
        public string RacialAdjText { get; set; }
        public List<string> RacialFeatures { get; set; }

        public List<Skill> RacialSkillAdj { get; set; }
    }
}
