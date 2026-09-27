# Yingo — Descriptif du projet

Sep 26, 2026 · @Lemuel

## 1. Pitch et vision

**Une application mobile qui transforme le remboursement de dettes en expédition : un coach pas-à-pas, un plan d'action automatique et réaliste, et une cordée de personnes qui avancent ensemble, sans jugement.**

**Le problème : la paralysie par l'anxiété.** Quand les dettes s'accumulent (découvert, crédits conso, paiements en 4 fois, factures en retard), la plupart des gens ne manquent pas d'informations mais de clarté et d'élan. Ils ne savent pas quoi payer en premier, n'osent pas appeler leurs créanciers, et vivent leur situation seuls et dans la honte. Les apps de budget existantes montrent les chiffres ; aucune ne dit quoi faire cette semaine ni ne rompt l'isolement.

**La solution** : un coach financier qui

- cartographie toutes les dettes et calcule la date exacte de « libération financière » ;
- construit un plan de remboursement (boule de neige ou avalanche) ;
- propose chaque semaine des actions concrètes, avec scripts et modèles pour que l'utilisateur négocie lui-même avec ses créanciers ;
- calcule le « droit à l'écart » pour rembourser sans s'étouffer ;
- rend l'effort motivant grâce à un univers d'expédition et un collectif anonyme.

**L'histoire du fondateur.** « J'avais 15 000 € de dettes. Ce qui m'a aidé à tenir, c'est de comprendre que je n'étais pas seul : d'autres avaient bien plus de dettes que moi et continuaient d'avancer. » Cette conviction est au cœur du produit : on mesure l'effort et la progression, jamais la taille de la montagne.

**Le nom : Yingo.** Deux syllabes (yin-go), facile à dire et à retenir, inspiré de l'éwé « yi ŋgɔ », « avance ». Il porte l'idée centrale du produit : avancer pas à pas, quelle que soit la taille de sa dette. Il rappelle discrètement les racines togolaises du fondateur ; l'app, conçue pour la France, n'affiche en revanche aucun mot éwé dans son interface. Le guide est Cabri, une chèvre des montagnes dont les cornes dessinent le Y de Yingo. Le sens et la graphie restent à valider auprès d'un locuteur natif, et la disponibilité du nom à vérifier (voir section 16).

## 2. Cible et marché

**Cible principale** : salariés gagnant entre 1 800 et 3 200 € net par mois, de 22 à 45 ans, avec plusieurs dettes simultanées et un passage régulier dans le rouge. Ils ont un revenu stable mais pas de marge, ne sont pas (encore) surendettés et ne se reconnaissent pas dans les dispositifs sociaux.

**Un besoin massif et en hausse**

- 24 % des Français se disent à découvert tous les mois ou presque en 2025, et 42 % des 25-34 ans ([CSA pour LesFurets](https://csa.eu/news/le-decouvert-des-francais-edition-2025/)).
- 148 013 dossiers de surendettement déposés en 2025, en hausse de 9,8 % ([Banque de France](https://www.banque-france.fr/fr/communiques-de-presse/surendettement-une-hausse-des-depots-qui-confirme-la-fragilite-des-menages-les-plus-modestes-dans-un)), dont une forte progression chez les moins de 30 ans.
- 221 Md€ d'encours de crédit à la consommation fin 2025 ([Statistiques.com d'après Banque de France](https://www.statistiques.com/argent/endettement-et-credits)).
- Le paiement fractionné devient du crédit à la consommation le 20 novembre 2026 ([EXE Conseil](https://exe-conseil.fr/blog/ccd2-reforme-credit-consommation-2026)) : un sujet d'actualité idéal pour le lancement.

**Taille du marché (hypothèses à valider)** : 2,5 à 4,5 millions de salariés en tension de trésorerie avec plusieurs dettes. Objectif à 3 ans : environ 150 000 utilisateurs actifs. Le détail du calcul figure dans l'[étude de marché](https://claude.ai/code/artifact/d6a011b2-30e8-4234-b302-7a99d2e83280).

### Personas

Trois profils couvrent l'essentiel de la cible. Ils servent à trancher les choix de conception : chaque écran doit être compréhensible par Inès, utile à Karim en moins de 5 minutes, et sûr pour Sandrine.

**Inès, 27 ans — « je ne sais même plus combien je dois »**

- Employée en CDI dans le commerce, 1 750 € net, locataire d'un studio, célibataire.
- Dettes : découvert autorisé utilisé chaque mois à partir du 15, trois paiements en 4 fois en cours (téléphone, vêtements, billet d'avion), un crédit renouvelable de 1 800 €, 400 € prêtés par sa sœur.
- Ce qui la bloque : elle évite d'ouvrir son app bancaire, elle a honte de parler d'argent, et les apps de budget lui paraissent « faites pour les gens qui ont déjà de l'argent ».
- Ce qu'elle attend : voir tout au même endroit en quelques minutes, une app qui ressemble à celles qu'elle utilise tous les jours, et des petites victoires rapides.
- Ce que l'app doit lui éviter : une saisie longue, du jargon financier, tout ton moralisateur.

**Karim, 38 ans — « dites-moi juste par quoi commencer »**

- Technicien de maintenance, 2 300 € net, en couple, deux enfants, locataire.
- Dettes : crédit auto en LOA, prêt personnel pour des travaux, une facture d'énergie en retard, un reliquat d'impôt à payer.
- Ce qui le bloque : peu de temps, et la peur d'appeler ses créanciers (« je ne sais pas quoi leur dire »).
- Ce qu'il attend : une liste d'actions courtes et concrètes, des mots exacts à prononcer au téléphone, la certitude de payer d'abord ce qui est urgent.
- Ce que l'app doit lui éviter : les graphiques et les tableaux à analyser lui-même.

**Sandrine, 44 ans — « je tiens, mais pour combien de temps ? »**

- Aide-soignante, 1 900 € net avec les primes de nuit, mère seule d'un adolescent.
- Dettes : découvert non autorisé certains mois, crédit conso, deux mois de loyer en retard, frais de cantine impayés.
- Ce qui la bloque : elle est à la limite ; chaque imprévu la fait replonger.
- Ce qu'elle attend : savoir quoi payer en priorité pour éviter l'expulsion et les rejets de prélèvement.
- Ce que l'app doit faire pour elle : passer en mode survie, lui proposer les demandes d'étalement, et l'orienter sans jugement vers un Point Conseil Budget si le plan dépasse ce qu'un outil peut faire.

**Ce que les trois ont en commun** : un revenu régulier, plusieurs dettes de natures différentes, de la honte et de l'isolement, et le besoin d'un chemin clair plutôt que d'informations supplémentaires.

## 3. Concurrence et différenciation

Les acteurs existants montrent les chiffres ou aident à épargner ; aucun ne guide le remboursement des dettes semaine après semaine, en France, avec un collectif.

| Acteur | Ce qu'il fait | Prix | Ce qui manque |
| --- | --- | --- | --- |
| [Bankin'](https://www.moneyvox.fr/votre-argent/gestion-de-budget.php) | Agrégation bancaire, prévision de fin de mois, alertes | Gratuit ; premium \~3 à 10 €/mois | Pas de plan de remboursement ni d'actions guidées |
| [Linxo](https://www.planandmultiply.fr/blog/meilleures-appli-gestion-budget) | Agrégation, prévision de trésorerie | Gratuit limité ; premium \~4 à 10 €/mois | Idem |
| [Plum](https://www.connectbanque.com/fr/avis/plum) | Épargne automatique et investissement, règles ludiques | Gratuit ; 3,99 à 9,99 €/mois | Pensé pour épargner et investir, pas pour sortir des dettes |
| [Cleo](https://www.fincomparelab.com/guides/cleo-pricing/) (US/UK) | Coach IA humoristique, plan de dettes, avances | Gratuit ; 5,99 à 14,99 $/mois | Absent de France ; sanctionné par la FTC pour pratiques trompeuses |
| Crésus, Points Conseil Budget | Accompagnement humain gratuit | Gratuit | Capacité limitée, image « aide sociale », pas de suivi continu |

**Nos différences**

1. **Un plan d'action, pas un tableau de bord** : chaque semaine, quoi payer, qui appeler, quoi dire.
2. **Toutes les dettes d'un Français** : crédits, découvert, paiement fractionné, impôts, loyer, énergie, dettes envers des proches.
3. **Le collectif** : la cordée anonyme casse l'isolement, principal frein psychologique.
4. **Sans jugement** : progression mesurée en pourcentage et en actions, jamais en montant.
5. **Rembourser sans s'étouffer** : droit à l'écart intégré au plan.

## 4. Univers et gamification : l'expédition

Sortir de ses dettes, c'est gravir une montagne : on avance étape par étape, avec un guide, encordé à d'autres. L'univers est pensé pour la 3D, avec des personnages.

**Les éléments de l'univers**

| Élément | Rôle dans l'app | Rendu 3D |
| --- | --- | --- |
| La montagne | Le parcours complet ; chaque utilisateur a la sienne | Paysage stylisé, vue carte qui se déroule en montant |
| Les camps (niveaux) | « En observation » → « En contrôle » → « Hors de danger » → « Financièrement libre » | Camp de base, refuges, sommet ; décor qui change à chaque palier |
| Les étapes | Chaque dette est un passage (col, pont, paroi) | Obstacle franchi avec animation quand la dette est soldée |
| L'avatar | Le personnage de l'utilisateur | Grimpeur personnalisable (tenue, équipement débloqué par les quêtes) |
| Le guide | Le coach : plan de la semaine, encouragements | Cabri, une chèvre des montagnes ronde et expressive, jamais moralisatrice ; ses cornes dessinent le Y de Yingo |
| La cordée | \~20 utilisateurs anonymes ayant commencé la même semaine | Silhouettes de grimpeurs reliés par une corde sur la même paroi |

**Les boucles de motivation**

- **Chaque semaine** : le guide propose 1 à 3 actions ; chaque action cochée fait avancer l'avatar.
- **Chaque mois** : bilan, quêtes mensuelles, éventuel passage de camp.
- **À chaque dette soldée** : célébration 3D, badge, notification anonyme à la cordée (V2).
- **En continu** : compteur d'intérêts économisés et date de libération mise à jour.

**Quêtes (exemples)** : résilier un abonnement inutile ; vendre un objet et réinjecter 30 € dans une dette ; passer un week-end sans dépense hors alimentation ; envoyer son premier courrier de demande d'étalement.

**Règles non négociables**

1. La progression se mesure en pourcentage et en actions, jamais en euros : 15 000 € ou 400 000 €, tout le monde est au même niveau à 30 %.
2. Aucun classement par montant ; la cordée coopère, elle ne se compare pas.
3. Anonymat total : pseudo, aucun montant visible.
4. Pas de messagerie libre au lancement : réactions prédéfinies uniquement.
5. Le guide ne culpabilise jamais ; une semaine ratée se transforme en « on repart lundi ».
6. Aucune mécanique de hasard, aucun achat dans le jeu.

**Choix techniques pour la 3D**

- **Décision : la carte de la montagne est en vraie 3D** (choix validé après comparaison d'un prototype 3D et d'un prototype 2,5D).
- **Style stylisé (low-poly ou cartoon)** plutôt que réaliste : plus chaleureux, plus léger sur mobile, moins coûteux à produire.
- **Moteur** : l'app est en React Native avec Expo ; la carte utilise React Three Fiber (@react-three/fiber/native, basé sur Three.js et expo-gl), rendu natif OpenGL ES. Unity est écarté (trop lourd pour un développeur seul).
- **Personnages et célébrations** : au MVP, Cabri est animé en code (react-native-svg et Reanimated) à partir de ses formes vectorielles, avec quatre états (repos, parle, célèbre, calme), et superposé en 2D au décor 3D. Rive (rive-react-native) prendra le relais quand les revenus paieront la licence ; le composant garde la même interface, donc le reste de l'app ne change pas.
- **3D aux moments forts** (carte, passages de camp, dettes vaincues, cordée), interface 2D classique pour les écrans de gestion.
- **Performance** : modèles glTF compressés, peu de lumières et d'ombres, test sur un téléphone Android d'entrée de gamme dès la première semaine.
- **Budget** : aucune dépense. Le décor est construit en code avec des formes simples dans React Three Fiber, complété si besoin par des modèles gratuits sous licence CC0 (Kenney, Quaternius) ou par du low-poly fait dans Blender. Enrichissement en V2.

### Les camps en détail

Les camps mélangent la progression du remboursement et la santé financière, pour récompenser aussi ceux qui stabilisent leur situation sans encore rembourser beaucoup.

| Camp | Condition d'entrée | Ce qui change dans l'app | Message du guide |
| --- | --- | --- | --- |
| Camp de base · En observation | Plan généré | Carte au pied de la montagne, premières quêtes d'installation | « On a la carte. Maintenant, on marche. » |
| Refuge · En contrôle | Toutes les échéances payées un mois complet, et au moins 10 % de la dette remboursée | Nouveau décor, quêtes mensuelles débloquées | « Plus aucun retard ce mois-ci. Tu reprends la main. » |
| Col · Hors de danger | Plus aucune dette coûteuse (découvert, renouvelable) et au moins 60 % remboursé | Vue dégagée sur le sommet, compteur d'intérêts mis en avant | « Le plus dur est derrière toi. » |
| Sommet · Financièrement libre | 100 % des dettes remboursées | Célébration finale, bilan complet du parcours, proposition d'objectif d'épargne (V2) | « Tu l'as fait. » |

Un camp atteint ne se perd jamais, même si une nouvelle dette apparaît : l'avatar recule sur le sentier mais garde ses camps et ses badges.

### Quêtes

Les quêtes sont optionnelles et toujours réalisables sans dépenser d'argent.

| Quête | Fréquence | Condition de réussite |
| --- | --- | --- |
| Faire l'inventaire complet de ses dettes | Installation | Toutes les dettes saisies, y compris envers des proches |
| Terminer l'audit express | Installation | Abonnements, frais bancaires et forfaits passés en revue |
| Envoyer son premier courrier | Installation | Un modèle utilisé et marqué comme envoyé |
| Passer son premier appel | Installation | Un script utilisé et le résultat déclaré |
| Résilier un abonnement inutile | Hebdomadaire | Résiliation déclarée |
| Une semaine sans nouveau paiement fractionné | Hebdomadaire | Aucun paiement fractionné ajouté pendant 7 jours |
| Un week-end sans dépense hors alimentation | Hebdomadaire | Confirmation par l'utilisateur le lundi |
| Vendre un objet et réinjecter l'argent | Mensuelle | Paiement supplémentaire déclaré sur une dette |
| Tenir toutes ses échéances du mois | Mensuelle | Aucun retard déclaré sur le mois |
| Renégocier un contrat (mobile, box, assurance) | Mensuelle | Baisse de prix déclarée |
| Rester dans son droit à l'écart | Mensuelle | Budget plaisir non dépassé d'après les déclarations |
| Un mois sans découvert | Mensuelle | Solde déclaré positif toute la période (automatique en V2) |

### Badges

| Badge | Obtenu quand |
| --- | --- |
| Premier pas | Plan généré |
| Carte en main | Inventaire complet des dettes |
| Première victoire | Première dette soldée |
| Voix assurée | Premier appel à un créancier |
| Plume ferme | Premier courrier envoyé |
| Chasseur d'abonnements | Trois abonnements résiliés |
| Régularité | Quatre semaines de plan tenues d'affilée |
| Libre du découvert | Découvert soldé et un mois complet dans le vert |
| Chaque camp | Arrivée au Refuge, au Col et au Sommet |

Les badges ne portent jamais sur un montant, pour rester équitables entre une dette de 5 000 € et une dette de 50 000 €.

## 5. Spécifications fonctionnelles du MVP

Quatre blocs, du constat à la motivation. Principe transversal : l'app analyse, prépare et propose ; l'utilisateur décide et agit.

### Bloc 1 — Onboarding et cartographie (visualiser sans stress)

- **Connexion bancaire sécurisée (DSP2)** via un agrégateur agréé, en V2. Au lancement, **saisie manuelle guidée** pour tous les utilisateurs, avec un « audit express » des abonnements et des frais bancaires (voir section 7).
- **Inventaire centralisé des dettes** : crédits conso, découvert, paiement fractionné, dettes envers des proches, arriérés d'impôts, de loyer ou de factures.
- **Métriques clés calculées automatiquement** : dette totale, intérêts et frais payés par mois, reste à vivre réel après charges fixes et mensualités.

### Bloc 2 — Moteur de stratégie (le plan de bataille)

- **Choix de la stratégie** : boule de neige (petites dettes d'abord, victoires rapides) ou avalanche (taux le plus élevé d'abord, économie maximale), avec l'écart chiffré entre les deux.
- **Règle de sécurité** : logement, énergie, impôts et minimums des crédits sont toujours payés en priorité pour éviter coupures et fichage.
- **Date de libération financière** calculée en temps réel.
- **Sac de secours (micro-épargne)** : pas au lancement, reporté en V2.
- **Recalcul dynamique** du plan en cas de rentrée imprévue (prime, vente) ou de dépense d'urgence.

### Bloc 3 — Coaching et actions tactiques (passer à l'action)

- **Plan de la semaine** : 1 à 3 actions proposées par le guide, choisies par un moteur de règles (pas d'IA au MVP, voir section 7).
- **Modèles de mails et courriers** pré-remplis pour demander un report ou un étalement, envoyés par l'utilisateur depuis sa propre messagerie.
- **Scripts d'appel** rédigés mot à mot pour négocier soi-même avec un créancier ou sa banque.
- **Droit à l'écart** : budget plaisir autorisé ce mois-ci sans faire dérailler le plan.
- **Alertes prédictives anti-découvert** (V2, nécessite la connexion bancaire) : « Risque de découvert dans 4 jours si le rythme actuel continue ».
- **Alerte de bascule** : si la situation devient ingérable, orientation gratuite vers un Point Conseil Budget ou la Banque de France.

### Bloc 4 — Gamification et rétention (rendre l'effort motivant)

- Carte de la montagne en 3D et **niveaux de santé financière** (les camps).
- **Quêtes** hebdomadaires et mensuelles.
- **Victoires visibles** : barres de progression, badges, célébration 3D à chaque dette soldée.
- **Compteur d'intérêts économisés** en direct.
- **« Tu n'es pas seul »** dès le lancement : chiffres nationaux (par exemple, un quart des Français sont à découvert chaque mois) et témoignages. La cordée anonyme et les compteurs collectifs arrivent en V2, quand la base d'utilisateurs est suffisante.

## 6. Expérience utilisateur

**L'app s'organise autour de quatre onglets : Montagne, Semaine, Dettes et Moi.** L'onglet Montagne est l'écran d'accueil : on y voit sa progression avant tout chiffre.

### Navigation principale

| Onglet | Rôle | Ce qu'on y trouve |
| --- | --- | --- |
| Montagne | Motivation | Carte 3D, camp actuel, date de libération, pourcentage remboursé, dernière victoire |
| Semaine | Action | Les 1 à 3 actions de la semaine, les quêtes, le droit à l'écart |
| Dettes | Contrôle | Liste des dettes dans l'ordre du plan, détail de chacune, ajout et déclaration de paiement |
| Moi | Réglages | Revenus et charges, stratégie, notifications, abonnement, sécurité, données personnelles |

### Liste des écrans du MVP

| Écran | Contenu | Action principale |
| --- | --- | --- |
| Accueil | Promesse, illustration de la montagne, « tu n'es pas seul » | Commencer |
| Questionnaire | Situation familiale, logement, objectif, niveau de stress (4 questions) | Continuer |
| Revenus | Salaire net, date de paie, aides régulières | Continuer |
| Charges fixes | Catégories pré-listées avec montants à saisir, vie courante estimée | Continuer |
| Ajout de dette | Choix du type, puis formulaire adapté au type, aide « où trouver cette info ? » | Ajouter / ajouter une autre |
| Stratégie | Boule de neige et avalanche côte à côte, écart en euros et en mois | Choisir |
| Date de libération | Date, dette totale, reste à vivre, animation d'arrivée au camp de base | Découvrir mon plan |
| Essai gratuit | Ce qui est inclus, prix, date du premier prélèvement, comment résilier | Démarrer l'essai |
| Création de compte | Apple, Google ou e-mail | Créer mon compte |
| Montagne | Carte 3D, camp, progression, guide | Voir ma semaine |
| Semaine | Actions avec gain estimé, quêtes, budget plaisir | Ouvrir une action |
| Détail d'action | Pourquoi cette action, étapes, modèle ou script associé | C'est fait / plus tard / pas possible |
| Modèle de courrier | Texte pré-rempli modifiable, destinataire | Copier / ouvrir dans ma messagerie |
| Script d'appel | Checklist de préparation, texte à dire, réponses possibles du créancier | J'ai appelé : noter le résultat |
| Audit express | Abonnements à cocher, frais bancaires, forfaits ; total des économies | Valider l'audit |
| Liste des dettes | Dettes dans l'ordre du plan, barre de progression pour chacune | Ajouter / déclarer un paiement |
| Détail d'une dette | Solde, taux, mensualité, date de fin prévue, historique | Modifier / déclarer un paiement |
| Je peux me le permettre ? | Montant de l'achat, réponse et effet sur la date de libération | Vérifier |
| Célébration | Animation 3D, badge, nouvelle date de libération | Continuer |
| Mode survie | Ordre de paiement conseillé, demandes d'étalement à envoyer | Voir les actions |
| Alerte de bascule | Message bienveillant, coordonnées des Points Conseil Budget, explication de la procédure Banque de France | Trouver de l'aide près de chez moi |
| Réglages | Profil, stratégie, notifications, abonnement, sécurité, export et suppression des données | — |

### Principes d'interface

- **Une décision par écran** pendant l'onboarding, avec une barre de progression.
- **Des montants lisibles** : pas de décimales sauf nécessité, le mot « estimation » dès qu'une valeur est calculée à partir d'un défaut.
- **Un vocabulaire sans jargon** : « ce que tu dois » plutôt que « encours », « ce qui te reste pour vivre » plutôt que « reste à vivre » dans les textes d'interface.
- **Le tutoiement**, cohérent avec le ton du guide.
- **Aucune couleur rouge pour les dettes** : le rouge est réservé aux alertes réelles (échéance du lendemain, mode survie).
- **La 3D reste décorative** : toutes les informations de la carte sont aussi disponibles en texte, pour l'accessibilité et les téléphones modestes.

## 7. Règles métier du moteur de plan

Ces règles sont des propositions à valider ; elles définissent le moteur de plan et le plan de la semaine. Les valeurs par défaut restent modifiables par l'utilisateur.

**Les grandeurs de base (par mois)**

- **R** : revenus nets réguliers (salaire, aides régulières).
- **C** : charges fixes (loyer, énergie, assurances, transports, téléphone, abonnements).
- **V** : vie courante essentielle (alimentation, hygiène, carburant), déclarée par l'utilisateur ou estimée par défaut selon la taille du foyer avec le forfait « alimentation » du barème de surendettement de la Banque de France (652 € pour une personne, plus 261 € par personne supplémentaire), affiché comme un minimum à ajuster.
- **M** : somme des minimums obligatoires (mensualités, échéances de paiement fractionné, échéanciers convenus).
- **Reste à vivre** = R − C − M.
- **Capacité de remboursement (CR)** = Reste à vivre − V.
- Quand CR est positive, elle se répartit en deux : **droit à l'écart (E)** et **accélérateur (A = CR − E)**.

**Traitement de chaque type de dette**

| Type de dette | Modélisation | Minimum mensuel | Priorité |
| --- | --- | --- | --- |
| Arriérés prioritaires (loyer, énergie, impôts, amendes) | Montant dû, échéancier obtenu ou à demander | Échéance convenue, sinon montant proposé par l'app | Toujours en premier, quelle que soit la stratégie (risque d'expulsion, de coupure ou de majoration) |
| Découvert | Montant = découvert moyen du mois ; taux = taux débiteur saisi, sinon taux par défaut affiché comme estimation (taux d'usure trimestriel des crédits de 3 000 € ou moins × 3/4, environ 17,6 % au 3e trimestre 2026) ; frais d'incident ajoutés au coût | Aucun ; objectif : revenir à 0 € | Dette coûteuse : en tête en avalanche ; sortir d'un découvert non autorisé passe avant l'accélération |
| Crédit renouvelable, prêt personnel, crédit auto ou LOA | Capital restant, taux, mensualité | Mensualité | Selon la stratégie choisie |
| Paiement fractionné (3 ou 4 fois) | Taux 0 %, échéancier fixe | Échéance | Toujours payé à l'échéance ; jamais remboursé par anticipation en avalanche ; classé par montant en boule de neige |
| Dette envers un proche | Taux 0 %, sans échéance | 0 € ou montant convenu avec le proche | En dernier par défaut ; l'utilisateur peut la remonter (priorité manuelle) |

**Ordre d'affectation chaque mois**

1. Minimums obligatoires de toutes les dettes, arriérés prioritaires en tête.
2. Droit à l'écart.
3. Accélérateur sur la dette cible de la stratégie. Quand une dette est soldée, son minimum s'ajoute à l'accélérateur.

**Sac de secours** : pas au lancement. Un imprévu (dépense d'urgence, baisse de revenu) est absorbé par le recalcul automatique du plan. Une épargne d'urgence pourra être ajoutée en V2.

**Droit à l'écart** : 15 % de la CR par défaut, réglable entre 10 et 25 %, affiché par semaine. Plancher de 15 € par mois dès que la CR dépasse 50 €, pour ne jamais supprimer tout plaisir.

**Quand le revenu ne couvre pas les minimums (CR négative ou nulle) : mode survie**

- Pas d'accélérateur ni de droit à l'écart ; le plan affiche l'ordre de paiement : logement, énergie, impôts, puis minimums des crédits pour éviter un incident de paiement et le fichage, puis le reste.
- Les actions de la semaine deviennent : demander des étalements (modèles et scripts) et réduire les charges.
- **Alerte de bascule** si la CR reste négative deux mois de suite, ou si la date de libération dépasse 7 ans (durée maximale des mesures de la commission de surendettement) : message clair et orientation gratuite vers un Point Conseil Budget et la procédure de la Banque de France.

**Choix des actions de la semaine : un moteur de règles, pas d'IA au MVP**

- Un catalogue de 30 à 40 actions rédigées à l'avance, chacune avec ses conditions de déclenchement (type de dette présent, situation, étape du parcours) et un gain estimé.
- Chaque lundi, le moteur retient les 3 actions au meilleur score (gain estimé × facilité), sans reproposer une action refusée ou déjà faite, avec au moins une action de moins de 10 minutes.
- Avantages : prévisible, testable, rapide à développer et plus facile à justifier devant l'avocat. L'IA pourra reformuler ou personnaliser les actions en V2.

**Le premier gain pendant l'essai, sans connexion bancaire : l'audit express (J1 à J3)**

- **Abonnements** : liste des abonnements courants (streaming, salle de sport, box, forfait mobile, assurances, applications) ; l'utilisateur coche ce qu'il paie et ce qu'il utilise, l'app chiffre les abonnements inutilisés ou en double.
- **Frais bancaires** : l'utilisateur saisit les frais de son dernier relevé ; l'app propose le modèle de demande de remboursement des frais d'incident et rappelle le plafonnement des frais prévu pour les clients en situation de fragilité financière.
- **Forfaits mobile et box** : comparaison du prix payé avec les offres du marché et script de renégociation.
- Le message de fin d'essai s'appuie sur les économies identifiées, clairement présentées comme une estimation déclarative.

**Compte et onboarding**

- **J1 sans compte** : l'utilisateur saisit ses dettes dans une session anonyme (Supabase gère les connexions anonymes) et découvre sa date de libération.
- **Juste après ce moment clé** : écran d'essai, démarrage de l'essai de 7 jours via l'App Store ou Google Play, puis création du compte (Apple, Google ou e-mail) qui rattache les données déjà saisies.
- La valeur est montrée avant de demander quoi que ce soit, et aucune donnée saisie n'est perdue.

## 8. Catalogue d'actions et contenus

**Le catalogue est le cœur de la valeur perçue : 30 à 40 actions rédigées à l'avance, chacune reliée à des conditions de déclenchement et à un modèle ou un script.** Voici les 16 premières, qui couvrent les situations les plus fréquentes.

| Action | Se déclenche si | Gain estimé | Durée | Support |
| --- | --- | --- | --- | --- |
| Faire l'audit des abonnements | Toujours, pendant l'essai | Montant des abonnements inutilisés | 10 min | Liste à cocher |
| Demander le remboursement des frais d'incident | Frais bancaires saisis > 0 € | Frais du dernier mois | 10 min | Courrier |
| Demander un échéancier pour une facture d'énergie | Arriéré d'énergie | Évite pénalités et coupure | 15 min | Courrier + script |
| Demander un délai de paiement des impôts | Arriéré d'impôt | Évite la majoration | 15 min | Guide pas à pas + courrier |
| Proposer un plan d'apurement au bailleur | Arriéré de loyer | Évite une procédure | 20 min | Courrier |
| Décaler une échéance pour solder une dette plus chère | Deux dettes dont l'une beaucoup plus coûteuse | Intérêts évités | 15 min | Script d'appel |
| Demander un report d'échéance de crédit | Mode survie ou dépense imprévue | Évite un incident de paiement | 15 min | Script d'appel |
| Renégocier son forfait mobile | Forfait saisi au-dessus du prix de marché | Différence mensuelle | 20 min | Script d'appel |
| Renégocier sa box internet | Box saisie au-dessus du prix de marché | Différence mensuelle | 20 min | Script d'appel |
| Comparer son assurance auto ou habitation | Assurance saisie dans les charges | Estimation prudente | 30 min | Guide |
| Ne pas utiliser le paiement fractionné cette semaine | Au moins un paiement fractionné en cours | Évite une nouvelle mensualité | — | Quête |
| Rembourser en priorité la dette cible | Accélérateur > 0 € | Intérêts évités | 5 min | Rappel du montant |
| Fixer un montant convenu avec un proche | Dette envers un proche sans échéance | Relation apaisée | 10 min | Message type |
| Mettre à jour ses soldes | Dernier point de plus de 30 jours | Plan fiable | 5 min | Formulaire |
| Vendre un objet inutilisé | Quête mensuelle active | Montant de la vente | Variable | Guide |
| Prendre rendez-vous dans un Point Conseil Budget | Alerte de bascule | Accompagnement gratuit | 5 min | Lien et coordonnées |

**Règles de rédaction** : phrases courtes, aucune promesse de résultat, rappel systématique que l'utilisateur envoie ou appelle lui-même, et relecture de l'ensemble par l'avocat avant le lancement.

### Exemple de courrier : demande d'échéancier pour une facture d'énergie

> Objet : demande d'échéancier — contrat n° \[numéro de contrat\]
>
> Madame, Monsieur,
>
> Je suis titulaire du contrat n° \[numéro de contrat\] pour le logement situé \[adresse\]. Je reste redevable de la somme de \[montant\] € au titre de la facture du \[date\].
>
> Je souhaite régler cette somme intégralement, mais ma situation ne me permet pas de le faire en une seule fois. Je vous propose un échéancier de \[nombre\] mensualités de \[montant\] €, à partir du \[date\], en plus de mes factures courantes.
>
> Je vous remercie de bien vouloir me confirmer votre accord par écrit.
>
> Je vous prie d'agréer, Madame, Monsieur, mes salutations distinguées.
>
> &#91;Prénom Nom\]

Les champs entre crochets sont pré-remplis à partir de la fiche de la dette ; le montant de la mensualité proposée est calculé par le moteur de plan pour rester dans la capacité de remboursement.

### Exemple de script d'appel : demander un report d'échéance à un organisme de crédit

**Avant l'appel** : numéro de contrat, montant de la mensualité, date du prochain prélèvement, date à laquelle tu pourras payer, de quoi noter.

**Ce que tu dis**

1. « Bonjour, je suis \[prénom nom\], client pour le contrat n° \[numéro\]. J'appelle au sujet de ma prochaine échéance du \[date\]. »
2. « J'ai une dépense imprévue ce mois-ci. Je tiens à continuer à rembourser normalement, mais j'ai besoin de décaler cette échéance au \[date\]. »
3. « Est-ce possible, et y a-t-il des frais ? »

**Si on te répond oui** : demande une confirmation par écrit ou par e-mail, et note le nom de ton interlocuteur et la nouvelle date.

**Si on te répond non** : « Quelles solutions pouvez-vous me proposer ? Un report partiel, ou un étalement sur deux mois ? »

**Si on te propose un nouveau crédit pour rembourser** : « Merci, je ne souhaite pas contracter de nouveau crédit. »

**Après l'appel** : note le résultat dans l'app ; le plan se recalcule avec la nouvelle date.

## 9. Modèle de données

**Onze tables PostgreSQL suffisent au MVP.** Tous les montants sont stockés en centimes (entiers), toutes les dates en UTC, et chaque table porte un `user_id` protégé par la sécurité par lignes : un utilisateur ne lit et n'écrit que ses propres lignes.

| Table | Rôle | Champs principaux |
| --- | --- | --- |
| profiles | Profil de l'utilisateur | user\_id, prénom, situation familiale, taille du foyer, stratégie choisie, pourcentage de droit à l'écart, camp actuel, created\_at |
| incomes | Revenus réguliers | id, user\_id, libellé, montant\_cents, jour de versement, type (salaire, aide, autre) |
| fixed\_charges | Charges fixes | id, user\_id, catégorie, libellé, montant\_cents, périodicité |
| debts | Dettes | id, user\_id, type, créancier, solde\_cents, taux\_annuel, mensualité\_cents, jour de prélèvement, date de fin, priorité manuelle, est\_estimé, statut (active, soldée), created\_at |
| debt\_events | Historique d'une dette | id, debt\_id, user\_id, type (paiement, accord, ajustement), montant\_cents, date, note |
| plan\_snapshots | Plans calculés | id, user\_id, date de calcul, stratégie, date de libération, capacité\_cents, calendrier (JSON), version du moteur |
| actions\_catalog | Catalogue d'actions | id, code, titre, conditions (JSON), gain\_estimé\_règle, durée, modèle associé, actif |
| user\_actions | Actions proposées et réalisées | id, user\_id, action\_id, semaine, statut (proposée, faite, reportée, impossible), résultat déclaré, gain\_déclaré\_cents |
| audit\_items | Résultats de l'audit express | id, user\_id, catégorie (abonnement, frais, forfait), libellé, montant\_cents, utilisé (oui ou non), économie\_cents |
| achievements | Badges, quêtes et camps obtenus | id, user\_id, type, code, obtenu\_le |
| subscriptions | Statut d'abonnement (miroir RevenueCat) | user\_id, statut, plateforme, fin de l'essai, fin de période, mis à jour par le webhook |

**Choix de conception**

- Le calendrier du plan est stocké en JSON dans `plan_snapshots` : il est recalculé à chaque changement et n'est jamais modifié ligne par ligne.
- La colonne `version du moteur` permet de savoir quelle version des règles a produit un plan, utile pour corriger un bug de calcul.
- Les textes des modèles et scripts vivent dans le code de l'app au MVP (versionnés avec elle) ; ils passeront en base si l'équipe veut les modifier sans nouvelle version de l'app.
- `subscriptions` n'est écrite que par le webhook RevenueCat, jamais par l'app, pour qu'un utilisateur ne puisse pas s'attribuer un abonnement.
- La suppression d'un compte supprime en cascade toutes les tables liées.

## 10. Cadre légal et réglementaire

L'application est conçue pour fonctionner sans agrément propre, comme un outil logiciel d'aide à la décision, sous réserve de validation par un avocat en droit bancaire et de la consommation.

| Sujet | Règle | Notre approche |
| --- | --- | --- |
| Intermédiaire en règlement de dettes | L'[article L.322-1 du Code de la consommation](https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006069565/LEGISCTA000032222463/) interdit à un intermédiaire rémunéré d'établir un plan de remboursement pour un débiteur ou de négocier des délais pour son compte. | L'utilisateur agit toujours lui-même ; l'app ne contacte aucun créancier et ne reçoit aucun mandat ; prix fixe pour l'accès à l'outil, jamais au résultat. **Point prioritaire à valider par l'avocat.** |
| Agrégation bancaire (DSP2) | Accès aux comptes réservé aux prestataires agréés ou à leurs agents. | Statut d'agent d'un agrégateur agréé (Bridge, Powens), sans agrément propre. |
| Réforme du crédit conso | Paiement fractionné et mini-crédits deviennent du crédit à la consommation le 20 novembre 2026. | Aucun crédit proposé ; opportunité de communication. |
| Conseil financier | Recommander des crédits, rachats ou placements relève de statuts réglementés. | Aucune recommandation de produit nommé. |
| Abonnements en ligne | Résiliation en ligne simple obligatoire, droit de rétractation de 14 jours. | L'abonnement est géré par Apple et Google : sur iOS, la résiliation se fait dans les réglages Apple, et l'app y renvoie en un tap (lien direct de gestion d'abonnement), avec un rappel avant la fin de l'essai. Articulation avec l'obligation française de résiliation en ligne à valider par l'avocat. |
| Données personnelles (RGPD) | Données financières sensibles. | Hébergement dans l'UE, analyse d'impact, aucune revente, suppression en un clic. |

**Ce que l'app ne fait jamais** : contacter un créancier au nom de l'utilisateur, gérer son argent, facturer au résultat, proposer un crédit, aider contre paiement à monter un dossier de surendettement, vendre des données.

## 11. Modèle économique

**SaaS B2C par abonnement mensuel, avec un essai gratuit de 7 jours donnant accès à 100 % des fonctionnalités.** L'objectif de l'essai : que l'utilisateur vive son premier gain financier avant d'être prélevé.

**Prix** : 9,99 €/mois pour l'instant (option annuelle moins chère à définir), au niveau des offres les plus complètes des agrégateurs français et de Plum. À confirmer par un test de prix sur la page d'attente.

**L'argument qui lève le frein du prix** : si un découvert coûte 30 € de frais par mois, l'abonnement à 9,99 € n'est pas une dépense mais un gain net d'environ 20 €. Le compteur d'argent économisé est affiché au moment du paiement. À ce niveau de prix, l'essai doit absolument faire vivre un gain concret supérieur à 10 €.

**Parcours de conversion sur 7 jours**

| Jour | Moment | Ce que vit l'utilisateur |
| --- | --- | --- |
| J1 | L'état des lieux | Connexion ou saisie des dettes, découverte de sa date de libération (« Tu seras à 0 € de dette le 14 novembre 2027 »), plan généré, arrivée au camp de base |
| J3 | Le premier gain | Fin de l'audit express : abonnements inutilisés repérés, demande de remboursement de frais bancaires ou mail d'étalement envoyé. Objectif : plus de 10 € d'économies identifiées par mois |
| J5 | Rappel | Notification claire : « Ton essai se termine dans 2 jours », avec un lien direct vers la gestion de l'abonnement (App Store ou Google Play) |
| J7 | Fin de l'essai | « En 7 jours, tu as clarifié tes dettes et repéré 30 € d'économies par mois. Pour 9,99 €/mois, continue ton ascension. » |

**Deux structures possibles**

| Modèle | Principe | Atout | Vigilance |
| --- | --- | --- | --- |
| Essai 7 jours avec carte bancaire | Carte saisie à l'inscription, débit au 8e jour sauf résiliation | Filtre les curieux, meilleure conversion | Cible souvent à découvert : rappel J-2 et lien direct de résiliation indispensables |
| Abonnement direct + garantie 30 jours | Paiement dès le 1er jour, remboursement possible pendant 30 jours | Trésorerie immédiate | Formuler la garantie en « satisfait ou remboursé » simple ; une garantie conditionnée aux économies réalisées est à valider par l'avocat |

**Recommandation** : essai 7 jours avec carte bancaire, rappel à J5 et lien direct de résiliation.

**Vision B2B2C (dans un second temps)** : proposer la même app, financée par des employeurs, mutuelles ou bailleurs sociaux (\~3 à 5 €/salarié/mois), sans accès de l'organisme aux données individuelles. Les résultats obtenus en B2C (dettes soldées, rétention) serviront d'argument commercial.

## 12. Projections financières et budget

**Un abonnement à 9,99 € rapporte environ 7,08 € nets par mois**, une fois retirées la TVA et la commission des stores. C'est ce chiffre qui compte pour tous les calculs.

| Étape | Montant mensuel |
| --- | --- |
| Prix payé par l'utilisateur (TTC) | 9,99 € |
| Hors TVA à 20 % | 8,33 € |
| Après commission des stores de 15 % (taux réduit pour petits éditeurs, à vérifier) | ≈ 7,08 € |

### Budget de lancement (hors rémunération des fondateurs)

Tarifs indicatifs à vérifier au moment de la souscription.

| Poste | Coût estimé | Fréquence |
| --- | --- | --- |
| Compte Apple Developer | \~99 $ | Par an |
| Compte Google Play Console | \~25 $ | Une fois |
| Supabase (offre payante, région Europe) | \~25 $ | Par mois |
| Expo EAS (builds dans le cloud) | Gratuit au début, puis offre payante selon le volume | Par mois |
| RevenueCat | Gratuit jusqu'à un certain chiffre d'affaires, puis un pourcentage | Par mois |
| Sentry et PostHog | Offres gratuites suffisantes au lancement | Par mois |
| Consultation d'avocat (L.322-1, CGU, abonnement) | \~1 000 à 2 500 € | Une fois |
| Licence Rive (offre Cadet), seulement une fois les revenus là ; au MVP, Cabri est animé en code | 0 € au MVP, puis \~108 $ | Par an |
| Téléphones de test (un Android d'entrée de gamme, un iPhone) | \~150 € pour l'Android si besoin | Une fois |
| Nom de domaine et hébergement de la page de l'app | \~50 € | Par an |
| **Total de départ** | **\~1 300 à 2 900 €**, puis moins de 100 € par mois |  |

### Entonnoir de conversion

Avec les cibles du PRD (activation 50 %, démarrage d'essai 30 %, conversion 40 %), **environ 6 % des installations deviennent des abonnés payants**. Il faut donc environ 17 installations pour un abonné, hors désabonnements.

### Scénarios de revenus nets

Les revenus annuels sont calculés à partir du nombre d'abonnés actifs à la date indiquée, à 7,08 € nets par mois.

| Scénario | Abonnés à 12 mois | Revenu annuel net à ce rythme | Abonnés à 36 mois | Revenu annuel net à ce rythme |
| --- | --- | --- | --- | --- |
| Prudent | 500 | \~42 000 € | 3 000 | \~255 000 € |
| Central | 2 000 | \~170 000 € | 12 000 | \~1 020 000 € |
| Ambitieux | 5 000 | \~425 000 € | 25 000 | \~2 120 000 € |

Le scénario central à 36 mois correspond à l'hypothèse de l'étude de marché (12 000 abonnés) ; l'étude affichait 1,44 M€ car elle comptait le prix TTC avant commission.

### Seuils à retenir

- **Couvrir les frais techniques** (\~100 € par mois) : moins de 20 abonnés.
- **Verser deux rémunérations** de l'ordre de 4 500 € par mois chacune, charges comprises : environ 1 270 abonnés.
- **Financer de l'acquisition payante** : seulement si un abonné reste en moyenne assez longtemps pour rembourser son coût d'acquisition, à mesurer après 3 mois de données de rétention.

Ces chiffres sont des ordres de grandeur pour décider, pas des prévisions : les premières semaines après le lancement permettront de remplacer chaque hypothèse par une mesure.

## 13. Stratégie de lancement et d'acquisition

**Les premiers utilisateurs seront cherchés après la publication, avec des canaux gratuits d'abord : l'histoire du fondateur, les réseaux sociaux et les fiches des stores.** L'acquisition payante n'arrive qu'une fois la rétention mesurée.

### Positionnement et message

- **Accroche principale** : « Rembourse tes dettes sans t'étouffer. Un plan, une semaine à la fois. »
- **Preuve émotionnelle** : l'histoire du fondateur (« j'avais 15 000 € de dettes, et ce qui m'a aidé, c'est de comprendre que je n'étais pas seul »).
- **Preuve rationnelle** : « l'app te fait économiser plus qu'elle ne coûte », illustrée par l'audit express.
- **Ton** : chaleureux, direct, sans jugement, jamais alarmiste.

### Canaux

| Canal | Ce qu'on y fait | Coût | Priorité |
| --- | --- | --- | --- |
| TikTok et Instagram | Vidéos courtes : le parcours du fondateur, « 3 abonnements à résilier ce soir », « ce que je dis à ma banque pour décaler une échéance », défis hebdomadaires | Temps | Haute |
| Fiches App Store et Google Play (ASO) | Mots-clés « rembourser ses dettes », « découvert », « budget » ; captures montrant la montagne et la date de libération | Temps | Haute |
| Relations presse | Angle d'actualité : la réforme du crédit à la consommation du 20 novembre 2026, qui fait entrer le paiement fractionné dans le crédit conso | Temps | Moyenne |
| Communautés en ligne | Participation sincère aux discussions sur les dettes et le budget (forums, groupes, Reddit), sans spam | Temps | Moyenne |
| Bouche-à-oreille | Carte de victoire partageable sans montant après chaque dette soldée | Développement | Moyenne |
| Créateurs de contenu finances personnelles | Partenariats avec des créateurs qui parlent de budget à un public modeste | Variable | Après 3 mois |
| Publicité payante | Campagnes TikTok, Meta ou Apple Search Ads | Variable | Après mesure de la rétention |

### Calendrier des 90 premiers jours

| Période | Objectif | Actions |
| --- | --- | --- |
| Jours 1 à 30 | 1 000 installations, premiers retours | Publication de l'histoire du fondateur, 3 vidéos par semaine, réponses à tous les avis des stores |
| Jours 31 à 60 | Améliorer l'activation et la conversion | Analyse de l'entonnoir dans PostHog, ajustement de l'onboarding et de l'audit express, test d'un essai de 14 jours si la conversion est faible |
| Jours 61 à 90 | Premiers résultats d'impact | Premiers témoignages de dettes soldées, communication presse, décision sur l'acquisition payante |

### Garde-fous marketing

- Aucune promesse de résultat chiffrée (« rembourse en 6 mois ») ni de réduction de dette.
- Aucun témoignage inventé : uniquement de vrais utilisateurs ayant donné leur accord.
- Vocabulaire « outil » et « coach », jamais « nous négocions pour vous », dans toutes les publicités et sur les stores.

## 14. Architecture technique

**Supabase au lancement pour aller vite, puis Go introduit progressivement, service par service, sans réécriture complète.**

| Besoin | Choix au lancement | Évolution prévue |
| --- | --- | --- |
| App mobile | React Native + Expo (development builds, EAS Build pour iOS depuis Windows) | Inchangé |
| Carte 3D | React Three Fiber (Three.js natif via expo-gl) | Inchangé |
| Guide et célébrations | react-native-svg et Reanimated au MVP, puis Rive (rive-react-native) | Inchangé |
| Base de données | Supabase PostgreSQL, région Europe | PostgreSQL conservé, hébergé ailleurs si besoin |
| Authentification | Supabase Auth (e-mail, Apple, Google) | Conservée : un service Go valide directement ses jetons JWT |
| Logique serveur | Supabase Edge Functions (TypeScript) | Portée en Go, fonction par fonction |
| Tâches planifiées | Cron Supabase | Workers Go |
| Abonnement et essai | RevenueCat + achats intégrés Apple et Google | Inchangé |
| Moteur de plan | Module TypeScript exécuté dans l'app (instantané, hors ligne) | Inchangé côté app |
| Suivi et statistiques | Sentry, PostHog (UE) | Inchangé |

**Règles dès le premier jour pour que la migration vers Go reste simple**

1. **Schéma versionné en SQL** : migrations écrites en SQL dans le dépôt Git (CLI Supabase), réutilisables telles quelles avec un outil Go comme golang-migrate.
2. **Pas de logique métier dans la base** : pas de fonctions PL/pgSQL complexes ; la logique vit dans du code (app ou Edge Functions), plus facile à porter.
3. **Sécurité par lignes (RLS) activée sur chaque table** : c'est du PostgreSQL standard, elle reste valable après migration.
4. **Des Edge Functions petites et à responsabilité unique** (webhook RevenueCat, plan du lundi, compteurs) : chacune se remplace par un endpoint Go sans toucher au reste.
5. **L'app parle à une couche d'accès aux données unique** : quand un appel passe de Supabase à l'API Go, un seul fichier change côté mobile.

**Chemin d'introduction de Go**

| Étape | Quand | Ce qui passe en Go |
| --- | --- | --- |
| 1 | V2, après le lancement | **Service d'agrégation bancaire** (Bridge ou Powens) : synchronisation, webhooks, catégorisation des transactions, alertes anti-découvert. Nouveau périmètre, donc aucun risque de régression |
| 2 | Quand la cordée arrive | Compteurs collectifs, cordée et notifications en temps réel |
| 3 | Selon les besoins | Webhook RevenueCat et plan du lundi, puis éventuellement l'API principale |

Le service Go se connecte à la même base PostgreSQL et valide les jetons Supabase : l'app et les utilisateurs ne voient aucune différence.

## 15. Organisation du travail

**Un seul développeur, le fondateur, qui porte tout : code, contenus, animation de Cabri, décor 3D et lancement.** Sans relecture croisée, la qualité repose sur les tests automatiques, un périmètre strict et un ordre de coupe décidé à l'avance.

| Bloc | Contenu | Semaines |
| --- | --- | --- |
| Fondations et moteurs | Supabase (schéma, RLS, Edge Functions, cron), moteur de plan et moteur d'actions avec leurs tests | S1 à S3 |
| Expérience de la semaine | Onboarding, plan de la semaine, courriers et scripts, droit à l'écart, audit express, notifications | S4 à S6 |
| Jeu | Carte 3D, camps, quêtes, badges, célébrations, animation de Cabri en code | S7 à S9 |
| Abonnement et conformité | RevenueCat, essai de 7 jours, CGU, RGPD, résiliation en un clic | S10 |
| Lancement | Bêta fermée, corrections, publication | S11 et S12 |

Le moteur est écrit en TypeScript au MVP. La migration vers Go commence en V2, avec l'agrégation bancaire comme premier service.

**Contenus** : le catalogue d'actions, les courriers et les scripts demandent environ une semaine de rédaction, répartie sur S4 à S6. Le fondateur les écrit avec son vécu de la situation, puis l'avocat les relit.

### Façon de travailler

- **Rythme** : un objectif écrit chaque lundi, une démonstration sur téléphone chaque vendredi avec le critère de fin de la semaine. Un rythme tenable sur 12 semaines plutôt que des sprints épuisants.
- **Code** : un seul dépôt (app, migrations SQL, Edge Functions, module du moteur partagé), petits commits, intégration continue gratuite (GitHub Actions) qui lance les tests à chaque push.
- **Qualité** : tests unitaires obligatoires sur le moteur de plan et le moteur d'actions ; TypeScript strict, linter et relecture assistée par IA à la place de la relecture croisée ; le reste est testé à la main sur les deux téléphones de référence.
- **Déploiement** : builds de test via EAS en fin de semaine ; migrations de base appliquées par la CLI Supabase depuis le dépôt.
- **Ordre de coupe en cas de retard** : d'abord l'audit express, puis les quêtes secondaires, puis les badges au-delà des cinq premiers. Si la carte 3D n'est pas fluide sur Android d'entrée de gamme à la fin de S9, elle est remplacée par la carte 2D des maquettes et la 3D passe en V2. Le moteur de plan et le parcours d'abonnement ne sont jamais coupés.

## 16. Feuille de route

Plan pour un développeur seul, avec un MVP publié en 12 semaines. Tout ce qui n'est pas indispensable au premier abonné payant passe en V2.

| Semaines | Développement | En parallèle (hors code) |
| --- | --- | --- |
| S1 | Architecture, modèle de données, onboarding avec saisie manuelle des dettes | Prise de rendez-vous avec l'avocat |
| S2 et S3 | Moteur de stratégie (boule de neige, avalanche, date de libération, recalcul) et moteur d'actions, avec leurs tests | 5 à 10 conversations avec des personnes endettées |
| S4 à S6 | Plan de la semaine, modèles de mails et scripts d'appel, droit à l'écart, audit express, notifications | Rédaction des scripts et modèles ; consultation d'avocat |
| S7 à S9 | Carte 3D, camps, quêtes, badges, célébrations, compteur d'intérêts économisés, animation de Cabri en code (4 états) | Cabri en images fixes en attendant ses animations ; décor 3D en formes simples ou modèles CC0 gratuits ; aucun achat |
| S10 | Essai de 7 jours et abonnement via les stores, CGU, RGPD, résiliation en un clic | Ajustements selon l'avis de l'avocat |
| S11 | Bêta fermée avec 10 à 20 personnes de ton entourage | Fiches des stores et captures d'écran |
| S12 | Corrections, publication | Préparation du lancement |

**Reporté en V2 (après le lancement)** : connexion bancaire DSP2 et alertes anti-découvert (intégration et statut d'agent à prévoir sur plusieurs semaines), cordée anonyme, 3D enrichie, offre B2B2C.

**Pour tenir 12 semaines seul avec la 3D** : construire le décor en code avec des formes simples ou des modèles gratuits sous licence CC0, sans rien acheter ; limiter la 3D à la carte et à 2 ou 3 animations clés ; garder tous les écrans de gestion en 2D ; tester la fluidité sur un Android d'entrée de gamme dès la première semaine de S7, pour décider tôt du repli sur la carte 2D si besoin.

**Prochaines étapes immédiates**

- [ ] Prendre rendez-vous avec un avocat en droit bancaire et de la consommation
- [ ] Valider les règles métier du moteur de plan (section 7)
- [ ] Démarrer le développement de l'onboarding et du moteur de stratégie
- [ ] Valider le nom Yingo : sens et graphie auprès d'un locuteur éwé, marques INPI (classes 9 et 36), noms sur l'App Store et Google Play, domaines et réseaux sociaux

## 17. Glossaire et sources

### Glossaire

| Terme | Définition dans ce projet |
| --- | --- |
| Accélérateur | Part de la capacité de remboursement versée en plus des minimums sur la dette cible |
| Alerte de bascule | Message qui oriente vers un Point Conseil Budget ou la Banque de France quand la situation dépasse ce qu'un outil peut faire |
| Audit express | Parcours de l'essai qui repère les économies possibles sans connexion bancaire |
| Avalanche | Stratégie qui rembourse d'abord la dette la plus coûteuse |
| Boule de neige | Stratégie qui rembourse d'abord la plus petite dette |
| Camp | Niveau de progression sur la carte de la montagne |
| Capacité de remboursement (CR) | Reste à vivre moins la vie courante essentielle |
| Cordée | Groupe anonyme d'utilisateurs ayant commencé la même semaine (V2) |
| Date de libération | Date calculée à laquelle toutes les dettes seront remboursées |
| Droit à l'écart | Budget plaisir autorisé sans faire dérailler le plan |
| DSP2 | Directive européenne qui encadre l'accès aux comptes bancaires par des services tiers |
| Guide | Cabri, la chèvre des montagnes animée qui présente le plan et accompagne l'utilisateur |
| Mode survie | Mode activé quand le revenu ne couvre pas les minimums |
| Paiement fractionné | Achat payé en 3 ou 4 fois, traité comme une dette à 0 % |
| Plan de la semaine | Les 1 à 3 actions proposées chaque lundi |
| Reste à vivre | Revenus moins charges fixes moins minimums des dettes |
| RLS | Sécurité par lignes de PostgreSQL : chaque utilisateur n'accède qu'à ses données |

### Sources

- [Banque de France — communiqué sur le surendettement en 2025](https://www.banque-france.fr/fr/communiques-de-presse/surendettement-une-hausse-des-depots-qui-confirme-la-fragilite-des-menages-les-plus-modestes-dans-un)
- [Banque de France — typologie du surendettement 2025](https://www.banque-france.fr/fr/publications-et-statistiques/publications/typologie-du-surendettement-des-menages-2025)
- [CSA pour LesFurets — le découvert des Français 2025](https://csa.eu/news/le-decouvert-des-francais-edition-2025/)
- [Statistiques.com — endettement et crédits](https://www.statistiques.com/argent/endettement-et-credits)
- [Légifrance — articles L.322-1 et suivants du Code de la consommation](https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006069565/LEGISCTA000032222463/)
- [EXE Conseil — réforme du crédit à la consommation (CCD2)](https://exe-conseil.fr/blog/ccd2-reforme-credit-consommation-2026)
- [MoneyVox — applications de budget](https://www.moneyvox.fr/votre-argent/gestion-de-budget.php)
- [Connectbanque — avis et tarifs Plum](https://www.connectbanque.com/fr/avis/plum)
- [FinCompareLab — tarifs Cleo](https://www.fincomparelab.com/guides/cleo-pricing/)
- [Blog Duolingo — animation des personnages avec Rive](https://blog.duolingo.com/world-character-visemes)
- [React Three Fiber — dépôt officiel](https://github.com/pmndrs/react-three-fiber)
- [Étude de marché complète](https://claude.ai/code/artifact/d6a011b2-30e8-4234-b302-7a99d2e83280) et [PRD du MVP](https://claude.ai/code/artifact/59dfd37c-3cfd-4cf1-bcb3-9877e376ec72)
