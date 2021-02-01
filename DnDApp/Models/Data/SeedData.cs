using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using DnDApp.Models;
using System;
using System.Linq;
using System.Collections.Generic;

namespace DnDApp.Models.Data
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new DnDContext(
                serviceProvider.GetRequiredService<
                    DbContextOptions<DnDContext>>()))
            {
                if (context.Races.Any())
                {
                    return;   
                }

                context.Races.AddRange(
                    new Race
                    {
                        Name = "Humans",
                        Description = "Most humans are the ancestors of pioneers, conquerors, traders, travellers, refugees, and" +
                        " other people on the move. As a result, human lands are a mix of people--physically, culturally, religiously" +
                        ", and politically. Hardy or fine, light-skinned or dark, showy or austere, primitive or civilized, devout" +
                        " or impious, humans run the gamut.",

                        BaseSpeed = 30,
                        Size = "Medium",
                        FavoredClass = "Any",
                        Language = new List<string>() { "Common" },
                        BonusLanguage = new List<string>() { "Any" },
                        RacialAttributeAdj = new List<int>() { 0, 0, 0, 0, 0, 0 },
                        RacialAdjText = "Humans have no racial attribute modifier",
                        RacialFeatures = new List<string>()
                        {
                            "+1 skill point/level",

                        },
                        RacialSkillAdj = new List<Skill>()

                    },
                    new Race
                    {
                        Name = "Elves",
                        Description = "Elves mingle freely in human lands, always welcome yet never at home there. They are well know" +
                        " for their poetry, song, lore, and magical arts. Elves favor things of natural and simple beauty. When danger" +
                        " threatens their woodland homes, however, elves reveal a more martial side, demonstrating skills with swords," +
                        " bows and battle energy.",

                        BaseSpeed = 30,
                        Size = "Medium",
                        FavoredClass = "Wizard",
                        Language = new List<string>() { "Common", "Elven" },
                        BonusLanguage = new List<string>() { "Draconic", "Gnoll", "Gnome", "Goblin", "Orc", "Sylvan" },
                        RacialAttributeAdj = new List<int>() { 0, 2, -2, 0, 0, 0},
                        RacialAdjText = "+2 Dexterity and -2 Consitution modifiers",
                        RacialFeatures = new List<string>()
                        {
                            "Immunity to magic sleep spells",
                            "+2 racial saving throws against Enchantment spells or effects",
                            "Low-light Vision",
                            "Automatic Search check within 5 feet of secret or concealed door"
                        },
                        RacialSkillAdj = new List<Skill>()
                        {
                            new Skill() { Name = "Listen", RacialModifier = 2},
                            new Skill() { Name = "Search", RacialModifier = 2},
                            new Skill() { Name = "Spot", RacialModifier = 2}
                        }

                    }
                );    

                if (context.Professions.Any())
                {
                    return;
                }

                context.Professions.AddRange(
                    new Profession
                    {
                        Name = "Fighter",
                        Description = "The questing knight, the conquering overlord, the king's champion, the elite foot soldier," +
                        " the hardened mercenary, and the bandit king--all are fighters. Fighters can be stalwart defenders of those" +
                        " in need, cruel marauders, or gutsy adventurers. Some are amongs the land's best souls, willing to face death" +
                        " for the greater good. Others are among the worst, those who have no qualms about killing for private gain," +
                        " or even for sport. Fighters who are not actively adventuring may be soldiers, guards, bodyguards, champions," +
                        " or criminal enforcers. An adventuring fighter might call himself a warrior, a mercenary, a thug, " +
                        "or simply an adventurer.",
                        HDType = 10,
                        BaseAttackBonus = 1,
                        FortSave = 2,
                        RefSave = 0,
                        WillSave = 0
                    },
                    new Profession
                    {
                        Name = "Wizard",
                        Description = "A few unintelligible words and a fleeting gesture carry more power than a battleaxe, when they" +
                        " are the words and gestures of a wizard. These simple acts can make magic seem easy, but they only hint at" +
                        " the time the wizard must spend poring over her spellbook preparing each spell for casting, and the years" +
                        " before that spent in apprenticeship to learn the arts of magic.\nWizards depend on intensive study to create" +
                        " their magic. They examine musty old tomes, debate magical theory with their peers, and practice minor magics" +
                        " whenever they can. For a wizard, magic is not a talent, but a difficult, rewarding art.",
                        HDType = 4,
                        BaseAttackBonus = 0,
                        FortSave = 0,
                        RefSave = 0,
                        WillSave = 2
                    }

                );
                context.SaveChanges();
            }
        }
    }
}