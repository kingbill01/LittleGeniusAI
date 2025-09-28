#!/bin/bash

# Script d'upload vers GitHub pour LittleGenius AI

echo "🚀 Upload LittleGenius AI vers GitHub"
echo "===================================="
echo ""

# Vérifier qu'on est dans le bon répertoire
if [ ! -f "package.json" ]; then
    echo "❌ Erreur: Exécutez ce script depuis le répertoire LittleGenius AI"
    exit 1
fi

# Demander le nom d'utilisateur GitHub
read -p "👤 Entrez votre nom d'utilisateur GitHub: " github_username

if [ -z "$github_username" ]; then
    echo "❌ Nom d'utilisateur requis"
    exit 1
fi

echo ""
echo "📋 Configuration:"
echo "   Repository: https://github.com/$github_username/littlegenius-ai"
echo "   Branche: main"
echo ""

# Vérifier si le remote existe déjà
if git remote get-url origin > /dev/null 2>&1; then
    echo "⚠️  Remote origin existe déjà. Suppression..."
    git remote remove origin
fi

echo "🔗 Ajout du remote GitHub..."
git remote add origin "https://github.com/$github_username/littlegenius-ai.git"

echo "📤 Upload vers GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 UPLOAD RÉUSSI!"
    echo "================="
    echo ""
    echo "✅ Votre projet est maintenant sur GitHub:"
    echo "   https://github.com/$github_username/littlegenius-ai"
    echo ""
    echo "📝 Prochaines étapes recommandées:"
    echo "   1. Renommer README-GITHUB.md en README.md"
    echo "   2. Ajouter des topics (education, ai, react, etc.)"
    echo "   3. Configurer GitHub Pages si souhaité"
    echo ""
    echo "🛠️ Pour renommer le README:"
    echo "   mv README-GITHUB.md README.md"
    echo "   git add README.md"
    echo "   git commit -m '📝 Update README for GitHub'"
    echo "   git push"
else
    echo ""
    echo "❌ ERREUR UPLOAD"
    echo "==============="
    echo ""
    echo "💡 Vérifiez que:"
    echo "   1. Le repository existe sur GitHub"
    echo "   2. Vous avez les droits d'accès"
    echo "   3. Votre authentification GitHub est configurée"
    echo ""
    echo "🔧 Pour configurer l'authentification:"
    echo "   gh auth login"
    echo "   # OU configurez SSH keys sur GitHub"
fi