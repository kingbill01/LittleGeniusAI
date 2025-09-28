// Contenu éducatif détaillé pour LittleGenius AI
import { SupportedLanguage, LocalizedContent } from './translations';

export interface EducationalContent {
  id: string;
  title: LocalizedContent;
  description: LocalizedContent;
  ageGroup: '3-5' | '6-8' | '9-12';
  subject: 'math' | 'language' | 'science' | 'art' | 'computing' | 'civic' | 'hygiene' | 'anatomy';
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'quiz' | 'game' | 'exercise' | 'creative' | 'story' | 'experiment' | 'drawing' | 'music' | 'video' | 'interactive' | 'simulation' | 'puzzle';
  estimatedTime: number; // en minutes
  content: any; // Contenu spécifique à l'activité
  instructions: LocalizedContent;
  objectives: LocalizedContent[];
  materials?: LocalizedContent[];
  vocabulary?: { [key: string]: LocalizedContent };
  badges?: LocalizedContent[];
  hints?: LocalizedContent[];
  rewards?: {
    points: number;
    stars: number;
    unlocks?: string[];
  };
  prerequisites?: string[];
  nextActivities?: string[];
  tags?: string[];
  multimedia?: {
    images?: string[];
    audio?: string[];
    videos?: string[];
  };
}

// Contenu MATHÉMATIQUES
export const mathContent: EducationalContent[] = [
  // 3-5 ans
  {
    id: 'math-counting-1-10',
    title: {
      fr: "Compter jusqu'à 10",
      en: "Counting to 10",
      cs: "Počítání do 10"
    },
    description: {
      fr: "Apprends à compter les objets de 1 à 10 avec des animaux mignons",
      en: "Learn to count objects from 1 to 10 with cute animals",
      cs: "Nauč se počítat předměty od 1 do 10 s roztomilými zvířátky"
    },
    ageGroup: '3-5',
    subject: 'math',
    difficulty: 'easy',
    type: 'game',
    estimatedTime: 10,
    instructions: {
      fr: "Clique sur chaque animal pour les compter. Dis le nombre à voix haute !",
      en: "Click on each animal to count them. Say the number out loud!",
      cs: "Klikni na každé zvíře a spočítej je. Řekni číslo nahlas!"
    },
    objectives: [
      {
        fr: "Reconnaître les chiffres de 1 à 10",
        en: "Recognize numbers 1 to 10",
        cs: "Rozpoznat čísla od 1 do 10"
      },
      {
        fr: "Compter des objets concrets",
        en: "Count concrete objects",
        cs: "Počítat konkrétní předměty"
      }
    ],
    content: {
      exercises: [
        {
          question: { fr: "Combien de chats vois-tu ?", en: "How many cats do you see?", cs: "Kolik koček vidíš?" },
          objects: "🐱🐱🐱",
          answer: 3
        },
        {
          question: { fr: "Compte les étoiles", en: "Count the stars", cs: "Spočítej hvězdy" },
          objects: "⭐⭐⭐⭐⭐",
          answer: 5
        }
      ]
    },
    badges: [
      {
        fr: "Petit Compteur",
        en: "Little Counter",
        cs: "Malý Počítač"
      }
    ],
    hints: [
      {
        fr: "Utilise tes doigts pour t'aider à compter",
        en: "Use your fingers to help you count",
        cs: "Použij své prsty k pomoci s počítáním"
      }
    ],
    rewards: {
      points: 100,
      stars: 2,
      unlocks: ["math-shapes-basic"]
    },
    tags: ["counting", "numbers", "animals"],
    multimedia: {
      audio: ["counting-song.mp3"],
      images: ["animals-counting.png"]
    }
  },
  {
    id: 'math-shapes-basic',
    title: {
      fr: "Formes Magiques",
      en: "Magic Shapes",
      cs: "Kouzelné Tvary"
    },
    description: {
      fr: "Découvre les formes géométriques de base dans un monde coloré",
      en: "Discover basic geometric shapes in a colorful world",
      cs: "Objevuj základní geometrické tvary v barevném světě"
    },
    ageGroup: '3-5',
    subject: 'math',
    difficulty: 'easy',
    type: 'game',
    estimatedTime: 15,
    instructions: {
      fr: "Trouve tous les cercles, carrés et triangles cachés dans l'image !",
      en: "Find all the circles, squares and triangles hidden in the picture!",
      cs: "Najdi všechny kruhy, čtverce a trojúhelníky schované v obrázku!"
    },
    objectives: [
      {
        fr: "Identifier les formes de base",
        en: "Identify basic shapes",
        cs: "Identifikovat základní tvary"
      }
    ],
    content: {
      shapes: [
        { name: { fr: "Cercle", en: "Circle", cs: "Kruh" }, emoji: "🔵", properties: { sides: 0 } },
        { name: { fr: "Carré", en: "Square", cs: "Čtverec" }, emoji: "🟦", properties: { sides: 4 } },
        { name: { fr: "Triangle", en: "Triangle", cs: "Trojúhelník" }, emoji: "🔺", properties: { sides: 3 } }
      ]
    }
  },

  // 6-8 ans
  {
    id: 'math-addition-basics',
    title: {
      fr: "Addition Gourmande",
      en: "Tasty Addition",
      cs: "Chutné Sčítání"
    },
    description: {
      fr: "Apprends l'addition en partageant des bonbons avec tes amis",
      en: "Learn addition by sharing candies with your friends",
      cs: "Nauč se sčítat při sdílení cukrovinek s přáteli"
    },
    ageGroup: '6-8',
    subject: 'math',
    difficulty: 'medium',
    type: 'game',
    estimatedTime: 20,
    instructions: {
      fr: "Additionne les bonbons dans chaque bocal pour aider le confiseur !",
      en: "Add up the candies in each jar to help the candy maker!",
      cs: "Sečti cukrovinky v každé sklenici a pomoz cukráři!"
    },
    objectives: [
      {
        fr: "Maîtriser l'addition jusqu'à 20",
        en: "Master addition up to 20",
        cs: "Zvládnout sčítání do 20"
      }
    ],
    content: {
      problems: [
        { equation: "3 + 4", visual: "🍭🍭🍭 + 🍭🍭🍭🍭", answer: 7 },
        { equation: "5 + 3", visual: "🍬🍬🍬🍬🍬 + 🍬🍬🍬", answer: 8 },
        { equation: "7 + 2", visual: "🧁🧁🧁🧁🧁🧁🧁 + 🧁🧁", answer: 9 }
      ]
    }
  },

  // PLUS D'ACTIVITÉS MATHÉMATIQUES - 3-5 ans
  {
    id: 'math-number-ordering-3-5',
    title: {
      fr: "Ranger les Numéros",
      en: "Number Ordering",
      cs: "Řazení Čísel"
    },
    description: {
      fr: "Apprends à mettre les nombres dans le bon ordre",
      en: "Learn to put numbers in the right order",
      cs: "Nauč se řadit čísla ve správném pořadí"
    },
    ageGroup: '3-5',
    subject: 'math',
    difficulty: 'easy',
    type: 'exercise',
    estimatedTime: 12,
    instructions: {
      fr: "Range les nombres du plus petit au plus grand !",
      en: "Order numbers from smallest to largest!",
      cs: "Seřaď čísla od nejmenšího k největšímu!"
    },
    objectives: [
      {
        fr: "Comprendre l'ordre des nombres",
        en: "Understand number sequence",
        cs: "Pochopit pořadí čísel"
      }
    ],
    content: {
      exercises: [
        {
          question: {
            fr: "Range ces nombres : 3, 1, 2",
            en: "Order these numbers: 3, 1, 2",
            cs: "Seřaď tato čísla: 3, 1, 2"
          },
          options: [
            { fr: "1, 2, 3 ✅", en: "1, 2, 3 ✅", cs: "1, 2, 3 ✅" },
            { fr: "3, 2, 1", en: "3, 2, 1", cs: "3, 2, 1" },
            { fr: "2, 1, 3", en: "2, 1, 3", cs: "2, 1, 3" },
            { fr: "1, 3, 2", en: "1, 3, 2", cs: "1, 3, 2" }
          ],
          answer: 0,
          explanation: {
            fr: "1 est le plus petit, puis 2, puis 3 le plus grand !",
            en: "1 is smallest, then 2, then 3 is biggest!",
            cs: "1 je nejmenší, pak 2, pak 3 je největší!"
          }
        }
      ]
    }
  },
  {
    id: 'math-more-less-3-5',
    title: {
      fr: "Plus ou Moins",
      en: "More or Less",
      cs: "Více nebo Méně"
    },
    description: {
      fr: "Compare les quantités et découvre qui a plus ou moins",
      en: "Compare quantities and discover who has more or less",
      cs: "Porovnej množství a zjisti, kdo má více nebo méně"
    },
    ageGroup: '3-5',
    subject: 'math',
    difficulty: 'easy',
    type: 'game',
    estimatedTime: 10,
    instructions: {
      fr: "Regarde bien et dis qui a le plus !",
      en: "Look carefully and say who has the most!",
      cs: "Pečlivě se podívej a řekni, kdo má nejvíc!"
    },
    objectives: [
      {
        fr: "Comparer des quantités",
        en: "Compare quantities",
        cs: "Porovnávat množství"
      }
    ],
    content: {
      exercises: [
        {
          question: {
            fr: "Qui a le plus de pommes ?",
            en: "Who has the most apples?",
            cs: "Kdo má nejvíc jablek?"
          },
          comparison: {
            left: { name: "Alice", items: "🍎🍎🍎", count: 3 },
            right: { name: "Bob", items: "🍎🍎🍎🍎🍎", count: 5 }
          },
          options: [
            { fr: "Bob (5 pommes) ✅", en: "Bob (5 apples) ✅", cs: "Bob (5 jablek) ✅" },
            { fr: "Alice (3 pommes)", en: "Alice (3 apples)", cs: "Alice (3 jablka)" },
            { fr: "Ils ont pareil", en: "They have the same", cs: "Mají stejně" },
            { fr: "Je ne sais pas", en: "I don't know", cs: "Nevím" }
          ],
          answer: 0,
          explanation: {
            fr: "Bob a 5 pommes et Alice en a 3. 5 est plus grand que 3 !",
            en: "Bob has 5 apples and Alice has 3. 5 is bigger than 3!",
            cs: "Bob má 5 jablek a Alice má 3. 5 je větší než 3!"
          }
        }
      ]
    }
  },

  // ACTIVITÉS MATHÉMATIQUES - 6-8 ans
  {
    id: 'math-subtraction-fun-6-8',
    title: {
      fr: "Soustraction Rigolote",
      en: "Fun Subtraction",
      cs: "Zábavné Odčítání"
    },
    description: {
      fr: "Apprends la soustraction avec des histoires amusantes",
      en: "Learn subtraction with fun stories",
      cs: "Nauč se odčítání se zábavnými příběhy"
    },
    ageGroup: '6-8',
    subject: 'math',
    difficulty: 'medium',
    type: 'exercise',
    estimatedTime: 18,
    instructions: {
      fr: "Résous les problèmes de soustraction !",
      en: "Solve subtraction problems!",
      cs: "Vyřeš příklady na odčítání!"
    },
    objectives: [
      {
        fr: "Maîtriser la soustraction jusqu'à 20",
        en: "Master subtraction up to 20",
        cs: "Zvládnout odčítání do 20"
      }
    ],
    content: {
      exercises: [
        {
          question: {
            fr: "Il y avait 8 oiseaux sur une branche. 3 sont partis. Combien en reste-t-il ?",
            en: "There were 8 birds on a branch. 3 flew away. How many are left?",
            cs: "Na větvi bylo 8 ptáků. 3 odletěli. Kolik jich zůstalo?"
          },
          visual: "🐦🐦🐦🐦🐦🐦🐦🐦 ➖ 🐦🐦🐦",
          equation: "8 - 3",
          options: [
            { fr: "5 oiseaux 🐦", en: "5 birds 🐦", cs: "5 ptáků 🐦" },
            { fr: "4 oiseaux", en: "4 birds", cs: "4 ptáci" },
            { fr: "6 oiseaux", en: "6 birds", cs: "6 ptáků" },
            { fr: "3 oiseaux", en: "3 birds", cs: "3 ptáci" }
          ],
          answer: 0,
          explanation: {
            fr: "8 - 3 = 5. Il reste 5 oiseaux sur la branche !",
            en: "8 - 3 = 5. There are 5 birds left on the branch!",
            cs: "8 - 3 = 5. Na větvi zůstalo 5 ptáků!"
          }
        }
      ]
    }
  },
  {
    id: 'math-multiplication-intro-6-8',
    title: {
      fr: "Découverte de la Multiplication",
      en: "Introduction to Multiplication",
      cs: "Úvod do Násobení"
    },
    description: {
      fr: "Comprends la multiplication comme une addition répétée",
      en: "Understand multiplication as repeated addition",
      cs: "Pochop násobení jako opakované sčítání"
    },
    ageGroup: '6-8',
    subject: 'math',
    difficulty: 'medium',
    type: 'exercise',
    estimatedTime: 20,
    instructions: {
      fr: "Compte les groupes d'objets identiques !",
      en: "Count groups of identical objects!",
      cs: "Počítej skupiny stejných předmětů!"
    },
    objectives: [
      {
        fr: "Comprendre le concept de multiplication",
        en: "Understand the multiplication concept",
        cs: "Pochopit koncept násobení"
      }
    ],
    content: {
      exercises: [
        {
          question: {
            fr: "Combien de fleurs en tout dans 3 bouquets de 2 fleurs ?",
            en: "How many flowers in total in 3 bouquets of 2 flowers?",
            cs: "Kolik květin celkem ve 3 kyticích po 2 květinách?"
          },
          visual: "🌸🌸 + 🌸🌸 + 🌸🌸",
          equation: "3 × 2",
          options: [
            { fr: "6 fleurs 🌸", en: "6 flowers 🌸", cs: "6 květin 🌸" },
            { fr: "5 fleurs", en: "5 flowers", cs: "5 květin" },
            { fr: "4 fleurs", en: "4 flowers", cs: "4 květiny" },
            { fr: "8 fleurs", en: "8 flowers", cs: "8 květin" }
          ],
          answer: 0,
          explanation: {
            fr: "3 groupes de 2 fleurs = 2 + 2 + 2 = 6 fleurs !",
            en: "3 groups of 2 flowers = 2 + 2 + 2 = 6 flowers!",
            cs: "3 skupiny po 2 květinách = 2 + 2 + 2 = 6 květin!"
          }
        }
      ]
    }
  },
  {
    id: 'math-time-telling-6-8',
    title: {
      fr: "Apprendre l'Heure",
      en: "Learning Time",
      cs: "Učení se Času"
    },
    description: {
      fr: "Découvre comment lire l'heure sur une horloge",
      en: "Discover how to read time on a clock",
      cs: "Objevuj, jak číst čas na hodinách"
    },
    ageGroup: '6-8',
    subject: 'math',
    difficulty: 'medium',
    type: 'exercise',
    estimatedTime: 22,
    instructions: {
      fr: "Regarde l'horloge et dis quelle heure il est !",
      en: "Look at the clock and say what time it is!",
      cs: "Podívej se na hodiny a řekni, kolik je hodin!"
    },
    objectives: [
      {
        fr: "Lire l'heure sur une horloge",
        en: "Read time on a clock",
        cs: "Číst čas na hodinách"
      }
    ],
    content: {
      exercises: [
        {
          question: {
            fr: "Quelle heure indique cette horloge ? 🕒",
            en: "What time does this clock show? 🕒",
            cs: "Kolik hodin ukazují tyto hodiny? 🕒"
          },
          clockData: { hours: 3, minutes: 0 },
          options: [
            { fr: "3 heures ✅", en: "3 o'clock ✅", cs: "3 hodiny ✅" },
            { fr: "4 heures", en: "4 o'clock", cs: "4 hodiny" },
            { fr: "2 heures", en: "2 o'clock", cs: "2 hodiny" },
            { fr: "12 heures", en: "12 o'clock", cs: "12 hodin" }
          ],
          answer: 0,
          explanation: {
            fr: "La petite aiguille pointe vers le 3, il est donc 3 heures !",
            en: "The short hand points to 3, so it's 3 o'clock!",
            cs: "Krátká ručička míří na 3, takže jsou 3 hodiny!"
          }
        }
      ]
    }
  },

  // ACTIVITÉS MATHÉMATIQUES - 9-12 ans
  {
    id: 'math-division-sharing-9-12',
    title: {
      fr: "Division et Partage",
      en: "Division and Sharing",
      cs: "Dělení a Sdílení"
    },
    description: {
      fr: "Apprends la division en partageant équitablement",
      en: "Learn division by sharing equally",
      cs: "Nauč se dělení spravedlivým sdílením"
    },
    ageGroup: '9-12',
    subject: 'math',
    difficulty: 'hard',
    type: 'exercise',
    estimatedTime: 25,
    instructions: {
      fr: "Divise les objets équitablement entre tous !",
      en: "Divide objects equally among everyone!",
      cs: "Rozděl předměty rovnoměrně mezi všechny!"
    },
    objectives: [
      {
        fr: "Maîtriser la division euclidienne",
        en: "Master euclidean division",
        cs: "Zvládnout euklidovské dělení"
      }
    ],
    content: {
      exercises: [
        {
          question: {
            fr: "Comment partager 24 bonbons entre 6 enfants ?",
            en: "How to share 24 candies among 6 children?",
            cs: "Jak rozdělit 24 cukrovinek mezi 6 dětí?"
          },
          visual: "🍬🍬🍬🍬🍬🍬🍬🍬🍬🍬🍬🍬🍬🍬🍬🍬🍬🍬🍬🍬🍬🍬🍬🍬",
          equation: "24 ÷ 6",
          options: [
            { fr: "4 bonbons chacun 🍬", en: "4 candies each 🍬", cs: "4 cukrovinky každému 🍬" },
            { fr: "3 bonbons chacun", en: "3 candies each", cs: "3 cukrovinky každému" },
            { fr: "5 bonbons chacun", en: "5 candies each", cs: "5 cukrovinek každému" },
            { fr: "6 bonbons chacun", en: "6 candies each", cs: "6 cukrovinek každému" }
          ],
          answer: 0,
          explanation: {
            fr: "24 ÷ 6 = 4. Chaque enfant aura 4 bonbons !",
            en: "24 ÷ 6 = 4. Each child will have 4 candies!",
            cs: "24 ÷ 6 = 4. Každé dítě bude mít 4 cukrovinky!"
          }
        }
      ]
    }
  },
  {
    id: 'math-geometry-advanced-9-12',
    title: {
      fr: "Géométrie Avancée",
      en: "Advanced Geometry",
      cs: "Pokročilá Geometrie"
    },
    description: {
      fr: "Explore les propriétés avancées des formes géométriques",
      en: "Explore advanced properties of geometric shapes",
      cs: "Prozkoumej pokročilé vlastnosti geometrických tvarů"
    },
    ageGroup: '9-12',
    subject: 'math',
    difficulty: 'hard',
    type: 'exercise',
    estimatedTime: 30,
    instructions: {
      fr: "Calcule les périmètres et les aires !",
      en: "Calculate perimeters and areas!",
      cs: "Vypočítej obvody a plochy!"
    },
    objectives: [
      {
        fr: "Calculer périmètres et aires",
        en: "Calculate perimeters and areas",
        cs: "Vypočítat obvody a plochy"
      }
    ],
    content: {
      exercises: [
        {
          question: {
            fr: "Quel est le périmètre d'un carré de côté 5 cm ?",
            en: "What is the perimeter of a square with side 5 cm?",
            cs: "Jaký je obvod čtverce se stranou 5 cm?"
          },
          shape: { type: "square", side: 5, unit: "cm" },
          formula: "P = 4 × côté",
          options: [
            { fr: "20 cm ✅", en: "20 cm ✅", cs: "20 cm ✅" },
            { fr: "25 cm", en: "25 cm", cs: "25 cm" },
            { fr: "15 cm", en: "15 cm", cs: "15 cm" },
            { fr: "10 cm", en: "10 cm", cs: "10 cm" }
          ],
          answer: 0,
          explanation: {
            fr: "Périmètre = 4 × 5 = 20 cm. Le tour du carré mesure 20 cm !",
            en: "Perimeter = 4 × 5 = 20 cm. The square's perimeter is 20 cm!",
            cs: "Obvod = 4 × 5 = 20 cm. Obvod čtverce je 20 cm!"
          }
        }
      ]
    }
  },

  // 9-12 ans
  {
    id: 'math-fractions-pizza',
    title: {
      fr: "Fractions Pizza Party",
      en: "Pizza Fractions Party",
      cs: "Pizza Párty se Zlomky"
    },
    description: {
      fr: "Comprends les fractions en partageant des pizzas équitablement",
      en: "Understand fractions by sharing pizzas fairly",
      cs: "Pochop zlomky při spravedlivém dělení pizzy"
    },
    ageGroup: '9-12',
    subject: 'math',
    difficulty: 'hard',
    type: 'exercise',
    estimatedTime: 25,
    instructions: {
      fr: "Divise chaque pizza en parts égales selon le nombre d'invités",
      en: "Divide each pizza into equal parts according to the number of guests",
      cs: "Rozděl každou pizzu na stejné díly podle počtu hostů"
    },
    objectives: [
      {
        fr: "Comprendre le concept de fraction",
        en: "Understand the concept of fractions",
        cs: "Pochopit koncept zlomků"
      }
    ],
    content: {
      scenarios: [
        {
          guests: 4,
          pizzas: 2,
          question: { fr: "Quelle fraction de pizza aura chaque invité ?", en: "What fraction of pizza will each guest get?", cs: "Jaký zlomek pizzy dostane každý host?" },
          answer: "1/2"
        }
      ]
    }
  }
];

// Contenu LANGUES
export const languageContent: EducationalContent[] = [
  // 3-5 ans - Alphabet
  {
    id: 'lang-alphabet-adventure',
    title: {
      fr: "Aventure de l'Alphabet",
      en: "Alphabet Adventure",
      cs: "Dobrodružství Abecedy"
    },
    description: {
      fr: "Pars à la découverte des lettres avec des animaux rigolos",
      en: "Discover letters with funny animals",
      cs: "Objevuj písmena s legrační zvířátka"
    },
    ageGroup: '3-5',
    subject: 'language',
    difficulty: 'easy',
    type: 'game',
    estimatedTime: 15,
    instructions: {
      fr: "Clique sur la lettre qui commence le nom de l'animal !",
      en: "Click on the letter that starts the animal's name!",
      cs: "Klikni na písmeno, kterým začíná jméno zvířete!"
    },
    objectives: [
      {
        fr: "Reconnaître les lettres de l'alphabet",
        en: "Recognize alphabet letters",
        cs: "Rozpoznávat písmena abecedy"
      }
    ],
    content: {
      letters: [
        { 
          letter: "A", 
          words: { 
            fr: { word: "Abeille", image: "🐝" }, 
            en: { word: "Ant", image: "🐜" }, 
            cs: { word: "Autobus", image: "🚌" } 
          } 
        },
        { 
          letter: "B", 
          words: { 
            fr: { word: "Baleine", image: "🐋" }, 
            en: { word: "Bear", image: "🐻" }, 
            cs: { word: "Břich", image: "🤰" } 
          } 
        }
      ]
    }
  },

  // 6-8 ans - Lecture
  {
    id: 'lang-reading-stories',
    title: {
      fr: "Histoires Magiques",
      en: "Magic Stories",
      cs: "Kouzelné Příběhy"
    },
    description: {
      fr: "Lis des histoires courtes et réponds aux questions",
      en: "Read short stories and answer questions",
      cs: "Čti krátké příběhy a odpovídej na otázky"
    },
    ageGroup: '6-8',
    subject: 'language',
    difficulty: 'medium',
    type: 'story',
    estimatedTime: 20,
    instructions: {
      fr: "Lis l'histoire attentivement puis réponds aux questions",
      en: "Read the story carefully then answer the questions",
      cs: "Pozorně si přečti příběh a pak odpověz na otázky"
    },
    objectives: [
      {
        fr: "Améliorer la compréhension de lecture",
        en: "Improve reading comprehension",
        cs: "Zlepšit porozumění čtení"
      }
    ],
    content: {
      stories: [
        {
          title: { fr: "Le Chat Curieux", en: "The Curious Cat", cs: "Zvědavá Kočka" },
          text: {
            fr: "Il était une fois un petit chat orange nommé Roux. Il adorait explorer le jardin...",
            en: "Once upon a time, there was a little orange cat named Ginger. He loved exploring the garden...",
            cs: "Byl jednou jeden malý oranžový kocour jménem Ryšavý. Miloval objevování zahrady..."
          },
          questions: [
            {
              q: { fr: "De quelle couleur était le chat ?", en: "What color was the cat?", cs: "Jaké barvy byl kocour?" },
              options: [
                { fr: "Orange", en: "Orange", cs: "Oranžová" },
                { fr: "Noir", en: "Black", cs: "Černá" },
                { fr: "Blanc", en: "White", cs: "Bílá" }
              ],
              correct: 0
            }
          ]
        }
      ]
    }
  },

  // 9-12 ans - Grammaire avancée
  {
    id: 'lang-grammar-detective',
    title: {
      fr: "Détective de Grammaire",
      en: "Grammar Detective",
      cs: "Gramatický Detektiv"
    },
    description: {
      fr: "Résous des énigmes grammaticales comme un vrai détective",
      en: "Solve grammar mysteries like a real detective",
      cs: "Řeš gramatické záhady jako skutečný detektiv"
    },
    ageGroup: '9-12',
    subject: 'language',
    difficulty: 'hard',
    type: 'exercise',
    estimatedTime: 30,
    instructions: {
      fr: "Trouve et corrige les erreurs de grammaire dans chaque phrase",
      en: "Find and correct grammar errors in each sentence",
      cs: "Najdi a oprav gramatické chyby v každé větě"
    },
    objectives: [
      {
        fr: "Maîtriser les règles de grammaire",
        en: "Master grammar rules",
        cs: "Zvládnout gramatická pravidla"
      }
    ],
    content: {
      exercises: [
        {
          sentence: { 
            fr: "Les chat mange ses croquettes.", 
            en: "The cats is eating their food.", 
            cs: "Kocour jedí svou stravu." 
          },
          error: { 
            fr: "Accord sujet-verbe", 
            en: "Subject-verb agreement", 
            cs: "Shoda podmětu s přísudkem" 
          },
          correction: { 
            fr: "Le chat mange ses croquettes.", 
            en: "The cats are eating their food.", 
            cs: "Kocour jí svou stravu." 
          }
        }
      ]
    }
  },

  // BEAUCOUP PLUS D'ACTIVITÉS FRANÇAISES - 3-5 ans
  {
    id: 'lang-phonics-animals-3-5',
    title: {
      fr: "Sons des Animaux",
      en: "Animal Sounds",
      cs: "Zvuky Zvířat"
    },
    description: {
      fr: "Découvre les sons que font les lettres avec nos amis animaux",
      en: "Discover letter sounds with our animal friends",
      cs: "Objevuj zvuky písmen s našimi zvířecími přáteli"
    },
    ageGroup: '3-5',
    subject: 'language',
    difficulty: 'easy',
    type: 'exercise',
    estimatedTime: 12,
    instructions: {
      fr: "Écoute le son et trouve l'animal qui commence par cette lettre !",
      en: "Listen to the sound and find the animal that starts with this letter!",
      cs: "Poslouchej zvuk a najdi zvíře, které začíná tímto písmenem!"
    },
    objectives: [
      {
        fr: "Associer les sons aux lettres",
        en: "Associate sounds with letters",
        cs: "Spojovat zvuky s písmeny"
      }
    ],
    content: {
      exercises: [
        {
          question: {
            fr: "Quel animal commence par le son 'mmm' ?",
            en: "Which animal starts with the 'mmm' sound?",
            cs: "Které zvíře začíná zvukem 'mmm'?"
          },
          options: [
            { fr: "Mouton 🐑", en: "Mouse 🐭", cs: "Myš 🐭" },
            { fr: "Chat 🐱", en: "Cat 🐱", cs: "Kočka 🐱" },
            { fr: "Chien 🐕", en: "Dog 🐕", cs: "Pes 🐕" },
            { fr: "Oiseau 🐦", en: "Bird 🐦", cs: "Pták 🐦" }
          ],
          answer: 0,
          explanation: {
            fr: "Mouton commence par 'M' qui fait le son 'mmm' !",
            en: "Mouse starts with 'M' which makes the 'mmm' sound!",
            cs: "Myš začíná na 'M', které dělá zvuk 'mmm'!"
          }
        }
      ]
    }
  },
  {
    id: 'lang-rhyming-words-3-5',
    title: {
      fr: "Mots qui Riment",
      en: "Rhyming Words",
      cs: "Rýmující se Slova"
    },
    description: {
      fr: "Trouve les mots qui riment et crée de jolis poèmes",
      en: "Find rhyming words and create beautiful poems",
      cs: "Najdi rýmující se slova a vytvoř krásné básničky"
    },
    ageGroup: '3-5',
    subject: 'language',
    difficulty: 'easy',
    type: 'game',
    estimatedTime: 15,
    instructions: {
      fr: "Trouve le mot qui rime avec le mot donné !",
      en: "Find the word that rhymes with the given word!",
      cs: "Najdi slovo, které se rýmuje s daným slovem!"
    },
    objectives: [
      {
        fr: "Développer la conscience phonologique",
        en: "Develop phonological awareness",
        cs: "Rozvíjet fonologické povědomí"
      }
    ],
    content: {
      exercises: [
        {
          question: {
            fr: "Quel mot rime avec 'chat' ?",
            en: "Which word rhymes with 'cat'?",
            cs: "Které slovo se rýmuje s 'kout'?"
          },
          options: [
            { fr: "Rat 🐀", en: "Hat 🎩", cs: "Trout 🐟" },
            { fr: "Chien 🐕", en: "Dog 🐕", cs: "Pes 🐕" },
            { fr: "Oiseau 🐦", en: "Bird 🐦", cs: "Pták 🐦" },
            { fr: "Poisson 🐟", en: "Fish 🐟", cs: "Ryba 🐟" }
          ],
          answer: 0,
          explanation: {
            fr: "Chat et Rat riment ! Ils finissent tous les deux par '-at' !",
            en: "Cat and Hat rhyme! They both end with '-at'!",
            cs: "Kout a Trout se rýmují! Oba končí na '-out'!"
          }
        }
      ]
    }
  },
  {
    id: 'lang-simple-sentences-3-5',
    title: {
      fr: "Mes Premières Phrases",
      en: "My First Sentences",
      cs: "Moje První Věty"
    },
    description: {
      fr: "Apprends à construire tes premières phrases simples",
      en: "Learn to build your first simple sentences",
      cs: "Nauč se stavět své první jednoduché věty"
    },
    ageGroup: '3-5',
    subject: 'language',
    difficulty: 'easy',
    type: 'exercise',
    estimatedTime: 10,
    instructions: {
      fr: "Complète la phrase avec le bon mot !",
      en: "Complete the sentence with the right word!",
      cs: "Doplň větu správným slovem!"
    },
    objectives: [
      {
        fr: "Construire des phrases simples",
        en: "Build simple sentences",
        cs: "Stavět jednoduché věty"
      }
    ],
    content: {
      exercises: [
        {
          question: {
            fr: "Le chat ____ sur le tapis.",
            en: "The cat ____ on the mat.",
            cs: "Kočka ____ na koberci."
          },
          options: [
            { fr: "dort 😴", en: "sleeps 😴", cs: "spí 😴" },
            { fr: "vole 🦅", en: "flies 🦅", cs: "létá 🦅" },
            { fr: "nage 🏊", en: "swims 🏊", cs: "plave 🏊" },
            { fr: "chante 🎵", en: "sings 🎵", cs: "zpívá 🎵" }
          ],
          answer: 0,
          explanation: {
            fr: "Les chats aiment dormir sur des surfaces douces !",
            en: "Cats love to sleep on soft surfaces!",
            cs: "Kočky rády spí na měkkých površích!"
          }
        }
      ]
    }
  },

  // ACTIVITÉS FRANÇAISES - 6-8 ans
  {
    id: 'lang-word-families-6-8',
    title: {
      fr: "Familles de Mots",
      en: "Word Families",
      cs: "Rodiny Slov"
    },
    description: {
      fr: "Découvre comment les mots se ressemblent et se regroupent",
      en: "Discover how words are similar and group together",
      cs: "Objevuj, jak jsou si slova podobná a seskupují se"
    },
    ageGroup: '6-8',
    subject: 'language',
    difficulty: 'medium',
    type: 'exercise',
    estimatedTime: 18,
    instructions: {
      fr: "Trouve tous les mots de la même famille !",
      en: "Find all words from the same family!",
      cs: "Najdi všechna slova ze stejné rodiny!"
    },
    objectives: [
      {
        fr: "Comprendre les familles de mots",
        en: "Understand word families",
        cs: "Pochopit rodiny slov"
      }
    ],
    content: {
      exercises: [
        {
          question: {
            fr: "Quels mots appartiennent à la famille de 'chanter' ?",
            en: "Which words belong to the 'sing' family?",
            cs: "Která slova patří do rodiny 'zpívat'?"
          },
          options: [
            { fr: "chanson, chanteur 🎵", en: "song, singer 🎵", cs: "píseň, zpěvák 🎵" },
            { fr: "manger, dîner 🍽️", en: "eat, dinner 🍽️", cs: "jíst, večeře 🍽️" },
            { fr: "courir, marcher 🏃", en: "run, walk 🏃", cs: "běžet, chodit 🏃" },
            { fr: "rouge, bleu 🎨", en: "red, blue 🎨", cs: "červená, modrá 🎨" }
          ],
          answer: 0,
          explanation: {
            fr: "Chanter, chanson et chanteur viennent tous du même mot racine !",
            en: "Sing, song and singer all come from the same root word!",
            cs: "Zpívat, píseň a zpěvák pocházejí ze stejného kořenového slova!"
          }
        }
      ]
    }
  },
  {
    id: 'lang-syllables-counting-6-8',
    title: {
      fr: "Compteur de Syllabes",
      en: "Syllable Counter",
      cs: "Počítadlo Slabik"
    },
    description: {
      fr: "Apprends à découper les mots en syllabes",
      en: "Learn to break words into syllables",
      cs: "Nauč se rozdělit slova na slabiky"
    },
    ageGroup: '6-8',
    subject: 'language',
    difficulty: 'medium',
    type: 'exercise',
    estimatedTime: 12,
    instructions: {
      fr: "Compte le nombre de syllabes dans chaque mot !",
      en: "Count the number of syllables in each word!",
      cs: "Spočítej počet slabik v každém slově!"
    },
    objectives: [
      {
        fr: "Décomposer les mots en syllabes",
        en: "Break words into syllables",
        cs: "Rozložit slova na slabiky"
      }
    ],
    content: {
      exercises: [
        {
          question: {
            fr: "Combien de syllabes dans le mot 'papillon' ?",
            en: "How many syllables are in the word 'butterfly'?",
            cs: "Kolik slabik má slovo 'motýl'?"
          },
          options: [
            { fr: "3 syllabes (pa-pi-llon) 🦋", en: "3 syllables (but-ter-fly) 🦋", cs: "2 slabiky (mo-týl) 🦋" },
            { fr: "2 syllabes", en: "2 syllables", cs: "1 slabika" },
            { fr: "4 syllabes", en: "4 syllables", cs: "3 slabiky" },
            { fr: "1 syllabe", en: "1 syllable", cs: "4 slabiky" }
          ],
          answer: 0,
          explanation: {
            fr: "Pa-pi-llon = 3 syllabes ! Tape dans tes mains pour compter !",
            en: "But-ter-fly = 3 syllables! Clap your hands to count!",
            cs: "Mo-týl = 2 slabiky! Tleskej rukama pro počítání!"
          }
        }
      ]
    }
  },
  {
    id: 'lang-opposite-words-6-8',
    title: {
      fr: "Mots Contraires",
      en: "Opposite Words",
      cs: "Opačné Slova"
    },
    description: {
      fr: "Découvre les mots qui signifient le contraire",
      en: "Discover words that mean the opposite",
      cs: "Objevuj slova, která znamenají opak"
    },
    ageGroup: '6-8',
    subject: 'language',
    difficulty: 'medium',
    type: 'game',
    estimatedTime: 15,
    instructions: {
      fr: "Trouve le contraire de chaque mot !",
      en: "Find the opposite of each word!",
      cs: "Najdi opak každého slova!"
    },
    objectives: [
      {
        fr: "Enrichir le vocabulaire avec les antonymes",
        en: "Enrich vocabulary with antonyms",
        cs: "Obohatit slovník o antonyma"
      }
    ],
    content: {
      exercises: [
        {
          question: {
            fr: "Quel est le contraire de 'grand' ?",
            en: "What is the opposite of 'big'?",
            cs: "Co je opak slova 'velký'?"
          },
          options: [
            { fr: "petit 🐭", en: "small 🐭", cs: "malý 🐭" },
            { fr: "énorme 🐘", en: "huge 🐘", cs: "obrovský 🐘" },
            { fr: "moyen 🐕", en: "medium 🐕", cs: "střední 🐕" },
            { fr: "géant 🏗️", en: "giant 🏗️", cs: "obří 🏗️" }
          ],
          answer: 0,
          explanation: {
            fr: "Grand et petit sont des mots contraires !",
            en: "Big and small are opposite words!",
            cs: "Velký a malý jsou opačná slova!"
          }
        }
      ]
    }
  },

  // ACTIVITÉS FRANÇAISES - 9-12 ans
  {
    id: 'lang-conjugation-present-9-12',
    title: {
      fr: "Conjugaison au Présent",
      en: "Present Tense Conjugation",
      cs: "Konjugace v Přítomném Čase"
    },
    description: {
      fr: "Maîtrise la conjugaison des verbes au présent",
      en: "Master present tense verb conjugation",
      cs: "Ovládni konjugaci sloves v přítomném čase"
    },
    ageGroup: '9-12',
    subject: 'language',
    difficulty: 'hard',
    type: 'exercise',
    estimatedTime: 25,
    instructions: {
      fr: "Conjugue correctement les verbes au présent !",
      en: "Conjugate verbs correctly in present tense!",
      cs: "Správně konjuguj slovesa v přítomném čase!"
    },
    objectives: [
      {
        fr: "Maîtriser la conjugaison au présent",
        en: "Master present tense conjugation",
        cs: "Zvládnout konjugaci v přítomném čase"
      }
    ],
    content: {
      exercises: [
        {
          question: {
            fr: "Comment conjuguer 'aller' avec 'nous' ?",
            en: "How to conjugate 'go' with 'we'?",
            cs: "Jak konjugovat 'jít' s 'my'?"
          },
          options: [
            { fr: "nous allons 🚶‍♂️🚶‍♀️", en: "we go 🚶‍♂️🚶‍♀️", cs: "my jdeme 🚶‍♂️🚶‍♀️" },
            { fr: "nous allez", en: "we goes", cs: "my jde" },
            { fr: "nous aller", en: "we going", cs: "my jít" },
            { fr: "nous alla", en: "we went", cs: "my šel" }
          ],
          answer: 0,
          explanation: {
            fr: "Avec 'nous', le verbe 'aller' devient 'allons' !",
            en: "With 'we', the verb 'go' stays 'go'!",
            cs: "S 'my' sloveso 'jít' je 'jdeme'!"
          }
        }
      ]
    }
  },
  {
    id: 'lang-text-comprehension-9-12',
    title: {
      fr: "Compréhension de Texte",
      en: "Text Comprehension",
      cs: "Porozumění Textu"
    },
    description: {
      fr: "Améliore ta compréhension de textes complexes",
      en: "Improve your understanding of complex texts",
      cs: "Zlepši své porozumění složitým textům"
    },
    ageGroup: '9-12',
    subject: 'language',
    difficulty: 'hard',
    type: 'exercise',
    estimatedTime: 30,
    instructions: {
      fr: "Lis le texte et réponds aux questions de compréhension !",
      en: "Read the text and answer comprehension questions!",
      cs: "Přečti text a odpověz na otázky porozumění!"
    },
    objectives: [
      {
        fr: "Développer l'analyse critique de textes",
        en: "Develop critical text analysis",
        cs: "Rozvíjet kritickou analýzu textů"
      }
    ],
    content: {
      exercises: [
        {
          text: {
            fr: "Les abeilles sont des insectes essentiels à notre écosystème. Elles pollinisent les fleurs, permettant aux plantes de se reproduire...",
            en: "Bees are insects essential to our ecosystem. They pollinate flowers, allowing plants to reproduce...",
            cs: "Včely jsou hmyz nezbytný pro náš ekosystém. Opylují květiny, což umožňuje rostlinám se rozmnožovat..."
          },
          question: {
            fr: "Quelle est la fonction principale des abeilles décrite dans le texte ?",
            en: "What is the main function of bees described in the text?",
            cs: "Jaká je hlavní funkce včel popsaná v textu?"
          },
          options: [
            { fr: "Pollinisation 🌻", en: "Pollination 🌻", cs: "Opylování 🌻" },
            { fr: "Production de miel 🍯", en: "Honey production 🍯", cs: "Výroba medu 🍯" },
            { fr: "Construction de ruches 🏠", en: "Building hives 🏠", cs: "Stavba úlů 🏠" },
            { fr: "Vol en groupe ✈️", en: "Flying in groups ✈️", cs: "Létání ve skupinách ✈️" }
          ],
          answer: 0,
          explanation: {
            fr: "Le texte explique que les abeilles pollinisent les fleurs !",
            en: "The text explains that bees pollinate flowers!",
            cs: "Text vysvětluje, že včely opylují květiny!"
          }
        }
      ]
    }
  },
  {
    id: 'lang-writing-stories-9-12',
    title: {
      fr: "Écriture Créative",
      en: "Creative Writing",
      cs: "Kreativní Psaní"
    },
    description: {
      fr: "Développe ton imagination en écrivant des histoires originales",
      en: "Develop your imagination by writing original stories",
      cs: "Rozvíjej svou představivost psaním originálních příběhů"
    },
    ageGroup: '9-12',
    subject: 'language',
    difficulty: 'hard',
    type: 'creative',
    estimatedTime: 35,
    instructions: {
      fr: "Choisis les éléments pour créer ton histoire !",
      en: "Choose elements to create your story!",
      cs: "Vyber prvky pro vytvoření svého příběhu!"
    },
    objectives: [
      {
        fr: "Stimuler la créativité littéraire",
        en: "Stimulate literary creativity",
        cs: "Podněcovat literární kreativitu"
      }
    ],
    content: {
      exercises: [
        {
          question: {
            fr: "Quel début d'histoire préfères-tu ?",
            en: "Which story beginning do you prefer?",
            cs: "Který začátek příběhu preferuješ?"
          },
          options: [
            { fr: "Il était une fois dans une forêt enchantée... 🏰", en: "Once upon a time in an enchanted forest... 🏰", cs: "Bylo nebylo v kouzelném lese... 🏰" },
            { fr: "Dans l'espace, un vaisseau mystérieux... 🚀", en: "In space, a mysterious ship... 🚀", cs: "Ve vesmíru, tajemná loď... 🚀" },
            { fr: "Au fond de l'océan, une créature étrange... 🌊", en: "At the bottom of the ocean, a strange creature... 🌊", cs: "Na dně oceánu, podivný tvor... 🌊" },
            { fr: "Dans le futur, les robots... 🤖", en: "In the future, robots... 🤖", cs: "V budoucnosti, roboti... 🤖" }
          ],
          answer: 0,
          explanation: {
            fr: "Excellent choix ! Les histoires de forêt enchantée inspirent l'imagination !",
            en: "Great choice! Enchanted forest stories inspire imagination!",
            cs: "Výborná volba! Příběhy o kouzelném lese inspirují představivost!"
          }
        }
      ]
    }
  }
];

// Contenu SCIENCES
export const scienceContent: EducationalContent[] = [
  // 3-5 ans
  {
    id: 'science-weather-fun',
    title: {
      fr: "Météo Rigolote",
      en: "Fun Weather",
      cs: "Zábavné Počasí"
    },
    description: {
      fr: "Découvre les différents types de temps qu'il fait dehors",
      en: "Discover different types of weather outside",
      cs: "Objevuj různé druhy počasí venku"
    },
    ageGroup: '3-5',
    subject: 'science',
    difficulty: 'easy',
    type: 'game',
    estimatedTime: 12,
    instructions: {
      fr: "Regarde par la fenêtre et choisis le bon temps !",
      en: "Look out the window and choose the right weather!",
      cs: "Podívej se z okna a vyber správné počasí!"
    },
    objectives: [
      {
        fr: "Reconnaître les phénomènes météorologiques",
        en: "Recognize weather phenomena",
        cs: "Rozpoznávat meteorologické jevy"
      }
    ],
    content: {
      weather: [
        { type: { fr: "Ensoleillé", en: "Sunny", cs: "Slunečno" }, emoji: "☀️", clothes: "👕" },
        { type: { fr: "Pluvieux", en: "Rainy", cs: "Deštivo" }, emoji: "🌧️", clothes: "🧥" },
        { type: { fr: "Neigeux", en: "Snowy", cs: "Sníh" }, emoji: "❄️", clothes: "🧥" }
      ]
    }
  },

  // 6-8 ans
  {
    id: 'science-plants-growth',
    title: {
      fr: "Jardinage Magique",
      en: "Magic Gardening",
      cs: "Kouzelné Zahradničení"
    },
    description: {
      fr: "Apprends comment les plantes grandissent en plantant ta propre graine",
      en: "Learn how plants grow by planting your own seed",
      cs: "Nauč se, jak rostou rostliny, zasazením vlastního semínka"
    },
    ageGroup: '6-8',
    subject: 'science',
    difficulty: 'medium',
    type: 'experiment',
    estimatedTime: 25,
    instructions: {
      fr: "Suis les étapes pour faire pousser une plante virtuelle !",
      en: "Follow the steps to grow a virtual plant!",
      cs: "Postupuj podle kroků a vypěstuj virtuální rostlinu!"
    },
    objectives: [
      {
        fr: "Comprendre le cycle de vie des plantes",
        en: "Understand plant life cycle",
        cs: "Pochopit životní cyklus rostlin"
      }
    ],
    content: {
      stages: [
        { 
          name: { fr: "Graine", en: "Seed", cs: "Semínko" }, 
          emoji: "🌱", 
          needs: [
            { fr: "Eau", en: "Water", cs: "Voda" },
            { fr: "Soleil", en: "Sun", cs: "Slunce" }
          ]
        },
        { 
          name: { fr: "Pousse", en: "Sprout", cs: "Výhonek" }, 
          emoji: "🌿", 
          days: 7 
        }
      ]
    }
  }
];

// Contenu ART & CRÉATIVITÉ
export const artContent: EducationalContent[] = [
  // 3-5 ans
  {
    id: 'art-colors-mixing',
    title: {
      fr: "Mélanges de Couleurs",
      en: "Color Mixing",
      cs: "Míchání Barev"
    },
    description: {
      fr: "Découvre la magie des couleurs en les mélangeant",
      en: "Discover the magic of colors by mixing them",
      cs: "Objevuj kouzlo barev jejich mícháním"
    },
    ageGroup: '3-5',
    subject: 'art',
    difficulty: 'easy',
    type: 'creative',
    estimatedTime: 15,
    instructions: {
      fr: "Mélange deux couleurs pour voir ce qui se passe !",
      en: "Mix two colors to see what happens!",
      cs: "Smíchej dvě barvy a podívej se, co se stane!"
    },
    objectives: [
      {
        fr: "Découvrir les couleurs primaires et secondaires",
        en: "Discover primary and secondary colors",
        cs: "Objevit základní a druhotné barvy"
      }
    ],
    content: {
      exercises: [
        {
          question: {
            fr: "Que donne Rouge + Jaune ?",
            en: "What does Red + Yellow make?",
            cs: "Co vznikne z Červené + Žluté?"
          },
          options: [
            { fr: "Orange 🟠", en: "Orange 🟠", cs: "Oranžová 🟠" },
            { fr: "Vert 🟢", en: "Green 🟢", cs: "Zelená 🟢" },
            { fr: "Violet 🟣", en: "Purple 🟣", cs: "Fialová 🟣" },
            { fr: "Rose 🩷", en: "Pink 🩷", cs: "Růžová 🩷" }
          ],
          answer: 0,
          explanation: {
            fr: "Rouge + Jaune = Orange ! C'est une couleur secondaire.",
            en: "Red + Yellow = Orange! It's a secondary color.",
            cs: "Červená + Žlutá = Oranžová! To je druhotná barva."
          }
        }
      ]
    }
  },
  {
    id: 'art-shapes-recognition-3-5',
    title: {
      fr: "Reconnaissance de Formes",
      en: "Shape Recognition", 
      cs: "Rozpoznávání Tvarů"
    },
    description: {
      fr: "Apprends à reconnaître les formes géométriques de base",
      en: "Learn to recognize basic geometric shapes",
      cs: "Nauč se rozpoznávat základní geometrické tvary"
    },
    ageGroup: '3-5',
    subject: 'art',
    difficulty: 'easy',
    type: 'exercise',
    estimatedTime: 10,
    instructions: {
      fr: "Regarde bien et choisis la bonne forme !",
      en: "Look carefully and choose the right shape!",
      cs: "Pozorně se podívej a vyber správný tvar!"
    },
    objectives: [
      {
        fr: "Identifier les formes géométriques",
        en: "Identify geometric shapes",
        cs: "Identifikovat geometrické tvary"
      }
    ],
    content: {
      exercises: [
        {
          question: {
            fr: "Quelle forme a 3 côtés ?",
            en: "Which shape has 3 sides?",
            cs: "Který tvar má 3 strany?"
          },
          options: [
            { fr: "Triangle 🔺", en: "Triangle 🔺", cs: "Trojúhelník 🔺" },
            { fr: "Carré ⬜", en: "Square ⬜", cs: "Čtverec ⬜" },
            { fr: "Cercle ⭕", en: "Circle ⭕", cs: "Kruh ⭕" },
            { fr: "Rectangle ▬", en: "Rectangle ▬", cs: "Obdélník ▬" }
          ],
          answer: 0,
          explanation: {
            fr: "Le triangle a 3 côtés et 3 angles !",
            en: "A triangle has 3 sides and 3 angles!",
            cs: "Trojúhelník má 3 strany a 3 úhly!"
          }
        }
      ]
    }
  },
  {
    id: 'art-drawing-basics-3-5',
    title: {
      fr: "Premiers Dessins",
      en: "First Drawings",
      cs: "První Kresby"
    },
    description: {
      fr: "Dessine tes premiers chefs-d'œuvre !",
      en: "Draw your first masterpieces!",
      cs: "Nakresli svá první mistrovská díla!"
    },
    ageGroup: '3-5',
    subject: 'art',
    difficulty: 'easy',
    type: 'creative',
    estimatedTime: 20,
    instructions: {
      fr: "Suis les étapes pour dessiner !",
      en: "Follow the steps to draw!",
      cs: "Následuj kroky při kreslení!"
    },
    objectives: [
      {
        fr: "Développer la motricité fine",
        en: "Develop fine motor skills",
        cs: "Rozvíjet jemnou motoriku"
      }
    ],
    content: {
      exercises: [
        {
          question: {
            fr: "Comment dessiner un soleil ?",
            en: "How to draw a sun?",
            cs: "Jak nakreslit slunce?"
          },
          options: [
            { fr: "Cercle + rayons ☀️", en: "Circle + rays ☀️", cs: "Kruh + paprsky ☀️" },
            { fr: "Carré + lignes", en: "Square + lines", cs: "Čtverec + čáry" },
            { fr: "Triangle + points", en: "Triangle + dots", cs: "Trojúhelník + tečky" },
            { fr: "Ligne droite", en: "Straight line", cs: "Rovná čára" }
          ],
          answer: 0,
          explanation: {
            fr: "Un soleil = un cercle avec des rayons tout autour !",
            en: "A sun = a circle with rays all around!",
            cs: "Slunce = kruh s paprsky kolem dokola!"
          }
        }
      ]
    }
  },

  // 6-8 ans
  {
    id: 'art-color-theory-6-8',
    title: {
      fr: "Théorie des Couleurs",
      en: "Color Theory",
      cs: "Teorie Barev"
    },
    description: {
      fr: "Découvre les secrets des couleurs chaudes et froides",
      en: "Discover the secrets of warm and cool colors",
      cs: "Objevte tajemství teplých a studených barev"
    },
    ageGroup: '6-8',
    subject: 'art',
    difficulty: 'medium',
    type: 'exercise',
    estimatedTime: 15,
    instructions: {
      fr: "Apprends à classer les couleurs par température !",
      en: "Learn to classify colors by temperature!",
      cs: "Nauč se třídit barvy podle teploty!"
    },
    objectives: [
      {
        fr: "Comprendre les couleurs chaudes et froides",
        en: "Understand warm and cool colors",
        cs: "Porozumět teplým a studeným barvám"
      }
    ],
    content: {
      exercises: [
        {
          question: {
            fr: "Quelles sont les couleurs chaudes ?",
            en: "Which are the warm colors?",
            cs: "Které jsou teplé barvy?"
          },
          options: [
            { fr: "Rouge, Orange, Jaune 🔥", en: "Red, Orange, Yellow 🔥", cs: "Červená, Oranžová, Žlutá 🔥" },
            { fr: "Bleu, Vert, Violet ❄️", en: "Blue, Green, Purple ❄️", cs: "Modrá, Zelená, Fialová ❄️" },
            { fr: "Noir, Blanc, Gris", en: "Black, White, Gray", cs: "Černá, Bílá, Šedá" },
            { fr: "Toutes les couleurs", en: "All colors", cs: "Všechny barvy" }
          ],
          answer: 0,
          explanation: {
            fr: "Les couleurs chaudes rappellent le feu et le soleil !",
            en: "Warm colors remind us of fire and sun!",
            cs: "Teplé barvy připomínají oheň a slunce!"
          }
        }
      ]
    }
  },
  {
    id: 'art-famous-artists-6-8',
    title: {
      fr: "Artistes Célèbres",
      en: "Famous Artists",
      cs: "Slavní Umělci"
    },
    description: {
      fr: "Découvre les grands maîtres de la peinture",
      en: "Discover the great masters of painting",
      cs: "Objevte velké mistry malby"
    },
    ageGroup: '6-8',
    subject: 'art',
    difficulty: 'medium',
    type: 'exercise',
    estimatedTime: 12,
    instructions: {
      fr: "Apprends à reconnaître les styles artistiques !",
      en: "Learn to recognize artistic styles!",
      cs: "Nauč se rozpoznávat umělecké styly!"
    },
    objectives: [
      {
        fr: "Découvrir l'histoire de l'art",
        en: "Discover art history",
        cs: "Objevit dějiny umění"
      }
    ],
    content: {
      exercises: [
        {
          question: {
            fr: "Qui a peint la Joconde ?",
            en: "Who painted the Mona Lisa?",
            cs: "Kdo namaloval Monu Lisu?"
          },
          options: [
            { fr: "Léonard de Vinci 🎨", en: "Leonardo da Vinci 🎨", cs: "Leonardo da Vinci 🎨" },
            { fr: "Pablo Picasso", en: "Pablo Picasso", cs: "Pablo Picasso" },
            { fr: "Van Gogh", en: "Van Gogh", cs: "Van Gogh" },
            { fr: "Monet", en: "Monet", cs: "Monet" }
          ],
          answer: 0,
          explanation: {
            fr: "Léonard de Vinci a peint ce chef-d'œuvre au 16ème siècle !",
            en: "Leonardo da Vinci painted this masterpiece in the 16th century!",
            cs: "Leonardo da Vinci namaloval toto mistrovské dílo v 16. století!"
          }
        }
      ]
    }
  },
  {
    id: 'art-sculpture-basics-6-8',
    title: {
      fr: "Initiation à la Sculpture",
      en: "Introduction to Sculpture",
      cs: "Úvod do Sochařství"
    },
    description: {
      fr: "Découvre l'art de la sculpture et ses techniques",
      en: "Discover the art of sculpture and its techniques",
      cs: "Objevte umění sochařství a jeho techniky"
    },
    ageGroup: '6-8',
    subject: 'art',
    difficulty: 'medium',
    type: 'exercise',
    estimatedTime: 18,
    instructions: {
      fr: "Apprends les bases de la sculpture !",
      en: "Learn the basics of sculpture!",
      cs: "Naučte se základy sochařství!"
    },
    objectives: [
      {
        fr: "Comprendre les techniques de sculpture",
        en: "Understand sculpture techniques",
        cs: "Porozumět technikám sochařství"
      }
    ],
    content: {
      exercises: [
        {
          question: {
            fr: "Quel matériau est souvent utilisé en sculpture ?",
            en: "Which material is often used in sculpture?",
            cs: "Který materiál se často používá v sochařství?"
          },
          options: [
            { fr: "Argile 🏺", en: "Clay 🏺", cs: "Hlína 🏺" },
            { fr: "Papier 📄", en: "Paper 📄", cs: "Papír 📄" },
            { fr: "Tissu 🧵", en: "Fabric 🧵", cs: "Látka 🧵" },
            { fr: "Eau 💧", en: "Water 💧", cs: "Voda 💧" }
          ],
          answer: 0,
          explanation: {
            fr: "L'argile est parfaite pour modeler et créer des formes !",
            en: "Clay is perfect for modeling and creating shapes!",
            cs: "Hlína je perfektní pro modelování a vytváření tvarů!"
          }
        }
      ]
    }
  },

  // 9-12 ans
  {
    id: 'art-perspective-drawing-9-12',
    title: {
      fr: "Dessin en Perspective",
      en: "Perspective Drawing",
      cs: "Kreslení v Perspektivě"
    },
    description: {
      fr: "Maîtrise l'art de la perspective pour des dessins réalistes",
      en: "Master the art of perspective for realistic drawings",
      cs: "Ovládni umění perspektivy pro realistické kresby"
    },
    ageGroup: '9-12',
    subject: 'art',
    difficulty: 'hard',
    type: 'exercise',
    estimatedTime: 25,
    instructions: {
      fr: "Apprends à créer de la profondeur dans tes dessins !",
      en: "Learn to create depth in your drawings!",
      cs: "Naučte se vytvářet hloubku ve svých kresbách!"
    },
    objectives: [
      {
        fr: "Comprendre la perspective à un point de fuite",
        en: "Understand one-point perspective",
        cs: "Porozumět perspektivě s jedním úběžníkem"
      }
    ],
    content: {
      exercises: [
        {
          question: {
            fr: "À quoi sert le point de fuite en perspective ?",
            en: "What is the vanishing point used for in perspective?",
            cs: "K čemu slouží úběžník v perspektivě?"
          },
          options: [
            { fr: "Créer la profondeur 🎯", en: "Create depth 🎯", cs: "Vytvořit hloubku 🎯" },
            { fr: "Ajouter des couleurs", en: "Add colors", cs: "Přidat barvy" },
            { fr: "Dessiner des cercles", en: "Draw circles", cs: "Kreslit kruhy" },
            { fr: "Effacer le dessin", en: "Erase the drawing", cs: "Vymazat kresbu" }
          ],
          answer: 0,
          explanation: {
            fr: "Le point de fuite donne l'illusion de profondeur et de distance !",
            en: "The vanishing point gives the illusion of depth and distance!",
            cs: "Úběžník vytváří iluzi hloubky a vzdálenosti!"
          }
        }
      ]
    }
  },
  {
    id: 'art-art-movements-9-12',
    title: {
      fr: "Mouvements Artistiques",
      en: "Art Movements",
      cs: "Umělecké Směry"
    },
    description: {
      fr: "Explore les grands mouvements de l'art moderne",
      en: "Explore the great movements of modern art",
      cs: "Prozkoumejte velké směry moderního umění"
    },
    ageGroup: '9-12',
    subject: 'art',
    difficulty: 'hard',
    type: 'exercise',
    estimatedTime: 20,
    instructions: {
      fr: "Découvre les différents styles artistiques !",
      en: "Discover different artistic styles!",
      cs: "Objevte různé umělecké styly!"
    },
    objectives: [
      {
        fr: "Identifier les mouvements artistiques",
        en: "Identify artistic movements",
        cs: "Identifikovat umělecké směry"
      }
    ],
    content: {
      exercises: [
        {
          question: {
            fr: "Quel mouvement artistique se caractérise par des formes géométriques ?",
            en: "Which artistic movement is characterized by geometric shapes?",
            cs: "Který umělecký směr se vyznačuje geometrickými tvary?"
          },
          options: [
            { fr: "Cubisme 📐", en: "Cubism 📐", cs: "Kubismus 📐" },
            { fr: "Impressionnisme 🌅", en: "Impressionism 🌅", cs: "Impresionismus 🌅" },
            { fr: "Romantisme 💫", en: "Romanticism 💫", cs: "Romantismus 💫" },
            { fr: "Réalisme 📷", en: "Realism 📷", cs: "Realismus 📷" }
          ],
          answer: 0,
          explanation: {
            fr: "Le cubisme décompose les formes en figures géométriques !",
            en: "Cubism breaks down forms into geometric figures!",
            cs: "Kubismus rozkládá formy na geometrické útvary!"
          }
        }
      ]
    }
  }
];

// Export de tout le contenu éducatif
// Contenu placeholder pour nouvelles matières (sera enrichi)
export const computingContent: EducationalContent[] = [
  {
    id: 'computing-logic-sequences-3-5',
    title: { fr: 'Séquences Simples', en: 'Simple Sequences', cs: 'Jednoduché Sekvence' },
    description: { fr: 'Complète les suites logiques colorées', en: 'Complete the colorful logical sequences', cs: 'Doplň barevné logické řady' },
    ageGroup: '3-5',
    subject: 'computing',
    difficulty: 'easy',
    type: 'game',
    estimatedTime: 10,
    instructions: { fr: 'Glisse la bonne forme pour terminer la suite', en: 'Drag the right shape to finish the sequence', cs: 'Přetáhni správný tvar k dokončení řady' },
    objectives: [
      { fr: 'Introduire la logique séquentielle', en: 'Introduce sequential logic', cs: 'Seznámit se sekvenční logikou' }
    ],
    content: { patterns: ['🔵🟢🔵🟢?', '🟥🟥🟨🟥🟥🟨?'] }
  },
  {
    id: 'computing-categorize-3-5',
    title: { fr: 'Tri d’Objets', en: 'Object Sorting', cs: 'Třídění Předmětů' },
    description: { fr: 'Classe les objets selon leur forme ou couleur', en: 'Classify objects by shape or color', cs: 'Roztřiď předměty podle tvaru nebo barvy' },
    ageGroup: '3-5',
    subject: 'computing',
    difficulty: 'easy',
    type: 'exercise',
    estimatedTime: 8,
    instructions: { fr: 'Dépose chaque objet dans le bon panier', en: 'Drop each object into the correct basket', cs: 'Umísti každý předmět do správného košíku' },
    objectives: [ { fr: 'Développer la classification', en: 'Develop classification', cs: 'Rozvoj kategorizace' } ],
    content: { buckets: ['forme', 'couleur'], items: ['🔺','🔺','🔵','🟦','🟨'] }
  },
  {
    id: 'computing-instructions-3-5',
    title: { fr: 'Donner des Ordres', en: 'Giving Instructions', cs: 'Dávání Pokynů' },
    description: { fr: 'Ordonne les actions pour déplacer le robot', en: 'Order actions to move the robot', cs: 'Seřaď akce pro pohyb robota' },
    ageGroup: '3-5',
    subject: 'computing',
    difficulty: 'easy',
    type: 'game',
    estimatedTime: 12,
    instructions: { fr: 'Place les flèches dans le bon ordre', en: 'Place the arrows in the correct order', cs: 'Umísti šipky ve správném pořadí' },
    objectives: [ { fr: 'Comprendre la notion de programme', en: 'Understand the idea of a program', cs: 'Pochopit pojem programu' } ],
    content: { grid: '5x5', commands: ['⬆️','➡️','⬇️','⬅️'], target: '🎁' }
  },
  // 6-8 ans
  {
    id: 'computing-algorithm-basic-6-8',
    title: { fr: 'Algorithme Sandwich', en: 'Sandwich Algorithm', cs: 'Algoritmus Sendviče' },
    description: { fr: 'Mets les étapes dans l’ordre pour faire un sandwich', en: 'Put steps in order to make a sandwich', cs: 'Seřaď kroky pro výrobu sendviče' },
    ageGroup: '6-8',
    subject: 'computing',
    difficulty: 'medium',
    type: 'exercise',
    estimatedTime: 15,
    instructions: { fr: 'Glisse les cartes pour former la bonne séquence', en: 'Drag cards to build the right sequence', cs: 'Přetáhni karty do správné posloupnosti' },
    objectives: [ { fr: 'Comprendre étape par étape', en: 'Understand step-by-step', cs: 'Pochopit krok za krokem' } ],
    content: { steps: ['Prendre pain','Ajouter garniture','Fermer','Manger'], scramble: true }
  },
  {
    id: 'computing-debug-6-8',
    title: { fr: 'Debug du Robot', en: 'Robot Debugging', cs: 'Ladění Robota' },
    description: { fr: 'Corrige le chemin erroné du robot', en: 'Fix the robot’s wrong path', cs: 'Oprav chybnou cestu robota' },
    ageGroup: '6-8',
    subject: 'computing',
    difficulty: 'medium',
    type: 'game',
    estimatedTime: 18,
    instructions: { fr: 'Remplace les flèches incorrectes', en: 'Replace wrong arrows', cs: 'Nahraď špatné šipky' },
    objectives: [ { fr: 'Introduire le débogage', en: 'Introduce debugging', cs: 'Úvod do ladění' } ],
    content: { path: ['⬆️','⬆️','➡️','❌','⬆️'], fix: '⬅️' }
  },
  {
    id: 'computing-digital-safety-6-8',
    title: { fr: 'Sécurité Numérique', en: 'Digital Safety', cs: 'Digitální Bezpečnost' },
    description: { fr: 'Apprends les règles de base sur Internet', en: 'Learn basic online rules', cs: 'Nauč se základní pravidla online' },
    ageGroup: '6-8',
    subject: 'computing',
    difficulty: 'medium',
    type: 'quiz',
    estimatedTime: 12,
    instructions: { fr: 'Choisis si c’est sûr ou non', en: 'Choose if it is safe or not', cs: 'Vyber zda je to bezpečné' },
    objectives: [ { fr: 'Sensibiliser à la sécurité', en: 'Raise safety awareness', cs: 'Zvýšit povědomí o bezpečnosti' } ],
    content: { questions: [ { fr: 'Donner son adresse ?', en: 'Give home address?', cs: 'Dát svou adresu?' }, { fr: 'Dire bonjour', en: 'Say hello', cs: 'Pozdravit' } ], answers: [false,true] }
  },
  // 9-12 ans
  {
    id: 'computing-algorithm-flow-9-12',
    title: { fr: 'Flux Algorithmique', en: 'Algorithm Flow', cs: 'Tok Algoritmu' },
    description: { fr: 'Organise un algorithme en blocs logiques', en: 'Arrange an algorithm with logic blocks', cs: 'Uspořádej algoritmus pomocí logických bloků' },
    ageGroup: '9-12',
    subject: 'computing',
    difficulty: 'hard',
    type: 'exercise',
    estimatedTime: 25,
    instructions: { fr: 'Place début, répétition, condition, fin', en: 'Place start, loop, condition, end', cs: 'Umísti start, smyčku, podmínku, konec' },
    objectives: [ { fr: 'Structurer un programme', en: 'Structure a program', cs: 'Strukturovat program' } ],
    content: { blocks: ['Start','Loop','If','End'] }
  },
  {
    id: 'computing-hardware-basics-9-12',
    title: { fr: 'Matériel de Base', en: 'Hardware Basics', cs: 'Základy Hardwaru' },
    description: { fr: 'Associe composants à leur rôle', en: 'Match parts to their role', cs: 'Přiřaď části k jejich funkci' },
    ageGroup: '9-12',
    subject: 'computing',
    difficulty: 'hard',
    type: 'quiz',
    estimatedTime: 20,
    instructions: { fr: 'Relie composant et fonction', en: 'Match component and function', cs: 'Spoj komponentu a funkci' },
    objectives: [ { fr: 'Comprendre architecture simple', en: 'Understand simple architecture', cs: 'Pochopit jednoduchou architekturu' } ],
    content: { components: ['CPU','RAM','SSD'], roles: ['Stockage permanent','Traitement','Mémoire vive'] }
  },
  {
    id: 'computing-creative-coding-9-12',
    title: { fr: 'Création Animée', en: 'Animated Creation', cs: 'Animovaná Tvorba' },
    description: { fr: 'Construis une mini-animation de formes', en: 'Build a mini shape animation', cs: 'Vytvoř mini animaci tvarů' },
    ageGroup: '9-12',
    subject: 'computing',
    difficulty: 'hard',
    type: 'creative',
    estimatedTime: 30,
    instructions: { fr: 'Sélectionne formes et vitesse', en: 'Choose shapes and speed', cs: 'Vyber tvary a rychlost' },
    objectives: [ { fr: 'Stimuler la créativité logique', en: 'Boost logic creativity', cs: 'Podpořit logickou kreativitu' } ],
    content: { shapes: ['🔺','🟦','🟣'], params: ['speed','color'] }
  }
];

export const civicContent: EducationalContent[] = [
  {
    id: 'civic-sharing-3-5',
    title: { fr: 'Partager', en: 'Sharing', cs: 'Sdílení' },
    description: { fr: 'Apprends à partager les jouets avec les autres', en: 'Learn to share toys with others', cs: 'Nauč se sdílet hračky s ostatními' },
    ageGroup: '3-5',
    subject: 'civic',
    difficulty: 'easy',
    type: 'game',
    estimatedTime: 8,
    instructions: { fr: 'Distribue équitablement les objets', en: 'Distribute objects fairly', cs: 'Spravedlivě rozděl předměty' },
    objectives: [ { fr: 'Comprendre la notion de partage', en: 'Understand sharing', cs: 'Pochopit sdílení' } ],
    content: { items: ['🧸🧸🧸', '🚗🚗'] }
  },
  {
    id: 'civic-turns-3-5',
    title: { fr: 'Tour à Tour', en: 'Taking Turns', cs: 'Střídání' },
    description: { fr: 'Apprends à attendre ton tour', en: 'Learn to wait your turn', cs: 'Uč se čekat na svůj tah' },
    ageGroup: '3-5',
    subject: 'civic',
    difficulty: 'easy',
    type: 'exercise',
    estimatedTime: 6,
    instructions: { fr: 'Clique quand c’est ton tour', en: 'Click when it’s your turn', cs: 'Klikni až bude tvůj tah' },
    objectives: [ { fr: 'Développer patience', en: 'Develop patience', cs: 'Rozvoj trpělivosti' } ],
    content: { queue: ['👧','👦','🧒'] }
  },
  {
    id: 'civic-emotions-3-5',
    title: { fr: 'Émotions', en: 'Emotions', cs: 'Emoce' },
    description: { fr: 'Associe les visages aux sentiments', en: 'Match faces to feelings', cs: 'Spoj obličeje s pocity' },
    ageGroup: '3-5',
    subject: 'civic',
    difficulty: 'easy',
    type: 'quiz',
    estimatedTime: 7,
    instructions: { fr: 'Choisis le mot correct', en: 'Choose the right word', cs: 'Vyber správné slovo' },
    objectives: [ { fr: 'Identifier émotions', en: 'Identify emotions', cs: 'Identifikace emocí' } ],
    content: { faces: ['😊','😢','😡'], words: ['heureux','triste','en colère'] }
  },
  // 6-8 ans
  {
    id: 'civic-community-6-8',
    title: { fr: 'Rôles de la Commune', en: 'Community Roles', cs: 'Role Komunity' },
    description: { fr: 'Découvre les métiers qui aident', en: 'Discover helpful jobs', cs: 'Objev povolání co pomáhají' },
    ageGroup: '6-8',
    subject: 'civic',
    difficulty: 'medium',
    type: 'exercise',
    estimatedTime: 12,
    instructions: { fr: 'Associe métier et action', en: 'Match job and action', cs: 'Spoj povolání a činnost' },
    objectives: [ { fr: 'Comprendre services publics', en: 'Understand public services', cs: 'Pochopit veřejné služby' } ],
    content: { jobs: ['👩‍🚒','👮','👨‍⚕️'], actions: ['soigner','éteindre feu','protéger'] }
  },
  {
    id: 'civic-recycling-6-8',
    title: { fr: 'Recycler', en: 'Recycling', cs: 'Recyklace' },
    description: { fr: 'Trie déchets correctement', en: 'Sort waste correctly', cs: 'Správně třiď odpad' },
    ageGroup: '6-8',
    subject: 'civic',
    difficulty: 'medium',
    type: 'game',
    estimatedTime: 15,
    instructions: { fr: 'Glisse objet dans la bonne poubelle', en: 'Drag item to correct bin', cs: 'Přetáhni věc do správného koše' },
    objectives: [ { fr: 'Sensibiliser écologie', en: 'Raise eco awareness', cs: 'Zvýšit ekologické povědomí' } ],
    content: { bins: ['verre','plastique','papier'], items: ['🍾','📰','🧴'] }
  },
  {
    id: 'civic-teamwork-6-8',
    title: { fr: 'Travail d’Équipe', en: 'Teamwork', cs: 'Týmová Práce' },
    description: { fr: 'Choisis les bonnes stratégies de groupe', en: 'Choose good group strategies', cs: 'Vyber správné týmové strategie' },
    ageGroup: '6-8',
    subject: 'civic',
    difficulty: 'medium',
    type: 'quiz',
    estimatedTime: 10,
    instructions: { fr: 'Sélectionne bonne attitude', en: 'Select good attitude', cs: 'Vyber správný přístup' },
    objectives: [ { fr: 'Encourager coopération', en: 'Encourage cooperation', cs: 'Podpořit spolupráci' } ],
    content: { scenarios: ['Couper la parole','Partager idées','Ignorer'], good: [false,true,false] }
  },
  // 9-12 ans
  {
    id: 'civic-democracy-9-12',
    title: { fr: 'Mini Démocratie', en: 'Mini Democracy', cs: 'Mini Demokracie' },
    description: { fr: 'Vote sur un choix commun', en: 'Vote on a common choice', cs: 'Hlasuj o společné volbě' },
    ageGroup: '9-12',
    subject: 'civic',
    difficulty: 'hard',
    type: 'exercise',
    estimatedTime: 18,
    instructions: { fr: 'Organise un vote simple', en: 'Organize a simple vote', cs: 'Zorganizuj jednoduché hlasování' },
    objectives: [ { fr: 'Comprendre principe de vote', en: 'Understand voting principle', cs: 'Pochopit princip hlasování' } ],
    content: { options: ['Parc','Bibliothèque','Terrain'], votes: [3,5,2] }
  },
  {
    id: 'civic-conflict-9-12',
    title: { fr: 'Résoudre Conflit', en: 'Resolve Conflict', cs: 'Řešení Konfliktu' },
    description: { fr: 'Choisis étapes pour résoudre un désaccord', en: 'Choose steps to solve disagreement', cs: 'Vyber kroky k vyřešení sporu' },
    ageGroup: '9-12',
    subject: 'civic',
    difficulty: 'hard',
    type: 'exercise',
    estimatedTime: 20,
    instructions: { fr: 'Classe étapes en ordre', en: 'Order the steps', cs: 'Seřaď kroky' },
    objectives: [ { fr: 'Développer résolution de problème', en: 'Develop problem solving', cs: 'Rozvoj řešení problémů' } ],
    content: { steps: ['Écouter','Proposer solutions','Choisir ensemble'], scramble: true }
  },
  {
    id: 'civic-project-9-12',
    title: { fr: 'Projet Commun', en: 'Community Project', cs: 'Komunitní Projekt' },
    description: { fr: 'Planifier tâches et rôles', en: 'Plan tasks and roles', cs: 'Naplánuj úkoly a role' },
    ageGroup: '9-12',
    subject: 'civic',
    difficulty: 'hard',
    type: 'creative',
    estimatedTime: 25,
    instructions: { fr: 'Attribue chaque rôle', en: 'Assign each role', cs: 'Přiřaď každou roli' },
    objectives: [ { fr: 'Organisation collective', en: 'Collective organisation', cs: 'Kolektivní organizace' } ],
    content: { roles: ['Chef','Artiste','Porte-parole'], tasks: ['Plan','Affiche','Présentation'] }
  }
];

export const hygieneContent: EducationalContent[] = [
  {
    id: 'hygiene-handwash-3-5',
    title: { fr: 'Lavage des Mains', en: 'Hand Washing', cs: 'Mytí Rukou' },
    description: { fr: 'Apprends les étapes pour bien se laver les mains', en: 'Learn the steps to wash hands properly', cs: 'Nauč se kroky správného mytí rukou' },
    ageGroup: '3-5',
    subject: 'hygiene',
    difficulty: 'easy',
    type: 'exercise',
    estimatedTime: 5,
    instructions: { fr: 'Suis chaque étape: mouiller, savonner, frotter, rincer, sécher', en: 'Follow each step: wet, soap, scrub, rinse, dry', cs: 'Postupuj: namočit, namydlit, třít, opláchnout, osušit' },
    objectives: [ { fr: 'Adopter une routine saine', en: 'Adopt a healthy routine', cs: 'Osvojit si zdravou rutinu' } ],
    content: { steps: ['💧', '🧼', '🤲', '🚿', '🧻'] }
  },
  {
    id: 'hygiene-toothbrush-3-5',
    title: { fr: 'Se Brosser les Dents', en: 'Brushing Teeth', cs: 'Čištění Zubů' },
    description: { fr: 'Apprends le bon geste de brossage', en: 'Learn proper brushing moves', cs: 'Nauč se správné pohyby čištění' },
    ageGroup: '3-5',
    subject: 'hygiene',
    difficulty: 'easy',
    type: 'exercise',
    estimatedTime: 6,
    instructions: { fr: 'Brosse haut, bas, devant', en: 'Brush top, bottom, front', cs: 'Čisti horní, dolní, přední' },
    objectives: [ { fr: 'Hygiène bucco-dentaire', en: 'Oral hygiene', cs: 'Ústní hygiena' } ],
    content: { zones: ['↑','↓','☺️'] }
  },
  {
    id: 'hygiene-foods-3-5',
    title: { fr: 'Aliments Sains', en: 'Healthy Foods', cs: 'Zdravá Jídla' },
    description: { fr: 'Choisis les aliments bons pour ton corps', en: 'Pick foods good for your body', cs: 'Vyber jídla dobrá pro tělo' },
    ageGroup: '3-5',
    subject: 'hygiene',
    difficulty: 'easy',
    type: 'quiz',
    estimatedTime: 7,
    instructions: { fr: 'Clique sur les aliments sains', en: 'Click healthy foods', cs: 'Klikni na zdravá jídla' },
    objectives: [ { fr: 'Notions nutrition', en: 'Basic nutrition', cs: 'Základy výživy' } ],
    content: { options: ['🍎','🍭','🥦','🍟'], healthy: [true,false,true,false] }
  },
  // 6-8 ans
  {
    id: 'hygiene-balanced-plate-6-8',
    title: { fr: 'Assiette Équilibrée', en: 'Balanced Plate', cs: 'Vyvážený Talíř' },
    description: { fr: 'Compose une assiette équilibrée', en: 'Build a balanced plate', cs: 'Sestav vyvážený talíř' },
    ageGroup: '6-8',
    subject: 'hygiene',
    difficulty: 'medium',
    type: 'exercise',
    estimatedTime: 12,
    instructions: { fr: 'Choisis un aliment de chaque groupe', en: 'Pick one food from each group', cs: 'Vyber jedno jídlo z každé skupiny' },
    objectives: [ { fr: 'Comprendre groupes alimentaires', en: 'Understand food groups', cs: 'Pochopit skupiny potravin' } ],
    content: { groups: { fruits: ['🍎','🍌'], protéines: ['🍗','🥚'], céréales: ['🍞','🍚'] } }
  },
  {
    id: 'hygiene-exercise-6-8',
    title: { fr: 'Bouger Chaque Jour', en: 'Move Every Day', cs: 'Hýbej se Denně' },
    description: { fr: 'Crée ta mini routine d’exercices', en: 'Create your mini exercise routine', cs: 'Vytvoř si mini cvičební rutinu' },
    ageGroup: '6-8',
    subject: 'hygiene',
    difficulty: 'medium',
    type: 'creative',
    estimatedTime: 14,
    instructions: { fr: 'Choisis 3 mouvements', en: 'Choose 3 moves', cs: 'Vyber 3 pohyby' },
    objectives: [ { fr: 'Promouvoir activité physique', en: 'Promote activity', cs: 'Podpořit aktivitu' } ],
    content: { moves: ['🤸','🏃','🧘','🚴'] }
  },
  {
    id: 'hygiene-sleep-6-8',
    title: { fr: 'Sommeil Réparateur', en: 'Restful Sleep', cs: 'Kvalitní Spánek' },
    description: { fr: 'Prépare une bonne routine du soir', en: 'Prepare a good evening routine', cs: 'Připrav dobrou večerní rutinu' },
    ageGroup: '6-8',
    subject: 'hygiene',
    difficulty: 'medium',
    type: 'exercise',
    estimatedTime: 10,
    instructions: { fr: 'Classe les activités: avant ou après le coucher', en: 'Sort actions: before or after bed', cs: 'Roztřiď činnosti: před nebo po spaní' },
    objectives: [ { fr: 'Routine de sommeil', en: 'Sleep routine', cs: 'Spánková rutina' } ],
    content: { actions: ['🛁','📚','📱','😴'], goodBefore: ['🛁','📚'] }
  },
  // 9-12 ans
  {
    id: 'hygiene-mental-9-12',
    title: { fr: 'Bien-Être Mental', en: 'Mental Wellbeing', cs: 'Duševní Pohoda' },
    description: { fr: 'Techniques simples pour gérer le stress', en: 'Simple stress coping techniques', cs: 'Jednoduché techniky zvládání stresu' },
    ageGroup: '9-12',
    subject: 'hygiene',
    difficulty: 'hard',
    type: 'exercise',
    estimatedTime: 18,
    instructions: { fr: 'Choisis technique pour chaque situation', en: 'Pick a technique for each situation', cs: 'Vyber techniku pro každou situaci' },
    objectives: [ { fr: 'Favoriser santé mentale', en: 'Support mental health', cs: 'Podpořit duševní zdraví' } ],
    content: { situations: ['Nervosité','Colère'], techniques: ['Respiration','Parler','Pause'] }
  },
  {
    id: 'hygiene-puberty-9-12',
    title: { fr: 'Corps qui Change', en: 'Changing Body', cs: 'Měnící se Tělo' },
    description: { fr: 'Informations simples et respectueuses', en: 'Simple respectful info', cs: 'Jednoduché ohleduplné informace' },
    ageGroup: '9-12',
    subject: 'hygiene',
    difficulty: 'hard',
    type: 'story',
    estimatedTime: 20,
    instructions: { fr: 'Lis puis réponds aux questions basiques', en: 'Read then answer basic questions', cs: 'Přečti a odpověz' },
    objectives: [ { fr: 'Comprendre changements corporels', en: 'Understand body changes', cs: 'Pochopit změny těla' } ],
    content: { topics: ['Croissance','Émotions','Hygiène'] }
  },
  {
    id: 'hygiene-digital-9-12',
    title: { fr: 'Hygiène Digitale', en: 'Digital Hygiene', cs: 'Digitální Hygiena' },
    description: { fr: 'Bonnes pratiques écran & posture', en: 'Screen & posture best practices', cs: 'Nejlepší praktiky obrazovky a držení těla' },
    ageGroup: '9-12',
    subject: 'hygiene',
    difficulty: 'hard',
    type: 'quiz',
    estimatedTime: 15,
    instructions: { fr: 'Réponds vrai ou faux', en: 'Answer true or false', cs: 'Odpověz pravda nebo lež' },
    objectives: [ { fr: 'Prévenir fatigue', en: 'Prevent fatigue', cs: 'Předcházet únavě' } ],
    content: { statements: ['Regarder écran 5h sans pause est bon','Faire des pauses aide'], answers: [false,true] }
  }
];

export const anatomyContent: EducationalContent[] = [
  {
    id: 'anatomy-bodyparts-3-5',
    title: { fr: 'Parties du Corps', en: 'Body Parts', cs: 'Části Těla' },
    description: { fr: 'Identifie les parties visibles du corps', en: 'Identify visible body parts', cs: 'Rozpoznávej viditelné části těla' },
    ageGroup: '3-5',
    subject: 'anatomy',
    difficulty: 'easy',
    type: 'quiz',
    estimatedTime: 10,
    instructions: { fr: 'Clique sur la partie demandée', en: 'Click the requested part', cs: 'Klikni na požadovanou část' },
    objectives: [ { fr: 'Connaître les parties du corps', en: 'Know body parts', cs: 'Znát části těla' } ],
    content: { parts: ['👁️', '👂', '👃', '✋'] }
  },
  {
    id: 'anatomy-senses-3-5',
    title: { fr: 'Les 5 Sens', en: 'Five Senses', cs: 'Pět Smyslů' },
    description: { fr: 'Associe sens et symbole', en: 'Match sense and symbol', cs: 'Spoj smysl a symbol' },
    ageGroup: '3-5',
    subject: 'anatomy',
    difficulty: 'easy',
    type: 'exercise',
    estimatedTime: 8,
    instructions: { fr: 'Relie sens et image', en: 'Link sense and picture', cs: 'Spoj smysl a obrázek' },
    objectives: [ { fr: 'Découvrir les sens', en: 'Discover senses', cs: 'Objevit smysly' } ],
    content: { senses: ['👁️','👂','👅','👃','🤚'], nouns: ['voir','entendre','goûter','sentir','toucher'] }
  },
  {
    id: 'anatomy-skeleton-3-5',
    title: { fr: 'Petit Squelette', en: 'Little Skeleton', cs: 'Malá Kostra' },
    description: { fr: 'Découvre que le corps a des os', en: 'Discover the body has bones', cs: 'Objev že tělo má kosti' },
    ageGroup: '3-5',
    subject: 'anatomy',
    difficulty: 'easy',
    type: 'story',
    estimatedTime: 7,
    instructions: { fr: 'Lis et montre où sont les os', en: 'Read and show where bones are', cs: 'Přečti a ukaž kde jsou kosti' },
    objectives: [ { fr: 'Prendre conscience structure', en: 'Awareness of structure', cs: 'Vědomí struktury' } ],
    content: { bones: ['🦴','🦴'] }
  },
  // 6-8 ans
  {
    id: 'anatomy-organs-basic-6-8',
    title: { fr: 'Organes de Base', en: 'Basic Organs', cs: 'Základní Orgány' },
    description: { fr: 'Associe organe et fonction simple', en: 'Match organ and basic function', cs: 'Spoj orgán a základní funkci' },
    ageGroup: '6-8',
    subject: 'anatomy',
    difficulty: 'medium',
    type: 'exercise',
    estimatedTime: 14,
    instructions: { fr: 'Relie organe et phrase', en: 'Match organ and sentence', cs: 'Spoj orgán a větu' },
    objectives: [ { fr: 'Comprendre fonctions vitales', en: 'Understand vital functions', cs: 'Pochopit životní funkce' } ],
    content: { organs: ['❤️','🧠','🫁','🫀'], functions: ['Pompe le sang','Traite infos','Respire','Thinking dup'] }
  },
  {
    id: 'anatomy-circulation-6-8',
    title: { fr: 'Circulation', en: 'Circulation', cs: 'Oběh' },
    description: { fr: 'Suis le trajet du sang', en: 'Follow the blood path', cs: 'Sleduj cestu krve' },
    ageGroup: '6-8',
    subject: 'anatomy',
    difficulty: 'medium',
    type: 'game',
    estimatedTime: 16,
    instructions: { fr: 'Place étapes dans l’ordre', en: 'Order the steps', cs: 'Seřaď kroky' },
    objectives: [ { fr: 'Notion de circuit', en: 'Idea of circuit', cs: 'Pojem okruhu' } ],
    content: { steps: ['Cœur','Poumons','Cœur','Corps'], scramble: true }
  },
  {
    id: 'anatomy-digestion-6-8',
    title: { fr: 'Digestion', en: 'Digestion', cs: 'Trávení' },
    description: { fr: 'Les étapes du trajet des aliments', en: 'Food journey steps', cs: 'Cesta jídla' },
    ageGroup: '6-8',
    subject: 'anatomy',
    difficulty: 'medium',
    type: 'exercise',
    estimatedTime: 18,
    instructions: { fr: 'Classe les étapes', en: 'Sort the steps', cs: 'Roztřiď kroky' },
    objectives: [ { fr: 'Comprendre transformation', en: 'Understand transformation', cs: 'Pochopit přeměnu' } ],
    content: { pipeline: ['Bouche','Estomac','Intestin'], order: true }
  },
  // 9-12 ans
  {
    id: 'anatomy-nervous-9-12',
    title: { fr: 'Système Nerveux', en: 'Nervous System', cs: 'Nervová Soustava' },
    description: { fr: 'Voie du message nerveux simple', en: 'Path of a simple nerve signal', cs: 'Dráha jednoduchého nervového signálu' },
    ageGroup: '9-12',
    subject: 'anatomy',
    difficulty: 'hard',
    type: 'exercise',
    estimatedTime: 22,
    instructions: { fr: 'Relie stimuli et réponse', en: 'Link stimulus and response', cs: 'Spoj podnět a reakci' },
    objectives: [ { fr: 'Notion de transmission', en: 'Idea of transmission', cs: 'Pojem přenosu' } ],
    content: { chain: ['Stimulus','Nerf','Cerveau','Muscle'] }
  },
  {
    id: 'anatomy-respiration-9-12',
    title: { fr: 'Respiration', en: 'Respiration', cs: 'Dýchání' },
    description: { fr: 'Échanges air et sang', en: 'Air and blood exchange', cs: 'Výměna vzduchu a krve' },
    ageGroup: '9-12',
    subject: 'anatomy',
    difficulty: 'hard',
    type: 'exercise',
    estimatedTime: 20,
    instructions: { fr: 'Complète le schéma', en: 'Complete the diagram', cs: 'Doplň schéma' },
    objectives: [ { fr: 'Comprendre oxygénation', en: 'Understand oxygenation', cs: 'Pochopit okysličení' } ],
    content: { parts: ['Nez','Trachée','Poumons'] }
  },
  {
    id: 'anatomy-nutrition-9-12',
    title: { fr: 'Nutrition & Transport', en: 'Nutrition & Transport', cs: 'Výživa a Transport' },
    description: { fr: 'Comment nutriments voyagent', en: 'How nutrients travel', cs: 'Jak živiny putují' },
    ageGroup: '9-12',
    subject: 'anatomy',
    difficulty: 'hard',
    type: 'story',
    estimatedTime: 24,
    instructions: { fr: 'Lis le trajet et réponds', en: 'Read the path and answer', cs: 'Přečti cestu a odpověz' },
    objectives: [ { fr: 'Relier systèmes', en: 'Connect systems', cs: 'Propojit soustavy' } ],
    content: { systems: ['Digestif','Circulatoire'] }
  }
];

export const educationalContent = {
  math: mathContent,
  language: languageContent,
  science: scienceContent,
  art: artContent,
  computing: computingContent,
  civic: civicContent,
  hygiene: hygieneContent,
  anatomy: anatomyContent
};

// Fonction pour obtenir le contenu par âge et matière
export const getContentByAgeAndSubject = (
  ageGroup: '3-5' | '6-8' | '9-12', 
  subject: 'math' | 'language' | 'science' | 'art' | 'computing' | 'civic' | 'hygiene' | 'anatomy',
  language: SupportedLanguage = 'fr'
): EducationalContent[] => {
  try {
    // PRIORITÉ SPÉCIALE : Contenu scientifique avec classification experte
    if (subject === 'science') {
      try {
        const { comprehensiveScientificContent } = require('./scientificClassification');
        const scientificContent = comprehensiveScientificContent.filter((activity: EducationalContent) => 
          activity.ageGroup === ageGroup && activity.subject === subject
        );
        
        if (scientificContent && scientificContent.length > 0) {
          console.log(`[DEBUG] 🔬 SCIENCES EXPERTES: ${scientificContent.length} activités scientifiques ${ageGroup} avec classification taxonomique`);
          return scientificContent;
        }
      } catch (scientificError) {
        console.warn('Contenu scientifique expert non disponible, passage au contenu standard');
      }
    }

    // 1. Essayer le contenu généré automatiquement (65+ activités par matière)
    const { getGeneratedContentBySubject } = require('./generatedActivities');
    const generatedContent = getGeneratedContentBySubject(subject, ageGroup);
    
    if (generatedContent && generatedContent.length > 0) {
      console.log(`[DEBUG] ✅ ${generatedContent.length} activités GÉNÉRÉES ${subject} pour ${ageGroup}`);
      return generatedContent;
    }

    // 2. Fallback sur le contenu complet manuel
    const { getComprehensiveContentBySubject } = require('./comprehensiveEducationalContent');
    const comprehensiveContent = getComprehensiveContentBySubject(subject, ageGroup);
    
    if (comprehensiveContent && comprehensiveContent.length > 0) {
      console.log(`[DEBUG] ✅ ${comprehensiveContent.length} activités MANUELLES ${subject} pour ${ageGroup}`);
      return comprehensiveContent;
    }
  } catch (error) {
    console.error('Erreur lors du chargement du contenu étendu:', error);
  }
  
  // 3. Fallback final sur l'ancien contenu
  try {
    const oldContent = (educationalContent as any)[subject]?.filter((content: EducationalContent) => content.ageGroup === ageGroup) || [];
    console.log(`[DEBUG] ⚠️ Fallback: ${oldContent.length} activités ANCIENNES ${subject} pour ${ageGroup}`);
    return oldContent;
  } catch (error) {
    console.error('Erreur fallback:', error);
    return [];
  }
};

// Fonction pour obtenir le contenu enrichi séparément
export const getEnrichedContent = async () => {
  const { allEnrichedContent } = await import('./enrichedContent');
  return allEnrichedContent;
};

// Fonction pour obtenir le contenu scientifique avec classification experte
export const getScientificClassificationContent = async () => {
  const { comprehensiveScientificContent, scientificCategories } = await import('./scientificClassification');
  return { scientificContent: comprehensiveScientificContent, categories: scientificCategories };
};