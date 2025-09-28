// Données et gestion des activités interactives spécialisées

export interface InteractiveElement {
  id: string;
  type: 'button' | 'draggable' | 'clickable-shape' | 'input-field' | 'slider' | 'toggle';
  properties: {
    label?: string;
    color?: string;
    size?: 'small' | 'medium' | 'large';
    position?: { x: number; y: number };
    action?: string;
    value?: any;
    targetZone?: string; // Pour les éléments déplaçables
  };
}

export interface InteractiveActivityData {
  id: string;
  title: { fr: string; en: string; cs: string };
  description: { fr: string; en: string; cs: string };
  type: 'drag-drop' | 'click-sequence' | 'form-interaction' | 'puzzle' | 'game';
  subject: 'math' | 'language' | 'science' | 'art' | 'computing' | 'civic' | 'hygiene' | 'anatomy';
  ageGroup: '3-5' | '6-8' | '9-12';
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: number;
  status: 'active' | 'inactive' | 'testing';
  elements: InteractiveElement[];
  objectives: Array<{ fr: string; en: string; cs: string }>;
  instructions: { fr: string; en: string; cs: string };
  successCriteria: {
    minCorrect: number;
    timeLimit?: number;
    allowRetries: boolean;
  };
  interactions: {
    onStart?: string;
    onComplete?: string;
    onError?: string;
    hints?: Array<{ fr: string; en: string; cs: string }>;
  };
}

// Activités interactives pré-définies
export const defaultInteractiveActivities: InteractiveActivityData[] = [
  {
    id: 'drag-sort-colors',
    title: {
      fr: 'Trier les couleurs',
      en: 'Sort the colors',
      cs: 'Seřadit barvy'
    },
    description: {
      fr: 'Fais glisser les couleurs dans les bonnes catégories',
      en: 'Drag colors into the right categories',
      cs: 'Přetáhněte barvy do správných kategorií'
    },
    type: 'drag-drop',
    subject: 'art',
    ageGroup: '3-5',
    difficulty: 'easy',
    estimatedTime: 10,
    status: 'active',
    elements: [
      {
        id: 'red-circle',
        type: 'draggable',
        properties: {
          label: '🔴',
          color: '#FF4444',
          size: 'medium',
          position: { x: 50, y: 100 },
          targetZone: 'warm-zone'
        }
      },
      {
        id: 'blue-circle',
        type: 'draggable',
        properties: {
          label: '🔵',
          color: '#4444FF',
          size: 'medium',
          position: { x: 150, y: 100 },
          targetZone: 'cool-zone'
        }
      },
      {
        id: 'yellow-circle',
        type: 'draggable',
        properties: {
          label: '🟡',
          color: '#FFD700',
          size: 'medium',
          position: { x: 100, y: 150 },
          targetZone: 'warm-zone'
        }
      },
      {
        id: 'warm-zone',
        type: 'clickable-shape',
        properties: {
          label: '🔥 Couleurs chaudes',
          color: '#FFA500',
          size: 'large',
          position: { x: 350, y: 50 }
        }
      },
      {
        id: 'cool-zone',
        type: 'clickable-shape',
        properties: {
          label: '❄️ Couleurs froides',
          color: '#87CEEB',
          size: 'large',
          position: { x: 350, y: 200 }
        }
      }
    ],
    objectives: [
      {
        fr: 'Apprendre à distinguer les couleurs chaudes et froides',
        en: 'Learn to distinguish warm and cool colors',
        cs: 'Naučit se rozlišovat teplé a studené barvy'
      }
    ],
    instructions: {
      fr: 'Fais glisser chaque couleur dans la bonne zone selon qu\'elle soit chaude ou froide',
      en: 'Drag each color to the correct zone based on whether it is warm or cool',
      cs: 'Přetáhněte každou barvu do správné zóny podle toho, zda je teplá nebo studená'
    },
    successCriteria: {
      minCorrect: 3,
      allowRetries: true
    },
    interactions: {
      onStart: 'Commençons à trier les couleurs !',
      onComplete: 'Bravo ! Tu sais maintenant différencier les couleurs chaudes et froides !',
      onError: 'Réfléchis bien... Cette couleur va-t-elle dans cette zone ?',
      hints: [
        {
          fr: 'Le rouge et le jaune sont des couleurs chaudes comme le feu',
          en: 'Red and yellow are warm colors like fire',
          cs: 'Červená a žlutá jsou teplé barvy jako oheň'
        },
        {
          fr: 'Le bleu est une couleur froide comme l\'eau',
          en: 'Blue is a cool color like water',
          cs: 'Modrá je studená barva jako voda'
        }
      ]
    }
  },
  {
    id: 'number-sequence-click',
    title: {
      fr: 'Séquence de nombres',
      en: 'Number sequence',
      cs: 'Posloupnost čísel'
    },
    description: {
      fr: 'Clique sur les nombres dans le bon ordre croissant',
      en: 'Click numbers in ascending order',
      cs: 'Klikněte na čísla ve vzestupném pořadí'
    },
    type: 'click-sequence',
    subject: 'math',
    ageGroup: '6-8',
    difficulty: 'medium',
    estimatedTime: 15,
    status: 'active',
    elements: [
      {
        id: 'num-1',
        type: 'button',
        properties: {
          label: '1',
          color: '#4CAF50',
          size: 'large',
          position: { x: 300, y: 200 }
        }
      },
      {
        id: 'num-5',
        type: 'button',
        properties: {
          label: '5',
          color: '#9C27B0',
          size: 'large',
          position: { x: 100, y: 300 }
        }
      },
      {
        id: 'num-3',
        type: 'button',
        properties: {
          label: '3',
          color: '#2196F3',
          size: 'large',
          position: { x: 450, y: 150 }
        }
      },
      {
        id: 'num-2',
        type: 'button',
        properties: {
          label: '2',
          color: '#FF9800',
          size: 'large',
          position: { x: 150, y: 100 }
        }
      },
      {
        id: 'num-4',
        type: 'button',
        properties: {
          label: '4',
          color: '#F44336',
          size: 'large',
          position: { x: 400, y: 300 }
        }
      }
    ],
    objectives: [
      {
        fr: 'Comprendre l\'ordre croissant des nombres de 1 à 5',
        en: 'Understand ascending order of numbers from 1 to 5',
        cs: 'Pochopit vzestupné pořadí čísel od 1 do 5'
      }
    ],
    instructions: {
      fr: 'Clique sur les nombres de 1 à 5 dans l\'ordre croissant. Commence par le plus petit !',
      en: 'Click numbers from 1 to 5 in ascending order. Start with the smallest!',
      cs: 'Klikněte na čísla od 1 do 5 ve vzestupném pořadí. Začněte s nejmenším!'
    },
    successCriteria: {
      minCorrect: 5,
      timeLimit: 120,
      allowRetries: true
    },
    interactions: {
      onStart: 'Trouve les nombres dans l\'ordre croissant !',
      onComplete: 'Parfait ! Tu maîtrises l\'ordre des nombres !',
      onError: 'Attention ! Assure-toi de cliquer dans l\'ordre croissant.',
      hints: [
        {
          fr: 'Commence par chercher le nombre 1, puis 2, puis 3...',
          en: 'Start by finding number 1, then 2, then 3...',
          cs: 'Začněte hledáním čísla 1, pak 2, pak 3...'
        },
        {
          fr: 'Le plus petit nombre est celui qui vient en premier',
          en: 'The smallest number comes first',
          cs: 'Nejmenší číslo přichází první'
        }
      ]
    }
  },
  {
    id: 'shape-matching-game',
    title: {
      fr: 'Associer les formes',
      en: 'Shape matching',
      cs: 'Párování tvarů'
    },
    description: {
      fr: 'Clique sur les formes identiques pour les associer',
      en: 'Click on identical shapes to match them',
      cs: 'Klikněte na identické tvary a spárujte je'
    },
    type: 'game',
    subject: 'art',
    ageGroup: '3-5',
    difficulty: 'easy',
    estimatedTime: 8,
    status: 'active',
    elements: [
      {
        id: 'circle-1',
        type: 'button',
        properties: {
          label: '⭕',
          color: '#FF6B6B',
          size: 'medium',
          position: { x: 100, y: 100 }
        }
      },
      {
        id: 'circle-2',
        type: 'button',
        properties: {
          label: '⭕',
          color: '#FF6B6B',
          size: 'medium',
          position: { x: 400, y: 150 }
        }
      },
      {
        id: 'square-1',
        type: 'button',
        properties: {
          label: '🟦',
          color: '#4ECDC4',
          size: 'medium',
          position: { x: 200, y: 200 }
        }
      },
      {
        id: 'square-2',
        type: 'button',
        properties: {
          label: '🟦',
          color: '#4ECDC4',
          size: 'medium',
          position: { x: 300, y: 100 }
        }
      },
      {
        id: 'triangle-1',
        type: 'button',
        properties: {
          label: '🔺',
          color: '#45B7D1',
          size: 'medium',
          position: { x: 150, y: 300 }
        }
      },
      {
        id: 'triangle-2',
        type: 'button',
        properties: {
          label: '🔺',
          color: '#45B7D1',
          size: 'medium',
          position: { x: 450, y: 250 }
        }
      }
    ],
    objectives: [
      {
        fr: 'Reconnaître et associer les formes géométriques identiques',
        en: 'Recognize and match identical geometric shapes',
        cs: 'Rozpoznat a spárovat identické geometrické tvary'
      }
    ],
    instructions: {
      fr: 'Trouve les paires de formes identiques et clique dessus !',
      en: 'Find pairs of identical shapes and click on them!',
      cs: 'Najděte páry identických tvarů a klikněte na ně!'
    },
    successCriteria: {
      minCorrect: 3,
      allowRetries: true
    },
    interactions: {
      onStart: 'Cherche les formes qui se ressemblent !',
      onComplete: 'Super ! Tu es un expert des formes !',
      onError: 'Ces formes ne sont pas identiques, continue à chercher !',
      hints: [
        {
          fr: 'Cherche deux cercles de la même couleur',
          en: 'Look for two circles of the same color',
          cs: 'Hledejte dva kruhy stejné barvy'
        }
      ]
    }
  },
  {
    id: 'body-parts-quiz',
    title: {
      fr: 'Quiz du corps humain',
      en: 'Human body quiz',
      cs: 'Kvíz o lidském těle'
    },
    description: {
      fr: 'Clique sur la bonne partie du corps selon la question',
      en: 'Click on the correct body part according to the question',
      cs: 'Klikněte na správnou část těla podle otázky'
    },
    type: 'click-sequence',
    subject: 'anatomy',
    ageGroup: '6-8',
    difficulty: 'medium',
    estimatedTime: 12,
    status: 'active',
    elements: [
      {
        id: 'head',
        type: 'clickable-shape',
        properties: {
          label: '👤 Tête',
          color: '#FFB74D',
          size: 'medium',
          position: { x: 200, y: 50 }
        }
      },
      {
        id: 'eyes',
        type: 'button',
        properties: {
          label: '👀 Yeux',
          color: '#64B5F6',
          size: 'small',
          position: { x: 190, y: 80 }
        }
      },
      {
        id: 'mouth',
        type: 'button',
        properties: {
          label: '👄 Bouche',
          color: '#F48FB1',
          size: 'small',
          position: { x: 200, y: 110 }
        }
      },
      {
        id: 'hands',
        type: 'clickable-shape',
        properties: {
          label: '👐 Mains',
          color: '#AED581',
          size: 'medium',
          position: { x: 100, y: 200 }
        }
      },
      {
        id: 'feet',
        type: 'clickable-shape',
        properties: {
          label: '👣 Pieds',
          color: '#FFCC02',
          size: 'medium',
          position: { x: 200, y: 350 }
        }
      }
    ],
    objectives: [
      {
        fr: 'Apprendre les parties principales du corps humain',
        en: 'Learn the main parts of the human body',
        cs: 'Naučit se hlavní části lidského těla'
      }
    ],
    instructions: {
      fr: 'Je vais te demander de montrer différentes parties du corps. Clique sur la bonne réponse !',
      en: 'I will ask you to show different body parts. Click on the correct answer!',
      cs: 'Požádám vás, abyste ukázali různé části těla. Klikněte na správnou odpověď!'
    },
    successCriteria: {
      minCorrect: 4,
      allowRetries: true
    },
    interactions: {
      onStart: 'Montrons ce que tu sais sur le corps humain !',
      onComplete: 'Excellent ! Tu connais bien ton corps !',
      onError: 'Regarde bien... Où se trouve cette partie du corps ?',
      hints: [
        {
          fr: 'Les yeux sont sur la tête, les mains au bout des bras...',
          en: 'Eyes are on the head, hands are at the end of arms...',
          cs: 'Oči jsou na hlavě, ruce jsou na koncích paží...'
        }
      ]
    }
  }
];

// Fonction pour obtenir les activités par critères
export const getInteractiveActivitiesByFilter = (
  ageGroup?: '3-5' | '6-8' | '9-12',
  subject?: string,
  difficulty?: 'easy' | 'medium' | 'hard'
): InteractiveActivityData[] => {
  return defaultInteractiveActivities.filter(activity => {
    if (ageGroup && activity.ageGroup !== ageGroup) return false;
    if (subject && activity.subject !== subject) return false;
    if (difficulty && activity.difficulty !== difficulty) return false;
    if (activity.status !== 'active') return false;
    return true;
  });
};

// Fonction pour obtenir une activité par ID
export const getInteractiveActivityById = (id: string): InteractiveActivityData | undefined => {
  return defaultInteractiveActivities.find(activity => activity.id === id);
};

// Fonction pour sauvegarder des activités personnalisées (localStorage)
export const saveCustomInteractiveActivity = (activity: InteractiveActivityData): void => {
  const customActivities = getCustomInteractiveActivities();
  const existingIndex = customActivities.findIndex(a => a.id === activity.id);
  
  if (existingIndex >= 0) {
    customActivities[existingIndex] = activity;
  } else {
    customActivities.push(activity);
  }
  
  localStorage.setItem('littlegenius_custom_interactive_activities', JSON.stringify(customActivities));
};

// Fonction pour récupérer les activités personnalisées
export const getCustomInteractiveActivities = (): InteractiveActivityData[] => {
  const stored = localStorage.getItem('littlegenius_custom_interactive_activities');
  return stored ? JSON.parse(stored) : [];
};

// Fonction pour obtenir toutes les activités (par défaut + personnalisées)
export const getAllInteractiveActivities = (): InteractiveActivityData[] => {
  return [...defaultInteractiveActivities, ...getCustomInteractiveActivities()];
};

// Fonction pour supprimer une activité personnalisée
export const deleteCustomInteractiveActivity = (id: string): void => {
  const customActivities = getCustomInteractiveActivities().filter(a => a.id !== id);
  localStorage.setItem('littlegenius_custom_interactive_activities', JSON.stringify(customActivities));
};