import OpenAI from 'openai';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface UserContext {
  name: string;
  age: number;
  currentSubject?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  recentActivities?: string[];
}

export class AIService {
  private openai?: OpenAI;
  private isConfigured: boolean = false;

  constructor() {
    // Initialize OpenAI with API key (should be set via environment variable)
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (apiKey) {
      this.openai = new OpenAI({ apiKey });
      this.isConfigured = true;
    } else {
      // Mock mode for development/demo
      console.warn('OpenAI API key not found. Running in mock mode.');
      this.isConfigured = false;
    }
  }

  async chat(message: string, userContext: UserContext): Promise<string> {
    if (!this.isConfigured || !this.openai) {
      return this.getMockResponse(message, userContext);
    }

    try {
      const systemPrompt = this.buildSystemPrompt(userContext);
      
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        max_tokens: 200,
        temperature: 0.7,
      });

      return completion.choices[0]?.message?.content || 'Désolé, je n\'ai pas compris. Peux-tu répéter ?';
    } catch (error) {
      console.error('AI chat error:', error);
      return this.getMockResponse(message, userContext);
    }
  }

  async generateActivity(ageGroup: string, subject: string): Promise<any> {
    if (!this.isConfigured || !this.openai) {
      return this.getMockActivity(ageGroup, subject);
    }

    try {
      const prompt = `Crée une activité éducative pour des enfants de ${ageGroup} ans sur le sujet "${subject}". 
      L'activité doit être interactive, amusante et adaptée à leur âge. 
      Retourne la réponse en JSON avec les champs: title, description, instructions, questions (array), et expectedAnswers (array).`;

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'Tu es un expert en éducation pour enfants. Crée des activités engageantes et pédagogiques.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 500,
        temperature: 0.8,
      });

      const content = completion.choices[0]?.message?.content;
      if (content) {
        try {
          return JSON.parse(content);
        } catch {
          return this.getMockActivity(ageGroup, subject);
        }
      }
    } catch (error) {
      console.error('Activity generation error:', error);
    }

    return this.getMockActivity(ageGroup, subject);
  }

  private buildSystemPrompt(userContext: UserContext): string {
    return `Tu es Génie, l'assistant IA de LittleGenius AI. Tu aides ${userContext.name}, ${userContext.age} ans, à apprendre de manière ludique.

Règles importantes:
- Utilise un langage adapté à l'âge de ${userContext.age} ans
- Sois encourageant et positif
- Propose des activités interactives
- Utilise des emojis pour rendre tes réponses plus amusantes
- Reste dans le contexte éducatif
- Si l'enfant semble frustré, propose une pause ou une activité plus facile

Sujets préférés: ${userContext.currentSubject || 'tous les sujets'}
Niveau de difficulté: ${userContext.difficulty || 'adapté à l\'âge'}`;
  }

  private getMockResponse(message: string, userContext: UserContext): string {
    const responses = [
      `Salut ${userContext.name} ! 🌟 C'est une excellente question ! Veux-tu qu'on explore ça ensemble ?`,
      `Bravo ${userContext.name} ! 🎉 Tu es très curieux, c'est formidable ! Continuons à apprendre !`,
      `Oh ! C'est intéressant ! 🤔 Que dirais-tu si on faisait une petite activité pour mieux comprendre ?`,
      `Super ${userContext.name} ! 🚀 Tu progresses très bien ! Veux-tu essayer quelque chose de nouveau ?`,
      `Excellente question ! 💡 Les enfants de ${userContext.age} ans adorent découvrir de nouvelles choses !`
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  }

  private getMockActivity(ageGroup: string, subject: string): any {
    const activities: { [key: string]: any } = {
      'math': {
        title: 'Comptage Magique',
        description: 'Compte les objets colorés et découvre la magie des nombres !',
        instructions: 'Clique sur chaque objet pour le compter. Trouve le bon nombre !',
        questions: ['Combien y a-t-il d\'étoiles ?', 'Combien y a-t-il de cœurs ?'],
        expectedAnswers: ['5', '3'],
        type: 'counting',
        items: [
          { type: 'star', count: 5, color: 'yellow' },
          { type: 'heart', count: 3, color: 'red' }
        ]
      },
      'language': {
        title: 'Aventure des Lettres',
        description: 'Pars à la découverte des lettres avec des mots amusants !',
        instructions: 'Trouve la première lettre de chaque mot illustré !',
        questions: ['Quelle est la première lettre de CHAT ?', 'Quelle est la première lettre de BATEAU ?'],
        expectedAnswers: ['C', 'B'],
        type: 'letters',
        words: [
          { word: 'CHAT', image: 'cat.png', firstLetter: 'C' },
          { word: 'BATEAU', image: 'boat.png', firstLetter: 'B' }
        ]
      },
      'science': {
        title: 'Petits Scientifiques',
        description: 'Découvre les merveilles de la nature !',
        instructions: 'Observe et réponds aux questions sur la nature !',
        questions: ['De quelle couleur est le soleil ?', 'Combien de pattes a un chat ?'],
        expectedAnswers: ['jaune', '4'],
        type: 'observation',
        elements: ['soleil', 'chat', 'arbre', 'fleur']
      }
    };

    return activities[subject] || activities['math'];
  }
}