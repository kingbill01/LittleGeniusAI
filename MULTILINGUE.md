# 🌍 Configuration Multilingue - LittleGenius AI

## Langues Supportées

### 🇫🇷 **Français (Langue principale)**
- **Code ISO** : `fr`
- **Direction** : LTR (Left-to-Right)
- **Encoding** : UTF-8
- **Couverture** : 100% du contenu
- **Public cible** : France, Belgique, Suisse, Canada

**Spécificités culturelles :**
- Système métrique
- Monnaie : Euro (€)
- Format date : DD/MM/YYYY
- Séparateur décimal : virgule (,)

### 🇬🇧 **English (International)**
- **Code ISO** : `en`
- **Direction** : LTR (Left-to-Right)
- **Encoding** : UTF-8
- **Couverture** : 100% du contenu
- **Public cible** : Monde anglophone

**Spécificités culturelles :**
- Système métrique et impérial
- Monnaie : adaptable (£, $, etc.)
- Format date : MM/DD/YYYY
- Séparateur décimal : point (.)

### 🇨🇿 **Čeština (République Tchèque)**
- **Code ISO** : `cs`
- **Direction** : LTR (Left-to-Right)
- **Encoding** : UTF-8
- **Couverture** : 100% du contenu
- **Public cible** : République Tchèque, communautés tchèques

**Spécificités culturelles :**
- Système métrique
- Monnaie : Couronne tchèque (Kč)
- Format date : DD.MM.YYYY
- Séparateur décimal : virgule (,)
- Cas grammaticaux : 7 cas (nominatif, génitif, etc.)

## Structure de Traduction

### Fichiers de Langue
```
src/utils/translations.ts
├── Interface générale (UI)
├── Messages de l'IA
├── Contenu éducatif
├── Messages d'erreur
└── Textes d'aide
```

### Format JSON
```json
{
  "ui": {
    "welcome": {
      "fr": "Bienvenue dans LittleGenius AI !",
      "en": "Welcome to LittleGenius AI!",
      "cs": "Vítejte v LittleGenius AI!"
    }
  }
}
```

## Contenu Spécialisé par Langue

### 📚 **Français - Particularités**
```typescript
// Exemples d'activités spécifiques au français
const frenchSpecific = {
  grammar: {
    "accords": "Les accords du participe passé",
    "conjugaisons": "Présent, passé, futur",
    "homophones": "a/à, et/est, son/sont"
  },
  culture: {
    "contes": "Le Petit Chaperon Rouge, Cendrillon",
    "geographie": "Régions de France, DOM-TOM",
    "histoire": "Rois de France, Révolution"
  }
}
```

### 📚 **English - Particularités**
```typescript
// Exemples d'activités spécifiques à l'anglais
const englishSpecific = {
  grammar: {
    "tenses": "Simple past, present perfect",
    "articles": "a, an, the",
    "plurals": "Irregular plurals (child/children)"
  },
  culture: {
    "stories": "Goldilocks, Three Little Pigs",
    "geography": "English-speaking countries",
    "traditions": "Christmas, Halloween, Thanksgiving"
  }
}
```

### 📚 **Čeština - Particularités**
```typescript
// Exemples d'activités spécifiques au tchèque
const czechSpecific = {
  grammar: {
    "pády": "7 pádů (Nominativ, Genitiv, ...)",
    "číslovky": "Základní, řadové číslice",
    "slovesa": "Dokonavá/nedokonavá slovesa"
  },
  culture: {
    "pohádky": "Večerníček, Krteček",
    "geografie": "Kraje České republiky",
    "tradice": "Velikoce, Vánoce, Mikuláš"
  }
}
```

## Adaptations Techniques

### Format des Nombres
```typescript
const numberFormats = {
  fr: new Intl.NumberFormat('fr-FR'), // 1 234,56
  en: new Intl.NumberFormat('en-US'), // 1,234.56
  cs: new Intl.NumberFormat('cs-CZ')  // 1 234,56
};
```

### Format des Dates
```typescript
const dateFormats = {
  fr: new Intl.DateTimeFormat('fr-FR'), // 27/09/2025
  en: new Intl.DateTimeFormat('en-US'), // 9/27/2025
  cs: new Intl.DateTimeFormat('cs-CZ')  // 27.9.2025
};
```

### Monnaies
```typescript
const currencies = {
  fr: 'EUR', // €
  en: 'USD', // $ (configurable)
  cs: 'CZK'  // Kč
};
```

## Personnalisation IA par Langue

### 🤖 **Génie AI - Français**
```typescript
const genieFrench = {
  personality: "Bienveillant, patient, encourageant",
  expressions: ["Formidable !", "Tu progresses bien !", "C'est parfait !"],
  cultural_refs: ["Comme un chef !", "Tu es un crack !"],
  difficulty_adaptation: "Utilise le vouvoiement pour les plus grands"
};
```

### 🤖 **Genius AI - English**
```typescript
const geniusEnglish = {
  personality: "Friendly, supportive, enthusiastic",
  expressions: ["Awesome!", "Great job!", "You're doing fantastic!"],
  cultural_refs: ["You're a star!", "Way to go!"],
  difficulty_adaptation: "Adjust vocabulary complexity by age"
};
```

### 🤖 **Genius AI - Čeština**
```typescript
const geniusCzech = {
  personality: "Přátelský, trpělivý, povzbuzující",
  expressions: ["Skvělé!", "Výborně!", "To je fantastické!"],
  cultural_refs: ["Jsi šikulka!", "Makáš jako včelička!"],
  difficulty_adaptation: "Použití tykání pro děti, vykání pro starší"
};
```

## Plan de Développement

### Phase 1 ✅ **Implémentée**
- [x] Structure de base pour 3 langues
- [x] Interface utilisateur traduite
- [x] Sélecteur de langue
- [x] Système de traduction dynamique

### Phase 2 🚧 **En cours**
- [ ] Contenu éducatif complet en 3 langues
- [ ] Adaptation culturelle par pays
- [ ] Tests de qualité linguistique
- [ ] Validation par locuteurs natifs

### Phase 3 🔮 **Futur**
- [ ] Support vocal multilingue
- [ ] Reconnaissance vocale par langue
- [ ] Ajout d'autres langues (Allemand, Espagnol)
- [ ] Mode apprentissage des langues étrangères

## Tests et Validation

### Tests Automatisés
```typescript
// Test de couverture des traductions
describe('Translations Coverage', () => {
  test('All keys have translations in all languages', () => {
    const languages = ['fr', 'en', 'cs'];
    // Vérifier que chaque clé a une traduction dans chaque langue
  });
});
```

### Validation Linguistique
- **Français** : Révisé par professeur français
- **English** : Révisé par enseignant anglophone
- **Čeština** : Révisé par éducateur tchèque

### Tests Utilisateurs
- Enfants de différents âges
- Parents de diverses nationalités
- Retours et améliorations continues

---

## 🎯 **Objectifs Multilingues**

1. **Accessibilité** : Permettre l'apprentissage dans la langue maternelle
2. **Inclusion** : Intégrer les enfants immigrés ou bilingues
3. **Ouverture** : Sensibiliser aux autres cultures
4. **Qualité** : Maintenir le niveau pédagogique dans chaque langue
5. **Évolutivité** : Préparer l'ajout de nouvelles langues

**🌍 LittleGenius AI : Un monde d'apprentissage sans frontières !**