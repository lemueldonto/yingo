# PRD — Yingo (MVP)

Sep 27, 2026 · @Lemuel

## 1. Résumé

**Yingo est une app mobile iOS et Android qui aide les salariés endettés à rembourser leurs dettes pas à pas : un plan automatique, 1 à 3 actions concrètes par semaine, et une progression gamifiée sous forme d'expédition en montagne.**

|  |  |
| --- | --- |
| Cible | Salariés de 22 à 45 ans, 1 800 à 3 200 € net par mois, plusieurs dettes, à découvert régulièrement (France) |
| Promesse | Savoir chaque semaine quelle dette attaquer, quoi dire à ses créanciers et ce qu'on peut se permettre, sans s'étouffer |
| Principe | L'app analyse, prépare et propose ; l'utilisateur décide et agit lui-même |
| Modèle | Abonnement à 9,99 €/mois après un essai gratuit de 7 jours (carte bancaire requise) |
| Équipe et délai | 1 développeur (le fondateur), MVP publié en 12 semaines |
| Pile | React Native + Expo, React Three Fiber (carte 3D), Cabri animé en code avec react-native-svg et Reanimated (Rive plus tard), Supabase, RevenueCat |

Documents liés : [descriptif du projet](https://claude.ai/code/artifact/cf18a03b-b991-4f9a-99de-0c285e520af0) et [étude de marché](https://claude.ai/code/artifact/d6a011b2-30e8-4234-b302-7a99d2e83280).

## 2. Problème, cible et personas

**Les personnes endettées ne manquent pas d'informations mais de clarté et d'élan : elles ne savent pas quoi payer en premier, n'osent pas appeler leurs créanciers et vivent leur situation seules.** Les apps de budget montrent les chiffres ; aucune ne dit quoi faire cette semaine.

- 24 % des Français se disent à découvert tous les mois ou presque en 2025, 42 % des 25-34 ans ([CSA pour LesFurets](https://csa.eu/news/le-decouvert-des-francais-edition-2025/)).
- 148 013 dossiers de surendettement déposés en 2025, +9,8 % ([Banque de France](https://www.banque-france.fr/fr/communiques-de-presse/surendettement-une-hausse-des-depots-qui-confirme-la-fragilite-des-menages-les-plus-modestes-dans-un)).

| Persona | Profil | Dettes typiques | Besoin principal |
| --- | --- | --- | --- |
| Inès, 27 ans | Employée en CDI, 1 750 € net, locataire | Découvert chronique, 3 paiements en 4 fois, crédit renouvelable, prêt d'un proche | Voir clair et se sentir progresser |
| Karim, 38 ans | Technicien, 2 300 € net, 2 enfants | Crédit auto, prêt personnel, facture d'énergie en retard, impôts à étaler | Savoir quoi payer en premier et oser négocier |
| Sandrine, 44 ans | Aide-soignante, 1 900 € net, mère seule | Découvert, crédit conso, dette de loyer | Tenir jusqu'à la fin du mois ; être orientée si la situation devient ingérable |

**Hors cible au lancement** : personnes déjà en procédure de surendettement, indépendants aux revenus irréguliers.

## 3. Objectifs et métriques de succès

**Objectif du MVP : prouver que des utilisateurs paient 9,99 € par mois et restent actifs parce que l'app les fait réellement avancer.** Les cibles ci-dessous sont des hypothèses de départ, à ajuster après les premières semaines de données.

| Métrique | Définition | Cible initiale |
| --- | --- | --- |
| Activation | Part des installations qui atteignent l'écran « date de libération » | ≥ 50 % |
| Démarrage d'essai | Part des utilisateurs activés qui démarrent l'essai | ≥ 30 % |
| Premier gain | Part des essais avec au moins 10 €/mois d'économies identifiées avant J7 | ≥ 60 % |
| Conversion de l'essai | Part des essais qui deviennent un abonnement payant | ≥ 40 % |
| Engagement | Part des abonnés qui valident au moins 1 action par semaine | ≥ 60 % |
| Rétention | Part des abonnés encore abonnés après 3 mois | ≥ 55 % |
| Impact | Part des abonnés qui soldent au moins une dette dans les 3 premiers mois | ≥ 40 % |
| Qualité | Sessions sans plantage | ≥ 99,5 % |

**Métrique nord** : nombre de dettes soldées par mois par les utilisateurs. Elle reflète à la fois la valeur pour l'utilisateur et la rétention.

## 4. Périmètre

**Le MVP contient tout ce qu'il faut pour qu'un premier utilisateur paie, et rien de plus.**

| Dans le MVP | Hors périmètre (V2 ou plus tard) |
| --- | --- |
| Onboarding sans compte, saisie manuelle des revenus, charges et dettes | Connexion bancaire DSP2 (Bridge ou Powens) et import automatique |
| Moteur de plan : boule de neige, avalanche, date de libération, recalcul | Alertes prédictives anti-découvert (nécessitent la banque) |
| Audit express (abonnements, frais bancaires, forfaits) | Sac de secours et objectifs d'épargne |
| Plan de la semaine par moteur de règles, catalogue de 30 à 40 actions | Personnalisation des actions par IA |
| Modèles de courriers et scripts d'appel | Journal des échanges avec les créanciers |
| Droit à l'écart et question « je peux me le permettre ? » | Cordée anonyme, compteurs collectifs, mur des victoires |
| Carte 3D de la montagne, camps, quêtes, badges, compteur d'intérêts économisés | 3D enrichie, avatar personnalisable |
| Cabri animé en code (repos, parle, célèbre, calme) et 2 ou 3 célébrations | Mode couple, import de documents par photo |
| Mode survie et alerte de bascule | Offre employeurs et mutuelles (B2B2C) |
| Essai de 7 jours et abonnement via les stores | Tarif solidaire |
| Notifications : plan du lundi, bilan, échéances, fin d'essai |  |
| « Tu n'es pas seul » : chiffres nationaux et témoignages |  |

**Ce que l'app ne fait jamais** : contacter un créancier au nom de l'utilisateur, gérer son argent, facturer au résultat, proposer un crédit, aider contre paiement à monter un dossier de surendettement, vendre des données.

## 5. Parcours utilisateur clés

### Onboarding (J1, objectif : moins de 10 minutes)

1. Écran d'accueil et promesse ; aucune inscription demandée (session anonyme).
2. Questionnaire court : situation, objectif, niveau de stress.
3. Revenus et date de paie, puis charges fixes.
4. Saisie des dettes, guidée type par type.
5. Choix de la stratégie avec l'écart chiffré entre boule de neige et avalanche.
6. **Moment clé** : date de libération (« Tu seras à 0 € de dette le 14 novembre 2027 ») et arrivée au camp de base sur la carte 3D.
7. Écran d'essai : démarrage de l'essai de 7 jours via l'App Store ou Google Play.
8. Création du compte (Apple, Google ou e-mail), qui rattache les données saisies.
9. Premier plan de la semaine, avec l'audit express en première action.

### Essai de 7 jours

| Jour | Ce qui se passe | Objectif |
| --- | --- | --- |
| J1 | Onboarding, date de libération, début de l'audit express | Activation |
| J2-J3 | Fin de l'audit : abonnements inutiles, frais bancaires, forfaits ; premier courrier ou script utilisé | Au moins 10 €/mois d'économies identifiées |
| J5 | Notification « ton essai se termine dans 2 jours » avec lien direct vers la gestion de l'abonnement | Transparence |
| J7 | Récapitulatif : dettes clarifiées, économies identifiées, prochaine étape de l'expédition | Conversion |

### Semaine type d'un abonné

- **Lundi** : notification du guide, 1 à 3 actions de la semaine.
- **En semaine** : l'utilisateur réalise ses actions (courrier, appel, résiliation, paiement), les valide et déclare les résultats ; il consulte son droit à l'écart avant un achat.
- **Vendredi** : bilan de la semaine.
- **À chaque dette soldée** : célébration, passage d'étape sur la carte, recalcul de la date de libération.
- **En fin de mois** : bilan mensuel, quêtes du mois, mise à jour des soldes.

## 6. Exigences fonctionnelles

Toutes les exigences ci-dessous font partie du MVP. **P0** = bloquant pour le lancement, **P1** = souhaité, peut glisser juste après le lancement.

### Onboarding et compte

| ID | Exigence | Priorité |
| --- | --- | --- |
| ONB-01 | L'utilisateur peut parcourir tout l'onboarding sans compte (session anonyme). | P0 |
| ONB-02 | Il saisit ses revenus nets, sa date de paie et ses charges fixes par catégorie. | P0 |
| ONB-03 | Il saisit sa vie courante essentielle, ou accepte une estimation par défaut selon la taille du foyer. | P0 |
| ONB-04 | Il crée un compte (Apple, Google ou e-mail) ; les données de la session anonyme sont rattachées sans perte. | P0 |
| ONB-05 | Il peut supprimer son compte et toutes ses données depuis l'app. | P0 |

### Inventaire des dettes

| ID | Exigence | Priorité |
| --- | --- | --- |
| DET-01 | Il ajoute une dette parmi : découvert, crédit renouvelable, prêt personnel, crédit auto ou LOA, paiement fractionné, arriéré (loyer, énergie, impôts, amende), dette envers un proche, autre. | P0 |
| DET-02 | Chaque type ne demande que ses champs utiles (créancier, montant restant, taux, mensualité, date de prélèvement, échéancier). | P0 |
| DET-03 | Quand un champ est inconnu, l'app explique où le trouver et propose une valeur par défaut affichée comme estimation. | P0 |
| DET-04 | Il déclare un paiement, un accord obtenu (report, échéancier) ou une nouvelle dette. | P0 |
| DET-05 | Vue d'ensemble : dette totale, coût mensuel, intérêts et frais par mois, reste à vivre. | P0 |
| DET-06 | Il peut remonter manuellement la priorité d'une dette (ex. dette envers un proche). | P1 |

### Moteur de plan

| ID | Exigence | Priorité |
| --- | --- | --- |
| PLN-01 | Il choisit boule de neige ou avalanche et voit l'écart en euros et en mois entre les deux. | P0 |
| PLN-02 | L'app calcule le calendrier mois par mois et la date de libération selon les règles de la section 7. | P0 |
| PLN-03 | Le plan se recalcule dès qu'un revenu, une charge ou une dette change, y compris une dépense imprévue. | P0 |
| PLN-04 | Simulation « et si » : prime, remboursement d'impôt, dépense exceptionnelle. | P1 |
| PLN-05 | Le calcul fonctionne hors ligne, sur le téléphone. | P0 |

### Plan de la semaine et boîte à outils

| ID | Exigence | Priorité |
| --- | --- | --- |
| ACT-01 | Chaque lundi, le moteur de règles propose 1 à 3 actions tirées du catalogue. | P0 |
| ACT-02 | Chaque action affiche pourquoi elle est proposée et le gain estimé. | P0 |
| ACT-03 | Il marque une action « faite », « reportée » ou « pas possible » et déclare le résultat. | P0 |
| ACT-04 | Modèles de courriers et mails pré-remplis (report, étalement, remboursement de frais), copiés ou ouverts dans la messagerie de l'utilisateur. | P0 |
| ACT-05 | Scripts d'appel mot à mot par type de créancier, avec checklist de préparation. | P0 |
| ACT-06 | Audit express : abonnements cochés et utilisés ou non, frais bancaires du dernier relevé, forfaits mobile et box ; total des économies identifiées. | P0 |

### Droit à l'écart

| ID | Exigence | Priorité |
| --- | --- | --- |
| ECA-01 | Affichage du budget plaisir de la semaine. | P0 |
| ECA-02 | Question « je peux me le permettre ? » : réponse oui, non ou « oui si tu décales X », avec l'effet sur la date de libération. | P1 |

### Gamification

| ID | Exigence | Priorité |
| --- | --- | --- |
| GAM-01 | Carte 3D de la montagne avec l'avatar positionné selon le pourcentage de dette remboursé. | P0 |
| GAM-02 | Quatre camps : En observation, En contrôle, Hors de danger, Financièrement libre. | P0 |
| GAM-03 | Célébration animée à chaque dette soldée et à chaque passage de camp. | P0 |
| GAM-04 | Cabri, la mascotte animée (en code au MVP avec react-native-svg et Reanimated, en Rive une fois les revenus là), une chèvre des montagnes qui présente le plan de la semaine et réagit aux actions. Aucun mot éwé dans l'interface : l'app est entièrement en français. | P0 |
| GAM-05 | Quêtes hebdomadaires et mensuelles optionnelles, badges. | P1 |
| GAM-06 | Compteur d'intérêts et de frais économisés, calcul prudent et expliqué. | P0 |
| GAM-07 | Progression affichée en pourcentage, jamais en montant comparé à d'autres utilisateurs. | P0 |

### Notifications

| ID | Exigence | Priorité |
| --- | --- | --- |
| NOT-01 | Plan du lundi et bilan du vendredi. | P0 |
| NOT-02 | Rappel la veille d'une échéance saisie. | P0 |
| NOT-03 | Rappel de fin d'essai à J5 avec lien de gestion de l'abonnement. | P0 |
| NOT-04 | Réglage de la fréquence et des horaires ; désactivation possible. | P0 |

### Abonnement

| ID | Exigence | Priorité |
| --- | --- | --- |
| SUB-01 | Essai gratuit de 7 jours puis 9,99 €/mois via les achats intégrés Apple et Google (RevenueCat). | P0 |
| SUB-02 | Écran d'abonnement affichant clairement le prix, la date de premier prélèvement et comment résilier. | P0 |
| SUB-03 | Lien direct vers la gestion de l'abonnement du store depuis les réglages. | P0 |
| SUB-04 | À l'expiration, accès en lecture seule aux données ; plan de la semaine et recalcul réservés aux abonnés. | P0 |
| SUB-05 | Option annuelle à prix réduit. | P1 |

### Protection de l'utilisateur

| ID | Exigence | Priorité |
| --- | --- | --- |
| PRO-01 | Mode survie quand la capacité de remboursement est négative ou nulle (section 7). | P0 |
| PRO-02 | Alerte de bascule avec orientation gratuite vers un Point Conseil Budget et la Banque de France. | P0 |
| PRO-03 | Écran « tu n'es pas seul » : chiffres nationaux sourcés et témoignages. | P1 |

## 7. Règles métier du moteur de plan

**Le moteur est déterministe : mêmes données, même plan.** Il est écrit en TypeScript dans un module partagé entre l'app et le back-end, et couvert par des tests unitaires.

**Grandeurs mensuelles**

- R = revenus nets réguliers ; C = charges fixes ; V = vie courante essentielle ; M = somme des minimums obligatoires.
- Reste à vivre = R − C − M.
- Capacité de remboursement : CR = reste à vivre − V.
- Si CR > 0 : droit à l'écart E et accélérateur A = CR − E.

**Traitement par type de dette**

| Type | Minimum mensuel | Priorité |
| --- | --- | --- |
| Arriérés (loyer, énergie, impôts, amendes) | Échéance convenue, sinon montant proposé | Toujours en premier |
| Découvert (taux débiteur saisi ou par défaut, frais inclus) | Aucun ; objectif 0 € | Dette coûteuse ; sortir d'un découvert non autorisé passe avant l'accélération |
| Crédits (renouvelable, prêt, auto, LOA) | Mensualité | Selon la stratégie |
| Paiement fractionné (taux 0 %) | Échéance | Toujours payé à l'échéance, jamais par anticipation en avalanche |
| Dette envers un proche (taux 0 %) | 0 € ou montant convenu | En dernier, sauf priorité manuelle |

**Ordre d'affectation chaque mois**

1. Minimums de toutes les dettes, arriérés en tête.
2. Droit à l'écart : 15 % de la CR par défaut (réglable de 10 à 25 %), plancher de 15 € dès que la CR dépasse 50 €.
3. Accélérateur sur la dette cible ; une dette soldée libère son minimum, qui rejoint l'accélérateur.

**Stratégies** : boule de neige = plus petit solde restant d'abord ; avalanche = coût le plus élevé d'abord (taux et frais). En cas d'égalité, la dette la plus ancienne passe en premier.

**Mode survie (CR négative ou nulle)** : pas d'accélérateur ni d'écart ; ordre de paiement affiché (logement, énergie, impôts, minimums des crédits, reste) ; actions orientées vers les demandes d'étalement et la réduction des charges.

**Alerte de bascule** : CR négative deux mois de suite, ou date de libération au-delà de 7 ans.

**Moteur d'actions**

- Catalogue de 30 à 40 actions rédigées, chacune avec des conditions de déclenchement et un gain estimé.
- Score = gain estimé × facilité ; les 3 meilleurs scores sont retenus, dont au moins une action de moins de 10 minutes.
- Une action faite ou refusée n'est pas reproposée pendant 4 semaines.

**Impératifs de calcul** : montants stockés en centimes (entiers), intérêts calculés au mois, arrondis au centime, et date de libération plafonnée à 30 ans de simulation.

## 8. Exigences non fonctionnelles et architecture

| Domaine | Exigence |
| --- | --- |
| Performance 3D | Carte fluide (≥ 30 images/s) sur un téléphone Android d'entrée de gamme de référence ; version allégée automatique si besoin |
| Démarrage | App utilisable en moins de 3 secondes ; carte 3D chargée en arrière-plan |
| Poids | Modèles glTF compressés ; app de moins de 80 Mo au téléchargement |
| Hors ligne | Consultation des dettes, du plan et des scripts sans réseau ; synchronisation au retour |
| Sécurité | Sécurité par lignes (RLS) sur chaque table ; code ou biométrie à l'ouverture ; aucune donnée financière dans les journaux ni dans les statistiques |
| Données personnelles | Hébergement dans l'UE ; consentement explicite ; export et suppression en un geste ; aucune revente |
| Accessibilité | Textes agrandissables, contrastes suffisants, animations réduites si l'option système est activée |
| Langue | Français uniquement au lancement ; textes externalisés pour une traduction future |
| Plateformes | iOS et Android récents, via Expo |

**Architecture**

| Couche | Choix |
| --- | --- |
| App | React Native + Expo (development builds, EAS Build et Submit), Expo Router, Zustand |
| Carte 3D | React Three Fiber natif (Three.js via expo-gl) |
| Personnages | react-native-svg et Reanimated au MVP, puis Rive (rive-react-native) |
| Back-end | Supabase, région Europe : PostgreSQL, Auth (anonyme, Apple, Google, e-mail), Edge Functions, tâches planifiées |
| Abonnements | RevenueCat + achats intégrés Apple et Google, webhook vers une Edge Function |
| Notifications | Expo Notifications |
| Suivi | Sentry (plantages), PostHog hébergé dans l'UE (statistiques) |

**Règles pour la migration future vers Go** : migrations SQL versionnées dans Git, pas de logique métier en PL/pgSQL, Edge Functions à responsabilité unique, couche d'accès aux données unique côté mobile. Premier service Go prévu : l'agrégation bancaire en V2.

## 9. Mesure

**Chaque métrique de la section 3 se calcule à partir de ces événements, envoyés à PostHog sans aucun montant ni nom de créancier** (tranches uniquement quand c'est utile).

| Événement | Déclenché quand | Propriétés |
| --- | --- | --- |
| onboarding\_started | Premier écran d'accueil | source d'installation |
| debt\_added | Une dette est enregistrée | type de dette |
| plan\_generated | La date de libération s'affiche | stratégie, nombre de dettes, horizon en tranches |
| trial\_started | L'essai démarre | plateforme |
| account\_created | Le compte est créé | méthode (Apple, Google, e-mail) |
| audit\_completed | L'audit express est terminé | économies identifiées en tranches |
| action\_proposed | Une action entre dans le plan de la semaine | identifiant de l'action |
| action\_completed | Une action est validée | identifiant, résultat déclaré |
| template\_used | Un courrier ou un script est copié ou ouvert | identifiant du modèle |
| debt\_paid\_off | Une dette est soldée | type de dette |
| camp\_reached | Un nouveau camp est atteint | camp |
| survival\_mode\_entered | Le mode survie s'active | — |
| referral\_alert\_shown | L'alerte de bascule s'affiche | motif |
| subscription\_converted / cancelled | Reçu du webhook RevenueCat | plateforme, formule |

## 10. Jalons

**MVP publié sur les deux stores en fin de semaine 12, par un développeur seul.** Chaque semaine se termine par un livrable testable sur téléphone.

| Semaine | Développement | Critère de fin | En parallèle |
| --- | --- | --- | --- |
| S1 | Projet Expo et development builds, Supabase (tables, RLS, auth anonyme), scène 3D minimale | La scène 3D tourne à 30 images/s sur l'Android de référence | Rendez-vous avec l'avocat |
| S2 et S3 | Onboarding et inventaire des dettes (ONB, DET) ; moteur de plan et ses tests (PLN) | Date de libération correcte sur 10 cas de test | 5 à 10 conversations avec des personnes endettées |
| S4 à S6 | Plan de la semaine, moteur d'actions, audit express, courriers et scripts, droit à l'écart, notifications (ACT, ECA, NOT) | Un utilisateur test identifie plus de 10 € d'économies en 15 minutes | Rédaction du catalogue d'actions, des courriers et des scripts |
| S7 à S9 | Carte 3D, camps, célébrations, animation de Cabri en code, quêtes, compteur d'intérêts (GAM) ; mode survie (PRO) | Solder une dette déclenche la célébration et fait monter l'avatar ; carte fluide sur l'Android de référence, sinon repli sur la carte 2D | Décor 3D en formes simples ou modèles gratuits CC0 ; Cabri en images fixes en attendant ses animations ; aucun achat |
| S10 | Abonnement et essai (SUB), webhook RevenueCat, CGU, RGPD, suppression de compte | Parcours complet d'essai réussi en bac à sable Apple et Google | Ajustements selon l'avis de l'avocat |
| S11 | Bêta fermée avec 10 à 20 proches | Aucun bug bloquant sur le parcours principal | Fiches des stores et captures d'écran |
| S12 | Corrections, soumission aux stores | App acceptée par Apple et Google | Préparation du lancement |

Prévoir de la marge pour la validation App Store : un premier refus est fréquent, surtout pour les apps avec abonnement.

## 11. Contraintes légales, risques et questions ouvertes

**Contraintes légales à respecter dans le produit** (à valider par un avocat en droit bancaire et de la consommation)

- [Article L.322-1 du Code de la consommation](https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006069565/LEGISCTA000032222463/) : l'app ne négocie jamais pour le compte de l'utilisateur, ne reçoit aucun mandat et ne facture pas au résultat ; le prix correspond à l'accès à l'outil.
- Aucune recommandation de crédit, de rachat de crédits ou de placement nommé.
- Abonnement : prix et date de prélèvement clairs, rappel avant la fin de l'essai, lien direct vers la résiliation du store.
- RGPD : données financières sensibles, hébergement dans l'UE, analyse d'impact.

**Risques**

| Risque | Impact | Parade |
| --- | --- | --- |
| L'abonnement pour un plan de remboursement est requalifié au regard de L.322-1 | Très élevé | Avis d'avocat avant la S10 ; formulation « outil » dans l'app, les CGU et les fiches des stores |
| Le gain pendant l'essai reste déclaratif et trop faible pour convertir | Élevé | Suivre « premier gain » dès la bêta ; leviers : essai de 14 jours ou connexion bancaire avancée |
| La carte 3D est lente sur les téléphones modestes | Moyen | Test dès la S1, version allégée automatique |
| Refus ou retard de validation par Apple | Moyen | Soumission anticipée d'une version test, textes d'abonnement conformes aux règles Apple |
| Abandon après quelques semaines | Élevé | Actions courtes, célébrations, bilan hebdomadaire |
| Périmètre trop large pour un développeur seul en 12 semaines | Élevé | Ordre de coupe fixé à l'avance (audit express, quêtes secondaires, badges au-delà des cinq premiers) ; repli sur la carte 2D si la 3D n'est pas fluide à la fin de S9 ; exigences P1 repoussables sans bloquer le lancement |

**Questions ouvertes**

- [x] Valeurs par défaut du droit à l'écart (15 %, plancher de 15 €) à confirmer.
- [x] Estimation par défaut de la vie courante  (décidé) : le forfait « alimentation, habillement, hygiène, santé, transports » du barème de surendettement de la Banque de France (652 € pour une personne, plus 261 € par personne supplémentaire), mis à jour chaque année. Les forfaits habitation et chauffage ne sont pas repris, car l'énergie et les assurances sont saisies dans les charges fixes. Affiché comme un minimum à ajuster.
- [x] Taux par défaut du découvert  (décidé) : le taux moyen des crédits de 3 000 € ou moins, déduit du taux d'usure publié chaque trimestre par la Banque de France (usure × 3/4, soit environ 17,6 % au 3e trimestre 2026). Frais d'incident ajoutés pour un découvert non autorisé (commission d'intervention plafonnée à 8 € par opération et 80 € par mois). Toujours affiché comme une estimation, avec l'aide pour trouver le vrai taux sur le relevé.
- [x] Contenu du catalogue d'actions  (décidé) : le fondateur rédige les actions, les courriers et les scripts en S4 à S6, en partant des modèles gratuits de Service-public.fr et de l'Institut national de la consommation, avec l'aide d'une IA. L'avocat relit les courriers qui invoquent un droit (frais bancaires, résiliation, échéancier) pendant la consultation déjà prévue. Les testeurs de la bêta vérifient que tout est clair et faisable.
- [x] Accès après expiration de l'abonnement : lecture seule (décidé).
- [x] Nom de l'app et identité visuelle.
- [x] Téléphone Android de référence pour les tests de performance.
