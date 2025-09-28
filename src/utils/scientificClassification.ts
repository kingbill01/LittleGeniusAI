import { EducationalContent } from './educationalContent';

// CLASSIFICATION SCIENTIFIQUE COMPLÈTE DES ÊTRES VIVANTS ET OBJETS NATURELS
// Basée sur la taxonomie moderne et adaptée pour l'éducation des enfants 3-12 ans

export interface ScientificCategory {
  id: string;
  name: {
    fr: string;
    en: string;
    cs: string;
  };
  description: {
    fr: string;
    en: string;
    cs: string;
  };
  emoji: string;
  items: ScientificItem[];
}

export interface ScientificItem {
  name: {
    fr: string;
    en: string;
    cs: string;
  };
  emoji: string;
  scientificName?: string;
  habitat?: {
    fr: string;
    en: string;
    cs: string;
  };
  characteristics?: {
    fr: string[];
    en: string[];
    cs: string[];
  };
  funFacts?: {
    fr: string[];
    en: string[];
    cs: string[];
  };
}

// CLASSIFICATION COMPLÈTE DES ÊTRES VIVANTS

export const scientificCategories: ScientificCategory[] = [
  // === MAMMIFÈRES ===
  {
    id: 'mammals',
    name: {
      fr: 'Mammifères',
      en: 'Mammals',
      cs: 'Savci'
    },
    description: {
      fr: 'Animaux à sang chaud qui allaitent leurs petits',
      en: 'Warm-blooded animals that nurse their young',
      cs: 'Teplokrevní zvířata, která kojí svá mláďata'
    },
    emoji: '🐾',
    items: [
      {
        name: { fr: 'Chat domestique', en: 'Domestic Cat', cs: 'Domácí kočka' },
        emoji: '🐱',
        scientificName: 'Felis catus',
        habitat: { fr: 'Maisons et villes', en: 'Homes and cities', cs: 'Domovy a města' },
        characteristics: {
          fr: ['Poils doux', 'Griffes rétractiles', 'Vision nocturne'],
          en: ['Soft fur', 'Retractable claws', 'Night vision'],
          cs: ['Měkká srst', 'Zatažitelné drápy', 'Noční vidění']
        },
        funFacts: {
          fr: ['Ronronne quand il est content', 'Dort 12-16h par jour'],
          en: ['Purrs when happy', 'Sleeps 12-16 hours a day'],
          cs: ['Přede, když je šťastný', 'Spí 12-16 hodin denně']
        }
      },
      {
        name: { fr: 'Chien', en: 'Dog', cs: 'Pes' },
        emoji: '🐶',
        scientificName: 'Canis lupus familiaris',
        habitat: { fr: 'Partout avec les humains', en: 'Everywhere with humans', cs: 'Všude s lidmi' },
        characteristics: {
          fr: ['Fidèle compagnon', 'Excellent odorat', 'Queue expressive'],
          en: ['Loyal companion', 'Excellent smell', 'Expressive tail'],
          cs: ['Věrný společník', 'Výborný čich', 'Expresivní ocas']
        }
      },
      {
        name: { fr: 'Éléphant d\'Afrique', en: 'African Elephant', cs: 'Africký slon' },
        emoji: '🐘',
        scientificName: 'Loxodonta africana',
        habitat: { fr: 'Savanes africaines', en: 'African savannas', cs: 'Africké savany' },
        characteristics: {
          fr: ['Plus gros animal terrestre', 'Trompe très habile', 'Excellente mémoire'],
          en: ['Largest land animal', 'Very skillful trunk', 'Excellent memory'],
          cs: ['Největší suchozemské zvíře', 'Velmi obratný chobot', 'Výborná paměť']
        }
      },
      {
        name: { fr: 'Dauphin', en: 'Dolphin', cs: 'Delfín' },
        emoji: '🐬',
        scientificName: 'Delphinus delphis',
        habitat: { fr: 'Océans du monde', en: 'World oceans', cs: 'Světové oceány' },
        characteristics: {
          fr: ['Très intelligent', 'Écholocation', 'Vie en groupe'],
          en: ['Very intelligent', 'Echolocation', 'Lives in groups'],
          cs: ['Velmi inteligentní', 'Echolokace', 'Žije ve skupinách']
        }
      },
      {
        name: { fr: 'Panda géant', en: 'Giant Panda', cs: 'Velká panda' },
        emoji: '🐼',
        scientificName: 'Ailuropoda melanoleuca',
        habitat: { fr: 'Forêts de bambou en Chine', en: 'Bamboo forests in China', cs: 'Bambusové lesy v Číně' },
        characteristics: {
          fr: ['Mange principalement du bambou', 'Noir et blanc', 'Espèce protégée'],
          en: ['Mainly eats bamboo', 'Black and white', 'Protected species'],
          cs: ['Hlavně jí bambus', 'Černobílý', 'Chráněný druh']
        }
      },
      {
        name: { fr: 'Girafe', en: 'Giraffe', cs: 'Žirafa' },
        emoji: '🦒',
        scientificName: 'Giraffa camelopardalis',
        habitat: { fr: 'Savanes africaines', en: 'African savannas', cs: 'Africké savany' },
        characteristics: {
          fr: ['Animal le plus grand', 'Long cou', 'Langue bleue de 50cm'],
          en: ['Tallest animal', 'Long neck', '50cm blue tongue'],
          cs: ['Nejvyšší zvíře', 'Dlouhý krk', '50cm modrý jazyk']
        }
      }
    ]
  },

  // === OISEAUX ===
  {
    id: 'birds',
    name: {
      fr: 'Oiseaux',
      en: 'Birds',
      cs: 'Ptáci'
    },
    description: {
      fr: 'Animaux avec des plumes qui pondent des œufs',
      en: 'Animals with feathers that lay eggs',
      cs: 'Zvířata s peřím, která kladou vejce'
    },
    emoji: '🐦',
    items: [
      {
        name: { fr: 'Aigle royal', en: 'Golden Eagle', cs: 'Orel skalní' },
        emoji: '🦅',
        scientificName: 'Aquila chrysaetos',
        habitat: { fr: 'Montagnes et collines', en: 'Mountains and hills', cs: 'Hory a kopce' },
        characteristics: {
          fr: ['Excellent chasseur', 'Vue perçante', 'Vole très haut'],
          en: ['Excellent hunter', 'Sharp vision', 'Flies very high'],
          cs: ['Výborný lovec', 'Ostrý zrak', 'Létá velmi vysoko']
        }
      },
      {
        name: { fr: 'Hibou grand-duc', en: 'Great Horned Owl', cs: 'Výr velký' },
        emoji: '🦉',
        scientificName: 'Bubo bubo',
        habitat: { fr: 'Forêts et zones rocheuses', en: 'Forests and rocky areas', cs: 'Lesy a skalnaté oblasti' },
        characteristics: {
          fr: ['Actif la nuit', 'Vol silencieux', 'Excellente ouïe'],
          en: ['Active at night', 'Silent flight', 'Excellent hearing'],
          cs: ['Aktivní v noci', 'Tichý let', 'Výborný sluch']
        }
      },
      {
        name: { fr: 'Colibri', en: 'Hummingbird', cs: 'Kolibřík' },
        emoji: '🐦',
        scientificName: 'Trochilidae',
        habitat: { fr: 'Jardins fleuris', en: 'Flowery gardens', cs: 'Kvetoucí zahrady' },
        characteristics: {
          fr: ['Plus petit oiseau', 'Bat des ailes très vite', 'Boit le nectar'],
          en: ['Smallest bird', 'Beats wings very fast', 'Drinks nectar'],
          cs: ['Nejmenší pták', 'Velmi rychle mává křídly', 'Pije nektar']
        }
      },
      {
        name: { fr: 'Flamant rose', en: 'Pink Flamingo', cs: 'Plameňák růžový' },
        emoji: '🦩',
        scientificName: 'Phoenicopterus roseus',
        habitat: { fr: 'Lacs salés', en: 'Salt lakes', cs: 'Slaná jezera' },
        characteristics: {
          fr: ['Couleur rose', 'Dort sur une patte', 'Filtre sa nourriture'],
          en: ['Pink color', 'Sleeps on one leg', 'Filters its food'],
          cs: ['Růžová barva', 'Spí na jedné noze', 'Filtruje potravu']
        }
      },
      {
        name: { fr: 'Pingouin empereur', en: 'Emperor Penguin', cs: 'Tučňák císařský' },
        emoji: '🐧',
        scientificName: 'Aptenodytes forsteri',
        habitat: { fr: 'Antarctique', en: 'Antarctica', cs: 'Antarktida' },
        characteristics: {
          fr: ['Ne vole pas', 'Excellent nageur', 'Vit en groupe'],
          en: ['Cannot fly', 'Excellent swimmer', 'Lives in groups'],
          cs: ['Nelétá', 'Výborný plavec', 'Žije ve skupinách']
        }
      }
    ]
  },

  // === REPTILES ===
  {
    id: 'reptiles',
    name: {
      fr: 'Reptiles',
      en: 'Reptiles',
      cs: 'Plazi'
    },
    description: {
      fr: 'Animaux à sang froid avec des écailles',
      en: 'Cold-blooded animals with scales',
      cs: 'Studenokrevní zvířata s šupinami'
    },
    emoji: '🦎',
    items: [
      {
        name: { fr: 'Crocodile du Nil', en: 'Nile Crocodile', cs: 'Krokodýl nilský' },
        emoji: '🐊',
        scientificName: 'Crocodylus niloticus',
        habitat: { fr: 'Rivières et marais d\'Afrique', en: 'African rivers and swamps', cs: 'Africké řeky a bažiny' },
        characteristics: {
          fr: ['Très ancien prédateur', 'Mâchoire puissante', 'Peut rester immobile longtemps'],
          en: ['Very ancient predator', 'Powerful jaw', 'Can stay motionless for long'],
          cs: ['Velmi starý predátor', 'Silná čelist', 'Může zůstat nehybný dlouho']
        }
      },
      {
        name: { fr: 'Tortue verte', en: 'Green Sea Turtle', cs: 'Želva zelená' },
        emoji: '🐢',
        scientificName: 'Chelonia mydas',
        habitat: { fr: 'Océans tropicaux', en: 'Tropical oceans', cs: 'Tropické oceány' },
        characteristics: {
          fr: ['Vit très longtemps', 'Migre sur de longues distances', 'Herbivore marine'],
          en: ['Lives very long', 'Migrates long distances', 'Marine herbivore'],
          cs: ['Žije velmi dlouho', 'Migruje na velké vzdálenosti', 'Mořský býložravec']
        }
      },
      {
        name: { fr: 'Gecko léopard', en: 'Leopard Gecko', cs: 'Gekon leopardí' },
        emoji: '🦎',
        scientificName: 'Eublepharis macularius',
        habitat: { fr: 'Déserts d\'Asie', en: 'Asian deserts', cs: 'Asijské pouště' },
        characteristics: {
          fr: ['Actif la nuit', 'Change de peau', 'Très bon grimpeur'],
          en: ['Active at night', 'Sheds skin', 'Very good climber'],
          cs: ['Aktivní v noci', 'Svléká kůži', 'Velmi dobrý lezec']
        }
      },
      {
        name: { fr: 'Python royal', en: 'Ball Python', cs: 'Krajta královská' },
        emoji: '🐍',
        scientificName: 'Python regius',
        habitat: { fr: 'Forêts d\'Afrique de l\'Ouest', en: 'West African forests', cs: 'Západoafrické lesy' },
        characteristics: {
          fr: ['Non venimeux', 'Se roule en boule', 'Avale sa proie entière'],
          en: ['Non-venomous', 'Rolls into a ball', 'Swallows prey whole'],
          cs: ['Nejedovatý', 'Stočí se do koule', 'Spolkne kořist celou']
        }
      }
    ]
  },

  // === POISSONS ===
  {
    id: 'fish',
    name: {
      fr: 'Poissons',
      en: 'Fish',
      cs: 'Ryby'
    },
    description: {
      fr: 'Animaux aquatiques qui respirent par des branchies',
      en: 'Aquatic animals that breathe through gills',
      cs: 'Vodní zvířata dýchající žábrami'
    },
    emoji: '🐟',
    items: [
      {
        name: { fr: 'Poisson-clown', en: 'Clownfish', cs: 'Klaun očkatý' },
        emoji: '🐠',
        scientificName: 'Amphiprion ocellaris',
        habitat: { fr: 'Récifs coralliens tropicaux', en: 'Tropical coral reefs', cs: 'Tropické korálové útesy' },
        characteristics: {
          fr: ['Vit avec les anémones', 'Orange et blanc', 'Protège ses œufs'],
          en: ['Lives with anemones', 'Orange and white', 'Protects its eggs'],
          cs: ['Žije s sasankami', 'Oranžovo-bílý', 'Chrání svá vajíčka']
        }
      },
      {
        name: { fr: 'Requin blanc', en: 'Great White Shark', cs: 'Žralok bílý' },
        emoji: '🦈',
        scientificName: 'Carcharodon carcharias',
        habitat: { fr: 'Océans tempérés', en: 'Temperate oceans', cs: 'Mírné oceány' },
        characteristics: {
          fr: ['Grand prédateur', 'Excellent nageur', 'Dents très pointues'],
          en: ['Great predator', 'Excellent swimmer', 'Very sharp teeth'],
          cs: ['Velký predátor', 'Výborný plavec', 'Velmi ostré zuby']
        }
      },
      {
        name: { fr: 'Hippocampe', en: 'Seahorse', cs: 'Mořský koník' },
        emoji: '🦄', // Approximation
        scientificName: 'Hippocampus',
        habitat: { fr: 'Herbiers marins', en: 'Seagrass beds', cs: 'Mořské louky' },
        characteristics: {
          fr: ['Forme unique', 'Le mâle porte les œufs', 'Nage verticalement'],
          en: ['Unique shape', 'Male carries eggs', 'Swims vertically'],
          cs: ['Jedinečný tvar', 'Samec nosí vajíčka', 'Plave vertikálně']
        }
      },
      {
        name: { fr: 'Saumon atlantique', en: 'Atlantic Salmon', cs: 'Losos atlantský' },
        emoji: '🐟',
        scientificName: 'Salmo salar',
        habitat: { fr: 'Océan Atlantique et rivières', en: 'Atlantic Ocean and rivers', cs: 'Atlantský oceán a řeky' },
        characteristics: {
          fr: ['Remonte les rivières', 'Excellent sauteur', 'Chair rose'],
          en: ['Swims up rivers', 'Excellent jumper', 'Pink flesh'],
          cs: ['Plave proti proudu', 'Výborný skokan', 'Růžové maso']
        }
      }
    ]
  },

  // === INSECTES ===
  {
    id: 'insects',
    name: {
      fr: 'Insectes',
      en: 'Insects',
      cs: 'Hmyz'
    },
    description: {
      fr: 'Petits animaux avec 6 pattes et souvent des ailes',
      en: 'Small animals with 6 legs and often wings',
      cs: 'Malá zvířata se 6 nohami a často křídly'
    },
    emoji: '🦗',
    items: [
      {
        name: { fr: 'Abeille domestique', en: 'Honey Bee', cs: 'Včela medonosná' },
        emoji: '🐝',
        scientificName: 'Apis mellifera',
        habitat: { fr: 'Ruches et fleurs', en: 'Hives and flowers', cs: 'Úly a květiny' },
        characteristics: {
          fr: ['Produit du miel', 'Pollinise les fleurs', 'Vit en colonie'],
          en: ['Produces honey', 'Pollinates flowers', 'Lives in colony'],
          cs: ['Produkuje med', 'Opyluje květiny', 'Žije v kolonii']
        },
        funFacts: {
          fr: ['Une ruche peut contenir 50 000 abeilles', 'Danse pour communiquer'],
          en: ['A hive can contain 50,000 bees', 'Dances to communicate'],
          cs: ['Úl může obsahovat 50 000 včel', 'Tančí pro komunikaci']
        }
      },
      {
        name: { fr: 'Papillon monarque', en: 'Monarch Butterfly', cs: 'Monarcha stěhovavý' },
        emoji: '🦋',
        scientificName: 'Danaus plexippus',
        habitat: { fr: 'Jardins et prairies', en: 'Gardens and meadows', cs: 'Zahrady a louky' },
        characteristics: {
          fr: ['Orange et noir', 'Migre sur 3000 km', 'Chenille mange l\'asclépiade'],
          en: ['Orange and black', 'Migrates 3000 km', 'Caterpillar eats milkweed'],
          cs: ['Oranžovo-černý', 'Migruje 3000 km', 'Housenka jí pryšec']
        }
      },
      {
        name: { fr: 'Coccinelle à 7 points', en: 'Seven-spot Ladybird', cs: 'Slunéčko sedmitečné' },
        emoji: '🐞',
        scientificName: 'Coccinella septempunctata',
        habitat: { fr: 'Jardins et champs', en: 'Gardens and fields', cs: 'Zahrady a pole' },
        characteristics: {
          fr: ['Rouge avec 7 points noirs', 'Mange les pucerons', 'Porte-bonheur'],
          en: ['Red with 7 black spots', 'Eats aphids', 'Lucky charm'],
          cs: ['Červená se 7 černými tečkami', 'Jí mšice', 'Přináší štěstí']
        }
      },
      {
        name: { fr: 'Libellule', en: 'Dragonfly', cs: 'Vážka' },
        emoji: '🦋', // Approximation
        scientificName: 'Libellula',
        habitat: { fr: 'Près des points d\'eau', en: 'Near water bodies', cs: 'Poblíž vodních ploch' },
        characteristics: {
          fr: ['4 ailes transparentes', 'Excellente vue', 'Chasse en vol'],
          en: ['4 transparent wings', 'Excellent vision', 'Hunts in flight'],
          cs: ['4 průhledná křídla', 'Výborný zrak', 'Loví za letu']
        }
      }
    ]
  },

  // === FRUITS ===
  {
    id: 'fruits',
    name: {
      fr: 'Fruits',
      en: 'Fruits',
      cs: 'Ovoce'
    },
    description: {
      fr: 'Parties comestibles des plantes contenant des graines',
      en: 'Edible parts of plants containing seeds',
      cs: 'Jedlé části rostlin obsahující semena'
    },
    emoji: '🍎',
    items: [
      {
        name: { fr: 'Pomme rouge', en: 'Red Apple', cs: 'Červené jablko' },
        emoji: '🍎',
        scientificName: 'Malus domestica',
        habitat: { fr: 'Vergers tempérés', en: 'Temperate orchards', cs: 'Mírné sady' },
        characteristics: {
          fr: ['Riche en vitamines', 'Croquante', 'Se conserve bien'],
          en: ['Rich in vitamins', 'Crunchy', 'Keeps well'],
          cs: ['Bohaté na vitamíny', 'Křupavé', 'Dobře se uchovává']
        }
      },
      {
        name: { fr: 'Banane', en: 'Banana', cs: 'Banán' },
        emoji: '🍌',
        scientificName: 'Musa acuminata',
        habitat: { fr: 'Régions tropicales', en: 'Tropical regions', cs: 'Tropické oblasti' },
        characteristics: {
          fr: ['Riche en potassium', 'Jaune quand mûre', 'Énergie rapide'],
          en: ['Rich in potassium', 'Yellow when ripe', 'Quick energy'],
          cs: ['Bohatý na draslík', 'Žlutý, když zralý', 'Rychlá energie']
        }
      },
      {
        name: { fr: 'Orange', en: 'Orange', cs: 'Pomeranč' },
        emoji: '🍊',
        scientificName: 'Citrus sinensis',
        habitat: { fr: 'Régions méditerranéennes', en: 'Mediterranean regions', cs: 'Středomořské oblasti' },
        characteristics: {
          fr: ['Riche en vitamine C', 'Juteux', 'Écorce parfumée'],
          en: ['Rich in vitamin C', 'Juicy', 'Fragrant peel'],
          cs: ['Bohatý na vitamín C', 'Šťavnatý', 'Vonná kůra']
        }
      },
      {
        name: { fr: 'Fraise', en: 'Strawberry', cs: 'Jahoda' },
        emoji: '🍓',
        scientificName: 'Fragaria × ananassa',
        habitat: { fr: 'Jardins et champs', en: 'Gardens and fields', cs: 'Zahrady a pole' },
        characteristics: {
          fr: ['Rouge avec des graines', 'Parfum délicat', 'Riche en antioxydants'],
          en: ['Red with seeds', 'Delicate fragrance', 'Rich in antioxidants'],
          cs: ['Červená se semínky', 'Jemná vůně', 'Bohatá na antioxidanty']
        }
      },
      {
        name: { fr: 'Ananas', en: 'Pineapple', cs: 'Ananas' },
        emoji: '🍍',
        scientificName: 'Ananas comosus',
        habitat: { fr: 'Régions tropicales', en: 'Tropical regions', cs: 'Tropické oblasti' },
        characteristics: {
          fr: ['Couronne de feuilles', 'Chair jaune sucrée', 'Enzyme digestive'],
          en: ['Crown of leaves', 'Sweet yellow flesh', 'Digestive enzyme'],
          cs: ['Koruna listů', 'Sladká žlutá dužina', 'Trávicí enzym']
        }
      },
      {
        name: { fr: 'Raisin', en: 'Grapes', cs: 'Hrozny' },
        emoji: '🍇',
        scientificName: 'Vitis vinifera',
        habitat: { fr: 'Vignobles', en: 'Vineyards', cs: 'Vinice' },
        characteristics: {
          fr: ['Grappes de fruits', 'Violet ou vert', 'Fait du vin ou du jus'],
          en: ['Clusters of fruit', 'Purple or green', 'Makes wine or juice'],
          cs: ['Hrozny ovoce', 'Fialové nebo zelené', 'Dělá víno nebo džus']
        }
      }
    ]
  },

  // === LÉGUMES ===
  {
    id: 'vegetables',
    name: {
      fr: 'Légumes',
      en: 'Vegetables',
      cs: 'Zelenina'
    },
    description: {
      fr: 'Parties comestibles des plantes (racines, tiges, feuilles)',
      en: 'Edible parts of plants (roots, stems, leaves)',
      cs: 'Jedlé části rostlin (kořeny, stonky, listy)'
    },
    emoji: '🥕',
    items: [
      {
        name: { fr: 'Carotte', en: 'Carrot', cs: 'Mrkev' },
        emoji: '🥕',
        scientificName: 'Daucus carota',
        habitat: { fr: 'Jardins potagers', en: 'Vegetable gardens', cs: 'Zeleninové zahrady' },
        characteristics: {
          fr: ['Racine orange', 'Riche en bêta-carotène', 'Bonne pour les yeux'],
          en: ['Orange root', 'Rich in beta-carotene', 'Good for eyes'],
          cs: ['Oranžový kořen', 'Bohatá na beta-karoten', 'Dobrá pro oči']
        }
      },
      {
        name: { fr: 'Brocoli', en: 'Broccoli', cs: 'Brokolice' },
        emoji: '🥦',
        scientificName: 'Brassica oleracea',
        habitat: { fr: 'Champs cultivés', en: 'Cultivated fields', cs: 'Obdělávaná pole' },
        characteristics: {
          fr: ['Forme d\'arbre miniature', 'Vert foncé', 'Très nutritif'],
          en: ['Miniature tree shape', 'Dark green', 'Very nutritious'],
          cs: ['Tvar miniaturního stromu', 'Tmavě zelená', 'Velmi výživná']
        }
      },
      {
        name: { fr: 'Tomate', en: 'Tomato', cs: 'Rajče' },
        emoji: '🍅',
        scientificName: 'Solanum lycopersicum',
        habitat: { fr: 'Serres et jardins', en: 'Greenhouses and gardens', cs: 'Skleníky a zahrady' },
        characteristics: {
          fr: ['Rouge et ronde', 'Juteux', 'Techniquement un fruit'],
          en: ['Red and round', 'Juicy', 'Technically a fruit'],
          cs: ['Červené a kulaté', 'Šťavnaté', 'Technicky ovoce']
        }
      },
      {
        name: { fr: 'Laitue', en: 'Lettuce', cs: 'Salát' },
        emoji: '🥬',
        scientificName: 'Lactuca sativa',
        habitat: { fr: 'Jardins potagers', en: 'Vegetable gardens', cs: 'Zeleninové zahrady' },
        characteristics: {
          fr: ['Feuilles vertes', 'Croquant', 'Beaucoup d\'eau'],
          en: ['Green leaves', 'Crunchy', 'Lots of water'],
          cs: ['Zelené listy', 'Křupavý', 'Hodně vody']
        }
      }
    ]
  },

  // === PLANTES ===
  {
    id: 'plants',
    name: {
      fr: 'Plantes',
      en: 'Plants',
      cs: 'Rostliny'
    },
    description: {
      fr: 'Êtres vivants qui produisent leur nourriture grâce au soleil',
      en: 'Living beings that produce their food from sunlight',
      cs: 'Živé bytosti, které si vyrábějí potravu ze slunečního světla'
    },
    emoji: '🌱',
    items: [
      {
        name: { fr: 'Tournesol', en: 'Sunflower', cs: 'Slunečnice' },
        emoji: '🌻',
        scientificName: 'Helianthus annuus',
        habitat: { fr: 'Champs ensoleillés', en: 'Sunny fields', cs: 'Slunečná pole' },
        characteristics: {
          fr: ['Suit le soleil', 'Très grande', 'Graines comestibles'],
          en: ['Follows the sun', 'Very tall', 'Edible seeds'],
          cs: ['Sleduje slunce', 'Velmi vysoká', 'Jedlá semena']
        }
      },
      {
        name: { fr: 'Rose', en: 'Rose', cs: 'Růže' },
        emoji: '🌹',
        scientificName: 'Rosa',
        habitat: { fr: 'Jardins et roseraies', en: 'Gardens and rose gardens', cs: 'Zahrady a růžové zahrady' },
        characteristics: {
          fr: ['Parfum délicieux', 'Épines protectrices', 'Symbole d\'amour'],
          en: ['Delicious fragrance', 'Protective thorns', 'Symbol of love'],
          cs: ['Nádherná vůně', 'Ochranné trny', 'Symbol lásky']
        }
      },
      {
        name: { fr: 'Chêne', en: 'Oak Tree', cs: 'Dub' },
        emoji: '🌳',
        scientificName: 'Quercus',
        habitat: { fr: 'Forêts tempérées', en: 'Temperate forests', cs: 'Mírné lesy' },
        characteristics: {
          fr: ['Très grand et solide', 'Produit des glands', 'Vit très longtemps'],
          en: ['Very tall and strong', 'Produces acorns', 'Lives very long'],
          cs: ['Velmi vysoký a silný', 'Produkuje žaludy', 'Žije velmi dlouho']
        }
      },
      {
        name: { fr: 'Cactus', en: 'Cactus', cs: 'Kaktus' },
        emoji: '🌵',
        scientificName: 'Cactaceae',
        habitat: { fr: 'Déserts', en: 'Deserts', cs: 'Pouště' },
        characteristics: {
          fr: ['Épines au lieu de feuilles', 'Stocke l\'eau', 'Survit sans pluie'],
          en: ['Spines instead of leaves', 'Stores water', 'Survives without rain'],
          cs: ['Trny místo listů', 'Ukládá vodu', 'Přežije bez deště']
        }
      }
    ]
  }
];

// ACTIVITÉS SCIENTIFIQUES BASÉES SUR LA CLASSIFICATION
export const scientificEducationalContent: EducationalContent[] = [
  // 3-5 ANS - Classification simple
  {
    id: 'science-animal-categories-1',
    title: {
      fr: 'Familles d\'Animaux',
      en: 'Animal Families',
      cs: 'Rodiny Zvířat'
    },
    description: {
      fr: 'Apprends à classer les animaux par familles',
      en: 'Learn to classify animals by families',
      cs: 'Nauč se třídit zvířata podle rodin'
    },
    ageGroup: '3-5',
    subject: 'science',
    difficulty: 'easy',
    type: 'exercise',
    estimatedTime: 10,
    instructions: {
      fr: 'Trouve où vit chaque animal !',
      en: 'Find where each animal lives!',
      cs: 'Najdi, kde každé zvíře žije!'
    },
    objectives: [{
      fr: 'Comprendre les habitats des animaux',
      en: 'Understand animal habitats',
      cs: 'Pochopit prostředí zvířat'
    }],
    content: {
      exercises: [{
        question: {
          fr: 'Où vit le poisson 🐟 ?',
          en: 'Where does the fish 🐟 live?',
          cs: 'Kde žije ryba 🐟?'
        },
        options: [
          { fr: '🌊 Dans l\'eau', en: '🌊 In water', cs: '🌊 Ve vodě' },
          { fr: '🌳 Dans les arbres', en: '🌳 In trees', cs: '🌳 Ve stromech' },
          { fr: '🏠 Dans les maisons', en: '🏠 In houses', cs: '🏠 V domech' },
          { fr: '☁️ Dans le ciel', en: '☁️ In the sky', cs: '☁️ Na obloze' }
        ],
        answer: 0,
        explanation: {
          fr: 'Parfait ! Les poissons vivent dans l\'eau ! 🐟🌊',
          en: 'Perfect! Fish live in water! 🐟🌊',
          cs: 'Perfektní! Ryby žijí ve vodě! 🐟🌊'
        }
      }]
    }
  },

  // 6-8 ANS - Classification intermédiaire
  {
    id: 'science-classification-mammals-26',
    title: {
      fr: 'Les Mammifères',
      en: 'Mammals',
      cs: 'Savci'
    },
    description: {
      fr: 'Découvre les caractéristiques des mammifères',
      en: 'Discover mammal characteristics',
      cs: 'Objevuj charakteristiky savců'
    },
    ageGroup: '6-8',
    subject: 'science',
    difficulty: 'medium',
    type: 'exercise',
    estimatedTime: 15,
    instructions: {
      fr: 'Identifie les mammifères et leurs caractéristiques !',
      en: 'Identify mammals and their characteristics!',
      cs: 'Identifikuj savce a jejich charakteristiky!'
    },
    objectives: [{
      fr: 'Reconnaître les mammifères',
      en: 'Recognize mammals',
      cs: 'Rozpoznat savce'
    }],
    content: {
      exercises: [{
        question: {
          fr: 'Quelle est la principale caractéristique des mammifères ?',
          en: 'What is the main characteristic of mammals?',
          cs: 'Jaká je hlavní charakteristika savců?'
        },
        options: [
          { fr: '🍼 Ils allaitent leurs petits', en: '🍼 They nurse their young', cs: '🍼 Kojí svá mláďata' },
          { fr: '🥚 Ils pondent des œufs', en: '🥚 They lay eggs', cs: '🥚 Kladou vejce' },
          { fr: '🦎 Ils ont des écailles', en: '🦎 They have scales', cs: '🦎 Mají šupiny' },
          { fr: '🐦 Ils ont des plumes', en: '🐦 They have feathers', cs: '🐦 Mají peří' }
        ],
        answer: 0,
        explanation: {
          fr: 'Excellent ! Les mammifères allaitent leurs petits avec du lait ! 🍼',
          en: 'Excellent! Mammals nurse their young with milk! 🍼',
          cs: 'Výborně! Savci kojí svá mláďata mlékem! 🍼'
        }
      }]
    }
  },

  // 9-12 ANS - Classification avancée
  {
    id: 'science-taxonomy-advanced-46',
    title: {
      fr: 'Classification Scientifique',
      en: 'Scientific Classification',
      cs: 'Vědecká Klasifikace'
    },
    description: {
      fr: 'Comprends la taxonomie moderne',
      en: 'Understand modern taxonomy',
      cs: 'Pochop moderní taxonomii'
    },
    ageGroup: '9-12',
    subject: 'science',
    difficulty: 'hard',
    type: 'exercise',
    estimatedTime: 20,
    instructions: {
      fr: 'Classe les êtres vivants selon la taxonomie !',
      en: 'Classify living beings according to taxonomy!',
      cs: 'Třiď živé bytosti podle taxonomie!'
    },
    objectives: [{
      fr: 'Maîtriser la classification scientifique',
      en: 'Master scientific classification',
      cs: 'Zvládnout vědeckou klasifikaci'
    }],
    content: {
      exercises: [{
        question: {
          fr: 'Dans quelle classe se trouve Homo sapiens ?',
          en: 'In which class is Homo sapiens?',
          cs: 'Ve které třídě je Homo sapiens?'
        },
        options: [
          { fr: '🐾 Mammalia (Mammifères)', en: '🐾 Mammalia (Mammals)', cs: '🐾 Mammalia (Savci)' },
          { fr: '🐦 Aves (Oiseaux)', en: '🐦 Aves (Birds)', cs: '🐦 Aves (Ptáci)' },
          { fr: '🦎 Reptilia (Reptiles)', en: '🦎 Reptilia (Reptiles)', cs: '🦎 Reptilia (Plazi)' },
          { fr: '🐟 Actinopterygii (Poissons)', en: '🐟 Actinopterygii (Fish)', cs: '🐟 Actinopterygii (Ryby)' }
        ],
        answer: 0,
        explanation: {
          fr: 'Parfait ! Les humains appartiennent à la classe des Mammifères ! 🐾👨‍👩‍👧‍👦',
          en: 'Perfect! Humans belong to the Mammal class! 🐾👨‍👩‍👧‍👦',
          cs: 'Perfektní! Lidé patří do třídy savců! 🐾👨‍👩‍👧‍👦'
        }
      }]
    }
  }
];

// FONCTION POUR OBTENIR DES ACTIVITÉS PAR CATÉGORIE
export const getScientificActivitiesByCategory = (
  categoryId: string,
  ageGroup: '3-5' | '6-8' | '9-12'
): EducationalContent[] => {
  const category = scientificCategories.find(cat => cat.id === categoryId);
  if (!category) return [];
  
  // Génère des activités basées sur les éléments de la catégorie
  return category.items.map((item, index) => ({
    id: `science-${categoryId}-${ageGroup}-${index + 1}`,
    title: {
      fr: `Découvre ${item.name.fr}`,
      en: `Discover ${item.name.en}`,
      cs: `Objevuj ${item.name.cs}`
    },
    description: {
      fr: `Apprends tout sur ${item.name.fr}`,
      en: `Learn all about ${item.name.en}`,
      cs: `Nauč se vše o ${item.name.cs}`
    },
    ageGroup,
    subject: 'science' as const,
    difficulty: ageGroup === '3-5' ? 'easy' as const : ageGroup === '6-8' ? 'medium' as const : 'hard' as const,
    type: 'exercise',
    estimatedTime: ageGroup === '3-5' ? 8 : ageGroup === '6-8' ? 12 : 18,
    instructions: {
      fr: `Réponds aux questions sur ${item.name.fr} !`,
      en: `Answer questions about ${item.name.en}!`,
      cs: `Odpověz na otázky o ${item.name.cs}!`
    },
    objectives: [{
      fr: `Connaître ${item.name.fr}`,
      en: `Know ${item.name.en}`,
      cs: `Znát ${item.name.cs}`
    }],
    content: {
      exercises: [{
        question: {
          fr: `Où vit ${item.name.fr} ?`,
          en: `Where does ${item.name.en} live?`,
          cs: `Kde žije ${item.name.cs}?`
        },
        visual: item.emoji,
        options: [
          { 
            fr: `${item.habitat?.fr || 'Habitat naturel'} ✅`, 
            en: `${item.habitat?.en || 'Natural habitat'} ✅`, 
            cs: `${item.habitat?.cs || 'Přirozené prostředí'} ✅` 
          },
          { fr: 'Autre endroit 1', en: 'Other place 1', cs: 'Jiné místo 1' },
          { fr: 'Autre endroit 2', en: 'Other place 2', cs: 'Jiné místo 2' },
          { fr: 'Autre endroit 3', en: 'Other place 3', cs: 'Jiné místo 3' }
        ],
        answer: 0,
        explanation: {
          fr: `Parfait ! ${item.name.fr} vit dans ${item.habitat?.fr || 'son habitat naturel'} ! ${item.emoji}`,
          en: `Perfect! ${item.name.en} lives in ${item.habitat?.en || 'its natural habitat'}! ${item.emoji}`,
          cs: `Perfektní! ${item.name.cs} žije v ${item.habitat?.cs || 'svém přirozeném prostředí'}! ${item.emoji}`
        }
      }]
    }
  }));
};

// EXPORT COMPLET DU CONTENU SCIENTIFIQUE
export const comprehensiveScientificContent = [
  ...scientificEducationalContent,
  ...scientificCategories.flatMap(category => 
    (['3-5', '6-8', '9-12'] as const).flatMap(ageGroup => 
      getScientificActivitiesByCategory(category.id, ageGroup)
    )
  )
];