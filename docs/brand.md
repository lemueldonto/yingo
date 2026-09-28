# Yingo — Identité visuelle (référence pour le code)

Version texte de la planche « Identité visuelle Yingo » (proposition 2).
La planche HTML reste la référence visuelle ; ce fichier est celui que l'agent lit.

## Promesse

- Nom : **yingo** (logo en minuscules). Les cornes de Cabri forment le Y.
- Accroche : « Rembourse tes dettes. Une semaine à la fois. »
- Sous-titre store : « Un plan, une semaine à la fois »

## Palette

| Nom | Hex | Usage |
| --- | --- | --- |
| Myrtille | `#4B3BFF` | Marque, boutons |
| Soleil | `#FFC23D` | Victoires, cornes de Cabri |
| Lagon | `#1FC7B6` | Progression, gains |
| Goyave | `#FF8A7A` | Célébrations, joues de Cabri |
| Encre | `#1C1B3A` | Textes, contours |
| Nuage | `#F5F6FF` | Fond |

Règle : les dettes ne sont **jamais en rouge**. Le rouge est réservé aux alertes
réelles (échéance du lendemain, mode survie) et ne fait pas partie de la palette de marque.

| Nom | Hex | Usage |
| --- | --- | --- |
| Alerte | `#D02A1E` | Alertes réelles uniquement, jamais une dette (contraste 4,8:1 sur Nuage) |

## Contrastes (WCAG AA)

- Texte courant : au moins 4,5:1 avec son fond. Les paires autorisées sont listées
  dans `apps/mobile/src/theme/tokens.ts` et vérifiées par un test.
- **Soleil, Lagon et Goyave ne servent jamais de couleur de texte sur fond clair**
  (environ 1,5:1 et 2:1 sur Nuage). Ils s'utilisent en aplat, avec un texte Encre
  par-dessus.
- Texte secondaire : Encre atténuée `#5A5980` (6,1:1 sur Nuage).
- Texte sur Myrtille ou sur Alerte : blanc.

## Typographie

- Titres : **Fredoka**
- Texte : **Nunito**

## Style

- **Joyeux et arrondi** : formes rondes, couleurs vives, contours épais.
- **Chaque pas se fête** : victoires, séries et camps sont célébrés.
- **Un guide pour tous** : mascotte animale et neutre (sans âge, sans genre, sans origine).

## Cabri, le guide

Chèvre des montagnes : agile, têtue, jamais découragée.

| États (MVP) | Quand |
| --- | --- |
| repos | Par défaut |
| parle | Le lundi, pour présenter la semaine (« trois actions et un clin d'œil ») |
| célèbre | Saute de joie à chaque dette soldée et à chaque nouveau camp |
| calme | Semaine difficile : rassurant, jamais déçu |

Ton de voix :
- Dit : « On repart lundi ! », « Une dette de moins, bravo ! »
- Ne dit jamais : « Tu m'as déçu. », « Tu dépenses trop. »

On croise Cabri le lundi, à chaque dette soldée et nouveau camp, dans les notifications et sur la carte.

## Écrans de la planche (brouillons)

**Ces écrans sont des brouillons, pas le design final.** L'écran Montagne en
particulier sera entièrement repensé. Ils servent à illustrer le ton et le type
d'information, pas la mise en page. Voir docs/decisions.md (D-005).

**Montagne** : carte avec les étapes (Frais bancaires, Paiement en 4 fois, Découvert,
Prêt de ta sœur…) et les camps (Refuge, Col · 60 %, Sommet · libre) ; en-tête
« 38 % du chemin », « Libre le 14 nov. 2027 », série de semaines, nombre de badges ;
carte « Étape en cours » avec la dette cible, sa progression en % et le bouton Continuer.

**Semaine** : « Semaine du 5 octobre », « Ta semaine 1 / 3 », message de Cabri,
liste d'actions avec gain (+16 €, 9 € d'intérêts évités, +8 €/mois), durée et support
(courrier prêt, script d'appel), bouton « C'est parti », encart « Ton droit à l'écart :
21 € cette semaine, sans risque ».

**Dette vaincue** : « Étape franchie · Dette vaincue ! », nom de la dette, nouveau badge,
« Libre 3 semaines plus tôt », progression « 34 % → 38 % », boutons « Continuer
l'ascension » et « Partager ma victoire (sans montant) ».

Barre d'onglets : Montagne · Semaine · Dettes · Moi.

## Récompenses

Au MVP : badges et célébrations uniquement. Les récompenses concrètes (bons,
cartes cadeaux, offres partenaires) arrivent en V2, toujours connues à l'avance,
sans hasard et gagnées sur des jalons vérifiables (voir docs/decisions.md, D-005).
