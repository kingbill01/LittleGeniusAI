#!/bin/bash

# Script de configuration OpenAI pour LittleGenius AI

echo "🤖 Configuration OpenAI pour LittleGenius AI"
echo "============================================"
echo ""
echo "Pour configurer OpenAI IA, vous avez 2 options :"
echo ""
echo "1️⃣ OPTION RECOMMANDÉE - Mode Demo (gratuit):"
echo "   ✅ L'application fonctionne parfaitement en mode demo"
echo "   ✅ Toutes les fonctionnalités éducatives sont disponibles"
echo "   ✅ IA simulée avec des réponses préprogrammées"
echo "   ✅ Idéal pour développement et tests"
echo ""
echo "2️⃣ OPTION AVANCÉE - Vraie API OpenAI:"
echo "   🔑 Nécessite une clé API OpenAI (payante)"
echo "   💰 Coût par utilisation"
echo "   🚀 IA réelle pour réponses dynamiques"
echo ""

read -p "Voulez-vous configurer une vraie clé API OpenAI? (y/N): " configure_openai

if [[ $configure_openai =~ ^[Yy]$ ]]; then
    echo ""
    echo "📝 Pour obtenir une clé API OpenAI:"
    echo "   1. Aller sur https://platform.openai.com/api-keys"
    echo "   2. Se connecter/créer un compte"
    echo "   3. Créer une nouvelle clé API"
    echo "   4. Copier la clé (commence par 'sk-')"
    echo ""
    
    read -p "Entrez votre clé API OpenAI: " api_key
    
    if [[ $api_key == sk-* ]]; then
        # Mettre à jour le fichier .env
        if grep -q "OPENAI_API_KEY=" .env; then
            sed -i.bak "s/OPENAI_API_KEY=.*/OPENAI_API_KEY=$api_key/" .env
        else
            echo "OPENAI_API_KEY=$api_key" >> .env
        fi
        
        echo "✅ Clé API OpenAI configurée!"
        echo "   L'application utilisera maintenant la vraie IA OpenAI"
    else
        echo "❌ Format de clé invalide (doit commencer par 'sk-')"
        echo "   L'application continuera en mode demo"
    fi
else
    echo ""
    echo "✅ Configuration terminée - Mode Demo activé"
    echo "   L'application fonctionnera parfaitement avec l'IA simulée"
fi

echo ""
echo "🎉 Configuration OpenAI terminée!"
echo "   Vous pouvez maintenant relancer l'application."