// Service de traduction offline pour LittleGenius AI
// Utilise des dictionnaires pré-construits pour FR/EN/CS

interface TranslationDictionary {
  [key: string]: {
    en: string;
    fr: string;
    cs: string;
  };
}

// Dictionnaire de base pour les traductions courantes
const baseDictionary: TranslationDictionary = {
  // Mots courants éducatifs
  'mathematics': { en: 'Mathematics', fr: 'Mathématiques', cs: 'Matematika' },
  'science': { en: 'Science', fr: 'Sciences', cs: 'Věda' },
  'language': { en: 'Language', fr: 'Langue', cs: 'Jazyk' },
  'art': { en: 'Art', fr: 'Art', cs: 'Umění' },
  'history': { en: 'History', fr: 'Histoire', cs: 'Historie' },
  'geography': { en: 'Geography', fr: 'Géographie', cs: 'Zeměpis' },
  'biology': { en: 'Biology', fr: 'Biologie', cs: 'Biologie' },
  'chemistry': { en: 'Chemistry', fr: 'Chimie', cs: 'Chemie' },
  'physics': { en: 'Physics', fr: 'Physique', cs: 'Fyzika' },
  
  // Termes éducatifs
  'exercise': { en: 'Exercise', fr: 'Exercice', cs: 'Cvičení' },
  'question': { en: 'Question', fr: 'Question', cs: 'Otázka' },
  'answer': { en: 'Answer', fr: 'Réponse', cs: 'Odpověď' },
  'lesson': { en: 'Lesson', fr: 'Leçon', cs: 'Lekce' },
  'activity': { en: 'Activity', fr: 'Activité', cs: 'Aktivita' },
  'game': { en: 'Game', fr: 'Jeu', cs: 'Hra' },
  'learning': { en: 'Learning', fr: 'Apprentissage', cs: 'Učení' },
  'education': { en: 'Education', fr: 'Éducation', cs: 'Vzdělání' },
  'student': { en: 'Student', fr: 'Élève', cs: 'Student' },
  'teacher': { en: 'Teacher', fr: 'Professeur', cs: 'Učitel' },
  
  // Actions
  'click': { en: 'Click', fr: 'Cliquer', cs: 'Kliknout' },
  'drag': { en: 'Drag', fr: 'Glisser', cs: 'Táhnout' },
  'drop': { en: 'Drop', fr: 'Déposer', cs: 'Pustit' },
  'select': { en: 'Select', fr: 'Sélectionner', cs: 'Vybrat' },
  'complete': { en: 'Complete', fr: 'Terminer', cs: 'Dokončit' },
  'start': { en: 'Start', fr: 'Commencer', cs: 'Začít' },
  'finish': { en: 'Finish', fr: 'Finir', cs: 'Skončit' },
  'continue': { en: 'Continue', fr: 'Continuer', cs: 'Pokračovat' },
  
  // Couleurs
  'red': { en: 'Red', fr: 'Rouge', cs: 'Červená' },
  'blue': { en: 'Blue', fr: 'Bleu', cs: 'Modrá' },
  'green': { en: 'Green', fr: 'Vert', cs: 'Zelená' },
  'yellow': { en: 'Yellow', fr: 'Jaune', cs: 'Žlutá' },
  'orange': { en: 'Orange', fr: 'Orange', cs: 'Oranžová' },
  'purple': { en: 'Purple', fr: 'Violet', cs: 'Fialová' },
  'pink': { en: 'Pink', fr: 'Rose', cs: 'Růžová' },
  'black': { en: 'Black', fr: 'Noir', cs: 'Černá' },
  'white': { en: 'White', fr: 'Blanc', cs: 'Bílá' },
  
  // Nombres
  'one': { en: 'One', fr: 'Un', cs: 'Jeden' },
  'two': { en: 'Two', fr: 'Deux', cs: 'Dva' },
  'three': { en: 'Three', fr: 'Trois', cs: 'Tři' },
  'four': { en: 'Four', fr: 'Quatre', cs: 'Čtyři' },
  'five': { en: 'Five', fr: 'Cinq', cs: 'Pět' },
  
  // Animaux
  'cat': { en: 'Cat', fr: 'Chat', cs: 'Kočka' },
  'dog': { en: 'Dog', fr: 'Chien', cs: 'Pes' },
  'bird': { en: 'Bird', fr: 'Oiseau', cs: 'Pták' },
  'fish': { en: 'Fish', fr: 'Poisson', cs: 'Ryba' },
  'elephant': { en: 'Elephant', fr: 'Éléphant', cs: 'Slon' },
  'lion': { en: 'Lion', fr: 'Lion', cs: 'Lev' },
  
  // Formes
  'circle': { en: 'Circle', fr: 'Cercle', cs: 'Kruh' },
  'square': { en: 'Square', fr: 'Carré', cs: 'Čtverec' },
  'triangle': { en: 'Triangle', fr: 'Triangle', cs: 'Trojúhelník' },
  'rectangle': { en: 'Rectangle', fr: 'Rectangle', cs: 'Obdélník' },
  
  // Phrases courantes
  'well done': { en: 'Well done!', fr: 'Bien joué !', cs: 'Skvěle!' },
  'try again': { en: 'Try again', fr: 'Essayez encore', cs: 'Zkuste znovu' },
  'correct': { en: 'Correct!', fr: 'Correct !', cs: 'Správně!' },
  'incorrect': { en: 'Incorrect', fr: 'Incorrect', cs: 'Nesprávně' },
  'excellent': { en: 'Excellent!', fr: 'Excellent !', cs: 'Výborně!' },
  'good job': { en: 'Good job!', fr: 'Bon travail !', cs: 'Dobrá práce!' },
};

// Dictionnaires plus avancés avec patterns
const translationPatterns = {
  // Pluriels
  plurals: {
    en: (word: string) => word.endsWith('s') ? word : word + 's',
    fr: (word: string) => word + 's', // Simplifié
    cs: (word: string) => word + 'y', // Simplifié
  },
  
  // Articles
  articles: {
    en: { definite: 'the', indefinite: 'a' },
    fr: { definite: 'le/la', indefinite: 'un/une' },
    cs: { definite: '', indefinite: '' }, // Pas d'articles en tchèque
  }
};

export type SupportedLanguage = 'en' | 'fr' | 'cs';

class OfflineTranslationService {
  private dictionary: TranslationDictionary;
  private customTranslations: Map<string, { [key in SupportedLanguage]: string }> = new Map();

  constructor() {
    this.dictionary = { ...baseDictionary };
    this.loadCustomTranslations();
  }

  // Charge les traductions personnalisées depuis le localStorage
  private loadCustomTranslations() {
    try {
      const saved = localStorage.getItem('littlegenius_custom_translations');
      if (saved) {
        const parsed = JSON.parse(saved);
        this.customTranslations = new Map(Object.entries(parsed));
      }
    } catch (error) {
      console.warn('Erreur lors du chargement des traductions personnalisées:', error);
    }
  }

  // Sauvegarde les traductions personnalisées
  private saveCustomTranslations() {
    try {
      const obj = Object.fromEntries(this.customTranslations);
      localStorage.setItem('littlegenius_custom_translations', JSON.stringify(obj));
    } catch (error) {
      console.warn('Erreur lors de la sauvegarde des traductions:', error);
    }
  }

  // Ajoute une traduction personnalisée
  addCustomTranslation(key: string, translations: { [key in SupportedLanguage]: string }) {
    this.customTranslations.set(key.toLowerCase(), translations);
    this.saveCustomTranslations();
  }

  // Traduit un mot ou une phrase
  translate(text: string, fromLang: SupportedLanguage, toLang: SupportedLanguage): string {
    if (fromLang === toLang) return text;

    const key = text.toLowerCase().trim();
    
    // Vérifier dans les traductions personnalisées
    if (this.customTranslations.has(key)) {
      const translations = this.customTranslations.get(key)!;
      return translations[toLang] || text;
    }

    // Vérifier dans le dictionnaire de base
    if (this.dictionary[key]) {
      return this.dictionary[key][toLang] || text;
    }

    // Essayer de trouver une traduction partielle
    const words = text.split(' ');
    if (words.length > 1) {
      const translatedWords = words.map(word => 
        this.translate(word, fromLang, toLang)
      );
      return translatedWords.join(' ');
    }

    // Si aucune traduction trouvée, retourner le texte original
    return text;
  }

  // Traduit automatiquement vers toutes les langues supportées
  translateToAll(text: string, sourceLang: SupportedLanguage): { [key in SupportedLanguage]: string } {
    return {
      en: this.translate(text, sourceLang, 'en'),
      fr: this.translate(text, sourceLang, 'fr'),
      cs: this.translate(text, sourceLang, 'cs'),
    };
  }

  // Détecte automatiquement la langue (basique)
  detectLanguage(text: string): SupportedLanguage {
    const lowerText = text.toLowerCase();
    
    // Mots caractéristiques français
    const frenchWords = ['le', 'la', 'les', 'un', 'une', 'des', 'est', 'sont', 'avec', 'pour', 'sur'];
    const frenchCount = frenchWords.filter(word => lowerText.includes(word)).length;
    
    // Mots caractéristiques anglais
    const englishWords = ['the', 'and', 'or', 'is', 'are', 'with', 'for', 'on', 'in', 'at'];
    const englishCount = englishWords.filter(word => lowerText.includes(word)).length;
    
    // Caractères caractéristiques tchèques
    const czechChars = ['ř', 'ž', 'č', 'š', 'ď', 'ť', 'ň', 'ů', 'é', 'á'];
    const czechCount = czechChars.filter(char => lowerText.includes(char)).length;
    
    if (czechCount > 0) return 'cs';
    if (frenchCount > englishCount) return 'fr';
    return 'en'; // Par défaut
  }

  // Traduit automatiquement un contenu multilingue
  autoTranslateContent(content: {
    title: string;
    description: string;
    sourceLang?: SupportedLanguage;
  }): {
    title: { [key in SupportedLanguage]: string };
    description: { [key in SupportedLanguage]: string };
  } {
    const sourceLang = content.sourceLang || this.detectLanguage(content.title + ' ' + content.description);
    
    return {
      title: this.translateToAll(content.title, sourceLang),
      description: this.translateToAll(content.description, sourceLang),
    };
  }

  // Obtient les statistiques de traduction
  getTranslationStats() {
    return {
      baseDictionarySize: Object.keys(this.dictionary).length,
      customTranslationsSize: this.customTranslations.size,
      totalTranslations: Object.keys(this.dictionary).length + this.customTranslations.size,
      supportedLanguages: ['en', 'fr', 'cs'] as SupportedLanguage[],
    };
  }
}

// Instance singleton
export const translationService = new OfflineTranslationService();

// Hooks pour React
export const useTranslationService = () => {
  return {
    translate: translationService.translate.bind(translationService),
    translateToAll: translationService.translateToAll.bind(translationService),
    autoTranslateContent: translationService.autoTranslateContent.bind(translationService),
    addCustomTranslation: translationService.addCustomTranslation.bind(translationService),
    detectLanguage: translationService.detectLanguage.bind(translationService),
    getStats: translationService.getTranslationStats.bind(translationService),
  };
};

export default translationService;