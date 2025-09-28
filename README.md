# 🧠 LittleGenius AI

Plateforme éducative interactive pour enfants de 3 à 12 ans avec assistant IA intégré.

## 🌟 Fonctionnalités

- **Interface adaptée aux enfants** avec animations et design coloré
- **Assistant IA intégré** (Génie) pour accompagner l'apprentissage
- **Système de gamification** avec points et badges
- **Contrôles parentaux** intégrés
- **Mode hors-ligne** complet
- **Cross-platform** (PC/Mac)

## 🎯 Groupes d'âge

### 3-5 ans - Éveil
- Reconnaissance de formes et couleurs
- Alphabet et premiers mots
- Comptage de base
- Coordination motrice

### 6-8 ans - Fondamentaux
- Lecture et écriture
- Mathématiques simples
- Sciences découverte
- Créativité artistique

### 9-12 ans - Approfondissement
- Mathématiques avancées
- Sciences expérimentales
- Langues étrangères
- Programmation visuelle

## 🛠️ Technologies

- **Frontend**: React + TypeScript
- **Desktop**: Electron
- **UI**: Material-UI
- **Animations**: Framer Motion
- **IA**: OpenAI API
- **Stockage**: JSON local

## 🚀 Installation et Démarrage

### Prérequis
- Node.js 16+
- npm ou yarn

### Installation
```bash
npm install --legacy-peer-deps
```

### Développement
```bash
# Démarrer le serveur de développement React
npm run start:renderer

# Dans un autre terminal, démarrer Electron
npm run start:electron

# Ou les deux en parallèle
npm start
```

### Build
```bash
# Build pour développement
npm run build

# Build et distribution
npm run dist

# Build spécifique
npm run dist:mac    # macOS
npm run dist:win    # Windows
```

## 📁 Structure du Projet

```
LittleGenius AI/
├── src/                    # Code React
│   ├── components/         # Composants React
│   ├── App.tsx            # Composant principal
│   └── index.tsx          # Point d'entrée
├── electron/              # Code Electron
│   ├── main.ts           # Processus principal
│   ├── preload.ts        # Script preload
│   ├── database/         # Gestion des données
│   └── services/         # Services (IA, etc.)
├── public/               # Assets statiques
└── build/               # Build de production
```

## 🔧 Configuration

### Variables d'environnement
Créer un fichier `.env` à la racine :
```env
OPENAI_API_KEY=your_openai_api_key_here
```

### Contrôles parentaux
- Limite de temps de jeu
- Sélection des matières autorisées
- Niveau de difficulté automatique selon l'âge

## 🤖 Assistant IA - Génie

L'assistant IA intégré :
- S'adapte à l'âge de l'enfant
- Fournit des encouragements personnalisés
- Répond aux questions éducatives
- Génère des activités sur mesure
- Mode hors-ligne avec réponses pré-programmées
 - Synthèse vocale féminine multilingue (FR/EN/CS) – phase initiale

## 🎮 Activités Disponibles

### Mathématiques
- Comptage interactif
- Formes géométriques
- Calcul mental
- Résolution de problèmes

### Français
- Reconnaissance de lettres
- Formation de mots
- Lecture interactive
- Expression créative

### Sciences
- Découverte de la nature
- Expériences simples
- Observation du monde
- Initiation à la physique

### Art & Créativité
- Dessin numérique
- Création musicale
- Histoires interactives
- Projets créatifs

### Informatique (Nouveau)
- Logique séquentielle (blocs)
- Algorithmes visuels simplifiés
- Programmation créative
- Sécurité numérique

### Anatomie (Nouveau)
- Parties du corps
- Organes principaux
- Systèmes (respiratoire, circulatoire)
- Digestion et nutrition

### Éducation Civique (Nouvelle)
- Vivre ensemble
- Règles & communauté
- Conflits et médiation
- Valeurs citoyennes

### Hygiène & Santé (Nouvelle)
- Routine quotidienne
- Alimentation équilibrée
- Sommeil & énergie
- Bien-être mental

## 📊 Suivi des Progrès

- Rapport détaillé pour les parents
- Statistiques d'utilisation
- Progression par matière
- Temps d'écran adaptatif

## 🔒 Sécurité et Confidentialité

- Stockage local des données
- Pas de collecte d'informations personnelles
- Contrôle parental intégré
- Interface sécurisée pour enfants

## 🌐 Compatibilité

- **macOS**: 10.14+
- **Windows**: 10+
- **Linux**: Ubuntu 18.04+

## 📝 Licence

MIT License - Voir le fichier LICENSE pour plus de détails.

## 🤝 Contribution

Les contributions sont les bienvenues ! Voir CONTRIBUTING.md pour les guidelines.

## 📞 Support

Pour toute question ou problème :
- Créer une issue sur GitHub
- Consulter la documentation
- Contacter l'équipe de développement

---

Fait avec ❤️ pour l'éducation des enfants