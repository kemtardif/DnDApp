using System;
using System.ComponentModel.DataAnnotations;


namespace DnDApp.Models
{
    public class Character
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [Display(Name = "Character Name")]
        [StringLength(60,MinimumLength = 3)]
        public string CharacterName { get; set; }

        [Required]
        public string Race { get; set; }

        [Required]
        public string Class { get; set; }

        [Required]
        [Range(1, 25)]
        public int Strength {get; set;}

        [Required]
        [Range(1, 25)]
        public int Dexterity { get; set; }

        [Required]
        [Range(1, 25)]
        public int Constitution { get; set; }

        [Required]
        [Range(3, 25)]
        public int Intelligence { get; set; }

        [Required]
        [Range(1, 25)]
        public int Wisdom { get; set; }

        [Required]
        [Range(1, 25)]
        public int Charisma { get; set; }

    }
}
