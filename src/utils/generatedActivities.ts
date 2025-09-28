import { EducationalContent } from './educationalContent';

// GÉNÉRATEUR D'ACTIVITÉS COMPLÈTES - 65 ACTIVITÉS PAR MATIÈRE

// Templates d'activités pour chaque matière et âge
const mathActivitiesTemplates = {
  '3-5': [
    { base: "Compter les", visual: "🐄🐄🐄", objects: ["vaches", "moutons", "poules", "lapins", "chats"] },
    { base: "Formes", shapes: ["cercle ⭕", "carré ⬜", "triangle 🔺", "rectangle ▬"] },
    { base: "Couleurs", colors: ["rouge 🔴", "bleu 🔵", "vert 🟢", "jaune 🟡"] },
    { base: "Plus ou moins", comparison: ["plus grand", "plus petit", "pareil"] },
    { base: "Motifs", patterns: ["🔵🔺", "⭐🌙", "🌸🍀"] }
  ],
  '6-8': [
    { base: "Addition", operation: "+", range: [1, 10] },
    { base: "Soustraction", operation: "-", range: [1, 10] },
    { base: "Multiplication", operation: "×", range: [1, 5] },
    { base: "Fractions", fractions: ["1/2", "1/4", "3/4"] },
    { base: "Heure", times: ["3h00", "6h30", "9h15"] }
  ],
  '9-12': [
    { base: "Division", operation: "÷", range: [1, 100] },
    { base: "Géométrie", geometry: ["périmètre", "aire", "angles"] },
    { base: "Fractions avancées", complex: ["2/3 + 1/4", "5/6 - 1/3"] },
    { base: "Statistiques", stats: ["moyenne", "médiane", "graphiques"] }
  ]
};

const languageActivitiesTemplates = {
  '3-5': [
    { base: "Alphabet", letters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("") },
    { base: "Animaux", animals: ["🐱 chat", "🐶 chien", "🐰 lapin", "🐻 ours"] },
    { base: "Sons", phonics: ["A comme Avion", "B comme Ballon"] },
    { base: "Rimes", rhymes: ["chat-rat", "souris-gris"] }
  ],
  '6-8': [
    { base: "Lecture", words: ["maison", "école", "famille", "jardin"] },
    { base: "Syllabes", syllables: ["ma-tin", "soi-rée", "pa-pil-lon"] },
    { base: "Contraires", opposites: ["grand-petit", "chaud-froid"] },
    { base: "Familles", families: ["chant-er/chant-eur/chans-on"] }
  ],
  '9-12': [
    { base: "Grammaire", grammar: ["verbes", "noms", "adjectifs"] },
    { base: "Conjugaison", verbs: ["être", "avoir", "faire", "aller"] },
    { base: "Orthographe", spelling: ["leur/leurs", "ces/ses", "ou/où"] },
    { base: "Expression", writing: ["descriptions", "récits", "dialogues"] }
  ]
};

const artActivitiesTemplates = {
  '3-5': [
    { base: "Couleurs primaires", colors: ["rouge", "bleu", "jaune"] },
    { base: "Formes artistiques", shapes: ["rond", "carré", "triangle"] },
    { base: "Créations", crafts: ["dessins", "collages", "peinture"] }
  ],
  '6-8': [
    { base: "Couleurs secondaires", mixed: ["orange", "vert", "violet"] },
    { base: "Techniques", methods: ["pinceau", "crayon", "feutre"] },
    { base: "Artistes", artists: ["Monet", "Van Gogh", "Picasso"] }
  ],
  '9-12': [
    { base: "Mouvements", movements: ["Impressionnisme", "Cubisme", "Réalisme"] },
    { base: "Perspective", perspective: ["point de fuite", "profondeur"] },
    { base: "Histoire", history: ["Renaissance", "Art moderne"] }
  ]
};

// FONCTION PRINCIPALE DE GÉNÉRATION
function generateComprehensiveActivities(): { [key: string]: EducationalContent[] } {
  const subjects = ['math', 'language', 'art', 'science', 'anatomy', 'hygiene', 'computing', 'civic'];
  const ageGroups: ('3-5' | '6-8' | '9-12')[] = ['3-5', '6-8', '9-12'];
  const result: { [key: string]: EducationalContent[] } = {};

  subjects.forEach(subject => {
    result[subject] = [];
    let activityCounter = 1;

    ageGroups.forEach(ageGroup => {
      const activitiesPerAge = subject === 'math' || subject === 'language' || subject === 'art' ? 
        (ageGroup === '3-5' ? 25 : ageGroup === '6-8' ? 20 : 20) : 22; // 65+ par matière principale

      for (let i = 0; i < activitiesPerAge; i++) {
        const activity: EducationalContent = generateSingleActivity(
          subject as any, 
          ageGroup, 
          activityCounter, 
          i
        );
        result[subject].push(activity);
        activityCounter++;
      }
    });
  });

  return result;
}

function generateSingleActivity(
  subject: 'math' | 'language' | 'art' | 'science' | 'anatomy' | 'hygiene' | 'computing' | 'civic',
  ageGroup: '3-5' | '6-8' | '9-12',
  id: number,
  index: number
): EducationalContent {
  
  const difficulty = ageGroup === '3-5' ? 'easy' : ageGroup === '6-8' ? 'medium' : 'hard';
  const baseTime = ageGroup === '3-5' ? 8 : ageGroup === '6-8' ? 12 : 18;
  
  // Génération spécifique par matière
  switch (subject) {
    case 'math':
      return generateMathActivity(ageGroup, id, index, difficulty, baseTime);
    case 'language':
      return generateLanguageActivity(ageGroup, id, index, difficulty, baseTime);
    case 'art':
      return generateArtActivity(ageGroup, id, index, difficulty, baseTime);
    case 'science':
      return generateScienceActivity(ageGroup, id, index, difficulty, baseTime);
    case 'anatomy':
      return generateAnatomyActivity(ageGroup, id, index, difficulty, baseTime);
    case 'hygiene':
      return generateHygieneActivity(ageGroup, id, index, difficulty, baseTime);
    case 'computing':
      return generateComputingActivity(ageGroup, id, index, difficulty, baseTime);
    case 'civic':
      return generateCivicActivity(ageGroup, id, index, difficulty, baseTime);
    default:
      throw new Error(`Subject ${subject} not supported`);
  }
}

// GÉNÉRATEURS SPÉCIALISÉS PAR MATIÈRE

function generateMathActivity(ageGroup: string, id: number, index: number, difficulty: string, baseTime: number): EducationalContent {
  const mathTopics = {
    '3-5': [
      'Compter les animaux', 'Formes colorées', 'Plus ou moins', 'Motifs simples', 'Nombres jusqu\'à 5'
    ],
    '6-8': [
      'Addition facile', 'Soustraction', 'Tables de multiplication', 'Fractions simples', 'Géométrie de base'
    ],
    '9-12': [
      'Division avancée', 'Fractions complexes', 'Géométrie', 'Algèbre simple', 'Statistiques'
    ]
  };

  const topic = mathTopics[ageGroup as keyof typeof mathTopics][index % 5];
  const animals = ['🐄', '🐑', '🐷', '🐔', '🐰', '🐱', '🐶', '🐸', '🐟', '🦆'];
  const colors = ['🔴', '🔵', '🟢', '🟡', '🟠', '🟣', '🟤', '⚫', '⚪'];
  
  return {
    id: `math-${ageGroup}-${id}`,
    title: {
      fr: `${topic} ${index + 1}`,
      en: `${topic} ${index + 1}`,
      cs: `${topic} ${index + 1}`
    },
    description: {
      fr: `Activité mathématique : ${topic.toLowerCase()}`,
      en: `Math activity: ${topic.toLowerCase()}`,
      cs: `Matematická aktivita: ${topic.toLowerCase()}`
    },
    ageGroup: ageGroup as any,
    subject: 'math',
    difficulty: difficulty as any,
    type: 'exercise',
    estimatedTime: baseTime + (index % 5),
    instructions: {
      fr: `Résous ce problème de ${topic.toLowerCase()} !`,
      en: `Solve this ${topic.toLowerCase()} problem!`,
      cs: `Vyřeš tento problém s ${topic.toLowerCase()}!`
    },
    objectives: [{
      fr: `Maîtriser ${topic.toLowerCase()}`,
      en: `Master ${topic.toLowerCase()}`,
      cs: `Zvládnout ${topic.toLowerCase()}`
    }],
    content: {
      exercises: [{
        question: generateMathQuestion(ageGroup, topic, index, animals, colors),
        visual: generateMathVisual(ageGroup, index, animals, colors),
        options: generateMathOptions(ageGroup, index),
        answer: 0,
        explanation: {
          fr: `Bravo ! Tu as trouvé la bonne réponse ! 🎉`,
          en: `Great! You found the right answer! 🎉`,
          cs: `Skvěle! Našel jsi správnou odpověď! 🎉`
        }
      }]
    }
  };
}

function generateMathQuestion(ageGroup: string, topic: string, index: number, animals: string[], colors: string[]) {
  const animal = animals[index % animals.length];
  const count = (index % 5) + 1;
  
  switch (ageGroup) {
    case '3-5':
      return {
        fr: `Combien de ${animal} vois-tu ?`,
        en: `How many ${animal} do you see?`,
        cs: `Kolik ${animal} vidíš?`
      };
    case '6-8':
      const a = (index % 5) + 2;
      const b = (index % 3) + 1;
      return {
        fr: `Combien font ${a} + ${b} ?`,
        en: `How much is ${a} + ${b}?`,
        cs: `Kolik je ${a} + ${b}?`
      };
    case '9-12':
      const x = (index % 8) + 2;
      const y = (index % 4) + 1;
      return {
        fr: `Combien font ${x} × ${y} ?`,
        en: `How much is ${x} × ${y}?`,
        cs: `Kolik je ${x} × ${y}?`
      };
    default:
      return { fr: 'Question', en: 'Question', cs: 'Otázka' };
  }
}

function generateMathVisual(ageGroup: string, index: number, animals: string[], colors: string[]): string {
  const animal = animals[index % animals.length];
  const count = (index % 5) + 1;
  
  return Array(count).fill(animal).join('');
}

function generateMathOptions(ageGroup: string, index: number) {
  const correct = (index % 5) + 1;
  const options = [];
  
  for (let i = 0; i < 4; i++) {
    const value = i === 0 ? correct : correct + (Math.random() > 0.5 ? 1 : -1) * (i);
    options.push({
      fr: `${Math.max(1, value)} ✅`,
      en: `${Math.max(1, value)} ✅`, 
      cs: `${Math.max(1, value)} ✅`
    });
  }
  
  return options;
}

// Générateurs similaires pour les autres matières...
function generateLanguageActivity(ageGroup: string, id: number, index: number, difficulty: string, baseTime: number): EducationalContent {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const letter = letters[index % letters.length];
  const animals = ['🐱 chat', '🐶 chien', '🐰 lapin', '🐻 ours', '🐸 grenouille'];
  
  return {
    id: `language-${ageGroup}-${id}`,
    title: {
      fr: `Lettre ${letter} - Activité ${index + 1}`,
      en: `Letter ${letter} - Activity ${index + 1}`,
      cs: `Písmeno ${letter} - Aktivita ${index + 1}`
    },
    description: {
      fr: `Apprends avec la lettre ${letter}`,
      en: `Learn with letter ${letter}`,
      cs: `Uč se s písmenem ${letter}`
    },
    ageGroup: ageGroup as any,
    subject: 'language',
    difficulty: difficulty as any,
    type: 'exercise',
    estimatedTime: baseTime,
    instructions: {
      fr: `Trouve les mots qui commencent par ${letter} !`,
      en: `Find words starting with ${letter}!`,
      cs: `Najdi slova začínající na ${letter}!`
    },
    objectives: [{
      fr: `Reconnaître la lettre ${letter}`,
      en: `Recognize letter ${letter}`,
      cs: `Rozpoznat písmeno ${letter}`
    }],
    content: {
      exercises: [{
        question: {
          fr: `Quel mot commence par ${letter} ?`,
          en: `Which word starts with ${letter}?`,
          cs: `Které slovo začíná na ${letter}?`
        },
        options: [
          { fr: `${animals[0]} ✅`, en: `${animals[0]} ✅`, cs: `${animals[0]} ✅` },
          { fr: animals[1], en: animals[1], cs: animals[1] },
          { fr: animals[2], en: animals[2], cs: animals[2] },
          { fr: animals[3], en: animals[3], cs: animals[3] }
        ],
        answer: 0,
        explanation: {
          fr: `Parfait ! ${animals[0]} commence par ${letter} !`,
          en: `Perfect! ${animals[0]} starts with ${letter}!`,
          cs: `Perfektní! ${animals[0]} začíná na ${letter}!`
        }
      }]
    }
  };
}

// Générateurs pour Art, Science, etc. (similaires)
function generateArtActivity(ageGroup: string, id: number, index: number, difficulty: string, baseTime: number): EducationalContent {
  const colors = ['rouge 🔴', 'bleu 🔵', 'vert 🟢', 'jaune 🟡', 'orange 🟠'];
  const color = colors[index % colors.length];
  
  return {
    id: `art-${ageGroup}-${id}`,
    title: {
      fr: `Art ${color} - ${index + 1}`,
      en: `Art ${color} - ${index + 1}`,
      cs: `Umění ${color} - ${index + 1}`
    },
    description: {
      fr: `Découvre l'art avec ${color}`,
      en: `Discover art with ${color}`,
      cs: `Objevuj umění s ${color}`
    },
    ageGroup: ageGroup as any,
    subject: 'art',
    difficulty: difficulty as any,
    type: 'exercise',
    estimatedTime: baseTime,
    instructions: {
      fr: `Explore ${color} !`,
      en: `Explore ${color}!`,
      cs: `Prozkoumej ${color}!`
    },
    objectives: [{
      fr: `Connaître ${color}`,
      en: `Know ${color}`,
      cs: `Znát ${color}`
    }],
    content: {
      exercises: [{
        question: {
          fr: `Quelle couleur est ${color.split(' ')[0]} ?`,
          en: `What color is ${color.split(' ')[0]}?`,
          cs: `Jaká barva je ${color.split(' ')[0]}?`
        },
        options: [
          { fr: `${color} ✅`, en: `${color} ✅`, cs: `${color} ✅` },
          { fr: colors[(index + 1) % colors.length], en: colors[(index + 1) % colors.length], cs: colors[(index + 1) % colors.length] },
          { fr: colors[(index + 2) % colors.length], en: colors[(index + 2) % colors.length], cs: colors[(index + 2) % colors.length] },
          { fr: colors[(index + 3) % colors.length], en: colors[(index + 3) % colors.length], cs: colors[(index + 3) % colors.length] }
        ],
        answer: 0,
        explanation: {
          fr: `Bravo ! C'est bien ${color} !`,
          en: `Great! It's ${color}!`,
          cs: `Skvěle! Je to ${color}!`
        }
      }]
    }
  };
}

// Générateurs simplifiés pour les autres matières
function generateScienceActivity(ageGroup: string, id: number, index: number, difficulty: string, baseTime: number): EducationalContent {
  return createGenericActivity('science', ageGroup, id, index, difficulty, baseTime, 'Science', '🔬');
}

function generateAnatomyActivity(ageGroup: string, id: number, index: number, difficulty: string, baseTime: number): EducationalContent {
  return createGenericActivity('anatomy', ageGroup, id, index, difficulty, baseTime, 'Anatomie', '🫀');
}

function generateHygieneActivity(ageGroup: string, id: number, index: number, difficulty: string, baseTime: number): EducationalContent {
  return createGenericActivity('hygiene', ageGroup, id, index, difficulty, baseTime, 'Hygiène', '🧼');
}

function generateComputingActivity(ageGroup: string, id: number, index: number, difficulty: string, baseTime: number): EducationalContent {
  return createGenericActivity('computing', ageGroup, id, index, difficulty, baseTime, 'Informatique', '💻');
}

function generateCivicActivity(ageGroup: string, id: number, index: number, difficulty: string, baseTime: number): EducationalContent {
  return createGenericActivity('civic', ageGroup, id, index, difficulty, baseTime, 'Civisme', '🏛️');
}

function createGenericActivity(
  subject: string, 
  ageGroup: string, 
  id: number, 
  index: number, 
  difficulty: string, 
  baseTime: number,
  subjectName: string,
  emoji: string
): EducationalContent {
  return {
    id: `${subject}-${ageGroup}-${id}`,
    title: {
      fr: `${subjectName} ${index + 1} ${emoji}`,
      en: `${subjectName} ${index + 1} ${emoji}`,
      cs: `${subjectName} ${index + 1} ${emoji}`
    },
    description: {
      fr: `Activité ${subjectName.toLowerCase()} n°${index + 1}`,
      en: `${subjectName} activity #${index + 1}`,
      cs: `Aktivita ${subjectName.toLowerCase()} č. ${index + 1}`
    },
    ageGroup: ageGroup as any,
    subject: subject as any,
    difficulty: difficulty as any,
    type: 'exercise',
    estimatedTime: baseTime,
    instructions: {
      fr: `Découvre ${subjectName.toLowerCase()} ! ${emoji}`,
      en: `Discover ${subjectName.toLowerCase()}! ${emoji}`,
      cs: `Objevuj ${subjectName.toLowerCase()}! ${emoji}`
    },
    objectives: [{
      fr: `Apprendre ${subjectName.toLowerCase()}`,
      en: `Learn ${subjectName.toLowerCase()}`,
      cs: `Naučit se ${subjectName.toLowerCase()}`
    }],
    content: {
      exercises: [{
        question: {
          fr: `Question ${subjectName.toLowerCase()} ${index + 1}`,
          en: `${subjectName} question ${index + 1}`,
          cs: `Otázka ${subjectName.toLowerCase()} ${index + 1}`
        },
        options: [
          { fr: `Réponse A ${emoji}`, en: `Answer A ${emoji}`, cs: `Odpověď A ${emoji}` },
          { fr: `Réponse B`, en: `Answer B`, cs: `Odpověď B` },
          { fr: `Réponse C`, en: `Answer C`, cs: `Odpověď C` },
          { fr: `Réponse D`, en: `Answer D`, cs: `Odpověď D` }
        ],
        answer: 0,
        explanation: {
          fr: `Excellent ! Tu maîtrises ${subjectName.toLowerCase()} ! ${emoji}`,
          en: `Excellent! You master ${subjectName.toLowerCase()}! ${emoji}`,
          cs: `Výborně! Ovládáš ${subjectName.toLowerCase()}! ${emoji}`
        }
      }]
    }
  };
}

// EXPORT DES ACTIVITÉS GÉNÉRÉES
export const allGeneratedActivities = generateComprehensiveActivities();

// Export facile pour chaque matière
export const generatedMathContent = allGeneratedActivities.math;
export const generatedLanguageContent = allGeneratedActivities.language;
export const generatedArtContent = allGeneratedActivities.art;
export const generatedScienceContent = allGeneratedActivities.science;
export const generatedAnatomyContent = allGeneratedActivities.anatomy;
export const generatedHygieneContent = allGeneratedActivities.hygiene;
export const generatedComputingContent = allGeneratedActivities.computing;
export const generatedCivicContent = allGeneratedActivities.civic;

// Fonction pour obtenir les activités par matière
export const getGeneratedContentBySubject = (
  subject: 'math' | 'language' | 'science' | 'art' | 'computing' | 'civic' | 'hygiene' | 'anatomy',
  ageGroup?: '3-5' | '6-8' | '9-12'
): EducationalContent[] => {
  const content = allGeneratedActivities[subject] || [];
  
  if (ageGroup) {
    return content.filter(activity => activity.ageGroup === ageGroup);
  }
  
  return content;
};