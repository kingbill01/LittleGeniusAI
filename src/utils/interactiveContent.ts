// Contenu éducatif interactif inspiré des meilleures pratiques
import { EducationalContent } from './educationalContent';

// Activités écologiques interactives
export const ecoInteractiveContent: EducationalContent[] = [
  {
    id: 'eco-reduce-reuse-recycle',
    title: {
      fr: "Réduire, Réutiliser, Recycler",
      en: "Reduce, Reuse, Recycle",
      cs: "Snížit, Znovu použít, Recyklovat"
    },
    description: {
      fr: "Apprends à protéger notre planète en triant et recyclant les déchets",
      en: "Learn to protect our planet by sorting and recycling waste",
      cs: "Nauč se chránit naši planetu třídíním a recyklací odpadu"
    },
    ageGroup: '6-8',
    subject: 'science',
    difficulty: 'easy',
    type: 'interactive',
    estimatedTime: 15,
    instructions: {
      fr: "Glisse les objets dans les bonnes poubelles ! Chaque déchet a sa place pour protéger la nature.",
      en: "Drag objects into the correct bins! Every waste has its place to protect nature.",
      cs: "Přetáhni předměty do správných košů! Každý odpad má své místo pro ochranu přírody."
    },
    objectives: [
      {
        fr: "Comprendre l'importance du recyclage",
        en: "Understand the importance of recycling",
        cs: "Pochopit důležitost recyklace"
      },
      {
        fr: "Identifier les différents types de déchets",
        en: "Identify different types of waste",
        cs: "Identifikovat různé typy odpadu"
      }
    ],
    content: {
      interactive: {
        type: 'drag-drop-sorting',
        items: [
          { id: 'plastic-bottle', name: { fr: 'Bouteille plastique', en: 'Plastic bottle', cs: 'Plastová láhev' }, category: 'plastic', emoji: '🍶' },
          { id: 'apple-core', name: { fr: 'Trognon de pomme', en: 'Apple core', cs: 'Jablečný ohryzek' }, category: 'organic', emoji: '🍎' },
          { id: 'newspaper', name: { fr: 'Journal', en: 'Newspaper', cs: 'Noviny' }, category: 'paper', emoji: '📰' },
          { id: 'glass-jar', name: { fr: 'Pot en verre', en: 'Glass jar', cs: 'Skleněná nádoba' }, category: 'glass', emoji: '🫙' },
          { id: 'banana-peel', name: { fr: 'Peau de banane', en: 'Banana peel', cs: 'Banánová slupka' }, category: 'organic', emoji: '🍌' },
          { id: 'tin-can', name: { fr: 'Boîte de conserve', en: 'Tin can', cs: 'Plechovka' }, category: 'metal', emoji: '🥫' }
        ],
        bins: [
          { id: 'plastic', name: { fr: 'Plastique', en: 'Plastic', cs: 'Plast' }, color: '#ffeb3b', emoji: '♻️' },
          { id: 'organic', name: { fr: 'Organique', en: 'Organic', cs: 'Organický' }, color: '#4caf50', emoji: '🌱' },
          { id: 'paper', name: { fr: 'Papier', en: 'Paper', cs: 'Papír' }, color: '#2196f3', emoji: '📄' },
          { id: 'glass', name: { fr: 'Verre', en: 'Glass', cs: 'Sklo' }, color: '#00bcd4', emoji: '🪟' },
          { id: 'metal', name: { fr: 'Métal', en: 'Metal', cs: 'Kov' }, color: '#9e9e9e', emoji: '🔩' }
        ]
      }
    },
    hints: [
      {
        fr: "Les bouteilles en plastique vont dans le bac jaune",
        en: "Plastic bottles go in the yellow bin",
        cs: "Plastové láhve patří do žlutého koše"
      },
      {
        fr: "Les restes de nourriture sont des déchets organiques",
        en: "Food scraps are organic waste",
        cs: "Zbytky jídla jsou organický odpad"
      }
    ],
    rewards: {
      points: 200,
      stars: 4,
      unlocks: ['eco-energy-saver']
    },
    badges: [
      {
        fr: "Gardien de la Planète",
        en: "Planet Guardian",
        cs: "Strážce Planety"
      }
    ],
    tags: ['ecology', 'recycling', 'environment', 'sorting']
  },

  {
    id: 'math-number-patterns',
    title: {
      fr: "Détective des Nombres",
      en: "Number Detective",
      cs: "Číselný Detektiv"
    },
    description: {
      fr: "Découvre les secrets des suites de nombres et deviens un vrai détective mathématique",
      en: "Discover the secrets of number sequences and become a true math detective",
      cs: "Objevuj tajemství číselných řad a staň se skutečným matematickým detektivem"
    },
    ageGroup: '6-8',
    subject: 'math',
    difficulty: 'medium',
    type: 'interactive',
    estimatedTime: 12,
    instructions: {
      fr: "Observe bien les nombres et trouve celui qui manque dans chaque suite !",
      en: "Look carefully at the numbers and find the missing one in each sequence!",
      cs: "Pozorně si prohlédni čísla a najdi chybějící v každé řadě!"
    },
    objectives: [
      {
        fr: "Reconnaître les suites numériques",
        en: "Recognize number sequences",
        cs: "Rozpoznat číselné řady"
      },
      {
        fr: "Développer la logique mathématique",
        en: "Develop mathematical logic",
        cs: "Rozvíjet matematickou logiku"
      }
    ],
    content: {
      interactive: {
        type: 'number-sequence',
        sequences: [
          { pattern: [2, 4, 6, '?', 10], answer: 8, rule: '+2' },
          { pattern: [1, 3, 5, '?', 9], answer: 7, rule: '+2' },
          { pattern: [10, 8, 6, '?', 2], answer: 4, rule: '-2' },
          { pattern: [1, 2, 4, '?', 16], answer: 8, rule: '×2' },
          { pattern: [3, 6, 9, '?', 15], answer: 12, rule: '+3' }
        ]
      }
    },
    hints: [
      {
        fr: "Regarde la différence entre chaque nombre",
        en: "Look at the difference between each number",
        cs: "Podívej se na rozdíl mezi každým číslem"
      }
    ],
    rewards: {
      points: 150,
      stars: 3,
      unlocks: ['math-shape-patterns']
    },
    badges: [
      {
        fr: "Sherlock des Maths",
        en: "Math Sherlock",
        cs: "Matematický Sherlock"
      }
    ],
    tags: ['patterns', 'sequences', 'logic', 'numbers']
  },

  {
    id: 'language-story-builder',
    title: {
      fr: "Créateur d'Histoires Magiques",
      en: "Magic Story Builder",
      cs: "Tvůrce Kouzelných Příběhů"
    },
    description: {
      fr: "Crée tes propres histoires en choisissant les personnages, lieux et aventures",
      en: "Create your own stories by choosing characters, places and adventures",
      cs: "Vytvoř si vlastní příběhy výběrem postav, míst a dobrodružství"
    },
    ageGroup: '6-8',
    subject: 'language',
    difficulty: 'medium',
    type: 'creative',
    estimatedTime: 20,
    instructions: {
      fr: "Choisis un héros, un lieu magique et une quête pour créer ton histoire unique !",
      en: "Choose a hero, a magical place and a quest to create your unique story!",
      cs: "Vyber si hrdinu, kouzelné místo a úkol pro vytvoření svého jedinečného příběhu!"
    },
    objectives: [
      {
        fr: "Développer la créativité narrative",
        en: "Develop narrative creativity",
        cs: "Rozvíjet narativní kreativitu"
      },
      {
        fr: "Enrichir le vocabulaire",
        en: "Enrich vocabulary",
        cs: "Obohatit slovní zásobu"
      }
    ],
    content: {
      creative: {
        type: 'story-generator',
        elements: {
          heroes: [
            { name: { fr: 'Princesse Luna', en: 'Princess Luna', cs: 'Princezna Luna' }, emoji: '👸' },
            { name: { fr: 'Chevalier Étoile', en: 'Knight Star', cs: 'Rytíř Hvězda' }, emoji: '🤴' },
            { name: { fr: 'Sorcière Gentille', en: 'Kind Witch', cs: 'Laskavá Čarodějka' }, emoji: '🧙‍♀️' },
            { name: { fr: 'Dragon Ami', en: 'Friend Dragon', cs: 'Přátelský Drak' }, emoji: '🐲' }
          ],
          places: [
            { name: { fr: 'Château Nuage', en: 'Cloud Castle', cs: 'Oblakový Hrad' }, emoji: '🏰' },
            { name: { fr: 'Forêt Enchantée', en: 'Enchanted Forest', cs: 'Začarovaný Les' }, emoji: '🌲' },
            { name: { fr: 'Île Mystérieuse', en: 'Mysterious Island', cs: 'Tajemný Ostrov' }, emoji: '🏝️' },
            { name: { fr: 'Ville Arc-en-ciel', en: 'Rainbow City', cs: 'Duhové Město' }, emoji: '🌈' }
          ],
          quests: [
            { name: { fr: 'Sauver les animaux', en: 'Save the animals', cs: 'Zachránit zvířata' }, emoji: '🦄' },
            { name: { fr: 'Trouver le trésor', en: 'Find the treasure', cs: 'Najít poklad' }, emoji: '💎' },
            { name: { fr: 'Aider les amis', en: 'Help friends', cs: 'Pomoci přátelům' }, emoji: '🤝' },
            { name: { fr: 'Résoudre le mystère', en: 'Solve the mystery', cs: 'Vyřešit záhadu' }, emoji: '🔍' }
          ]
        }
      }
    },
    rewards: {
      points: 180,
      stars: 4,
      unlocks: ['language-word-explorer']
    },
    badges: [
      {
        fr: "Maître Conteur",
        en: "Master Storyteller",
        cs: "Mistr Vypravěč"
      }
    ],
    tags: ['creativity', 'storytelling', 'imagination', 'writing']
  }
];

// Activités d'art musical interactif
export const musicInteractiveContent: EducationalContent[] = [
  {
    id: 'music-rhythm-game',
    title: {
      fr: "Maître du Rythme",
      en: "Rhythm Master",
      cs: "Mistr Rytmu"
    },
    description: {
      fr: "Apprends les rythmes en tapant sur les tambours magiques au bon moment",
      en: "Learn rhythms by tapping magic drums at the right time",
      cs: "Nauč se rytmy klepáním na kouzelné bubny ve správný čas"
    },
    ageGroup: '3-5',
    subject: 'art',
    difficulty: 'easy',
    type: 'interactive',
    estimatedTime: 10,
    instructions: {
      fr: "Écoute la musique et tape sur les tambours quand tu vois les cercles colorés !",
      en: "Listen to the music and tap the drums when you see colored circles!",
      cs: "Poslouchej hudbu a bouchej do bubnů, když uvidíš barevné kruhy!"
    },
    objectives: [
      {
        fr: "Développer le sens du rythme",
        en: "Develop sense of rhythm",
        cs: "Rozvíjet smysl pro rytmus"
      }
    ],
    content: {
      interactive: {
        type: 'rhythm-game',
        beats: [
          { time: 1, drum: 'red', sound: 'boom' },
          { time: 2, drum: 'blue', sound: 'tap' },
          { time: 3, drum: 'red', sound: 'boom' },
          { time: 4, drum: 'yellow', sound: 'ting' }
        ]
      }
    },
    rewards: {
      points: 120,
      stars: 3,
      unlocks: ['music-melody-maker']
    },
    tags: ['rhythm', 'music', 'coordination', 'audio']
  }
];

export const allInteractiveContent = [
  ...ecoInteractiveContent,
  ...musicInteractiveContent
];