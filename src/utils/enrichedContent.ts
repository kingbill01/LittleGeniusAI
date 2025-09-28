// Contenu éducatif enrichi - Nouvelles activités avancées
import { EducationalContent } from './educationalContent';

// Nouvelles activités mathématiques enrichies
export const enrichedMathContent: EducationalContent[] = [
  {
    id: 'math-calculator-game',
    title: {
      fr: "Ma Première Calculatrice",
      en: "My First Calculator",
      cs: "Moje První Kalkulačka"
    },
    description: {
      fr: "Apprends les additions et soustractions avec une calculatrice interactive",
      en: "Learn addition and subtraction with an interactive calculator",
      cs: "Nauč se sčítání a odčítání s interaktivní kalkulačkou"
    },
    ageGroup: '6-8',
    subject: 'math',
    difficulty: 'medium',
    type: 'interactive',
    estimatedTime: 15,
    instructions: {
      fr: "Utilise la calculatrice pour résoudre les problèmes. Clique sur les chiffres et les opérations !",
      en: "Use the calculator to solve problems. Click on numbers and operations!",
      cs: "Použij kalkulačku k řešení úloh. Klikni na čísla a operace!"
    },
    objectives: [
      {
        fr: "Maîtriser l'addition et la soustraction",
        en: "Master addition and subtraction",
        cs: "Zvládnout sčítání a odčítání"
      },
      {
        fr: "Utiliser les outils mathématiques",
        en: "Use mathematical tools",
        cs: "Používat matematické nástroje"
      }
    ],
    content: {
      interactive: {
        type: 'calculator',
        problems: [
          { expression: '5 + 3', answer: 8 },
          { expression: '10 - 4', answer: 6 },
          { expression: '7 + 2', answer: 9 }
        ]
      }
    },
    badges: [
      {
        fr: "Maître Calculateur",
        en: "Calculator Master",
        cs: "Mistr Kalkulačky"
      }
    ],
    hints: [
      {
        fr: "Compte sur tes doigts si tu as besoin d'aide",
        en: "Count on your fingers if you need help",
        cs: "Počítej na prstech, pokud potřebuješ pomoc"
      }
    ],
    rewards: {
      points: 150,
      stars: 3,
      unlocks: ["math-geometry-builder"]
    },
    tags: ["calculator", "addition", "subtraction", "interactive"],
    multimedia: {
      audio: ["calculator-sounds.mp3"],
      images: ["calculator-interface.png"]
    }
  },
  {
    id: 'math-geometry-builder',
    title: {
      fr: "Constructeur de Formes",
      en: "Shape Builder",
      cs: "Stavitel Tvarů"
    },
    description: {
      fr: "Construis des maisons et des châteaux avec des formes géométriques",
      en: "Build houses and castles with geometric shapes",
      cs: "Stavěj domy a hrady z geometrických tvarů"
    },
    ageGroup: '6-8',
    subject: 'math',
    difficulty: 'medium',
    type: 'creative',
    estimatedTime: 20,
    instructions: {
      fr: "Glisse et dépose les formes pour créer tes constructions. Utilise des triangles, carrés et cercles !",
      en: "Drag and drop shapes to create your buildings. Use triangles, squares and circles!",
      cs: "Přetahuj tvary a vytvoř své stavby. Používej trojúhelníky, čtverce a kruhy!"
    },
    objectives: [
      {
        fr: "Reconnaître les formes géométriques",
        en: "Recognize geometric shapes",
        cs: "Rozpoznávat geometrické tvary"
      },
      {
        fr: "Développer la créativité spatiale",
        en: "Develop spatial creativity",
        cs: "Rozvíjet prostorovou kreativitu"
      }
    ],
    content: {
      creative: {
        type: 'shape-builder',
        availableShapes: ['triangle', 'square', 'circle', 'rectangle'],
        templates: [
          { name: 'house', shapes: ['triangle', 'square'] },
          { name: 'castle', shapes: ['rectangle', 'triangle', 'circle'] }
        ]
      }
    },
    badges: [
      {
        fr: "Architecte Junior",
        en: "Junior Architect",
        cs: "Mladší Architekt"
      }
    ],
    rewards: {
      points: 200,
      stars: 4,
      unlocks: ["math-pattern-master"]
    },
    tags: ["geometry", "creativity", "building", "shapes"],
    multimedia: {
      images: ["shape-library.png", "construction-examples.png"]
    }
  }
];

// Nouvelles activités de science enrichies
export const enrichedScienceContent: EducationalContent[] = [
  {
    id: 'science-virtual-lab',
    title: {
      fr: "Mon Laboratoire Virtuel",
      en: "My Virtual Lab",
      cs: "Má Virtuální Laboratoř"
    },
    description: {
      fr: "Expérimente en toute sécurité avec des réactions chimiques amusantes",
      en: "Experiment safely with fun chemical reactions",
      cs: "Experimentuj bezpečně se zábavnými chemickými reakcemi"
    },
    ageGroup: '9-12',
    subject: 'science',
    difficulty: 'hard',
    type: 'simulation',
    estimatedTime: 25,
    instructions: {
      fr: "Mélange différents ingrédients pour voir ce qui se passe. Observe les couleurs et les bulles !",
      en: "Mix different ingredients to see what happens. Watch the colors and bubbles!",
      cs: "Smíchej různé ingredience a pozoruj, co se stane. Sleduj barvy a bubliny!"
    },
    objectives: [
      {
        fr: "Comprendre les réactions chimiques de base",
        en: "Understand basic chemical reactions",
        cs: "Porozumět základním chemickým reakcím"
      },
      {
        fr: "Développer l'esprit scientifique",
        en: "Develop scientific thinking",
        cs: "Rozvíjet vědecké myšlení"
      }
    ],
    content: {
      simulation: {
        type: 'chemistry-lab',
        experiments: [
          {
            name: 'volcano',
            ingredients: ['baking-soda', 'vinegar', 'food-coloring'],
            result: 'eruption'
          },
          {
            name: 'slime',
            ingredients: ['glue', 'water', 'borax'],
            result: 'stretchy-slime'
          }
        ]
      }
    },
    materials: [
      {
        fr: "Écran d'ordinateur ou tablette",
        en: "Computer or tablet screen",
        cs: "Obrazovka počítače nebo tabletu"
      }
    ],
    vocabulary: {
      'reaction': {
        fr: "Réaction - quand deux substances se mélangent et changent",
        en: "Reaction - when two substances mix and change",
        cs: "Reakce - když se dvě látky smíchají a změní se"
      }
    },
    badges: [
      {
        fr: "Petit Scientifique",
        en: "Little Scientist",
        cs: "Malý Vědec"
      }
    ],
    rewards: {
      points: 300,
      stars: 5,
      unlocks: ["science-ecosystem-explorer"]
    },
    tags: ["chemistry", "experiments", "simulation", "reactions"],
    multimedia: {
      videos: ["lab-safety.mp4", "chemical-reactions.mp4"],
      audio: ["bubbling-sounds.mp3"]
    }
  }
];

// Nouvelles activités artistiques enrichies
export const enrichedArtContent: EducationalContent[] = [
  {
    id: 'art-digital-painter',
    title: {
      fr: "Peintre Digital",
      en: "Digital Painter",
      cs: "Digitální Malíř"
    },
    description: {
      fr: "Crée des œuvres d'art magnifiques avec des pinceaux virtuels",
      en: "Create beautiful artworks with virtual brushes",
      cs: "Vytvoř krásná umělecká díla s virtuálními štětci"
    },
    ageGroup: '6-8',
    subject: 'art',
    difficulty: 'medium',
    type: 'drawing',
    estimatedTime: 30,
    instructions: {
      fr: "Choisis tes couleurs et pinceaux. Laisse libre cours à ton imagination !",
      en: "Choose your colors and brushes. Let your imagination run free!",
      cs: "Vyber si barvy a štětce. Nech volný průchod své fantazii!"
    },
    objectives: [
      {
        fr: "Exprimer sa créativité",
        en: "Express creativity",
        cs: "Vyjádřit kreativitu"
      },
      {
        fr: "Apprendre les couleurs et leurs mélanges",
        en: "Learn colors and their mixing",
        cs: "Naučit se barvy a jejich míchání"
      }
    ],
    content: {
      drawing: {
        type: 'digital-canvas',
        tools: ['brush', 'pencil', 'eraser', 'fill'],
        colors: ['red', 'blue', 'yellow', 'green', 'purple', 'orange'],
        templates: ['landscape', 'portrait', 'abstract', 'animals']
      }
    },
    badges: [
      {
        fr: "Artiste Numérique",
        en: "Digital Artist",
        cs: "Digitální Umělec"
      }
    ],
    hints: [
      {
        fr: "Mélange le rouge et le jaune pour faire de l'orange",
        en: "Mix red and yellow to make orange",
        cs: "Smíchej červenou a žlutou pro oranžovou"
      }
    ],
    rewards: {
      points: 180,
      stars: 3,
      unlocks: ["art-music-composer"]
    },
    tags: ["painting", "digital", "colors", "creativity"],
    multimedia: {
      images: ["color-wheel.png", "brush-types.png"],
      audio: ["painting-ambient.mp3"]
    }
  },
  {
    id: 'art-music-composer',
    title: {
      fr: "Compositeur de Musique",
      en: "Music Composer",
      cs: "Hudební Skladatel"
    },
    description: {
      fr: "Compose tes propres mélodies avec des instruments virtuels",
      en: "Compose your own melodies with virtual instruments",
      cs: "Skladej své vlastní melodie s virtuálními nástroji"
    },
    ageGroup: '6-8',
    subject: 'art',
    difficulty: 'medium',
    type: 'music',
    estimatedTime: 20,
    instructions: {
      fr: "Clique sur les notes pour créer ta mélodie. Écoute ce que tu crées !",
      en: "Click on notes to create your melody. Listen to what you create!",
      cs: "Klikni na noty a vytvoř svou melodii. Poslouchej, co vytváříš!"
    },
    objectives: [
      {
        fr: "Découvrir les bases de la musique",
        en: "Discover music basics",
        cs: "Objevit základy hudby"
      },
      {
        fr: "Développer l'oreille musicale",
        en: "Develop musical ear",
        cs: "Rozvíjet hudební sluch"
      }
    ],
    content: {
      music: {
        type: 'composer',
        instruments: ['piano', 'guitar', 'drums', 'flute'],
        notes: ['do', 're', 'mi', 'fa', 'sol', 'la', 'si'],
        rhythms: ['slow', 'medium', 'fast']
      }
    },
    badges: [
      {
        fr: "Petit Mozart",
        en: "Little Mozart",
        cs: "Malý Mozart"
      }
    ],
    rewards: {
      points: 160,
      stars: 3,
      unlocks: ["art-story-creator"]
    },
    tags: ["music", "composition", "instruments", "creativity"],
    multimedia: {
      audio: ["instrument-samples.mp3", "melody-examples.mp3"]
    }
  }
];

// Export de tout le contenu enrichi
export const allEnrichedContent = [
  ...enrichedMathContent,
  ...enrichedScienceContent,
  ...enrichedArtContent
];