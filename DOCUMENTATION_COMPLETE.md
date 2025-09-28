# LittleGenius AI - Documentation Complète

## 🎯 Vue d'ensemble du projet

**LittleGenius AI** est une application éducative cross-platform (PC/Mac) destinée aux enfants de 3 à 12 ans, développée avec Electron + React + TypeScript. L'application intègre un assistant IA, supporte le multilingue (FR/EN/CS), et offre des contrôles parentaux complets.

## ✅ État actuel du projet : TERMINÉ ET FONCTIONNEL

### Fonctionnalités implémentées

#### 🏗️ Architecture technique
- **Frontend** : React 18 + TypeScript + Material-UI + Framer Motion
- **Desktop** : Electron avec preload sécurisé (contextBridge)
- **Base de données** : PostgreSQL avec fallback JSON (migration automatique)
- **Internationalisation** : Système complet FR/EN/CS
- **IA** : Intégration OpenAI avec mode mock de fallback
- **Synthèse vocale** : Web Speech API avec profils multilingues

#### 👥 Gestion des utilisateurs
- Création de profils utilisateurs avec avatar
- Sélection d'âge et de préférences
- Contrôles parentaux (temps limite, matières autorisées, niveau)
- Préférences vocales (activation/désactivation, sélection de voix)
- Interface de modification des paramètres vocaux

#### 📚 Contenu éducatif
**8 matières principales** avec contenu structuré par âge (3-5, 6-8, 9-12 ans) :
- **Mathématiques** : Comptage, calculs, géométrie
- **Français/Langues** : Lecture, écriture, vocabulaire
- **Sciences** : Expériences, découvertes, nature
- **Art** : Dessin, couleurs, créativité
- **Informatique** : Algorithmique, programmation basique
- **Anatomie** : Corps humain, organes, systèmes
- **Éducation civique** : Citoyenneté, valeurs, société
- **Hygiène & Santé** : Soins personnels, alimentation

#### 🎮 Système d'activités
- **Types d'activités supportés** :
  - Quiz à choix multiples
  - Exercices de mathématiques interactifs
  - Activités d'association (matching)
  - Exercices d'ordonnancement
  - Histoires avec questions de compréhension
  - Activités créatives avec saisie libre
  - Sections informatives éducatives
- **Moteur de rendu générique** pour tous types de contenu
- **Système de scoring** et suivi du temps
- **Narrateur vocal automatique** au démarrage des activités

#### 🔊 Système vocal
- **Profils de voix féminines** multilingues
- **Activation/désactivation** par utilisateur
- **Sélection de voix** spécifique par langue
- **Test audio** intégré dans les paramètres
- **Narration automatique** des instructions d'activité

#### 🗃️ Persistence des données
**Système hybride PostgreSQL + JSON** :
- **PostgreSQL** (recommandé) : Tables `users`, `progress`, `activities_results`
- **JSON files** (fallback) : Fichiers locaux dans userData
- **Migration automatique** : Import des données JSON vers PostgreSQL au premier lancement
- **Fallback transparent** : Bascule automatique sur JSON si PostgreSQL indisponible

## 🚀 Installation et lancement

### Prérequis
- Node.js 16+
- PostgreSQL (optionnel, l'app fonctionne avec JSON)

### Installation
```bash
# Cloner et installer les dépendances
npm install --legacy-peer-deps

# Configuration PostgreSQL (optionnel)
cp .env.example .env
# Éditer .env avec vos paramètres PostgreSQL
```

### Lancement
```bash
# Mode développement
npm start

# Build de production
npm run build:renderer
FORCE_PROD=true npx electron .
```

## 📁 Structure du projet

```
LittleGenius AI/
├── electron/                   # Processus principal Electron
│   ├── main.ts                # Point d'entrée, gestion des fenêtres
│   ├── preload.ts             # API sécurisée pour le renderer
│   ├── database/              # Couche de données
│   │   ├── DatabaseManager.ts # Gestionnaire hybride PG/JSON
│   │   ├── PgPool.ts         # Pool de connexions PostgreSQL
│   │   └── DataMigrator.ts   # Migration JSON vers PostgreSQL
│   └── services/             # Services métier
│       └── AIService.ts      # Intégration OpenAI avec mock
├── src/                      # Application React
│   ├── components/          # Composants UI
│   │   ├── Dashboard.tsx    # Tableau de bord principal
│   │   ├── EducationalActivity.tsx # Lecteur d'activités
│   │   ├── GenericActivityRenderer.tsx # Rendu générique
│   │   ├── VoiceSettingsDialog.tsx # Paramètres vocaux
│   │   └── ...
│   ├── utils/              # Utilitaires
│   │   ├── educationalContent.ts # Contenu éducatif complet
│   │   ├── translations.ts     # Système i18n complet
│   │   └── speechService.ts    # Service de synthèse vocale
│   └── contexts/           # Contextes React
│       └── LanguageContext.tsx # Gestion des langues
├── build/                  # Build de production React
└── package.json           # Dépendances et scripts
```

## 🔧 Configuration de la base de données

### PostgreSQL (recommandé)
```bash
# Créer la base de données
createdb littlegenius

# Configurer .env
PGHOST=localhost
PGPORT=5432
PGUSER=votre_utilisateur
PGPASSWORD=votre_mot_de_passe
PGDATABASE=littlegenius
```

**Tables créées automatiquement** :
- `users` : Profils utilisateurs avec préférences
- `progress` : Progression par matière et utilisateur  
- `activities_results` : Historique des résultats d'activités

### Mode fallback JSON
Si PostgreSQL n'est pas configuré, l'application utilise automatiquement :
- `users.json` : Profils utilisateurs
- `progress.json` : Données de progression
- `activities.json` : Historique (basique)

## 🌍 Internationalisation

**Langues supportées** : Français, Anglais, Tchèque
**Contenu traduit** :
- Interface utilisateur complète
- Contenu éducatif (titres, descriptions, instructions)
- Messages de l'IA et encouragements
- Paramètres vocaux et menus

**Ajout d'une langue** :
1. Étendre `SupportedLanguage` dans `translations.ts`
2. Ajouter les traductions dans l'objet `translations`
3. Mettre à jour `educationalContent.ts` pour la nouvelle langue

## 🎯 Développement et extension

### Ajouter une nouvelle matière
1. **Étendre les types** dans `educationalContent.ts`
2. **Créer le contenu** avec structure par âge
3. **Ajouter les traductions** dans `translations.ts`
4. **Mettre à jour les composants** (Dashboard, filtres)

### Ajouter un nouveau type d'activité
1. **Définir la structure** dans `EducationalContent`
2. **Implémenter le rendu** dans `GenericActivityRenderer.tsx`
3. **Tester** avec le contenu existant

### Personnaliser l'IA
1. **Configurer OpenAI** avec `OPENAI_API_KEY` dans `.env`
2. **Modifier les prompts** dans `AIService.ts`
3. **Étendre les types de requêtes** selon besoins

## 🐛 Debug et diagnostic

### Mode debug
```bash
# Console développeur activée
DEBUG=true npm start

# Logs détaillés Electron
ELECTRON_ENABLE_LOGGING=1 npm start
```

### Diagnostic des erreurs courantes
- **Écran blanc** : Vérifier la console, utiliser HashRouter pour file://
- **Erreurs PostgreSQL** : L'app bascule automatiquement sur JSON
- **Problèmes vocaux** : Vérifier les permissions microphone/haut-parleurs
- **Contenu manquant** : Vérifier `educationalContent.ts` et traductions

## 📋 État des fonctionnalités

### ✅ Fonctionnalités complètes
- Architecture Electron + React + TypeScript
- Système d'utilisateurs avec contrôles parentaux
- 8 matières éducatives avec contenu riche
- Internationalisation FR/EN/CS complète
- Synthèse vocale multilingue
- Base de données hybride PostgreSQL/JSON
- Interface moderne avec animations
- Gestion d'erreurs et fallbacks
- Build de production fonctionnel

### 🔄 Améliorations futures possibles
- **Gamification** : Badges, récompenses, progression visuelle
- **Statistiques** : Tableaux de bord pour parents/enseignants
- **Contenu adaptatif** : IA générant du contenu personnalisé
- **Multijoueur** : Activités collaboratives
- **Export de données** : Rapports de progression
- **Plugins** : Système d'extensions pour nouvelles matières

## 🏆 Résumé technique

**Technologies maîtrisées** :
- ✅ Electron (processus sécurisés, preload, packaging)
- ✅ React 18 (hooks, contextes, rendu conditionnel)
- ✅ TypeScript (types stricts, interfaces complexes)
- ✅ Material-UI (theming, composants, responsive)
- ✅ PostgreSQL (pool de connexions, migrations, requêtes)
- ✅ Web Speech API (synthèse vocale, profils)
- ✅ OpenAI API (intégration, fallbacks)
- ✅ i18n (système complet multilingue)

**Patterns implémentés** :
- Factory pattern (GenericActivityRenderer)
- Strategy pattern (DatabaseManager hybride)
- Observer pattern (React contextes)
- Repository pattern (couche d'abstraction données)
- Error boundary (gestion d'erreurs React)

Le projet est **production-ready** et peut être étendu selon les besoins spécifiques.