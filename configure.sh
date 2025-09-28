#!/bin/bash

# Script principal de configuration LittleGenius AI

echo "🎓 Configuration LittleGenius AI"
echo "================================"
echo ""
echo "Ce script va configurer votre environnement de développement"
echo ""

# Aller dans le répertoire du projet
cd "/Users/birane.fall/Downloads/LittleGenius AI"

echo "1️⃣ Configuration PostgreSQL..."
echo "================================"
./scripts/setup-postgres.sh

echo ""
echo "2️⃣ Configuration OpenAI..."
echo "============================"
./scripts/setup-openai.sh

echo ""
echo "3️⃣ Installation des dépendances..."
echo "====================================="
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des paquets npm..."
    npm install --legacy-peer-deps
else
    echo "✅ Dépendances déjà installées"
fi

echo ""
echo "4️⃣ Test de compilation..."
echo "=========================="
echo "🔨 Compilation du projet..."
npm run build:renderer

if [ $? -eq 0 ]; then
    echo "✅ Compilation réussie!"
else
    echo "❌ Erreur de compilation"
    exit 1
fi

echo ""
echo "🎉 CONFIGURATION TERMINÉE!"
echo "=========================="
echo ""
echo "✅ Base de données PostgreSQL configurée"
echo "✅ OpenAI configuré (mode demo ou API)"
echo "✅ Dépendances installées"
echo "✅ Projet compilé avec succès"
echo ""
echo "🚀 Pour lancer l'application:"
echo "   npm start"
echo ""
echo "🌐 L'application sera accessible sur:"
echo "   http://localhost:3000"
echo ""
echo "📱 Interface admin disponible avec:"
echo "   - Traductions complètes (français/anglais/tchèque)"
echo "   - Gestion des activités"
echo "   - Gestion des questions"
echo "   - Analytics et paramètres"