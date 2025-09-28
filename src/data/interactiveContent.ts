import { InteractiveActivity } from '../components/InteractiveActivityRenderer';

export const interactiveActivities: InteractiveActivity[] = [
  // === MATHÉMATIQUES === 
  
  // Nombres et comptage (3-6 ans)
  {
    id: 'math-counting-animals',
    type: 'number-sequence',
    title: {
      fr: 'Compter les Animaux',
      en: 'Count the Animals',
      cs: 'Počítej Zvířata'
    },
    description: {
      fr: 'Apprends à compter de 1 à 10 avec tes animaux préférés ! 🐱🐶',
      en: 'Learn to count from 1 to 10 with your favorite animals! 🐱🐶',
      cs: 'Nauč se počítat od 1 do 10 se svými oblíbenými zvířaty! 🐱🐶'
    },
    difficulty: 1,
    minAge: 3,
    maxAge: 6,
    subject: 'Math',
    badges: ['Counter', 'Animal Friend', 'Number Ninja'],
    data: {
      sequence: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      rule: {
        fr: 'Compter par 1',
        en: 'Count by 1',
        cs: 'Počítej po 1'
      },
      hint: {
        fr: 'Compte sur tes doigts ! 1, 2, 3...',
        en: 'Count on your fingers! 1, 2, 3...',
        cs: 'Počítej na prstech! 1, 2, 3...'
      }
    }
  },

  {
    id: 'math-skip-counting-2',
    type: 'number-sequence',
    title: {
      fr: 'Compter par 2',
      en: 'Skip Count by 2',
      cs: 'Počítej po 2'
    },
    description: {
      fr: 'Saute de nombre en nombre ! Compte par 2 comme une grenouille : 2, 4, 6... 🐸',
      en: 'Jump from number to number! Count by 2 like a frog: 2, 4, 6... 🐸',
      cs: 'Skoč z čísla na číslo! Počítej po 2 jako žába: 2, 4, 6... 🐸'
    },
    difficulty: 2,
    minAge: 5,
    maxAge: 8,
    subject: 'Math',
    badges: ['Skip Counter', 'Frog Jumper', 'Pattern Pro'],
    data: {
      sequence: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
      rule: {
        fr: 'Ajouter 2 à chaque fois',
        en: 'Add 2 each time',
        cs: 'Přidej 2 pokaždé'
      },
      hint: {
        fr: 'Saute par 2 ! 2... 4... 6...',
        en: 'Jump by 2! 2... 4... 6...',
        cs: 'Skoč po 2! 2... 4... 6...'
      }
    }
  },

  {
    id: 'math-addition-basics',
    type: 'number-sequence',
    title: {
      fr: 'Additions Magiques',
      en: 'Magic Addition',
      cs: 'Magické Sčítání'
    },
    description: {
      fr: 'Découvre la magie de l\'addition ! Combine les nombres pour créer de nouveaux nombres ✨',
      en: 'Discover the magic of addition! Combine numbers to create new numbers ✨',
      cs: 'Objevte kouzlo sčítání! Kombinujte čísla a vytvořte nová čísla ✨'
    },
    difficulty: 2,
    minAge: 4,
    maxAge: 7,
    subject: 'Math',
    badges: ['Addition Wizard', 'Number Magician', 'Math Explorer'],
    data: {
      sequence: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19],
      rule: {
        fr: 'Ajouter 2 (nombres impairs)',
        en: 'Add 2 (odd numbers)',
        cs: 'Přidej 2 (lichá čísla)'
      },
      hint: {
        fr: 'Tous ces nombres sont impairs : 1, 3, 5...',
        en: 'All these numbers are odd: 1, 3, 5...',
        cs: 'Všechna tato čísla jsou lichá: 1, 3, 5...'
      }
    }
  },

  {
    id: 'math-shapes-pattern',
    type: 'eco-sorting',
    title: {
      fr: 'Trier les Formes',
      en: 'Sort the Shapes',
      cs: 'Třiď Tvary'
    },
    description: {
      fr: 'Apprends les formes géométriques en triant cercles, carrés, triangles et rectangles ! 🔵⬜🔺',
      en: 'Learn geometric shapes by sorting circles, squares, triangles, and rectangles! 🔵⬜🔺',
      cs: 'Nauč se geometrické tvary třídením kruhů, čtverců, trojúhelníků a obdélníků! 🔵⬜🔺'
    },
    difficulty: 1,
    minAge: 3,
    maxAge: 6,
    subject: 'Math',
    badges: ['Shape Master', 'Geometry Guru', 'Pattern Detective'],
    data: {
      items: [
        {
          id: 'red-circle',
          name: { fr: 'Cercle rouge', en: 'Red circle', cs: 'Červený kruh' },
          category: 'circle',
          emoji: '🔴'
        },
        {
          id: 'blue-square',
          name: { fr: 'Carré bleu', en: 'Blue square', cs: 'Modrý čtverec' },
          category: 'square',
          emoji: '🟦'
        },
        {
          id: 'green-triangle',
          name: { fr: 'Triangle vert', en: 'Green triangle', cs: 'Zelený trojúhelník' },
          category: 'triangle',
          emoji: '🟢'
        },
        {
          id: 'yellow-rectangle',
          name: { fr: 'Rectangle jaune', en: 'Yellow rectangle', cs: 'Žlutý obdélník' },
          category: 'rectangle',
          emoji: '🟨'
        },
        {
          id: 'purple-circle',
          name: { fr: 'Cercle violet', en: 'Purple circle', cs: 'Fialový kruh' },
          category: 'circle',
          emoji: '🟣'
        },
        {
          id: 'orange-square',
          name: { fr: 'Carré orange', en: 'Orange square', cs: 'Oranžový čtverec' },
          category: 'square',
          emoji: '🟧'
        }
      ],
      bins: [
        {
          id: 'circle',
          name: { fr: 'Cercles', en: 'Circles', cs: 'Kruhy' },
          color: '#e91e63',
          emoji: '⭕'
        },
        {
          id: 'square',
          name: { fr: 'Carrés', en: 'Squares', cs: 'Čtverce' },
          color: '#2196f3',
          emoji: '⬜'
        },
        {
          id: 'triangle',
          name: { fr: 'Triangles', en: 'Triangles', cs: 'Trojúhelníky' },
          color: '#4caf50',
          emoji: '🔺'
        },
        {
          id: 'rectangle',
          name: { fr: 'Rectangles', en: 'Rectangles', cs: 'Obdélníky' },
          color: '#ff9800',
          emoji: '▬'
        }
      ]
    }
  },

  {
    id: 'math-multiplication-tables',
    type: 'number-sequence',
    title: {
      fr: 'Tables de Multiplication',
      en: 'Multiplication Tables',
      cs: 'Násobilka'
    },
    description: {
      fr: 'Maîtrise les tables de multiplication avec des séquences amusantes ! 2x1, 2x2, 2x3... 🎯',
      en: 'Master multiplication tables with fun sequences! 2x1, 2x2, 2x3... 🎯',
      cs: 'Ovládni násobilku se zábavnými sekvencemi! 2x1, 2x2, 2x3... 🎯'
    },
    difficulty: 3,
    minAge: 7,
    maxAge: 10,
    subject: 'Math',
    badges: ['Multiplication Master', 'Times Table Champion', 'Math Warrior'],
    data: {
      sequence: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30],
      rule: {
        fr: 'Table de 3 (3 × 1, 3 × 2, 3 × 3...)',
        en: 'Table of 3 (3 × 1, 3 × 2, 3 × 3...)',
        cs: 'Tabulka 3 (3 × 1, 3 × 2, 3 × 3...)'
      },
      hint: {
        fr: 'Compte par 3 : 3, 6, 9, 12...',
        en: 'Count by 3: 3, 6, 9, 12...',
        cs: 'Počítej po 3: 3, 6, 9, 12...'
      }
    }
  },

  // === SCIENCES ===

  // Activité de tri écologique
  {
    id: 'eco-sorting-recycling',
    type: 'eco-sorting',
    title: {
      fr: 'Tri Écologique',
      en: 'Eco Sorting',
      cs: 'Ekologické Třídění'
    },
    description: {
      fr: 'Apprends à trier les déchets pour protéger notre planète ! Glisse chaque objet dans le bon bac de recyclage.',
      en: 'Learn to sort waste to protect our planet! Drag each item to the correct recycling bin.',
      cs: 'Naučte se třídit odpad na ochranu naší planety! Přetáhněte každou položku do správného recyklačního koše.'
    },
    difficulty: 2,
    minAge: 5,
    maxAge: 10,
    subject: 'Science',
    badges: ['Eco-Warrior', 'Recycling Expert', 'Planet Protector'],
    data: {
      items: [
        {
          id: 'plastic-bottle',
          name: { fr: 'Bouteille en plastique', en: 'Plastic bottle', cs: 'Plastová láhev' },
          category: 'plastic',
          emoji: '🍾'
        },
        {
          id: 'newspaper',
          name: { fr: 'Journal', en: 'Newspaper', cs: 'Noviny' },
          category: 'paper',
          emoji: '📰'
        },
        {
          id: 'glass-jar',
          name: { fr: 'Pot en verre', en: 'Glass jar', cs: 'Skleněná nádoba' },
          category: 'glass',
          emoji: '🫙'
        },
        {
          id: 'aluminum-can',
          name: { fr: 'Canette en aluminium', en: 'Aluminum can', cs: 'Hliníková plechovka' },
          category: 'metal',
          emoji: '🥤'
        },
        {
          id: 'cardboard-box',
          name: { fr: 'Boîte en carton', en: 'Cardboard box', cs: 'Kartonová krabice' },
          category: 'paper',
          emoji: '📦'
        },
        {
          id: 'plastic-bag',
          name: { fr: 'Sac plastique', en: 'Plastic bag', cs: 'Plastový sáček' },
          category: 'plastic',
          emoji: '🛍️'
        }
      ],
      bins: [
        {
          id: 'plastic',
          name: { fr: 'Plastique', en: 'Plastic', cs: 'Plast' },
          color: '#ffc107',
          emoji: '♻️'
        },
        {
          id: 'paper',
          name: { fr: 'Papier', en: 'Paper', cs: 'Papír' },
          color: '#2196f3',
          emoji: '📄'
        },
        {
          id: 'glass',
          name: { fr: 'Verre', en: 'Glass', cs: 'Sklo' },
          color: '#4caf50',
          emoji: '🫙'
        },
        {
          id: 'metal',
          name: { fr: 'Métal', en: 'Metal', cs: 'Kov' },
          color: '#9e9e9e',
          emoji: '⚙️'
        }
      ]
    }
  },

  // Séquence numérique simple
  {
    id: 'number-sequence-counting',
    type: 'number-sequence',
    title: {
      fr: 'Suites Numériques',
      en: 'Number Sequences',
      cs: 'Číselné Sekvence'
    },
    description: {
      fr: 'Découvre les motifs cachés dans les nombres ! Complète les séquences en trouvant la règle.',
      en: 'Discover hidden patterns in numbers! Complete sequences by finding the rule.',
      cs: 'Objevte skryté vzory v číslech! Dokončete sekvence nalezením pravidla.'
    },
    difficulty: 3,
    minAge: 6,
    maxAge: 12,
    subject: 'Math',
    badges: ['Number Detective', 'Pattern Master', 'Math Wizard'],
    data: {
      sequence: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
      rule: {
        fr: 'Ajouter 2 à chaque fois',
        en: 'Add 2 each time',
        cs: 'Přidejte 2 pokaždé'
      },
      hint: {
        fr: 'Regarde la différence entre chaque nombre consécutif !',
        en: 'Look at the difference between each consecutive number!',
        cs: 'Podívejte se na rozdíl mezi každým po sobě jdoucím číslem!'
      }
    }
  },

  // Séquence numérique avancée
  {
    id: 'number-sequence-fibonacci',
    type: 'number-sequence',
    title: {
      fr: 'Séquence de Fibonacci',
      en: 'Fibonacci Sequence',
      cs: 'Fibonacciho Sekvence'
    },
    description: {
      fr: 'Explore la célèbre séquence de Fibonacci ! Chaque nombre est la somme des deux précédents.',
      en: 'Explore the famous Fibonacci sequence! Each number is the sum of the two previous ones.',
      cs: 'Prozkoumejte slavnou Fibonacciho sekvenci! Každé číslo je součtem dvou předchozích.'
    },
    difficulty: 4,
    minAge: 9,
    maxAge: 12,
    subject: 'Math',
    badges: ['Fibonacci Master', 'Golden Ratio', 'Advanced Mathematician'],
    data: {
      sequence: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55],
      rule: {
        fr: 'Chaque nombre = somme des deux précédents',
        en: 'Each number = sum of the two previous ones',
        cs: 'Každé číslo = součet dvou předchozích'
      },
      hint: {
        fr: 'Additionne les deux nombres qui précèdent pour trouver le suivant !',
        en: 'Add the two numbers before to find the next one!',
        cs: 'Sečtěte dvě předchozí čísla a najděte další!'
      }
    }
  },

  // Constructeur d'histoires fantastiques
  {
    id: 'story-builder-fantasy',
    type: 'story-builder',
    title: {
      fr: 'Créateur d\'Histoires Fantastiques',
      en: 'Fantasy Story Builder',
      cs: 'Tvůrce Fantastických Příběhů'
    },
    description: {
      fr: 'Crée ton propre conte de fées ! Choisis les personnages, les lieux et les aventures pour construire une histoire unique.',
      en: 'Create your own fairy tale! Choose characters, places, and adventures to build a unique story.',
      cs: 'Vytvořte si vlastní pohádku! Vyberte postavy, místa a dobrodružství pro vytvoření jedinečného příběhu.'
    },
    difficulty: 2,
    minAge: 4,
    maxAge: 10,
    subject: 'Language',
    badges: ['Storyteller', 'Creative Writer', 'Imagination Master'],
    data: {
      theme: {
        fr: 'Conte de Fées Magique',
        en: 'Magical Fairy Tale',
        cs: 'Magická Pohádka'
      },
      steps: [
        {
          id: 'hero',
          title: {
            fr: 'Choisis ton héros',
            en: 'Choose your hero',
            cs: 'Vyberte svého hrdinu'
          },
          choices: [
            {
              id: 'princess',
              text: {
                fr: 'Il était une fois une princesse courageuse',
                en: 'Once upon a time there was a brave princess',
                cs: 'Byla jednou jedna odvážná princezna'
              },
              emoji: '👸'
            },
            {
              id: 'knight',
              text: {
                fr: 'Il était une fois un chevalier intrépide',
                en: 'Once upon a time there was a fearless knight',
                cs: 'Byl jednou jeden nebojácný rytíř'
              },
              emoji: '🤴'
            },
            {
              id: 'wizard',
              text: {
                fr: 'Il était une fois un magicien sage',
                en: 'Once upon a time there was a wise wizard',
                cs: 'Byl jednou jeden moudrý kouzelník'
              },
              emoji: '🧙‍♂️'
            }
          ]
        },
        {
          id: 'setting',
          title: {
            fr: 'Où se déroule l\'aventure ?',
            en: 'Where does the adventure take place?',
            cs: 'Kde se dobrodružství odehrává?'
          },
          choices: [
            {
              id: 'castle',
              text: {
                fr: 'qui vivait dans un château enchanté',
                en: 'who lived in an enchanted castle',
                cs: 'který žil v kouzelném hradě'
              },
              emoji: '🏰'
            },
            {
              id: 'forest',
              text: {
                fr: 'qui habitait dans une forêt mystérieuse',
                en: 'who lived in a mysterious forest',
                cs: 'který bydlel v tajemném lese'
              },
              emoji: '🌲'
            },
            {
              id: 'mountain',
              text: {
                fr: 'qui demeurait sur une montagne magique',
                en: 'who dwelt on a magical mountain',
                cs: 'který sídlil na kouzelné hoře'
              },
              emoji: '⛰️'
            }
          ]
        },
        {
          id: 'quest',
          title: {
            fr: 'Quelle est sa mission ?',
            en: 'What is their quest?',
            cs: 'Jaká je jejich mise?'
          },
          choices: [
            {
              id: 'dragon',
              text: {
                fr: 'Un jour, notre héros décida de sauver le royaume d\'un terrible dragon',
                en: 'One day, our hero decided to save the kingdom from a terrible dragon',
                cs: 'Jednoho dne se náš hrdina rozhodl zachránit království před strašlivým drakem'
              },
              emoji: '🐉'
            },
            {
              id: 'treasure',
              text: {
                fr: 'Un jour, notre héros partit à la recherche d\'un trésor légendaire',
                en: 'One day, our hero set out in search of a legendary treasure',
                cs: 'Jednoho dne se náš hrdina vydal hledat legendární poklad'
              },
              emoji: '💎'
            },
            {
              id: 'spell',
              text: {
                fr: 'Un jour, notre héros voulut briser un sortilège maléfique',
                en: 'One day, our hero wanted to break an evil spell',
                cs: 'Jednoho dne chtěl náš hrdina zlomit zlé kouzlo'
              },
              emoji: '✨'
            }
          ]
        },
        {
          id: 'ending',
          title: {
            fr: 'Comment l\'histoire se termine-t-elle ?',
            en: 'How does the story end?',
            cs: 'Jak příběh končí?'
          },
          choices: [
            {
              id: 'victory',
              text: {
                fr: 'Après de nombreuses aventures, notre héros triompha et tout le royaume fut dans la joie',
                en: 'After many adventures, our hero triumphed and the whole kingdom rejoiced',
                cs: 'Po mnoha dobrodružstvích náš hrdina zvítězil a celé království se radovalo'
              },
              emoji: '🎉'
            },
            {
              id: 'wisdom',
              text: {
                fr: 'À la fin, notre héros découvrit que la vraie magie était l\'amitié et la bonté',
                en: 'In the end, our hero discovered that true magic was friendship and kindness',
                cs: 'Nakonec náš hrdina objevil, že skutečná magie je přátelství a laskavost'
              },
              emoji: '💝'
            },
            {
              id: 'return',
              text: {
                fr: 'Et ils vécurent heureux, protégeant leur royaume pour toujours',
                en: 'And they lived happily, protecting their kingdom forever',
                cs: 'A žili šťastně a chránili své království navždy'
              },
              emoji: '🌟'
            }
          ]
        }
      ]
    }
  },

  // === SCIENCES - SUITE ===

  {
    id: 'science-solar-system',
    type: 'eco-sorting',
    title: {
      fr: 'Système Solaire',
      en: 'Solar System',
      cs: 'Sluneční Soustava'
    },
    description: {
      fr: 'Explore l\'espace ! Classe les planètes selon leur distance du Soleil 🌞🪐',
      en: 'Explore space! Sort planets by their distance from the Sun 🌞🪐',
      cs: 'Prozkoumej vesmír! Třiď planety podle vzdálenosti od Slunce 🌞🪐'
    },
    difficulty: 3,
    minAge: 7,
    maxAge: 12,
    subject: 'Science',
    badges: ['Space Explorer', 'Astronaut', 'Planet Master'],
    data: {
      items: [
        {
          id: 'mercury',
          name: { fr: 'Mercure', en: 'Mercury', cs: 'Merkur' },
          category: 'inner',
          emoji: '☿️'
        },
        {
          id: 'venus',
          name: { fr: 'Vénus', en: 'Venus', cs: 'Venuše' },
          category: 'inner',
          emoji: '♀️'
        },
        {
          id: 'earth',
          name: { fr: 'Terre', en: 'Earth', cs: 'Země' },
          category: 'inner',
          emoji: '🌍'
        },
        {
          id: 'mars',
          name: { fr: 'Mars', en: 'Mars', cs: 'Mars' },
          category: 'inner',
          emoji: '🔴'
        },
        {
          id: 'jupiter',
          name: { fr: 'Jupiter', en: 'Jupiter', cs: 'Jupiter' },
          category: 'outer',
          emoji: '🪐'
        },
        {
          id: 'saturn',
          name: { fr: 'Saturne', en: 'Saturn', cs: 'Saturn' },
          category: 'outer',
          emoji: '🪐'
        }
      ],
      bins: [
        {
          id: 'inner',
          name: { fr: 'Planètes Intérieures', en: 'Inner Planets', cs: 'Vnitřní Planety' },
          color: '#ff6b35',
          emoji: '☀️'
        },
        {
          id: 'outer',
          name: { fr: 'Planètes Extérieures', en: 'Outer Planets', cs: 'Vnější Planety' },
          color: '#1e3a8a',
          emoji: '🌌'
        }
      ]
    }
  },

  {
    id: 'science-animal-habitats',
    type: 'eco-sorting',
    title: {
      fr: 'Habitats des Animaux',
      en: 'Animal Habitats',
      cs: 'Biotopy Zvířat'
    },
    description: {
      fr: 'Aide les animaux à retrouver leur maison ! Océan, forêt, désert ou savane ? 🦁🐠🌲',
      en: 'Help animals find their home! Ocean, forest, desert, or savanna? 🦁🐠🌲',
      cs: 'Pomoz zvířatům najít domov! Oceán, les, poušť nebo savana? 🦁🐠🌲'
    },
    difficulty: 2,
    minAge: 4,
    maxAge: 8,
    subject: 'Science',
    badges: ['Animal Expert', 'Habitat Helper', 'Nature Guardian'],
    data: {
      items: [
        {
          id: 'lion',
          name: { fr: 'Lion', en: 'Lion', cs: 'Lev' },
          category: 'savanna',
          emoji: '🦁'
        },
        {
          id: 'fish',
          name: { fr: 'Poisson', en: 'Fish', cs: 'Ryba' },
          category: 'ocean',
          emoji: '🐠'
        },
        {
          id: 'bear',
          name: { fr: 'Ours', en: 'Bear', cs: 'Medvěd' },
          category: 'forest',
          emoji: '🐻'
        },
        {
          id: 'camel',
          name: { fr: 'Chameau', en: 'Camel', cs: 'Velbloud' },
          category: 'desert',
          emoji: '🐪'
        },
        {
          id: 'dolphin',
          name: { fr: 'Dauphin', en: 'Dolphin', cs: 'Delfín' },
          category: 'ocean',
          emoji: '🐬'
        },
        {
          id: 'zebra',
          name: { fr: 'Zèbre', en: 'Zebra', cs: 'Zebra' },
          category: 'savanna',
          emoji: '🦓'
        }
      ],
      bins: [
        {
          id: 'ocean',
          name: { fr: 'Océan', en: 'Ocean', cs: 'Oceán' },
          color: '#0ea5e9',
          emoji: '🌊'
        },
        {
          id: 'forest',
          name: { fr: 'Forêt', en: 'Forest', cs: 'Les' },
          color: '#059669',
          emoji: '🌲'
        },
        {
          id: 'desert',
          name: { fr: 'Désert', en: 'Desert', cs: 'Poušť' },
          color: '#f59e0b',
          emoji: '🏜️'
        },
        {
          id: 'savanna',
          name: { fr: 'Savane', en: 'Savanna', cs: 'Savana' },
          color: '#84cc16',
          emoji: '🦁'
        }
      ]
    }
  },

  // === LANGUES ===

  {
    id: 'language-rhyming-words',
    type: 'eco-sorting',
    title: {
      fr: 'Mots qui Riment',
      en: 'Rhyming Words',
      cs: 'Rýmující Slova'
    },
    description: {
      fr: 'Trouve les mots qui riment ! Chat rime avec rat, et fleur avec cœur 💝🎵',
      en: 'Find words that rhyme! Cat rhymes with hat, and star with car 💝🎵',
      cs: 'Najdi slova, která se rýmují! Kůň se rýmuje s dům, a pes s les 💝🎵'
    },
    difficulty: 2,
    minAge: 4,
    maxAge: 8,
    subject: 'Language',
    badges: ['Rhyme Master', 'Word Wizard', 'Poetry Pro'],
    data: {
      items: [
        {
          id: 'chat',
          name: { fr: 'Chat', en: 'Cat', cs: 'Kočka' },
          category: 'at-sound',
          emoji: '🐱'
        },
        {
          id: 'rat',
          name: { fr: 'Rat', en: 'Hat', cs: 'Klobouk' },
          category: 'at-sound',
          emoji: '🐭'
        },
        {
          id: 'fleur',
          name: { fr: 'Fleur', en: 'Star', cs: 'Hvězda' },
          category: 'ar-sound',
          emoji: '🌸'
        },
        {
          id: 'coeur',
          name: { fr: 'Cœur', en: 'Car', cs: 'Auto' },
          category: 'ar-sound',
          emoji: '💖'
        },
        {
          id: 'maison',
          name: { fr: 'Maison', en: 'Sun', cs: 'Slunce' },
          category: 'on-sound',
          emoji: '🏠'
        },
        {
          id: 'poisson',
          name: { fr: 'Poisson', en: 'Fun', cs: 'Zábava' },
          category: 'on-sound',
          emoji: '🐠'
        }
      ],
      bins: [
        {
          id: 'at-sound',
          name: { fr: 'Sons en "-at"', en: '"-at" sounds', cs: 'Zvuky "-at"' },
          color: '#e91e63',
          emoji: '🎵'
        },
        {
          id: 'ar-sound',
          name: { fr: 'Sons en "-eur"', en: '"-ar" sounds', cs: 'Zvuky "-ar"' },
          color: '#9c27b0',
          emoji: '🎶'
        },
        {
          id: 'on-sound',
          name: { fr: 'Sons en "-on"', en: '"-un" sounds', cs: 'Zvuky "-un"' },
          color: '#3f51b5',
          emoji: '🎼'
        }
      ]
    }
  },

  // === CRÉATIVITÉ & ART ===

  {
    id: 'art-color-mixing',
    type: 'eco-sorting',
    title: {
      fr: 'Mélange de Couleurs',
      en: 'Color Mixing',
      cs: 'Míchání Barev'
    },
    description: {
      fr: 'Découvre la magie des couleurs ! Rouge + Jaune = Orange ! 🎨✨',
      en: 'Discover the magic of colors! Red + Yellow = Orange! 🎨✨',
      cs: 'Objevte kouzlo barev! Červená + Žlutá = Oranžová! 🎨✨'
    },
    difficulty: 2,
    minAge: 3,
    maxAge: 7,
    subject: 'Art',
    badges: ['Color Wizard', 'Artist', 'Rainbow Master'],
    data: {
      items: [
        {
          id: 'red-yellow',
          name: { fr: 'Rouge + Jaune', en: 'Red + Yellow', cs: 'Červená + Žlutá' },
          category: 'orange',
          emoji: '🔴🟡'
        },
        {
          id: 'blue-yellow',
          name: { fr: 'Bleu + Jaune', en: 'Blue + Yellow', cs: 'Modrá + Žlutá' },
          category: 'green',
          emoji: '🔵🟡'
        },
        {
          id: 'red-blue',
          name: { fr: 'Rouge + Bleu', en: 'Red + Blue', cs: 'Červená + Modrá' },
          category: 'purple',
          emoji: '🔴🔵'
        }
      ],
      bins: [
        {
          id: 'orange',
          name: { fr: 'Orange', en: 'Orange', cs: 'Oranžová' },
          color: '#ff9800',
          emoji: '🟧'
        },
        {
          id: 'green',
          name: { fr: 'Vert', en: 'Green', cs: 'Zelená' },
          color: '#4caf50',
          emoji: '🟢'
        },
        {
          id: 'purple',
          name: { fr: 'Violet', en: 'Purple', cs: 'Fialová' },
          color: '#9c27b0',
          emoji: '🟣'
        }
      ]
    }
  },

  // === HISTOIRES AVANCÉES ===

  // Histoire de science-fiction pour les plus grands
  {
    id: 'story-builder-scifi',
    type: 'story-builder',
    title: {
      fr: 'Aventure Spatiale',
      en: 'Space Adventure',
      cs: 'Vesmírné Dobrodružství'
    },
    description: {
      fr: 'Pars à la conquête de l\'espace ! Crée une histoire de science-fiction palpitante avec des aliens et des vaisseaux spatiaux.',
      en: 'Conquer space! Create a thrilling science fiction story with aliens and spaceships.',
      cs: 'Dobijte vesmír! Vytvořte napínavý sci-fi příběh s mimozemšťany a vesmírnými loděmi.'
    },
    difficulty: 3,
    minAge: 7,
    maxAge: 12,
    subject: 'Language',
    badges: ['Space Explorer', 'Sci-Fi Author', 'Galaxy Guardian'],
    data: {
      theme: {
        fr: 'Exploration Spatiale',
        en: 'Space Exploration',
        cs: 'Průzkum Vesmíru'
      },
      steps: [
        {
          id: 'character',
          title: {
            fr: 'Qui es-tu dans cette aventure ?',
            en: 'Who are you in this adventure?',
            cs: 'Kým jste v tomto dobrodružství?'
          },
          choices: [
            {
              id: 'astronaut',
              text: {
                fr: 'Dans un futur lointain, je suis un astronaute explorateur',
                en: 'In the distant future, I am an explorer astronaut',
                cs: 'V daleké budoucnosti jsem průzkumný astronaut'
              },
              emoji: '👨‍🚀'
            },
            {
              id: 'alien',
              text: {
                fr: 'Dans un futur lointain, je suis un alien pacifique',
                en: 'In the distant future, I am a peaceful alien',
                cs: 'V daleké budoucnosti jsem mírumilovný mimozemšťan'
              },
              emoji: '👽'
            },
            {
              id: 'robot',
              text: {
                fr: 'Dans un futur lointain, je suis un robot intelligent',
                en: 'In the distant future, I am an intelligent robot',
                cs: 'V daleké budoucnosti jsem inteligentní robot'
              },
              emoji: '🤖'
            }
          ]
        },
        {
          id: 'mission',
          title: {
            fr: 'Quelle est ta mission ?',
            en: 'What is your mission?',
            cs: 'Jaká je vaše mise?'
          },
          choices: [
            {
              id: 'explore',
              text: {
                fr: 'qui voyage à travers la galaxie pour découvrir de nouvelles planètes',
                en: 'who travels through the galaxy to discover new planets',
                cs: 'který cestuje galaxií a objevuje nové planety'
              },
              emoji: '🌍'
            },
            {
              id: 'peace',
              text: {
                fr: 'qui travaille pour maintenir la paix entre les différentes espèces',
                en: 'who works to maintain peace between different species',
                cs: 'který pracuje na udržení míru mezi různými druhy'
              },
              emoji: '🕊️'
            },
            {
              id: 'rescue',
              text: {
                fr: 'qui sauve des civilisations en danger dans l\'univers',
                en: 'who rescues endangered civilizations in the universe',
                cs: 'který zachraňuje ohrožené civilizace ve vesmíru'
              },
              emoji: '🚀'
            }
          ]
        }
      ]
    }
  },

  // === INFORMATIQUE ===

  {
    id: 'computing-binary-code',
    type: 'eco-sorting',
    title: {
      fr: 'Code Binaire',
      en: 'Binary Code',
      cs: 'Binární Kód'
    },
    description: {
      fr: 'Apprends le langage des ordinateurs ! 0 et 1 forment tous les nombres 💻',
      en: 'Learn the language of computers! 0 and 1 make all numbers 💻',
      cs: 'Naučte se jazyk počítačů! 0 a 1 tvoří všechna čísla 💻'
    },
    difficulty: 4,
    minAge: 8,
    maxAge: 12,
    subject: 'Computing',
    badges: ['Binary Expert', 'Computer Scientist', 'Code Master'],
    data: {
      items: [
        {
          id: 'binary-1',
          name: { fr: '0001 (1)', en: '0001 (1)', cs: '0001 (1)' },
          category: 'single-digit',
          emoji: '1️⃣'
        },
        {
          id: 'binary-2',
          name: { fr: '0010 (2)', en: '0010 (2)', cs: '0010 (2)' },
          category: 'single-digit',
          emoji: '2️⃣'
        },
        {
          id: 'binary-10',
          name: { fr: '1010 (10)', en: '1010 (10)', cs: '1010 (10)' },
          category: 'double-digit',
          emoji: '🔟'
        },
        {
          id: 'binary-15',
          name: { fr: '1111 (15)', en: '1111 (15)', cs: '1111 (15)' },
          category: 'double-digit',
          emoji: '🔢'
        }
      ],
      bins: [
        {
          id: 'single-digit',
          name: { fr: 'Chiffres Simples', en: 'Single Digits', cs: 'Jednociferné' },
          color: '#2196f3',
          emoji: '1️⃣'
        },
        {
          id: 'double-digit',
          name: { fr: 'Nombres Plus Grands', en: 'Larger Numbers', cs: 'Větší Čísla' },
          color: '#9c27b0',
          emoji: '💯'
        }
      ]
    }
  },

  // === HYGIÈNE & SANTÉ ===

  {
    id: 'hygiene-healthy-foods',
    type: 'eco-sorting',
    title: {
      fr: 'Aliments Sains',
      en: 'Healthy Foods',
      cs: 'Zdravé Potraviny'
    },
    description: {
      fr: 'Choisis les aliments qui donnent de l\'énergie ! Fruits et légumes vs bonbons 🥕🍎',
      en: 'Choose foods that give energy! Fruits and vegetables vs candy 🥕🍎',
      cs: 'Vyber potraviny, které dávají energii! Ovoce a zelenina vs sladkosti 🥕🍎'
    },
    difficulty: 1,
    minAge: 3,
    maxAge: 7,
    subject: 'Hygiene',
    badges: ['Health Hero', 'Nutrition Expert', 'Strong Body'],
    data: {
      items: [
        {
          id: 'apple',
          name: { fr: 'Pomme', en: 'Apple', cs: 'Jablko' },
          category: 'healthy',
          emoji: '🍎'
        },
        {
          id: 'carrot',
          name: { fr: 'Carotte', en: 'Carrot', cs: 'Mrkev' },
          category: 'healthy',
          emoji: '🥕'
        },
        {
          id: 'candy',
          name: { fr: 'Bonbon', en: 'Candy', cs: 'Sladkost' },
          category: 'unhealthy',
          emoji: '🍬'
        },
        {
          id: 'broccoli',
          name: { fr: 'Brocoli', en: 'Broccoli', cs: 'Brokolice' },
          category: 'healthy',
          emoji: '🥦'
        },
        {
          id: 'chips',
          name: { fr: 'Chips', en: 'Chips', cs: 'Chipsy' },
          category: 'unhealthy',
          emoji: '🍟'
        }
      ],
      bins: [
        {
          id: 'healthy',
          name: { fr: 'Aliments Sains', en: 'Healthy Foods', cs: 'Zdravé Potraviny' },
          color: '#4caf50',
          emoji: '💪'
        },
        {
          id: 'unhealthy',
          name: { fr: 'À Consommer avec Modération', en: 'Eat in Moderation', cs: 'Jíst s Mírou' },
          color: '#ff9800',
          emoji: '⚠️'
        }
      ]
    }
  },

  // === MORE MATH ACTIVITIES ===

  {
    id: 'math-fractions-pizza',
    type: 'eco-sorting',
    title: {
      fr: 'Fractions avec des Pizzas',
      en: 'Fractions with Pizzas',
      cs: 'Zlomky s Pizzou'
    },
    description: {
      fr: 'Apprends les fractions en partageant des pizzas ! 1/2, 1/4, 1/8... 🍕',
      en: 'Learn fractions by sharing pizzas! 1/2, 1/4, 1/8... 🍕',
      cs: 'Naučte se zlomky sdílením pizzy! 1/2, 1/4, 1/8... 🍕'
    },
    difficulty: 3,
    minAge: 7,
    maxAge: 10,
    subject: 'Math',
    badges: ['Fraction Master', 'Pizza Chef', 'Math Genius'],
    data: {
      items: [
        {
          id: 'half-pizza',
          name: { fr: '1/2 Pizza', en: '1/2 Pizza', cs: '1/2 Pizza' },
          category: 'halves',
          emoji: '🍕'
        },
        {
          id: 'quarter-pizza',
          name: { fr: '1/4 Pizza', en: '1/4 Pizza', cs: '1/4 Pizza' },
          category: 'quarters',
          emoji: '🍕'
        },
        {
          id: 'eighth-pizza',
          name: { fr: '1/8 Pizza', en: '1/8 Pizza', cs: '1/8 Pizza' },
          category: 'eighths',
          emoji: '🍕'
        }
      ],
      bins: [
        {
          id: 'halves',
          name: { fr: 'Moitiés (1/2)', en: 'Halves (1/2)', cs: 'Poloviny (1/2)' },
          color: '#f44336',
          emoji: '½'
        },
        {
          id: 'quarters',
          name: { fr: 'Quarts (1/4)', en: 'Quarters (1/4)', cs: 'Čtvrtiny (1/4)' },
          color: '#9c27b0',
          emoji: '¼'
        },
        {
          id: 'eighths',
          name: { fr: 'Huitièmes (1/8)', en: 'Eighths (1/8)', cs: 'Osminy (1/8)' },
          color: '#2196f3',
          emoji: '⅛'
        }
      ]
    }
  },

  // === ADVANCED SEQUENCES ===

  {
    id: 'math-fibonacci-advanced',
    type: 'number-sequence',
    title: {
      fr: 'Suite de Fibonacci Avancée',
      en: 'Advanced Fibonacci',
      cs: 'Pokročilá Fibonacci'
    },
    description: {
      fr: 'Maîtrise la célèbre suite de Fibonacci ! Chaque nombre est la somme des deux précédents 🌀',
      en: 'Master the famous Fibonacci sequence! Each number is the sum of the two previous ones 🌀',
      cs: 'Ovládni slavnou Fibonacciho posloupnost! Každé číslo je součtem dvou předchozích 🌀'
    },
    difficulty: 5,
    minAge: 10,
    maxAge: 12,
    subject: 'Math',
    badges: ['Fibonacci Master', 'Golden Ratio', 'Mathematical Genius'],
    data: {
      sequence: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144],
      rule: {
        fr: 'Chaque nombre = somme des deux précédents',
        en: 'Each number = sum of the two previous ones',
        cs: 'Každé číslo = součet dvou předchozích'
      },
      hint: {
        fr: 'Fibonacci : 1+1=2, 1+2=3, 2+3=5, 3+5=8...',
        en: 'Fibonacci: 1+1=2, 1+2=3, 2+3=5, 3+5=8...',
        cs: 'Fibonacci: 1+1=2, 1+2=3, 2+3=5, 3+5=8...'
      }
    }
  },

  // === MORE STORIES ===

  {
    id: 'story-builder-adventure',
    type: 'story-builder',
    title: {
      fr: 'Aventure dans la Jungle',
      en: 'Jungle Adventure',
      cs: 'Dobrodružství v Džungli'
    },
    description: {
      fr: 'Pars à l\'aventure dans la jungle mystérieuse ! Rencontre des animaux exotiques 🐅🌿',
      en: 'Go on an adventure in the mysterious jungle! Meet exotic animals 🐅🌿',
      cs: 'Vydej se na dobrodružství v tajemné džungli! Potkej exotická zvířata 🐅🌿'
    },
    difficulty: 2,
    minAge: 5,
    maxAge: 9,
    subject: 'Language',
    badges: ['Jungle Explorer', 'Adventure Writer', 'Animal Friend'],
    data: {
      theme: {
        fr: 'Aventure dans la Jungle',
        en: 'Jungle Adventure',
        cs: 'Dobrodružství v Džungli'
      },
      steps: [
        {
          id: 'explorer',
          title: {
            fr: 'Qui es-tu ?',
            en: 'Who are you?',
            cs: 'Kdo jsi?'
          },
          choices: [
            {
              id: 'adventurer',
              text: {
                fr: 'Je suis un explorateur courageux',
                en: 'I am a brave explorer',
                cs: 'Jsem odvážný průzkumník'
              },
              emoji: '🧭'
            },
            {
              id: 'scientist',
              text: {
                fr: 'Je suis un scientifique curieux',
                en: 'I am a curious scientist',
                cs: 'Jsem zvědavý vědec'
              },
              emoji: '🔬'
            },
            {
              id: 'photographer',
              text: {
                fr: 'Je suis un photographe animalier',
                en: 'I am a wildlife photographer',
                cs: 'Jsem fotograf přírody'
              },
              emoji: '📸'
            }
          ]
        },
        {
          id: 'discovery',
          title: {
            fr: 'Que découvres-tu ?',
            en: 'What do you discover?',
            cs: 'Co objevíš?'
          },
          choices: [
            {
              id: 'temple',
              text: {
                fr: 'qui découvre un temple ancien caché par les lianes',
                en: 'who discovers an ancient temple hidden by vines',
                cs: 'který objeví starověký chrám skrytý liánami'
              },
              emoji: '🏛️'
            },
            {
              id: 'animals',
              text: {
                fr: 'qui rencontre une famille de singes joueurs',
                en: 'who meets a family of playful monkeys',
                cs: 'který potká rodinu hravých opic'
              },
              emoji: '🐒'
            },
            {
              id: 'waterfall',
              text: {
                fr: 'qui trouve une cascade cristalline magique',
                en: 'who finds a magical crystal waterfall',
                cs: 'který najde kouzelný křišťálový vodopád'
              },
              emoji: '💦'
            }
          ]
        }
      ]
    }
  },

  // === COMPUTING ADVANCED ===

  {
    id: 'computing-algorithms',
    type: 'number-sequence',
    title: {
      fr: 'Algorithmes Simples',
      en: 'Simple Algorithms',
      cs: 'Jednoduché Algoritmy'
    },
    description: {
      fr: 'Pense comme un ordinateur ! Suis des instructions étape par étape 🤖',
      en: 'Think like a computer! Follow step-by-step instructions 🤖',
      cs: 'Mysli jako počítač! Následuj pokyny krok za krokem 🤖'
    },
    difficulty: 4,
    minAge: 8,
    maxAge: 12,
    subject: 'Computing',
    badges: ['Algorithm Master', 'Logic Wizard', 'Programmer'],
    data: {
      sequence: [2, 4, 8, 16, 32, 64, 128, 256],
      rule: {
        fr: 'Doubler à chaque étape (×2)',
        en: 'Double each step (×2)',
        cs: 'Zdvojnásob každý krok (×2)'
      },
      hint: {
        fr: 'Multiplie par 2 : 2×2=4, 4×2=8, 8×2=16...',
        en: 'Multiply by 2: 2×2=4, 4×2=8, 8×2=16...',
        cs: 'Vynásob 2: 2×2=4, 4×2=8, 8×2=16...'
      }
    }
  }
];

export default interactiveActivities;