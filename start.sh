#!/bin/bash

# Script de démarrage rapide LittleGenius AI

echo "🚀 Démarrage LittleGenius AI"
echo "============================"
echo ""

# Aller dans le répertoire du projet
cd "/Users/birane.fall/Downloads/LittleGenius AI"

# Vérifier si la configuration est faite
if [ ! -f ".env" ]; then
    echo "⚠️  Configuration manquante!"
    echo "Exécutez d'abord: ./configure.sh"
    exit 1
fi

# Vérifier les dépendances
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install --legacy-peer-deps
fi

echo "🔍 Vérification de l'environnement..."
echo ""

# Vérifier PostgreSQL
echo "📊 Base de données PostgreSQL:"
if command -v psql &> /dev/null; then
    if pg_isready -h localhost -p 5432 &> /dev/null; then
        echo "   ✅ PostgreSQL actif"
    else
        echo "   ⚠️  PostgreSQL installé mais non démarré"
        echo "   💡 Démarrez avec: brew services start postgresql"
    fi
else
    echo "   📝 PostgreSQL non installé (mode démo actif)"
fi

# Vérifier OpenAI
echo "🤖 OpenAI API:"
if grep -q "your-openai-api-key-here" .env; then
    echo "   📝 Mode démo actif (pas de clé API)"
else
    echo "   ✅ Clé API configurée"
fi

echo ""
echo "🎓 Fonctionnalités disponibles:"
echo "   ✅ Interface traduite (français/anglais/tchèque)"
echo "   ✅ Admin complet avec gestion des contenus"
echo "   ✅ Modules éducatifs 3-12 ans"
echo "   ✅ Compagnon IA Génie"
echo "   ✅ Contrôles parentaux"
echo ""

echo "🌟 Lancement de l'application..."
npm start