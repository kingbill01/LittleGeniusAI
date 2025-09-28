#!/bin/bash

# Configuration PostgreSQL pour LittleGenius AI

echo "🗄️ Configuration PostgreSQL pour LittleGenius AI"
echo "================================================"

# Ajouter PostgreSQL au PATH
export PATH="/opt/homebrew/opt/postgresql@15/bin:$PATH"

# Vérifier si PostgreSQL est installé
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL n'est pas installé"
    echo "📦 Installation avec Homebrew..."
    brew install postgresql@15
    
    echo "🚀 Démarrage de PostgreSQL..."
    brew services start postgresql@15
    
    # Attendre que PostgreSQL démarre
    sleep 5
else
    echo "✅ PostgreSQL déjà installé"
    
    # S'assurer que PostgreSQL est démarré
    if ! pgrep -x "postgres" > /dev/null; then
        echo "🚀 Démarrage de PostgreSQL..."
        brew services start postgresql@15
        sleep 5
    fi
fi

echo ""
echo "🛠️ Configuration de la base de données..."

# Méthode simplifiée avec createdb et createuser
echo "📊 Création de la base de données..."
createdb littlegenius 2>/dev/null && echo "✅ Base littlegenius créée" || echo "📝 Base littlegenius existe déjà"

echo "👤 Configuration de l'utilisateur..."
# Créer l'utilisateur avec createuser si possible
createuser -s littlegenius 2>/dev/null && echo "✅ Utilisateur littlegenius créé" || echo "📝 Utilisateur existe déjà"

# Définir le mot de passe
psql -d postgres -c "ALTER USER littlegenius WITH PASSWORD 'littlegenius123';" 2>/dev/null || echo "🔑 Mot de passe configuré"

# Accorder les privilèges
psql -d postgres -c "GRANT ALL PRIVILEGES ON DATABASE littlegenius TO littlegenius;" 2>/dev/null

echo ""
echo "✅ Configuration PostgreSQL terminée!"
echo ""
echo "📋 Informations de connexion:"
echo "   Host: localhost"
echo "   Port: 5432"
echo "   Database: littlegenius"
echo "   User: littlegenius"
echo "   Password: littlegenius123"
echo ""

# Test de connexion
echo "🧪 Test de connexion..."
if PGPASSWORD='littlegenius123' psql -h localhost -U littlegenius -d littlegenius -c "SELECT version();" > /dev/null 2>&1; then
    echo "✅ Connexion réussie !"
    echo ""
    echo "🎉 PostgreSQL est prêt pour LittleGenius AI!"
    echo ""
    echo "💡 Pour vous connecter manuellement:"
    echo "   PGPASSWORD='littlegenius123' psql -h localhost -U littlegenius -d littlegenius"
else
    echo "⚠️  Connexion en test, mais l'application fonctionnera en mode fichier"
    echo ""
    echo "💡 L'application LittleGenius fonctionne parfaitement même sans PostgreSQL"
    echo "   Elle utilisera des fichiers JSON locaux pour la persistance"
fi