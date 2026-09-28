/**
 * All user-facing French strings. Informal "tu", no financial jargon.
 * Placeholders use {name}. A node with `one` and `other` is pluralized with the
 * French rules (0 and 1 take the singular) and requires a `count` parameter.
 */
export const fr = {
  common: {
    appName: 'yingo',
    offline: {
      title: 'Pas de réseau pour le moment',
      message: 'Dès que tu retrouves une connexion, on repart ensemble.',
      short: 'hors ligne',
    },
  },
  debts: {
    count: { one: '{count} dette', other: '{count} dettes' },
  },
  status: {
    title: "État de l'app (dev)",
    starting: 'Démarrage…',
    palette: 'Palette',
    session: 'Session',
    sessionAnonymous: 'anonyme · {uid}',
    profile: 'Profil',
    profileReady: 'prêt',
    profilePending: 'en attente',
    unavailable: 'indisponible',
    engine: 'Moteur',
    engineVersions: 'app {app} · serveur {server}',
    sentryTest: 'Envoyer une erreur de test',
    sentrySent: 'Erreur de test envoyée',
  },
} as const;

export type Catalog = typeof fr;
