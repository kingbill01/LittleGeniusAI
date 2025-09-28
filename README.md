# 🎓 LittleGenius AI - Plateforme Éducative Interactive

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/React-18-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue.svg)
![Electron](https://img.shields.io/badge/Electron-Latest-purple.svg)

## 📋 Description

**LittleGenius AI** est une plateforme éducative complète pour enfants de 3-12 ans, intégrant un compagnon IA intelligent appelé "Génie". L'application combine apprentissage adaptatif, interface multilingue et technologies modernes pour offrir une expérience éducative immersive.

## ✨ Fonctionnalités Principales

### 🧒 Pour les Enfants
- **Modules éducatifs adaptés** par tranches d'âge (3-5, 6-8, 9-12 ans)
- **Compagnon IA "Génie"** pour un apprentissage personnalisé
- **Interface intuitive** avec animations et interactions
- **Système de récompenses** pour la motivation
- **Activités variées** : mathématiques, lecture, sciences, créativité

### 👨‍👩‍👧‍👦 Pour les Parents
- **Contrôles parentaux** complets
- **Suivi des progrès** en temps réel
- **Rapports détaillés** de progression
- **Gestion du temps d'écran**
- **Paramètres de sécurité** personnalisables

### 👩‍🏫 Pour les Éducateurs
- **Interface d'administration** complète
- **Création d'activités** personnalisées
- **Gestion des groupes** d'élèves
- **Analytics avancés** et tableaux de bord
- **Système de traductions** multilingue

## 🌍 Support Multilingue

- 🇫🇷 **Français** (complet)
- 🇬🇧 **Anglais** (complet)
- 🇨🇿 **Tchèque** (complet)

Interface entièrement traduite avec plus de 400 clés de traduction.

## 🚀 Installation Rapide

### Prérequis
- Node.js 16+ 
- npm ou yarn
- PostgreSQL (optionnel - mode démo disponible)

### Installation
```bash
# Cloner le repository
git clone https://github.com/kingbill01/LittleGeniusAI.git
cd littlegenius-ai

# Configuration automatique
./configure.sh

# OU installation manuelle
npm install --legacy-peer-deps
npm start
```

### Démarrage
```bash
# Démarrage avec script
./start.sh

# OU démarrage direct
npm start
```

L'application sera accessible sur : **http://localhost:3000**

## 🛠️ Technologies

### Frontend
- **React 18** + **TypeScript**
- **Material-UI** pour l'interface
- **Framer Motion** pour les animations
- **Context API** pour la gestion d'état

### Backend & Desktop
- **Electron** pour l'application desktop
- **Node.js** pour les services
- **PostgreSQL** avec fallback JSON
- **OpenAI API** avec mode démo

### Infrastructure
- **Webpack** pour le build
- **Concurrently** pour le développement
- **TypeScript** pour la sécurité des types

## 📊 Architecture

```
LittleGenius AI/
├── src/                    # Code source React
│   ├── components/         # Composants UI
│   ├── contexts/          # Contextes React
│   ├── utils/             # Utilitaires et traductions
│   └── pages/             # Pages principales
├── electron/              # Application Electron
├── scripts/               # Scripts de configuration
├── public/                # Ressources statiques
└── docs/                  # Documentation
```

## 🔧 Configuration

### Variables d'Environnement
```bash
# Base de données
DB_HOST=localhost
DB_PORT=5432
DB_NAME=littlegenius
DB_USER=littlegenius
DB_PASSWORD=votre_password

# OpenAI API
OPENAI_API_KEY=votre_cle_api
OPENAI_MODEL=gpt-3.5-turbo

# Mode de fonctionnement
NODE_ENV=development
REACT_APP_API_URL=http://localhost:3001
```

### Scripts Disponibles
- `npm start` : Démarrage développement
- `npm run build` : Build production
- `npm run build:renderer` : Build interface React
- `npm run build:electron` : Build application Electron
- `npm test` : Tests unitaires

## 🎯 Fonctionnalités Avancées

### Intelligence Artificielle
- **Compagnon adaptatif** basé sur GPT-3.5
- **Apprentissage personnalisé** selon l'âge
- **Réponses contextuelles** aux questions
- **Mode démo** avec IA simulée

### Interface d'Administration
- **Gestionnaire de traductions** en temps réel
- **Création d'activités** drag & drop
- **Analytics détaillés** avec graphiques
- **Gestion des utilisateurs** et permissions
- **Système de sauvegarde** automatique

### Sécurité & Performance
- **Authentification sécurisée**
- **Validation des données** côté client/serveur
- **Optimisation des performances** React
- **Gestion d'erreurs** robuste
- **Mode offline** avec synchronisation

## 🐛 Résolution de Problèmes

### Erreurs Communes
```bash
# Erreur de compilation
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps

# Problème de port
lsof -ti:3000 | xargs kill -9
npm start

# Erreur PostgreSQL
./scripts/setup-postgres.sh
```

### Mode Démo
L'application fonctionne parfaitement en mode démo :
- ✅ Toutes les fonctionnalités UI
- ✅ Stockage local avec JSON
- ✅ IA simulée avec réponses préprogrammées
- ✅ Interface complètement traduite

## 📸 Screenshots

### Interface Principale
![Interface Principale](docs/screenshots/main-interface.png)

### Modules Éducatifs
![Modules Éducatifs](docs/screenshots/educational-modules.png)

### Interface Admin
![Interface Admin](docs/screenshots/admin-interface.png)

## 📈 Roadmap

- [ ] Application mobile (React Native)
- [ ] Support de nouveaux langues
- [ ] Intégration réalité augmentée
- [ ] Système de badges avancé
- [ ] API publique pour développeurs
- [ ] Marketplace d'activités

## 🤝 Contribution

Les contributions sont les bienvenues ! 

### Comment contribuer
1. Fork le projet
2. Créer une branche (`git checkout -b feature/amazing-feature`)
3. Commit vos changements (`git commit -m 'Add amazing feature'`)
4. Push vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir [LICENSE](LICENSE) pour plus de détails.

## 🌟 Support et Contact

- 📧 **Email** : support@littlegenius.ai
- 💬 **Issues** : [GitHub Issues](https://github.com/kingbill01/LittleGeniusAI/issues)
- 📖 **Wiki** : [Documentation complète](https://github.com/kingbill01/LittleGeniusAI/wiki)

## 🙏 Remerciements

- OpenAI pour l'API GPT
- Material-UI pour les composants
- Electron pour le framework desktop
- La communauté React pour l'écosystème

---

**Fait avec ❤️ pour l'éducation des enfants**

⭐ **N'oubliez pas de donner une étoile si ce projet vous plaît !**