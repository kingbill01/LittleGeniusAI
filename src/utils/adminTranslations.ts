// Traductions utilitaires pour les composants admin
export const getAdminLabel = (key: string, language: string): string => {
  const labels: Record<string, Record<string, string>> = {
    // Général
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
    type: {
      fr: "Type",
      en: "Type",
      cs: "Typ"
    },
    status: {
      fr: "Statut",
      en: "Status",
      cs: "Stav"
    },
    description: {
      fr: "Description",
      en: "Description",
      cs: "Popis"
    },
    difficulty: {
      fr: "Difficulté",
      en: "Difficulty",
      cs: "Obtížnost"
    },
    ageGroup: {
      fr: "Groupe d'âge",
      en: "Age Group",
      cs: "Věková skupina"
    },
    
    // Statuts
    active: {
      fr: "Actives",
      en: "Active",
      cs: "Aktivní"
    },
    inactive: {
      fr: "Inactives",
      en: "Inactive",
      cs: "Neaktivní"
    },
    outOfOrder: {
      fr: "En panne",
      en: "Out of Order",
      cs: "Mimo provoz"
    },
    maintenance: {
      fr: "Maintenance",
      en: "Maintenance",
      cs: "Údržba"
    },
    testing: {
      fr: "En test",
      en: "Testing",
      cs: "Testování"
    },
    
    // Matières
    mathematics: {
      fr: "Mathématiques",
      en: "Mathematics",
      cs: "Matematika"
    },
    languages: {
      fr: "Langues",
      en: "Languages",
      cs: "Jazyky"
    },
    sciences: {
      fr: "Sciences",
      en: "Sciences",
      cs: "Vědy"
    },
    art: {
      fr: "Art",
      en: "Art",
      cs: "Umění"
    },
    computing: {
      fr: "Informatique",
      en: "Computing",
      cs: "Informatika"
    },
    civic: {
      fr: "Civique",
      en: "Civic",
      cs: "Občanské"
    },
    hygiene: {
      fr: "Hygiène",
      en: "Hygiene",
      cs: "Hygiena"
    },
    anatomy: {
      fr: "Anatomie",
      en: "Anatomy",
      cs: "Anatomie"
    },
    
    // Difficultés
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
    },
    
    // Types d'activités
    quiz: {
      fr: "Quiz",
      en: "Quiz",
      cs: "Kvíz"
    },
    game: {
      fr: "Jeu",
      en: "Game",
      cs: "Hra"
    },
    exercise: {
      fr: "Exercice",
      en: "Exercise",
      cs: "Cvičení"
    },
    creative: {
      fr: "Créatif",
      en: "Creative",
      cs: "Kreativní"
    },
    story: {
      fr: "Histoire",
      en: "Story",
      cs: "Příběh"
    },
    experiment: {
      fr: "Expérience",
      en: "Experiment",
      cs: "Experiment"
    },
    drawing: {
      fr: "Dessin",
      en: "Drawing",
      cs: "Kreslení"
    },
    music: {
      fr: "Musique",
      en: "Music",
      cs: "Hudba"
    },
    video: {
      fr: "Vidéo",
      en: "Video",
      cs: "Video"
    },
    interactive: {
      fr: "Interactif",
      en: "Interactive",
      cs: "Interaktivní"
    },
    simulation: {
      fr: "Simulation",
      en: "Simulation",
      cs: "Simulace"
    },
    puzzle: {
      fr: "Puzzle",
      en: "Puzzle",
      cs: "Puzzle"
    },
    
    // Termes généraux
    all: {
      fr: "Tous",
      en: "All",
      cs: "Všechny"
    },
    total: {
      fr: "Total",
      en: "Total",
      cs: "Celkem"
    },
    close: {
      fr: "Fermer",
      en: "Close",
      cs: "Zavřít"
    },
    
    // Statistiques
    successRate: {
      fr: "Taux de succès",
      en: "Success Rate",
      cs: "Míra úspěšnosti"
    },
    activeUsers: {
      fr: "Utilisateurs Actifs",
      en: "Active Users",
      cs: "Aktivní uživatelé"
    },
    totalSessions: {
      fr: "Sessions Totales",
      en: "Total Sessions",
      cs: "Celkový počet relací"
    },
    
    // Types interactifs
    clickSequence: {
      fr: "Séquence de clics",
      en: "Click Sequence",
      cs: "Sekvence kliků"
    },
    formInteraction: {
      fr: "Interaction formulaire",
      en: "Form Interaction",
      cs: "Interakce formuláře"
    },
    
    // Tailles
    size: {
      fr: "Taille",
      en: "Size",
      cs: "Velikost"
    },
    small: {
      fr: "Petit",
      en: "Small",
      cs: "Malý"
    },
    large: {
      fr: "Grand",
      en: "Large",
      cs: "Velký"
    },
    
    // Temps
    period: {
      fr: "Période",
      en: "Period",
      cs: "Období"
    },
    
    // Matières spéciales
    allSubjects: {
      fr: "Toutes les matières",
      en: "All Subjects",
      cs: "Všechny předměty"
    },
    
    // Analytics
    recommendations: {
      fr: "Recommandations",
      en: "Recommendations",
      cs: "Doporučení"
    },
    interactive_story_low_success: {
      fr: 'L\'activité "Histoire Interactive" a un taux de réussite faible (45%). Considérez réviser la difficulté ou ajouter plus d\'indices.',
      en: 'The "Interactive Story" activity has a low success rate (45%). Consider revising the difficulty or adding more hints.',
      cs: 'Aktivita "Interaktivní příběh" má nízkou míru úspěšnosti (45%). Zvažte úpravu obtížnosti nebo přidání více nápověd.'
    },
    simple_addition_excellent: {
      fr: 'Excellente performance pour "Addition Simple" avec 92% de taux de réussite. Considérez créer des activités similaires.',
      en: 'Excellent performance for "Simple Addition" with 92% success rate. Consider creating similar activities.',
      cs: 'Vynikající výkon pro "Jednoduché sčítání" s 92% mírou úspěšnosti. Zvažte vytvoření podobných aktivit.'
    },
    load_time_warning: {
      fr: 'Le temps de chargement moyen ({loadTime}s) est légèrement élevé. Vérifiez l\'optimisation des images et du cache.',
      en: 'The average load time ({loadTime}s) is slightly high. Check image and cache optimization.',
      cs: 'Průměrný čas načítání ({loadTime}s) je mírně vysoký. Zkontrolujte optimalizaci obrázků a cache.'
    },
    validated_question: {
      fr: "Question validée",
      en: "Validated question",
      cs: "Ověřená otázka"
    },
    pending_validation: {
      fr: "En attente de validation",
      en: "Pending validation",
      cs: "Čeká na ověření"
    },
    position_x: {
      fr: "Position X",
      en: "Position X",
      cs: "Pozice X"
    },
    position_y: {
      fr: "Position Y",
      en: "Position Y",
      cs: "Pozice Y"
    },
    
    // TranslationManager
    translationManager: {
      fr: "Gestionnaire de Traductions",
      en: "Translation Manager",
      cs: "Správce překladů"
    },
    translationServiceStats: {
      fr: "Statistiques du Service de Traduction",
      en: "Translation Service Statistics",
      cs: "Statistiky překladové služby"
    },
    baseTranslations: {
      fr: "Traductions de base",
      en: "Base Translations",
      cs: "Základní překlady"
    },
    customTranslations: {
      fr: "Traductions personnalisées",
      en: "Custom Translations",
      cs: "Vlastní překlady"
    },
    supportedLanguages: {
      fr: "Langues supportées",
      en: "Supported Languages",
      cs: "Podporované jazyky"
    },
    automaticTranslation: {
      fr: "Traduction Automatique",
      en: "Automatic Translation",
      cs: "Automatický překlad"
    },
    translationServiceOfflineInfo: {
      fr: "Le service de traduction fonctionne hors ligne avec un dictionnaire pré-construit. Idéal pour les termes éducatifs courants !",
      en: "The translation service works offline with a pre-built dictionary. Ideal for common educational terms!",
      cs: "Překladová služba funguje offline s předpřipraveným slovníkem. Ideální pro běžné vzdělávací termíny!"
    },
    sourceLanguage: {
      fr: "Langue source",
      en: "Source Language",
      cs: "Zdrojový jazyk"
    },
    french: {
      fr: "Français",
      en: "French",
      cs: "Francouzština"
    },
    textToTranslate: {
      fr: "Texte à traduire",
      en: "Text to translate",
      cs: "Text k překladu"
    },
    translateAutomatically: {
      fr: "Traduire automatiquement",
      en: "Translate automatically",
      cs: "Přeložit automaticky"
    },
    userGuide: {
      fr: "Guide d'utilisation",
      en: "User Guide",
      cs: "Uživatelská příručka"
    },
    personalizedTranslations: {
      fr: "Traductions personnalisées",
      en: "Personalized Translations",
      cs: "Personalizované překlady"
    },
    automaticIntegration: {
      fr: "Intégration automatique",
      en: "Automatic Integration",
      cs: "Automatická integrace"
    },
    
    // Analytics & Interface
    analyticalDashboard: {
      fr: "Tableau de Bord Analytique",
      en: "Analytical Dashboard", 
      cs: "Analytický dashboard"
    },
    securitySettings: {
      fr: "Paramètres de Sécurité",
      en: "Security Settings",
      cs: "Nastavení zabezpečení"
    },
    securitySettingsWarning: {
      fr: "Les modifications des paramètres de sécurité nécessitent une attention particulière.",
      en: "Security settings changes require special attention.",
      cs: "Změny nastavení zabezpečení vyžadují zvláštní pozornost."
    },
    adminPassword: {
      fr: "Mot de passe administrateur",
      en: "Administrator password",
      cs: "Heslo správce"
    },
    adminPasswordDesc: {
      fr: "Mot de passe pour accéder à l'interface d'administration",
      en: "Password to access the administration interface",
      cs: "Heslo pro přístup k rozhraní správy"
    },
    modify: {
      fr: "Modifier",
      en: "Modify",
      cs: "Upravit"
    },
    backupSettings: {
      fr: "Paramètres de Sauvegarde",
      en: "Backup Settings",
      cs: "Nastavení zálohy"
    },
    weekly: {
      fr: "Hebdomadaire",
      en: "Weekly",
      cs: "Týdně"
    },
    last7Days: {
      fr: "7 derniers jours",
      en: "Last 7 days",
      cs: "Posledních 7 dní"
    },
    availability: {
      fr: "Disponibilité",
      en: "Availability",
      cs: "Dostupnost"
    },
    ageDistribution: {
      fr: "Répartition par Âge",
      en: "Age Distribution",
      cs: "Rozložení podle věku"
    },
    performanceBySubject: {
      fr: "Performance par Matière",
      en: "Performance by Subject",
      cs: "Výkon podle předmětu"
    },
    averageScore: {
      fr: "Score Moyen",
      en: "Average Score",
      cs: "Průměrné skóre"
    },
    progression: {
      fr: "Progression",
      en: "Progression",
      cs: "Pokrok"
    }
  };
  
  return labels[key]?.[language] || labels[key]?.['fr'] || key;
};