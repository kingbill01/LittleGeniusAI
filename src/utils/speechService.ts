// Service de synthèse vocale (version initiale - utilise Web Speech API si disponible)
// Fournit une abstraction simple pour lecture de texte avec profils de voix féminine multilingue.

export type VoiceLang = 'fr' | 'en' | 'cs';

export interface VoiceProfile {
  id: string;
  language: VoiceLang;
  displayName: string;
  gender: 'female';
  pitch: number;   // -2 à +2 (transformé 0..2)
  rate: number;    // 0.8 à 1.2
  fallback?: boolean;
}

export interface SpeechRequest {
  text: string;
  language: VoiceLang;
  voiceId?: string;
  interrupt?: boolean;
  rateAdjust?: number;
  pitchAdjust?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (e: Error) => void;
}

const femaleVoices: VoiceProfile[] = [
  { id: 'fr-female-1', language: 'fr', displayName: 'Sophie (Douce)', gender: 'female', pitch: 0.3, rate: 0.85 },
  { id: 'fr-female-2', language: 'fr', displayName: 'Amélie (Chaleureuse)', gender: 'female', pitch: 0.5, rate: 0.8 },
  { id: 'en-female-1', language: 'en', displayName: 'Emma (Gentle)', gender: 'female', pitch: 0.4, rate: 0.85 },
  { id: 'en-female-2', language: 'en', displayName: 'Lily (Soft)', gender: 'female', pitch: 0.6, rate: 0.8 },
  { id: 'cs-female-1', language: 'cs', displayName: 'Lenka (Jemná)', gender: 'female', pitch: 0.3, rate: 0.82 }
];

class SpeechService {
  private current?: SpeechSynthesisUtterance;
  private voicesLoaded = false;
  private availableVoices: SpeechSynthesisVoice[] = [];

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      // Chargement asynchrone des voix
      window.speechSynthesis.onvoiceschanged = () => {
        this.availableVoices = window.speechSynthesis.getVoices();
        this.voicesLoaded = true;
      };
      // Initial fetch
      setTimeout(() => {
        this.availableVoices = window.speechSynthesis.getVoices();
        this.voicesLoaded = true;
      }, 200);
    }
  }

  listProfiles(language?: VoiceLang): VoiceProfile[] {
    return language ? femaleVoices.filter(v => v.language === language) : femaleVoices;
  }

  private pickBrowserVoice(req: SpeechRequest, profile: VoiceProfile): SpeechSynthesisVoice | undefined {
    if (!this.voicesLoaded) return undefined;
    
    // Essayer de matcher selon la locale
    const targets: string[] = [];
    if (req.language === 'fr') targets.push('fr-FR', 'fr-CA');
    if (req.language === 'en') targets.push('en-US', 'en-GB', 'en-AU');
    if (req.language === 'cs') targets.push('cs-CZ');

    // Filtrer par langue et préférer les voix féminines
    const languageVoices = this.availableVoices.filter(v => 
      targets.some(target => v.lang.includes(target.split('-')[0]))
    );

    // Rechercher spécifiquement des voix féminines
    const femaleKeywords = [
      'female', 'woman', 'femme', 'dame', 'girl', 'fille',
      'samantha', 'allison', 'ava', 'emma', 'sophie', 'amélie', 'marie',
      'susan', 'karen', 'victoria', 'zuzana', 'klara', 'tereza'
    ];

    const femaleVoice = languageVoices.find(v => 
      femaleKeywords.some(keyword => 
        v.name.toLowerCase().includes(keyword)
      )
    );

    // Retourner la voix féminine trouvée ou la première voix disponible
    return femaleVoice || languageVoices[0];
  }

  speak(req: SpeechRequest) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      req.onError?.(new Error('Speech synthesis not supported'));
      return;
    }
    if (req.interrupt) this.stop();

    const profile = femaleVoices.find(v => v.id === req.voiceId && v.language === req.language)
      || femaleVoices.find(v => v.language === req.language)
      || femaleVoices[0];

    const utter = new SpeechSynthesisUtterance(req.text);
    utter.lang = req.language === 'fr' ? 'fr-FR' : req.language === 'en' ? 'en-US' : 'cs-CZ';
    utter.rate = Math.min(1.4, Math.max(0.6, profile.rate + (req.rateAdjust || 0)));
    // Web Speech pitch range 0..2, map -2..+2 => 0..2
    utter.pitch = Math.min(2, Math.max(0, 1 + (profile.pitch + (req.pitchAdjust || 0)) / 2));

    const browserVoice = this.pickBrowserVoice(req, profile);
    if (browserVoice) utter.voice = browserVoice;

    utter.onstart = () => req.onStart?.();
    utter.onend = () => req.onEnd?.();
    utter.onerror = (e) => req.onError?.(e.error as any);

    window.speechSynthesis.speak(utter);
    this.current = utter;
  }

  stop() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.current = undefined;
    }
  }
}

export const speechService = new SpeechService();
