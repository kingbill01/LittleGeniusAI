# 🎓 LittleGenius AI - Guide de Configuration

## 📋 Aperçu

LittleGenius AI est une plateforme éducative complète pour enfants de 3-12 ans avec :
- ✅ **Interface multilingue** (français, anglais, tchèque)
- ✅ **Compagnon IA** intégré (Génie) 
- ✅ **Modules éducatifs** adaptés par âge
- ✅ **Interface d'administration** complète
- ✅ **Contrôles parentaux**

## 🚀 Installation Rapide

### Option 1: Configuration Automatique (Recommandée)
```bash
# Configuration complète en une commande
./configure.sh
```

### Option 2: Configuration Manuelle
```bash
# 1. Base de données PostgreSQL
./scripts/setup-postgres.sh

# 2. API OpenAI
./scripts/setup-openai.sh

# 3. Dépendances
npm install --legacy-peer-deps
```

## 🏃‍♂️ Démarrage

```bash
# Démarrage avec vérifications
./start.sh

# OU démarrage direct
npm start
```

L'application sera accessible sur : **http://localhost:3000**

## 🔧 Configuration

### Base de Données PostgreSQL
- **Mode Production** : PostgreSQL avec persistance complète
- **Mode Démo** : Fichiers JSON locaux (fonctionnel sans PostgreSQL)

### OpenAI API
- **Mode Production** : Clé API OpenAI pour IA complète
- **Mode Démo** : Réponses simulées (fonctionnel sans API)

## 🌍 Langues Supportées

### Interface Utilisateur
- 🇫🇷 **Français** (complet)
- 🇬🇧 **Anglais** (complet)  
- 🇨🇿 **Tchèque** (complet)

### Interface d'Administration
- ✅ Tous les menus traduits
- ✅ Tous les boutons et labels
- ✅ Messages d'erreur et confirmations
- ✅ Formulaires et paramètres

## 📊 Fonctionnalités d'Administration

### Gestionnaire de Traductions
- Édition en temps réel des traductions
- Support multilingue complet
- Import/export des fichiers de langue

### Analytics et Rapports
- Tableaux de bord détaillés
- Statistiques d'utilisation
- Rapports de progression

### Gestion des Contenus
- **Activités interactives** : Création et modification
- **Questions éducatives** : Base de données complète
- **Images et médias** : Gestionnaire de ressources

### Paramètres Système
- Configuration des modules éducatifs
- Paramètres de sécurité
- Contrôles parentaux
- Sauvegarde et restauration

## 🛠️ Développement

### Structure du Projet
```
LittleGenius AI/
├── src/                    # Code source React
├── electron/              # Application Electron
├── public/                # Ressources publiques
├── scripts/               # Scripts de configuration
├── .env                   # Variables d'environnement
└── translations/          # Fichiers de traduction
```

### Scripts Disponibles
- `npm start` : Démarrage développement
- `npm run build` : Compilation production
- `npm run electron` : Lancement Electron
- `npm test` : Tests unitaires

### Configuration Environnement
Le fichier `.env` contient :
```bash
# Base de données
DB_HOST=localhost
DB_PORT=5432
DB_NAME=littlegenius
DB_USER=littlegenius
DB_PASSWORD=littlegenius123

# OpenAI API
OPENAI_API_KEY=your-openai-api-key-here
OPENAI_MODEL=gpt-3.5-turbo

# Mode de fonctionnement
NODE_ENV=development
REACT_APP_API_URL=http://localhost:3001
```

## 🐛 Résolution de Problèmes

### Erreur de Base de Données
```bash
# Vérifier PostgreSQL
brew services list | grep postgresql

# Redémarrer PostgreSQL
brew services restart postgresql

# Tester la connexion
psql -h localhost -U littlegenius -d littlegenius
```

### Erreur de Compilation
```bash
# Nettoyer et réinstaller
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Problème de Traductions
Les traductions sont automatiquement chargées. Si problème :
1. Vérifier `src/components/contexts/LanguageContext.tsx`
2. Vérifier `src/utils/translations.ts`
3. Redémarrer l'application

## 📱 Interface Utilisateur

### Page de Login Admin
- Sélecteur de langue (français/anglais/tchèque)
- Interface complètement traduite
- Authentification sécurisée

### Tableau de Bord
- Vue d'ensemble des activités
- Statistiques en temps réel
- Navigation intuitive

### Modules Éducatifs
- **3-5 ans** : Activités sensorielles et créatives
- **6-8 ans** : Mathématiques et lecture de base
- **9-12 ans** : Sciences et logique avancée

## 🎯 Prochaines Étapes

1. **Configuration Production** : Utilisez `./configure.sh`
2. **Test Complet** : Vérifiez toutes les fonctionnalités
3. **Personnalisation** : Adaptez les contenus selon vos besoins
4. **Déploiement** : Package avec `npm run build`

## 📞 Support

L'application fonctionne en mode démo même sans configuration complète :
- ✅ Toutes les traductions fonctionnent
- ✅ Interface complète accessible
- ✅ Modules éducatifs disponibles
- ✅ Contrôles parentaux actifs

Pour un support complet, configurez PostgreSQL et OpenAI API.