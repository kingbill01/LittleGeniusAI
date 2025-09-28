# 🛠️ Guide Technique - LittleGenius AI

## Architecture du Projet

### Stack Technologique

#### Frontend
- **React** 18.2.0 - Interface utilisateur moderne
- **TypeScript** 4.9.5 - Typage statique et robustesse
- **Material-UI** 5.15.1 - Composants UI modernes
- **Framer Motion** 10.16.16 - Animations fluides

#### Desktop
- **Electron** 27.1.3 - Application cross-platform
- **Electron Builder** 24.9.1 - Packaging et distribution

#### IA et Services
- **OpenAI API** 4.24.1 - Intelligence artificielle
- **Système de fallback** - Réponses locales si API indisponible
- **Synthèse Vocale (prévu)** : Web Speech API / moteur local fallback

#### Stockage
- **JSON Files** - Base de données locale simple
- **File System** - Gestion des profils utilisateurs

## Structure du Projet

```
LittleGenius AI/
├── 📁 public/               # Ressources statiques
│   ├── index.html          # Page HTML principale
│   ├── favicon.ico         # Icône de l'application
│   └── manifest.json       # Métadonnées PWA
│
├── 📁 electron/            # Processus principal Electron
│   ├── main.ts            # Point d'entrée Electron
│   ├── preload.ts         # Script de préchargement sécurisé
│   └── database/          # Gestion des données
│       ├── manager.ts     # Gestionnaire de base de données
│       └── models.ts      # Modèles de données
│
├── 📁 src/                # Code source React
│   ├── 📁 components/     # Composants React
│   │   ├── Dashboard.tsx          # Tableau de bord principal
│   │   ├── WelcomeScreen.tsx      # Écran d'accueil
│   │   ├── UserSelection.tsx      # Sélection utilisateur
│   │   ├── LoadingScreen.tsx      # Écran de chargement
│   │   ├── AICompanion.tsx        # Compagnon IA
│   │   ├── EducationalActivity.tsx # Activités éducatives
│   │   ├── ParentalControls.tsx   # Contrôles parentaux
│   │   ├── ProgressTracker.tsx    # Suivi des progrès
│   │   └── LanguageSelector.tsx   # Sélecteur de langue
│   │
│   ├── 📁 utils/          # Utilitaires
│   │   ├── translations.ts        # Système de traduction
│   │   ├── educationalContent.ts  # Contenu éducatif
│   │   ├── aiService.ts          # Service IA
│   │   └── storage.ts            # Gestion du stockage
│   │
│   ├── 📁 contexts/       # Contextes React
│   │   ├── LanguageContext.tsx   # Contexte de langue
│   │   └── UserContext.tsx       # Contexte utilisateur
│   │
│   ├── 📁 types/          # Définitions TypeScript
│   │   ├── User.ts               # Types utilisateur
│   │   ├── Education.ts          # Types éducatifs
│   │   └── AI.ts                 # Types IA
│   │
│   ├── App.tsx            # Composant principal
│   ├── index.tsx          # Point d'entrée React
│   └── index.css          # Styles globaux
│
├── 📁 docs/               # Documentation
│   ├── CONTENU_EDUCATIF.md       # Contenu pédagogique
│   ├── MULTILINGUE.md            # Configuration multilingue
│   └── GUIDE_UTILISATEUR.md      # Guide utilisateur
│
├── package.json           # Configuration Node.js
├── tsconfig.json         # Configuration TypeScript
├── electron.json         # Configuration Electron
└── README.md            # Documentation principale
```

## Configuration de Développement

### Prérequis
```bash
# Node.js version 18+
node --version
# npm version 9+
npm --version
```

### Installation
```bash
# Cloner le projet
cd "/Users/birane.fall/Downloads/LittleGenius AI"

# Installer les dépendances
npm install --legacy-peer-deps

# Installer les types TypeScript
npm install --save-dev @types/node @types/react @types/react-dom
```

### Scripts de Développement
```bash
# Démarrer en mode développement
npm start

# Compiler pour production
npm run build

# Packager l'application desktop
npm run electron-pack

# Créer les installateurs
npm run dist
```

## Architecture des Composants

### Composant Principal (App.tsx)
```typescript
interface AppState {
  currentUser: User | null;
  language: Language;
  isLoading: boolean;
}

const App: React.FC = () => {
  // Gestion d'état global
  // Navigation entre écrans
  // Initialisation des services
};
```

### Gestionnaire de Base de Données (manager.ts)
```typescript
class DatabaseManager {
  private dataPath: string;
  
  async createUser(userData: UserData): Promise<User>
  async getUser(userId: string): Promise<User | null>
  async updateProgress(userId: string, progress: Progress): Promise<void>
  async saveSettings(userId: string, settings: Settings): Promise<void>
}
```

### Service IA (aiService.ts)
```typescript
class AIService {
  private openai: OpenAI;
  private fallbackResponses: ResponseMap;
  
  async generateResponse(message: string, context: Context): Promise<string>
  async getEducationalTip(subject: Subject, age: number): Promise<string>
  async generateQuiz(topic: string, difficulty: number): Promise<Quiz>
}
```

## Intégration Electron

### Processus Principal (main.ts)
```typescript
// Création de la fenêtre principale
function createMainWindow(): BrowserWindow {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,      // Sécurité
      contextIsolation: true,      // Isolation des contextes
      preload: path.join(__dirname, 'preload.js')
    }
  });
  
  return mainWindow;
}

// Gestion IPC (Inter-Process Communication)
ipcMain.handle('user:create', async (event, userData) => {
  return await databaseManager.createUser(userData);
});

ipcMain.handle('ai:chat', async (event, message, context) => {
  return await aiService.generateResponse(message, context);
});
```

### Script de Préchargement (preload.ts)
```typescript
// API sécurisée exposée au renderer
contextBridge.exposeInMainWorld('electronAPI', {
  // Gestion des utilisateurs
  createUser: (userData: UserData) => ipcRenderer.invoke('user:create', userData),
  getUser: (userId: string) => ipcRenderer.invoke('user:get', userId),
  
  // IA et chat
  sendAIMessage: (message: string, context: Context) => 
    ipcRenderer.invoke('ai:chat', message, context),
  
  // Système de fichiers
  saveFile: (path: string, data: any) => 
    ipcRenderer.invoke('fs:save', path, data),
});
```

## Système de Traduction

### Structure des Traductions
```typescript
interface TranslationStructure {
  ui: {
    [key: string]: {
      fr: string;
      en: string;
      cs: string;
    }
  };
  educational: {
    subjects: SubjectTranslations;
    activities: ActivityTranslations;
    feedback: FeedbackTranslations;
  };
  ai: {
    greetings: AITranslations;
    encouragements: AITranslations;
    explanations: AITranslations;
  };
}
```

### Hook de Traduction
```typescript
const useTranslation = () => {
  const { language } = useContext(LanguageContext);
  
  const t = useCallback((key: string): string => {
    return getNestedTranslation(translations, key, language) || key;
  }, [language]);
  
  return { t, language };
};
```

## Gestion des Données

### Modèles de Données
```typescript
interface User {
  id: string;
  name: string;
  age: number;
  grade: string;
  avatar: string;
  language: Language;
  preferences: UserPreferences;
  progress: ProgressData;
  createdAt: Date;
  lastActive: Date;
}

interface EducationalActivity {
  id: string;
  subject: Subject;
  ageGroup: AgeGroup;
  difficulty: Difficulty;
  type: ActivityType;
  content: ActivityContent;
  scoring: ScoringRules;
}

interface ProgressData {
  totalActivities: number;
  completedActivities: number;
  subjectProgress: { [subject: string]: SubjectProgress };
  achievements: Achievement[];
  timeSpent: number;
}
```

### Stockage Local
```typescript
class StorageManager {
  private basePath: string;
  
  async saveUserData(userId: string, data: any): Promise<void> {
    const filePath = path.join(this.basePath, 'users', `${userId}.json`);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  }
  
  async loadUserData(userId: string): Promise<any> {
    const filePath = path.join(this.basePath, 'users', `${userId}.json`);
    const content = await fs.readFile(filePath, 'utf8');
    return JSON.parse(content);
  }
}
```

## Sécurité et Bonnes Pratiques

### Sécurité Electron
- ✅ `nodeIntegration: false` - Désactivation de l'intégration Node.js
- ✅ `contextIsolation: true` - Isolation des contextes
- ✅ Script de préchargement pour API sécurisée
- ✅ CSP (Content Security Policy) configurée
- ✅ Validation des entrées utilisateur

### Protection des Données
- ✅ Stockage local uniquement (pas de cloud)
- ✅ Chiffrement des données sensibles
- ✅ Contrôles parentaux intégrés
- ✅ Pas de tracking ou analytics

### Gestion des Erreurs
```typescript
class ErrorHandler {
  static handle(error: Error, context: string): void {
    console.error(`[${context}] ${error.message}`, error.stack);
    
    // Notification utilisateur friendly
    if (error instanceof NetworkError) {
      showNotification('Problème de connexion - Mode hors ligne activé');
    } else if (error instanceof ValidationError) {
      showNotification('Données invalides - Veuillez vérifier');
    } else {
      showNotification('Une erreur est survenue - Redémarrage recommandé');
    }
  }
}
```

## Tests et Qualité

### Tests Unitaires
```typescript
// Test des traductions
describe('Translation System', () => {
  test('should return correct translation for each language', () => {
    expect(t('ui.welcome', 'fr')).toBe('Bienvenue dans LittleGenius AI !');
    expect(t('ui.welcome', 'en')).toBe('Welcome to LittleGenius AI!');
    expect(t('ui.welcome', 'cs')).toBe('Vítejte v LittleGenius AI!');
  });
});

// Test du service IA
describe('AI Service', () => {
  test('should provide fallback response when API fails', async () => {
    // Mock API failure
    jest.spyOn(aiService, 'callOpenAI').mockRejectedValue(new Error('API Error'));
    
    const response = await aiService.generateResponse('Hello', mockContext);
    expect(response).toBeTruthy();
    expect(typeof response).toBe('string');
  });
});
```

### Linting et Formatage
```json
{
  "scripts": {
    "lint": "eslint src/ --ext .ts,.tsx",
    "lint:fix": "eslint src/ --ext .ts,.tsx --fix",
    "format": "prettier --write src/"
  }
}
```

## Déploiement et Distribution

### Configuration Electron Builder
```json
{
  "build": {
    "appId": "com.littlegenius.ai",
    "productName": "LittleGenius AI",
    "directories": {
      "output": "dist"
    },
    "mac": {
      "category": "public.app-category.education",
      "target": [
        { "target": "dmg", "arch": ["x64", "arm64"] }
      ]
    },
    "win": {
      "target": "nsis",
      "arch": ["x64", "ia32"]
    },
    "linux": {
      "target": "AppImage",
      "arch": ["x64"]
    }
  }
}
```

### Pipeline de Build
```bash
# Build complet multi-plateforme
npm run build           # Compile React
npm run electron-build  # Compile Electron
npm run dist           # Crée les installateurs

# Build spécifique par plateforme
npm run dist:mac       # macOS uniquement
npm run dist:win       # Windows uniquement
npm run dist:linux     # Linux uniquement
```

## Performance et Optimisation

### Optimisations React
- ✅ `React.memo()` pour éviter les re-rendus
- ✅ `useMemo()` et `useCallback()` pour les calculs coûteux
- ✅ Lazy loading des composants éducatifs
- ✅ Virtualisation des listes longues

### Optimisations Electron
- ✅ Fenêtre cachée au démarrage pour temps de chargement
- ✅ Préchargement des ressources critiques
- ✅ Gestion mémoire optimisée
- ✅ Cache intelligent des données

## Monitoring et Debug

### Logs de Développement
```typescript
class Logger {
  static debug(message: string, data?: any): void {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[DEBUG] ${message}`, data);
    }
  }
  
  static error(message: string, error?: Error): void {
    console.error(`[ERROR] ${message}`, error);
    // En production : envoyer vers service de monitoring
  }
}
```

### DevTools Electron
```typescript
// En mode développement
if (process.env.NODE_ENV === 'development') {
  mainWindow.webContents.openDevTools();
  
  // Hot reload
  require('electron-reload')(__dirname);
}
```

---

## 🚀 **Commandes Rapides**

```bash
# Développement
npm start                    # Lance l'app en mode dev
npm run dev:debug           # Mode debug avec logs

# Production  
npm run build               # Build de production
npm run electron-pack       # Package Electron
npm run dist               # Crée les installateurs

# Tests
npm test                   # Tests unitaires
npm run test:e2e          # Tests end-to-end
npm run lint              # Vérification code

# Maintenance
npm audit                 # Vérification sécurité
npm update               # Mise à jour dépendances
npm run clean           # Nettoyage cache
```

**🔧 LittleGenius AI : Une architecture robuste pour l'éducation du futur !**
\n+---\n+\n+## 🔊 Module Voix Féminine Multilingue (Conception)\n+\n+### Objectifs\n+- Fournir une narration claire et rassurante\n+- Adapter ton, vitesse et prosodie selon l'âge\n+- Support FR / EN / CS avec profils personnalisés\n+\n+### Interface Prévue\n+```typescript
export interface VoiceProfile {
  id: string;           // 'fr-female-1'
  language: 'fr' | 'en' | 'cs';
  displayName: string;  // Élise, Mia, Lenka
  gender: 'female';
  pitch: number;        // -2 à +2
  rate: number;         // 0.8 à 1.2
  sampleUrl?: string;   // Aperçu audio
}

export interface SpeechRequest {
  text: string;
  language: 'fr' | 'en' | 'cs';
  voiceId?: string;
  ssml?: string;        // Pour intonation grammaticale
  priority?: 'normal' | 'high';
  interrupt?: boolean;  // Stop lecture en cours
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (e: Error) => void;
}
```
\n+### Service (esquisse)\n+```typescript
class SpeechService {
  private voices: VoiceProfile[] = femaleVoices;
  private currentUtterance?: SpeechSynthesisUtterance;

  speak(req: SpeechRequest) {
    if (req.interrupt) this.stop();
    const voice = this.resolveVoice(req.language, req.voiceId);
    const utter = new SpeechSynthesisUtterance(req.text);
    utter.lang = this.mapLang(req.language);
    utter.pitch = voice.pitch;
    utter.rate = voice.rate;
    utter.onstart = req.onStart || null;
    utter.onend = req.onEnd || null;
    utter.onerror = (e) => req.onError?.(e.error as any);
    window.speechSynthesis.speak(utter);
    this.currentUtterance = utter;
  }

  stop() {
    if (this.currentUtterance) {
      window.speechSynthesis.cancel();
      this.currentUtterance = undefined;
    }
  }
}
```
\n+### Fallback Local\n+- Pré-enregistrer prompts fréquents (MP3)\n+- Charger dynamiquement via cache\n+- Stratégie : voix synthèse -> audio pré-généré -> texte seul\n+\n+### Usage Prévu\n+- Lecture d'histoires\n+- Explication de consigne\n+- Feedback positif\n+- Guidance codage et anatomie\n+\n+### Tests Qualité Vocale\n+| Critère | Métrique | Objectif |
| ------- | -------- | -------- |
| Latence initiale | ms synthèse | < 800ms |
| Clarté phonétique | score écoute | > 90% |
| Stabilité débit | variance rate | < 5% |
| Interruption fluide | délai stop | < 200ms |
\n+---\n+\n+## 🧪 Extension Pédagogique Voix & Contenu (Roadmap)\n+- Synchronisation curseur / mot lu\n+- Mode chuchoté pour réviser le soir\n+- Accent adaptatif (FR Canada, EN UK/US)\n+- Détection d'hésitations utilisateur (future ASR)\n+