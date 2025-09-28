// Système de localisation pour LittleGenius AI
export type SupportedLanguage = 'fr' | 'en' | 'cs';

export interface LocalizedContent {
  fr: string;
  en: string;
  cs: string;
}

// Interface principale pour les traductions
export interface Translations {
  // Navigation et interface
  ui: {
    welcome: LocalizedContent;
    selectUser: LocalizedContent;
    createProfile: LocalizedContent;
    startAdventure: LocalizedContent;
    chooseSubject: LocalizedContent;
    settings: LocalizedContent;
    parentalControls: LocalizedContent;
    timeLimit: LocalizedContent;
    difficulty: LocalizedContent;
    subjects: LocalizedContent;
    age: LocalizedContent;
    name: LocalizedContent;
    avatar: LocalizedContent;
    play: LocalizedContent;
    back: LocalizedContent;
    next: LocalizedContent;
    finish: LocalizedContent;
    score: LocalizedContent;
    time: LocalizedContent;
    level: LocalizedContent;
    achievements: LocalizedContent;
    congratulations?: LocalizedContent; // Ajout pour écran résultats
    listen?: LocalizedContent;
    stopVoice?: LocalizedContent;
    voiceSettings?: LocalizedContent;
    enableVoice?: LocalizedContent;
    disableVoice?: LocalizedContent;
    voice?: LocalizedContent;
    cancel?: LocalizedContent;
    save?: LocalizedContent;
    chooseAvatar: LocalizedContent;
    minutes: LocalizedContent;
    years: LocalizedContent;
    manageSubjects: LocalizedContent;
    specialInteractiveActivities: LocalizedContent;
    interactiveActivitiesDescription: LocalizedContent;
    explore: LocalizedContent;
    recommendedActivities: LocalizedContent;
  };

  // Navigation
  nav: {
    admin: LocalizedContent;
    activities: LocalizedContent;
  };

  // Matières
  subjects: {
    math: LocalizedContent;
    language: LocalizedContent;
    science: LocalizedContent;
    art: LocalizedContent;
    computing: LocalizedContent; // Informatique / Computer Science
    civic: LocalizedContent;     // Éducation civique
    hygiene: LocalizedContent;   // Hygiène & Santé
    anatomy: LocalizedContent;   // Anatomie humaine
  };

  // Niveaux de difficulté
  difficulty: {
    easy: LocalizedContent;
    medium: LocalizedContent;
    hard: LocalizedContent;
  };

  // Messages de l'IA Génie
  ai: {
    greeting: LocalizedContent;
    encouragement: LocalizedContent[];
    hints: LocalizedContent[];
    congratulations: LocalizedContent[];
    help: LocalizedContent;
    goodbye: LocalizedContent;
  };

  // Activités par matière et âge
  activities: {
    math: {
      counting: LocalizedContent;
      shapes: LocalizedContent;
      colors: LocalizedContent;
      addition: LocalizedContent;
      subtraction: LocalizedContent;
      multiplication: LocalizedContent;
      fractions: LocalizedContent;
      geometry: LocalizedContent;
    };
    language: {
      alphabet: LocalizedContent;
      reading: LocalizedContent;
      writing: LocalizedContent;
      vocabulary: LocalizedContent;
      grammar: LocalizedContent;
      stories: LocalizedContent;
      poetry: LocalizedContent;
      communication: LocalizedContent;
    };
    science: {
      nature: LocalizedContent;
      animals: LocalizedContent;
      plants: LocalizedContent;
      weather: LocalizedContent;
      space: LocalizedContent;
      body: LocalizedContent;
      experiments: LocalizedContent;
      environment: LocalizedContent;
    };
    art: {
      drawing: LocalizedContent;
      painting: LocalizedContent;
      music: LocalizedContent;
      stories: LocalizedContent;
      crafts: LocalizedContent;
      dance: LocalizedContent;
      design: LocalizedContent;
      creativity: LocalizedContent;
    };
    computing: {
      codingBasics: LocalizedContent;
      logicGames: LocalizedContent;
      algorithms: LocalizedContent;
      digitalSafety: LocalizedContent;
      hardwareIntro: LocalizedContent;
      creativeCoding: LocalizedContent;
    };
    civic: {
      rulesCommunity: LocalizedContent;
      responsibilities: LocalizedContent;
      symbolsInstitutions: LocalizedContent;
      citizenshipValues: LocalizedContent;
      teamwork: LocalizedContent;
      problemSolving: LocalizedContent;
    };
    hygiene: {
      dailyRoutine: LocalizedContent;
      nutritionBasics: LocalizedContent;
      bodyCare: LocalizedContent;
      mentalWellbeing: LocalizedContent;
      physicalActivity: LocalizedContent;
      sleepHabits: LocalizedContent;
    };
    anatomy: {
      bodyParts: LocalizedContent;
      internalOrgans: LocalizedContent;
      sensesSystem: LocalizedContent;
      circulation: LocalizedContent;
      respiration: LocalizedContent;
      digestion: LocalizedContent;
    };
  };
  // Voix IA
  voice: {
    femaleFriendly: LocalizedContent;
    selectVoice: LocalizedContent;
    testVoice: LocalizedContent;
    settings: LocalizedContent;
    enable: LocalizedContent;
    disable: LocalizedContent;
    selectVoiceTitle: LocalizedContent;
  };

  // Interface d'administration
  admin: {
    dashboard: LocalizedContent;
    contentManager: LocalizedContent;
    userManagement: LocalizedContent;
    settings: LocalizedContent;
    newContent: LocalizedContent;
    search: LocalizedContent;
    subject: LocalizedContent;
    age: LocalizedContent;
    difficulty: LocalizedContent;
    all: LocalizedContent;
    title: LocalizedContent;
    description: LocalizedContent;
    cancel: LocalizedContent;
    create: LocalizedContent;
    update: LocalizedContent;
    noContentFound: LocalizedContent;
    tryModifyFilters: LocalizedContent;
    editContent: LocalizedContent;
    contentPreview: LocalizedContent;
    interactiveActivities: LocalizedContent;
    newInteractiveActivity: LocalizedContent;
    // Nouvelles traductions
    adminAccess: LocalizedContent;
    enterPassword: LocalizedContent;
    adminPassword: LocalizedContent;
    access: LocalizedContent;
    accessGranted: LocalizedContent;
    incorrectPassword: LocalizedContent;
    questions: LocalizedContent;
    images: LocalizedContent;
    systemSettings: LocalizedContent;
    analytics: LocalizedContent;
    translations: LocalizedContent;
    dragDrop: LocalizedContent;
    interactiveManager: LocalizedContent;
    configuration: LocalizedContent;
    questionsAnswers: LocalizedContent;
    imageManagement: LocalizedContent;
    interactiveManagement: LocalizedContent;
    // Traductions pour le titre admin
    adminTitle: LocalizedContent;
    contentManagement: LocalizedContent;
    activityManager: LocalizedContent;
    questionManager: LocalizedContent;
  };

  // Interface des activités interactives
  interactiveUI: {
    activityCompleted: LocalizedContent;
    finalScore: LocalizedContent;
    points: LocalizedContent;
    excellentWork: LocalizedContent;
    gameIntro: LocalizedContent;
    startGame: LocalizedContent;
    ageRange: LocalizedContent;
    years: LocalizedContent;
    badgesToEarn: LocalizedContent;
    level: LocalizedContent;
    newActivity: LocalizedContent;
    editActivity: LocalizedContent;
    newQuestion: LocalizedContent;
    editQuestion: LocalizedContent;
    newInteractiveActivity: LocalizedContent;
    editInteractiveActivity: LocalizedContent;
    activityCreated: LocalizedContent;
    questionCreated: LocalizedContent;
    interactiveActivityCreated: LocalizedContent;
    modifyFilters: LocalizedContent;
    modifyFiltersQuestion: LocalizedContent;
    active: LocalizedContent;
    broken: LocalizedContent;
    maintenance: LocalizedContent;
    search: LocalizedContent;
    status: LocalizedContent;
    successRate: LocalizedContent;
    systemParameters: LocalizedContent;
    sections: LocalizedContent;
    generalParameters: LocalizedContent;
    educationalParameters: LocalizedContent;
    security: LocalizedContent;
    backup: LocalizedContent;
    performance: LocalizedContent;
    actions: LocalizedContent;
    applicationName: LocalizedContent;
    version: LocalizedContent;
    defaultLanguage: LocalizedContent;
    theme: LocalizedContent;
    light: LocalizedContent;
    dark: LocalizedContent;
    autoSave: LocalizedContent;
    welcomeScreen: LocalizedContent;
    settingsSaved: LocalizedContent;
    passwordChanged: LocalizedContent;
  };

  // Actions
  action: {
    back: LocalizedContent;
    cancel: LocalizedContent;
    save: LocalizedContent;
    create: LocalizedContent;
    edit: LocalizedContent;
    delete: LocalizedContent;
  };
}

// Données de traduction complètes
export const translations: Translations = {
  ui: {
    welcome: {
      fr: "Bienvenue dans LittleGenius AI ! 🎉",
      en: "Welcome to LittleGenius AI! 🎉",
      cs: "Vítejte v LittleGenius AI! 🎉"
    },
    selectUser: {
      fr: "Qui va apprendre aujourd'hui ?",
      en: "Who's learning today?",
      cs: "Kdo se dnes bude učit?"
    },
    createProfile: {
      fr: "Créer un nouveau profil",
      en: "Create new profile",
      cs: "Vytvořit nový profil"
    },
    startAdventure: {
      fr: "Commencer l'aventure !",
      en: "Start the adventure!",
      cs: "Začít dobrodružství!"
    },
    chooseSubject: {
      fr: "Choisis ta matière préférée !",
      en: "Choose your favorite subject!",
      cs: "Vyber si svůj oblíbený předmět!"
    },
    settings: {
      fr: "Paramètres",
      en: "Settings",
      cs: "Nastavení"
    },
    parentalControls: {
      fr: "Contrôles parentaux",
      en: "Parental controls",
      cs: "Rodičovské ovládání"
    },
    timeLimit: {
      fr: "Limite de temps",
      en: "Time limit",
      cs: "Časový limit"
    },
    difficulty: {
      fr: "Difficulté",
      en: "Difficulty",
      cs: "Obtížnost"
    },
    subjects: {
      fr: "Matières",
      en: "Subjects",
      cs: "Předměty"
    },
    age: {
      fr: "Âge",
      en: "Age",
      cs: "Věk"
    },
    name: {
      fr: "Prénom",
      en: "Name",
      cs: "Jméno"
    },
    avatar: {
      fr: "Avatar",
      en: "Avatar",
      cs: "Avatar"
    },
    play: {
      fr: "Jouer",
      en: "Play",
      cs: "Hrát"
    },
    back: {
      fr: "Retour",
      en: "Back",
      cs: "Zpět"
    },
    next: {
      fr: "Suivant",
      en: "Next",
      cs: "Další"
    },
    finish: {
      fr: "Terminer",
      en: "Finish",
      cs: "Dokončit"
    },
    score: {
      fr: "Score",
      en: "Score",
      cs: "Skóre"
    },
    time: {
      fr: "Temps",
      en: "Time",
      cs: "Čas"
    },
    level: {
      fr: "Niveau",
      en: "Level",
      cs: "Úroveň"
    },
    achievements: {
      fr: "Réussites",
      en: "Achievements",
      cs: "Úspěchy"
    },
    congratulations: {
      fr: "Félicitations",
      en: "Congratulations",
      cs: "Gratulace"
    },
    listen: {
      fr: "Écouter",
      en: "Listen",
      cs: "Poslechnout"
    },
    stopVoice: {
      fr: "Arrêter",
      en: "Stop",
      cs: "Zastavit"
    },
    voiceSettings: {
      fr: "Paramètres Voix",
      en: "Voice Settings",
      cs: "Nastavení Hlasu"
    },
    enableVoice: {
      fr: "Activer Voix",
      en: "Enable Voice",
      cs: "Zapnout Hlas"
    },
    disableVoice: {
      fr: "Désactiver Voix",
      en: "Disable Voice",
      cs: "Vypnout Hlas"
    },
    voice: {
      fr: "Voix",
      en: "Voice",
      cs: "Hlas"
    },
    cancel: {
      fr: "Annuler",
      en: "Cancel",
      cs: "Zrušit"
    },
    save: {
      fr: "Sauvegarder",
      en: "Save",
      cs: "Uložit"
    },
    chooseAvatar: {
      fr: "Choisis ton avatar :",
      en: "Choose your avatar:",
      cs: "Vyber si svůj avatar:"
    },
    minutes: {
      fr: "minutes",
      en: "minutes",
      cs: "minut"
    },
    years: {
      fr: "ans",
      en: "years old",
      cs: "let"
    },
    manageSubjects: {
      fr: "⚙️ Gérer les matières",
      en: "⚙️ Manage subjects",
      cs: "⚙️ Spravovat předměty"
    },
    specialInteractiveActivities: {
      fr: "🎮 Activités Interactives Spéciales",
      en: "🎮 Special Interactive Activities",
      cs: "🎮 Speciální Interaktivní Aktivity"
    },
    interactiveActivitiesDescription: {
      fr: "Découvre des jeux éducatifs inspirés des meilleures plateformes d'apprentissage ! Tri éco-responsable, séquences numériques, création d'histoires et bien plus...",
      en: "Discover educational games inspired by the best learning platforms! Eco-friendly sorting, number sequences, story creation and much more...",
      cs: "Objevuj vzdělávací hry inspirované nejlepšími výukovými platformami! Ekologické třídění, číselné sekvence, tvorba příběhů a mnoho dalšího..."
    },
    explore: {
      fr: "🚀 Explorer !",
      en: "🚀 Explore!",
      cs: "🚀 Prozkoumat!"
    },
    recommendedActivities: {
      fr: "Activités recommandées pour toi 🌟",
      en: "Recommended activities for you 🌟",
      cs: "Doporučené aktivity pro tebe 🌟"
    }
  },

  // Navigation
  nav: {
    admin: {
      fr: "Administration",
      en: "Administration", 
      cs: "Správa"
    },
    activities: {
      fr: "Activités",
      en: "Activities",
      cs: "Aktivity"
    }
  },  subjects: {
    math: {
      fr: "Mathématiques",
      en: "Mathematics",
      cs: "Matematika"
    },
    language: {
      fr: "Français",
      en: "Languages",
      cs: "Jazyky"
    },
    science: {
      fr: "Sciences",
      en: "Science",
      cs: "Věda"
    },
    art: {
      fr: "Art & Créativité",
      en: "Art & Creativity",
      cs: "Umění & Kreativita"
    },
    computing: {
      fr: "Informatique",
      en: "Computing",
      cs: "Informatika"
    },
    civic: {
      fr: "Éducation Civique",
      en: "Civic Education",
      cs: "Občanská Výchova"
    },
    hygiene: {
      fr: "Hygiène & Santé",
      en: "Hygiene & Health",
      cs: "Hygiena & Zdraví"
    },
    anatomy: {
      fr: "Anatomie Humaine",
      en: "Human Anatomy",
      cs: "Lidská Anatomie"
    }
  },

  difficulty: {
    easy: {
      fr: "Facile",
      en: "Easy",
      cs: "Snadné"
    },
    medium: {
      fr: "Moyen",
      en: "Medium",
      cs: "Střední"
    },
    hard: {
      fr: "Difficile",
      en: "Hard",
      cs: "Těžké"
    }
  },

  ai: {
    greeting: {
      fr: "Salut ! Je suis Génie, ton assistant d'apprentissage ! 🧠✨",
      en: "Hi! I'm Genius, your learning assistant! 🧠✨",
      cs: "Ahoj! Jsem Genius, tvůj pomocník při učení! 🧠✨"
    },
    encouragement: [
      {
        fr: "Bravo ! Tu fais du super travail ! 🌟",
        en: "Great job! You're doing amazing! 🌟",
        cs: "Skvělá práce! Děláš to úžasně! 🌟"
      },
      {
        fr: "Continue comme ça, tu es formidable ! 🚀",
        en: "Keep it up, you're fantastic! 🚀",
        cs: "Pokračuj tak, jsi fantastický! 🚀"
      },
      {
        fr: "Tu progresses très bien ! Je suis fier de toi ! 🎉",
        en: "You're making great progress! I'm proud of you! 🎉",
        cs: "Děláš velké pokroky! Jsem na tebe hrdý! 🎉"
      }
    ],
    hints: [
      {
        fr: "Essaie de réfléchir étape par étape 🤔",
        en: "Try thinking step by step 🤔",
        cs: "Zkus přemýšlet krok za krokem 🤔"
      },
      {
        fr: "Regarde bien les indices autour de toi 👀",
        en: "Look carefully at the clues around you 👀",
        cs: "Podívej se pozorně na nápovědy kolem sebe 👀"
      },
      {
        fr: "Tu peux le faire ! Prends ton temps 💪",
        en: "You can do it! Take your time 💪",
        cs: "Zvládneš to! Nech si na to čas 💪"
      }
    ],
    congratulations: [
      {
        fr: "Fantastique ! Tu as réussi ! 🎊",
        en: "Fantastic! You did it! 🎊",
        cs: "Fantastické! Zvládl jsi to! 🎊"
      },
      {
        fr: "Incroyable ! Tu es un vrai génie ! 🧠",
        en: "Incredible! You're a real genius! 🧠",
        cs: "Neuvěřitelné! Jsi opravdový génius! 🧠"
      },
      {
        fr: "Parfait ! Tu maîtrises parfaitement ! ⭐",
        en: "Perfect! You've mastered it! ⭐",
        cs: "Perfektní! Ovládáš to dokonale! ⭐"
      }
    ],
    help: {
      fr: "Besoin d'aide ? Je suis là pour toi ! 🤝",
      en: "Need help? I'm here for you! 🤝",
      cs: "Potřebuješ pomoc? Jsem tu pro tebe! 🤝"
    },
    goodbye: {
      fr: "À bientôt ! Continue à apprendre ! 👋",
      en: "See you soon! Keep learning! 👋",
      cs: "Uvidíme se brzy! Pokračuj v učení! 👋"
    }
  },

  activities: {
    math: {
      counting: {
        fr: "Comptage Magique",
        en: "Magic Counting",
        cs: "Kouzelné Počítání"
      },
      shapes: {
        fr: "Formes Géométriques",
        en: "Geometric Shapes",
        cs: "Geometrické Tvary"
      },
      colors: {
        fr: "Couleurs Arc-en-ciel",
        en: "Rainbow Colors",
        cs: "Duhovky Barvy"
      },
      addition: {
        fr: "Addition Amusante",
        en: "Fun Addition",
        cs: "Zábavné Sčítání"
      },
      subtraction: {
        fr: "Soustraction Simple",
        en: "Simple Subtraction",
        cs: "Jednoduché Odčítání"
      },
      multiplication: {
        fr: "Tables de Multiplication",
        en: "Multiplication Tables",
        cs: "Násobilka"
      },
      fractions: {
        fr: "Fractions Faciles",
        en: "Easy Fractions",
        cs: "Snadné Zlomky"
      },
      geometry: {
        fr: "Géométrie Pratique",
        en: "Practical Geometry",
        cs: "Praktická Geometrie"
      }
    },
    language: {
      alphabet: {
        fr: "Alphabet Magique",
        en: "Magic Alphabet",
        cs: "Kouzelná Abeceda"
      },
      reading: {
        fr: "Lecture Plaisir",
        en: "Fun Reading",
        cs: "Zábavné Čtení"
      },
      writing: {
        fr: "Écriture Creative",
        en: "Creative Writing",
        cs: "Kreativní Psaní"
      },
      vocabulary: {
        fr: "Vocabulaire Riche",
        en: "Rich Vocabulary",
        cs: "Bohatá Slovní Zásoba"
      },
      grammar: {
        fr: "Grammaire Ludique",
        en: "Playful Grammar",
        cs: "Hravá Gramatika"
      },
      stories: {
        fr: "Histoires Merveilleuses",
        en: "Wonderful Stories",
        cs: "Úžasné Příběhy"
      },
      poetry: {
        fr: "Poésie Créative",
        en: "Creative Poetry",
        cs: "Kreativní Poezie"
      },
      communication: {
        fr: "Communication Fluide",
        en: "Fluent Communication",
        cs: "Plynulá Komunikace"
      }
    },
    science: {
      nature: {
        fr: "Nature Merveilleuse",
        en: "Wonderful Nature",
        cs: "Úžasná Příroda"
      },
      animals: {
        fr: "Monde Animal",
        en: "Animal World",
        cs: "Svět Zvířat"
      },
      plants: {
        fr: "Royaume des Plantes",
        en: "Plant Kingdom",
        cs: "Rostlinná Říše"
      },
      weather: {
        fr: "Météo Fascinante",
        en: "Fascinating Weather",
        cs: "Fascinující Počasí"
      },
      space: {
        fr: "Exploration Spatiale",
        en: "Space Exploration",
        cs: "Průzkum Vesmíru"
      },
      body: {
        fr: "Corps Humain",
        en: "Human Body",
        cs: "Lidské Tělo"
      },
      experiments: {
        fr: "Expériences Amusantes",
        en: "Fun Experiments",
        cs: "Zábavné Experimenty"
      },
      environment: {
        fr: "Environnement Précieux",
        en: "Precious Environment",
        cs: "Vzácné Prostředí"
      }
    },
    art: {
      drawing: {
        fr: "Dessin Créatif",
        en: "Creative Drawing",
        cs: "Kreativní Kreslení"
      },
      painting: {
        fr: "Peinture Colorée",
        en: "Colorful Painting",
        cs: "Barevné Malování"
      },
      music: {
        fr: "Musique Joyeuse",
        en: "Joyful Music",
        cs: "Radostná Hudba"
      },
      stories: {
        fr: "Création d'Histoires",
        en: "Story Creation",
        cs: "Tvorba Příběhů"
      },
      crafts: {
        fr: "Bricolage Artistique",
        en: "Artistic Crafts",
        cs: "Umělecké Tvoření"
      },
      dance: {
        fr: "Danse Expressive",
        en: "Expressive Dance",
        cs: "Expresivní Tanec"
      },
      design: {
        fr: "Design Moderne",
        en: "Modern Design",
        cs: "Moderní Design"
      },
      creativity: {
        fr: "Créativité Libre",
        en: "Free Creativity",
        cs: "Volná Kreativita"
      }
    },
    computing: {
      codingBasics: {
        fr: "Bases du Codage",
        en: "Coding Basics",
        cs: "Základy Kódování"
      },
      logicGames: {
        fr: "Jeux Logiques",
        en: "Logic Games",
        cs: "Logické Hry"
      },
      algorithms: {
        fr: "Algorithmes Simples",
        en: "Simple Algorithms",
        cs: "Jednoduché Algoritmy"
      },
      digitalSafety: {
        fr: "Sécurité Numérique",
        en: "Digital Safety",
        cs: "Digitální Bezpečnost"
      },
      hardwareIntro: {
        fr: "Découverte Matériel",
        en: "Hardware Basics",
        cs: "Základy Hardware"
      },
      creativeCoding: {
        fr: "Programmation Créative",
        en: "Creative Coding",
        cs: "Kreativní Programování"
      }
    },
    civic: {
      rulesCommunity: {
        fr: "Règles & Communauté",
        en: "Rules & Community",
        cs: "Pravidla & Komunita"
      },
      responsibilities: {
        fr: "Responsabilités",
        en: "Responsibilities",
        cs: "Odpovědnosti"
      },
      symbolsInstitutions: {
        fr: "Symboles & Institutions",
        en: "Symbols & Institutions",
        cs: "Symboly & Instituce"
      },
      citizenshipValues: {
        fr: "Valeurs Citoyennes",
        en: "Citizenship Values",
        cs: "Občanské Hodnoty"
      },
      teamwork: {
        fr: "Travail d'Équipe",
        en: "Teamwork",
        cs: "Týmová Práce"
      },
      problemSolving: {
        fr: "Résolution de Conflits",
        en: "Conflict Resolution",
        cs: "Řešení Konfliktů"
      }
    },
    hygiene: {
      dailyRoutine: {
        fr: "Routine Quotidienne",
        en: "Daily Routine",
        cs: "Denní Rutina"
      },
      nutritionBasics: {
        fr: "Bases Nutrition",
        en: "Nutrition Basics",
        cs: "Základy Výživy"
      },
      bodyCare: {
        fr: "Soin du Corps",
        en: "Body Care",
        cs: "Péče o Tělo"
      },
      mentalWellbeing: {
        fr: "Bien-être Mental",
        en: "Mental Wellbeing",
        cs: "Duševní Pohoda"
      },
      physicalActivity: {
        fr: "Activité Physique",
        en: "Physical Activity",
        cs: "Fyzická Aktivita"
      },
      sleepHabits: {
        fr: "Sommeil & Repos",
        en: "Sleep & Rest",
        cs: "Spánek & Odpočinek"
      }
    },
    anatomy: {
      bodyParts: {
        fr: "Parties du Corps",
        en: "Body Parts",
        cs: "Části Těla"
      },
      internalOrgans: {
        fr: "Organes Internes",
        en: "Internal Organs",
        cs: "Vnitřní Orgány"
      },
      sensesSystem: {
        fr: "Système des Sens",
        en: "Sensory System",
        cs: "Smyslový Systém"
      },
      circulation: {
        fr: "Circulation Sanguine",
        en: "Blood Circulation",
        cs: "Krevní Oběh"
      },
      respiration: {
        fr: "Respiration",
        en: "Respiration",
        cs: "Dýchání"
      },
      digestion: {
        fr: "Digestion",
        en: "Digestion",
        cs: "Trávení"
      }
    }
  },

  voice: {
    femaleFriendly: {
      fr: "Voix féminine amicale",
      en: "Friendly female voice",
      cs: "Přátelský ženský hlas"
    },
    selectVoice: {
      fr: "Choisir une voix",
      en: "Select voice",
      cs: "Vybrat hlas"
    },
    testVoice: {
      fr: "Tester cette voix",
      en: "Test this voice",
      cs: "Otestovat tento hlas"
    },
    settings: {
      fr: "Paramètres vocaux",
      en: "Voice settings",
      cs: "Nastavení hlasu"
    },
    enable: {
      fr: "Activer",
      en: "Enable",
      cs: "Zapnout"
    },
    disable: {
      fr: "Désactiver",
      en: "Disable",
      cs: "Vypnout"
    },
    selectVoiceTitle: {
      fr: "Choisir une voix",
      en: "Select a voice",
      cs: "Vyberte hlas"
    }
  },

  admin: {
    dashboard: {
      fr: "Tableau de bord",
      en: "Dashboard",
      cs: "Nástěnka"
    },
    contentManager: {
      fr: "Gestionnaire de Contenus",
      en: "Content Manager",
      cs: "Správce obsahu"
    },
    userManagement: {
      fr: "Gestion Utilisateurs",
      en: "User Management",
      cs: "Správa uživatelů"
    },
    settings: {
      fr: "Paramètres",
      en: "Settings",
      cs: "Nastavení"
    },
    newContent: {
      fr: "Nouveau Contenu",
      en: "New Content",
      cs: "Nový obsah"
    },
    search: {
      fr: "Rechercher",
      en: "Search",
      cs: "Hledat"
    },
    subject: {
      fr: "Matière",
      en: "Subject",
      cs: "Předmět"
    },
    age: {
      fr: "Âge",
      en: "Age",
      cs: "Věk"
    },
    difficulty: {
      fr: "Difficulté",
      en: "Difficulty",
      cs: "Obtížnost"
    },
    all: {
      fr: "Tous/Toutes",
      en: "All",
      cs: "Vše"
    },
    title: {
      fr: "Titre",
      en: "Title",
      cs: "Název"
    },
    description: {
      fr: "Description",
      en: "Description",
      cs: "Popis"
    },
    cancel: {
      fr: "Annuler",
      en: "Cancel",
      cs: "Zrušit"
    },
    create: {
      fr: "Créer",
      en: "Create",
      cs: "Vytvořit"
    },
    update: {
      fr: "Mettre à jour",
      en: "Update",
      cs: "Aktualizovat"
    },
    noContentFound: {
      fr: "Aucun contenu trouvé",
      en: "No content found",
      cs: "Nebyl nalezen žádný obsah"
    },
    tryModifyFilters: {
      fr: "Essayez de modifier vos filtres ou créez un nouveau contenu",
      en: "Try modifying your filters or create new content",
      cs: "Zkuste upravit filtry nebo vytvořit nový obsah"
    },
    editContent: {
      fr: "Modifier le Contenu",
      en: "Edit Content",
      cs: "Upravit obsah"
    },
    contentPreview: {
      fr: "Prévisualisation du Contenu",
      en: "Content Preview",
      cs: "Náhled obsahu"
    },
    interactiveActivities: {
      fr: "Activités Interactives",
      en: "Interactive Activities",
      cs: "Interaktivní aktivity"
    },
    newInteractiveActivity: {
      fr: "Nouvelle Activité Interactive",
      en: "New Interactive Activity",
      cs: "Nová interaktivní aktivita"
    },
    // Nouvelles traductions
    adminAccess: {
      fr: "Accès Administrateur",
      en: "Administrator Access", 
      cs: "Přístup správce"
    },
    enterPassword: {
      fr: "Entrez le mot de passe administrateur pour accéder au panneau de gestion.",
      en: "Enter the administrator password to access the management panel.",
      cs: "Zadejte heslo správce pro přístup k panelu správy."
    },
    adminPassword: {
      fr: "Mot de passe administrateur",
      en: "Administrator password",
      cs: "Heslo správce"
    },
    access: {
      fr: "Accéder",
      en: "Access",
      cs: "Přístup"
    },
    accessGranted: {
      fr: "Accès administrateur autorisé",
      en: "Administrator access granted",
      cs: "Povolen přístup správce"
    },
    incorrectPassword: {
      fr: "Mot de passe incorrect",
      en: "Incorrect password",
      cs: "Nesprávné heslo"
    },
    questions: {
      fr: "Questions",
      en: "Questions",
      cs: "Otázky"
    },
    images: {
      fr: "Images",
      en: "Images", 
      cs: "Obrázky"
    },
    systemSettings: {
      fr: "Paramètres",
      en: "Settings",
      cs: "Nastavení"
    },
    analytics: {
      fr: "Analyses",
      en: "Analytics",
      cs: "Analytika"
    },
    translations: {
      fr: "Traductions",
      en: "Translations",
      cs: "Překlady"
    },
    dragDrop: {
      fr: "Glisser-Déposer",
      en: "Drag & Drop",
      cs: "Přetáhnout"
    },
    interactiveManager: {
      fr: "Activités Interactives",
      en: "Interactive Activities",
      cs: "Interaktivní aktivity"
    },
    configuration: {
      fr: "Configuration",
      en: "Configuration",
      cs: "Konfigurace"
    },
    questionsAnswers: {
      fr: "Questions et réponses",
      en: "Questions and answers",
      cs: "Otázky a odpovědi"
    },
    imageManagement: {
      fr: "Gestion des images",
      en: "Image management",
      cs: "Správa obrázků"
    },
    interactiveManagement: {
      fr: "Gestion des activités interactives avec boutons et éléments cliquables",
      en: "Management of interactive activities with buttons and clickable elements",
      cs: "Správa interaktivních aktivit s tlačítky a klikacími prvky"
    },
    // Traductions pour le titre admin
    adminTitle: {
      fr: "Administration LittleGenius",
      en: "LittleGenius Administration",
      cs: "LittleGenius Administrace"
    },
    contentManagement: {
      fr: "Gestion de Contenu",
      en: "Content Management",
      cs: "Správa Obsahu"
    },
    activityManager: {
      fr: "Gestionnaire d'Activités",
      en: "Activity Manager",
      cs: "Správce Aktivit"
    },
    questionManager: {
      fr: "Gestionnaire de Questions",
      en: "Question Manager",
      cs: "Správce Otázek"
    }
  },

  // Interface des activités interactives
  interactiveUI: {
    activityCompleted: {
      fr: "Activité Terminée !",
      en: "Activity Completed!",
      cs: "Aktivita Dokončena!"
    },
    finalScore: {
      fr: "Score final",
      en: "Final Score",
      cs: "Konečné Skóre"
    },
    points: {
      fr: "points",
      en: "points",
      cs: "bodů"
    },
    excellentWork: {
      fr: "Excellent travail ! Tu maîtrises bien cette compétence !",
      en: "Excellent work! You have mastered this skill well!",
      cs: "Výborná práce! Tuto dovednost zvládáš dobře!"
    },
    gameIntro: {
      fr: "Prêt à commencer cette aventure ?",
      en: "Ready to start this adventure?",
      cs: "Připraven začít toto dobrodružství?"
    },
    startGame: {
      fr: "Commencer le Jeu",
      en: "Start Game",
      cs: "Začít Hru"
    },
    ageRange: {
      fr: "Âge recommandé",
      en: "Recommended Age",
      cs: "Doporučený Věk"
    },
    years: {
      fr: "ans",
      en: "years",
      cs: "let"
    },
    badgesToEarn: {
      fr: "Badges à gagner",
      en: "Badges to Earn",
      cs: "Odznaky k Získání"
    },
    level: {
      fr: "Niveau",
      en: "Level",
      cs: "Úroveň"
    },
    newActivity: {
      fr: "Nouvelle Activité",
      en: "New Activity",
      cs: "Nová Aktivita"
    },
    editActivity: {
      fr: "Modifier l'Activité",
      en: "Edit Activity",
      cs: "Upravit Aktivitu"
    },
    newQuestion: {
      fr: "Nouvelle Question",
      en: "New Question",
      cs: "Nová Otázka"
    },
    editQuestion: {
      fr: "Modifier la Question",
      en: "Edit Question",
      cs: "Upravit Otázku"
    },
    newInteractiveActivity: {
      fr: "Nouvelle Activité Interactive",
      en: "New Interactive Activity",
      cs: "Nová Interaktivní Aktivita"
    },
    editInteractiveActivity: {
      fr: "Modifier l'Activité Interactive",
      en: "Edit Interactive Activity",
      cs: "Upravit Interaktivní Aktivitu"
    },
    activityCreated: {
      fr: "Nouvelle activité créée avec succès",
      en: "New activity created successfully",
      cs: "Nová aktivita byla úspěšně vytvořena"
    },
    questionCreated: {
      fr: "Nouvelle question créée avec succès",
      en: "New question created successfully",
      cs: "Nová otázka byla úspěšně vytvořena"
    },
    interactiveActivityCreated: {
      fr: "Nouvelle activité interactive créée avec succès",
      en: "New interactive activity created successfully",
      cs: "Nová interaktivní aktivita byla úspěšně vytvořena"
    },
    modifyFilters: {
      fr: "Essayez de modifier vos filtres ou créez une nouvelle activité",
      en: "Try modifying your filters or create a new activity",
      cs: "Zkuste upravit filtry nebo vytvořte novou aktivitu"
    },
    modifyFiltersQuestion: {
      fr: "Essayez de modifier vos filtres ou créez une nouvelle question",
      en: "Try modifying your filters or create a new question",
      cs: "Zkuste upravit filtry nebo vytvořte novou otázku"
    },
    // Statuts des activités
    active: {
      fr: "active",
      en: "active",
      cs: "aktivní"
    },
    broken: {
      fr: "En panne",
      en: "broken",
      cs: "nefunkční"
    },
    maintenance: {
      fr: "maintenance",
      en: "maintenance", 
      cs: "údržba"
    },
    // Interface commune
    search: {
      fr: "Rechercher",
      en: "Search",
      cs: "Hledat"
    },
    status: {
      fr: "Statut",
      en: "Status",
      cs: "Stav"
    },
    successRate: {
      fr: "Taux de succès",
      en: "Success Rate",
      cs: "Míra úspěšnosti"
    },
    // Paramètres système
    systemParameters: {
      fr: "Paramètres Système",
      en: "System Parameters",
      cs: "Systémové Parametry"
    },
    sections: {
      fr: "Sections",
      en: "Sections",
      cs: "Sekce"
    },
    generalParameters: {
      fr: "Paramètres Généraux",
      en: "General Parameters",
      cs: "Obecné Parametry"
    },
    educationalParameters: {
      fr: "Paramètres Éducatifs",
      en: "Educational Parameters",
      cs: "Vzdělávací Parametry"
    },
    security: {
      fr: "Sécurité",
      en: "Security",
      cs: "Zabezpečení"
    },
    backup: {
      fr: "Sauvegarde",
      en: "Backup",
      cs: "Záloha"
    },
    performance: {
      fr: "Performance",
      en: "Performance",
      cs: "Výkon"
    },
    actions: {
      fr: "Actions",
      en: "Actions",
      cs: "Akce"
    },
    applicationName: {
      fr: "Nom de l'application",
      en: "Application Name",
      cs: "Název Aplikace"
    },
    version: {
      fr: "Version",
      en: "Version",
      cs: "Verze"
    },
    defaultLanguage: {
      fr: "Langue par défaut",
      en: "Default Language",
      cs: "Výchozí Jazyk"
    },
    theme: {
      fr: "Thème",
      en: "Theme",
      cs: "Téma"
    },
    light: {
      fr: "Clair",
      en: "Light",
      cs: "Světlý"
    },
    dark: {
      fr: "Sombre",
      en: "Dark",
      cs: "Tmavý"
    },
    autoSave: {
      fr: "Sauvegarde automatique",
      en: "Auto Save",
      cs: "Automatické Ukládání"
    },
    welcomeScreen: {
      fr: "Afficher l'écran de bienvenue",
      en: "Show Welcome Screen",
      cs: "Zobrazit Uvítací Obrazovku"
    },
    settingsSaved: {
      fr: "Paramètres sauvegardés avec succès",
      en: "Settings saved successfully",
      cs: "Nastavení úspěšně uložena"
    },
    passwordChanged: {
      fr: "Mot de passe administrateur modifié",
      en: "Administrator password changed",
      cs: "Heslo správce změněno"
    }
  },

  // Actions
  action: {
    back: {
      fr: "Retour",
      en: "Back",
      cs: "Zpět"
    },
    cancel: {
      fr: "Annuler",
      en: "Cancel",
      cs: "Zrušit"
    },
    save: {
      fr: "Sauvegarder",
      en: "Save",
      cs: "Uložit"
    },
    create: {
      fr: "Créer",
      en: "Create",
      cs: "Vytvořit"
    },
    edit: {
      fr: "Modifier",
      en: "Edit",
      cs: "Upravit"
    },
    delete: {
      fr: "Supprimer",
      en: "Delete",
      cs: "Smazat"
    }
  }
};

// Hook pour utiliser les traductions
export const useTranslation = (language: SupportedLanguage = 'fr') => {
  const t = (key: string): string => {
    const keys = key.split('.');
    let current: any = translations;
    
    for (const k of keys) {
      if (current[k]) {
        current = current[k];
      } else {
        return key; // Retourne la clé si traduction non trouvée
      }
    }
    
    if (current && typeof current === 'object' && current[language]) {
      return current[language];
    }
    
    return key;
  };

  return { t };
};