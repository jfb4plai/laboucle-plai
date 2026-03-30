import type { Scene } from '../types';

export const INITIAL_GAUGES = { dis: 20, con: 10, lit: 5, app: 0 };

export const scenes: Record<string, Scene> = {

  // ═══════════════════════════════
  // INTRO
  // ═══════════════════════════════
  intro: {
    id: 'intro',
    narration: "Mme Lambert pose la pile de copies sur le coin du bureau. Elles glissent une à une jusqu'aux élèves. La tienne arrive face tournée vers le bas. Tu la retournes : 11/20, cerclé en rouge, coin supérieur droit. Dessous, trois lignes serrées au stylo rouge.",
    choices: [
      {
        id: 'A',
        label: 'Retourner la copie',
        sublabel: '"Je regarderai ça plus tard."',
        effects: { dis: -8 },
        next: 'mur_a',
        response: "Tu ranges la copie dans ton agenda. Elle restera là jusqu'à la fin du trimestre, entre deux feuilles froissées. La prochaine fois, tu te demanderas pourquoi tu as encore eu 11.",
      },
      {
        id: 'B',
        label: 'Regarder la note, pas les commentaires',
        sublabel: '"11... pas terrible."',
        effects: { dis: -3 },
        next: 'mur_b',
        response: "11. Pas terrible. Pas catastrophique. Tu glisses la copie dans ton sac. Les commentaires restent là, non lus, comme des lettres jamais ouvertes.",
      },
      {
        id: 'C',
        label: 'Lire les commentaires',
        sublabel: '',
        effects: { con: 2 },
        next: 'remarque1',
        response: "Tu retournes la feuille et tu lis. Trois blocs de texte en rouge dans les marges.",
      },
    ],
    fac: {
      mechanism: 'Stratégie d\'évitement (choix A & B) — Dimension DISPOSITIONS',
      reference: 'Brault Foisy, L.-M. (2022). Mieux comprendre les mécanismes cérébraux d\'apprentissage pour faciliter la réussite scolaire.',
      riss_id: 'W4225545444',
      implication: 'L\'élève protège son estime de soi en évitant l\'information corrective. La rétroaction n\'a d\'effet neurologique que si elle est activement traitée — l\'évitement est rationnel à court terme et dévastateur à long terme.',
    },
  },

  // ═══════════════════════════════
  // REMARQUE 1 — La structure
  // ═══════════════════════════════
  remarque1: {
    id: 'remarque1',
    narration: "Premier bloc, en marge du premier paragraphe :",
    copy: {
      text: '« Introduction : manque de structure. Développe ta thèse dès l\'entrée. »',
      position: 'top',
    },
    choices: [
      {
        id: 'A',
        label: 'Hocher la tête',
        sublabel: '"OK, structure. Je vois."',
        effects: {},
        next: 'remarque2',
        response: "Tu acquiesces. Tu penses avoir compris. Peut-être.",
      },
      {
        id: 'B',
        label: 'Souligner dans ta copie',
        sublabel: '"Je note pour ne pas oublier."',
        effects: { con: 3, lit: 2 },
        next: 'remarque2',
        response: "Tu souligne la remarque en bleu. C'est un geste concret. La trace est là.",
      },
      {
        id: 'C',
        label: 'Lever la main',
        sublabel: '"Une thèse dès l\'entrée... c\'est quoi exactement ?"',
        effects: { con: 8, lit: 5, dis: 5 },
        next: 'lambert_repond',
        response: "Tu lèves la main. Mme Lambert s'approche. Tu demandes : « Madame, quand vous dites 'thèse dès l'entrée', ça veut dire commencer par 'je pense que...' ou c'est autre chose ? »",
      },
    ],
    fac: {
      mechanism: 'Compréhension superficielle vs clarification active — Dimension CONCEPTION',
      reference: 'Altinsoy, M. (2025). Les évaluations scolaires comme levier d\'autorégulation et de développement des compétences métacognitives.',
      riss_id: 'dumas-05324645',
      implication: 'L\'élève qui ne vérifie pas sa compréhension reste dans l\'illusion de compréhension. La demande de clarification (choix C) est un marqueur d\'autorégulation — pas un aveu de faiblesse.',
    },
  },

  // Scène intermédiaire : Lambert répond
  lambert_repond: {
    id: 'lambert_repond',
    narration: 'Mme Lambert marque un temps. Elle répond : « Bonne question. Non — une thèse, c\'est ta position sur le sujet, formulée clairement. Pas forcément \'je pense que\', mais quelque chose comme : \'Le développement technologique menace davantage qu\'il ne protège la vie privée.\' »',
    choices: [
      {
        id: 'suite',
        label: 'Continuer',
        sublabel: '"Je note ça."',
        effects: { con: 3, lit: 2 },
        next: 'remarque2',
        response: "Tu notes la formulation dans ta marge. La prochaine fois, tu sauras quoi écrire.",
      },
    ],
    fac: {
      mechanism: 'La clarification transforme la relation pédagogique — Dimension DISPOSITION + CONCEPTION',
      reference: 'Clayton Bernard, R. (2024). Autorégulation, co-régulation et régulation partagée des apprentissages. (citant Nicol & Macfarlane-Dick, 2006)',
      riss_id: 'tel-04726605',
      implication: 'L\'élève devient acteur de sa compréhension. Cette posture, rarement enseignée, est décisive pour la réussite au supérieur où personne ne rappelle de demander des clarifications.',
    },
  },

  // ═══════════════════════════════
  // REMARQUE 2 — Le jugement ambigu
  // ═══════════════════════════════
  remarque2: {
    id: 'remarque2',
    narration: "Deuxième bloc, en marge droite, au milieu de la copie :",
    copy: {
      text: '« Tu es intelligent(e), tu peux mieux faire. »',
      position: 'middle',
    },
    choices: [
      {
        id: 'A',
        label: '"Elle croit en moi."',
        sublabel: 'Sourire intérieur.',
        effects: { dis: 2 },
        next: 'remarque3',
        response: "Tu souris légèrement. C'est encourageant. Mais... qu'est-ce que tu vas changer dans ton texte ?",
      },
      {
        id: 'B',
        label: '"C\'est un jugement sur moi, pas sur mon texte."',
        sublabel: '',
        effects: { dis: 5, lit: 8 },
        next: 'remarque3',
        response: "\"Tu es intelligent(e)\" — ça ne dit rien sur le paragraphe. Ça dit quelque chose sur toi. Mais toi tu voudrais savoir quoi changer dans le texte, pas qu'on te rassure sur ton QI.",
      },
      {
        id: 'C',
        label: '"C\'est vague, ça ne m\'aide pas."',
        sublabel: 'Passer à la suite.',
        effects: { lit: 3 },
        next: 'remarque3',
        response: "Vague. Pas actionnable. Tu l'ignores et tu passes au commentaire suivant.",
      },
    ],
    fac: {
      mechanism: 'Rétroaction ego-orientée vs tâche-orientée — Dimension LITTÉRATIE',
      reference: 'Georget, M. & Amourdom, A. (2025). Favoriser le sentiment de compétence en production d\'écrits : enjeux et leviers pédagogiques au cycle 2.',
      riss_id: 'dumas-05110873',
      implication: 'Le feedback centré sur la personne ("tu es intelligent") réduit la persévérance face à la difficulté. Seul le feedback centré sur la tâche et le processus est actionnable. L\'élève doit apprendre à discriminer les deux — cette compétence n\'est jamais enseignée.',
    },
  },

  // ═══════════════════════════════
  // REMARQUE 3 — L'essentiel
  // ═══════════════════════════════
  remarque3: {
    id: 'remarque3',
    narration: "Troisième bloc, en bas de page, cerclé en rouge :",
    copy: {
      text: '« Arguments sans exemples concrets — 3 points perdus »',
      position: 'bottom',
    },
    choices: [
      {
        id: 'A',
        label: '"Je comprends le problème, pas la solution."',
        sublabel: '"Il me manquait des exemples. Mais lesquels ?"',
        effects: { lit: 3 },
        next: 'act2_low',
        response: "Tu comprends qu'il te manquait des exemples. Mais comment choisir les bons ? Tu n'as pas de réponse.",
      },
      {
        id: 'B',
        label: '"À chaque argument, un exemple concret."',
        sublabel: '"Simple : un exemple par argument."',
        effects: { lit: 8, app: 5 },
        next: 'act2_mid',
        response: "C'est une intention claire. \"J'ajouterai un exemple par argument.\" Reste à voir si tu le feras vraiment.",
      },
      {
        id: 'C',
        label: 'Créer une checklist de révision',
        sublabel: '"Critère : ≥1 exemple par argument — à vérifier avant de rendre."',
        effects: { lit: 10, app: 10, con: 5 },
        next: 'act2_high',
        response: "Tu retournes la feuille. Tu écris : \"CRITÈRE — exemples : 1 minimum par argument. Vérifier avant de rendre.\" C'est petit. Mais c'est concret et vérifiable.",
      },
    ],
    fac: {
      mechanism: 'Du diagnostic à l\'action — Dimension LITTÉRATIE + APPROPRIATION',
      reference: 'Lepareur, C. (2016). L\'évaluation dans les enseignements scientifiques fondés sur l\'investigation : effets de différentes modalités d\'évaluation formative sur l\'autorégulation.',
      riss_id: 'tel-01488023',
      implication: 'Comprendre le problème n\'est pas suffisant (choix A). Il faut transformer le diagnostic en stratégie de révision concrète, avec un critère de réussite vérifiable. Cette étape — rarement enseignée — est le pivot entre compréhension et progression réelle.',
    },
  },

  // ═══════════════════════════════
  // ACTE 2 — LOW
  // ═══════════════════════════════
  act2_low: {
    id: 'act2_low',
    narration: "Deux jours plus tard. Le travail est à réviser pour vendredi. Tu rouvres ta copie. Tu te souviens vaguement du commentaire sur la structure. Tu réécris l'introduction au feeling. Mieux ? Peut-être. Tu rends.",
    choices: [
      {
        id: 'A',
        label: 'Rendre sans relire',
        sublabel: '"Ça ira."',
        effects: {},
        next: 'fin_a',
        response: "Tu rends le travail. Tu ne sais pas ce que tu as changé exactement.",
      },
      {
        id: 'B',
        label: 'Relire une fois',
        sublabel: '"Juste pour vérifier."',
        effects: { lit: 2 },
        next: 'fin_a_relecture',
        response: "Tu relis. Tu vois des choses à améliorer mais tu ne sais pas par où commencer. Tu rends quand même.",
      },
    ],
    fac: {
      mechanism: 'Révision sans stratégie — Dimension APPROPRIATION absente',
      reference: 'Levy, L. (2021). L\'évaluation : un moyen pour favoriser le développement d\'une réflexion métacognitive ?',
      riss_id: 'dumas-03442326',
      implication: 'Sans plan de révision ancré dans les critères, la relecture tourne en rond. L\'élève modifie sa copie selon son intuition, pas selon les attendus. Le résultat est aléatoire.',
    },
  },

  // ═══════════════════════════════
  // ACTE 2 — MID
  // ═══════════════════════════════
  act2_mid: {
    id: 'act2_mid',
    narration: "Tu ouvres un nouveau document. Ton premier argument : \"Le développement technologique fragilise la vie privée.\" Tu t'arrêtes. L'exemple. Cambridge Analytica ? Facebook ? Tu notes quelque chose. Deuxième argument — tu bloques.",
    choices: [
      {
        id: 'A',
        label: '"Un exemple sur deux, c\'est déjà mieux."',
        sublabel: 'Rendre avec le 2e argument sans exemple.',
        effects: { app: 3 },
        next: 'fin_b',
        response: "Tu rends. C'est mieux qu'avant. Mais incomplet.",
      },
      {
        id: 'B',
        label: 'Chercher le 2e exemple, même si ça prend du temps',
        sublabel: '"Le commentaire était clair : tous les arguments."',
        effects: { app: 8, dis: 5 },
        next: 'fin_bc',
        response: "Tu cherches. Tu trouves : l'affaire Snowden et la surveillance de masse. Tu l'intègres. Les deux arguments ont maintenant leur exemple.",
      },
    ],
    fac: {
      mechanism: 'Persévérance dans l\'effort de révision — Dimension APPROPRIATION + DISPOSITIONS',
      reference: 'Parada, S. (2020). Mindset, bien-être et réussite académique : articulation de la mentalité malléable et de la motivation.',
      riss_id: 'tel-03767540',
      implication: 'La mentalité de croissance (Dweck, 2006) se manifeste ici concrètement : croire que l\'effort de révision a une valeur, même quand c\'est inconfortable. Cette croyance se construit — elle n\'est pas innée.',
    },
  },

  // ═══════════════════════════════
  // ACTE 2 — HIGH
  // ═══════════════════════════════
  act2_high: {
    id: 'act2_high',
    narration: "Tu sors ta checklist. Tu relis ton travail critère par critère. Premier argument : exemple présent ✓. Introduction : thèse claire ? Tu hésites. Tu reformules. Deuxième argument : exemple présent ✓.",
    choices: [
      {
        id: 'A',
        label: 'S\'arrêter là',
        sublabel: '"J\'ai fait ce que j\'avais noté."',
        effects: { app: 8 },
        next: 'fin_bc',
        response: "Tu rends. La checklist est cochée. Tu as tenu ton engagement.",
      },
      {
        id: 'B',
        label: 'Rédiger un journal de rétroaction',
        sublabel: '"Ce qui a changé, pourquoi, ce que j\'ai compris."',
        effects: { app: 12, lit: 5, dis: 8 },
        next: 'fin_c',
        response: "Tu écris trois lignes : \"J'ai reformulé l'introduction (thèse plus claire). J'ai ajouté un exemple par argument. J'ai compris que 'développer davantage' veut dire ajouter du concret, pas du général.\" Trois lignes. Mais elles valent plus que toute la copie.",
      },
    ],
    fac: {
      mechanism: 'Journal de rétroaction = métacognition active — Dimension APPROPRIATION',
      reference: 'Levy, L. (2021). L\'évaluation : un moyen pour favoriser le développement d\'une réflexion métacognitive ?',
      riss_id: 'dumas-03442326',
      implication: 'La réflexion sur son propre processus de révision développe une autorégulation durable, pas seulement une performance ponctuelle. C\'est la différence entre "j\'ai corrigé cette copie" et "j\'ai appris à corriger".',
    },
  },

  // ═══════════════════════════════
  // MUR (fins directes depuis intro)
  // ═══════════════════════════════
  mur_a: {
    id: 'mur_a',
    narration: "Vendredi. Le nouveau travail est rendu. Mme Lambert le distribue avec une note. Tu regardes le chiffre : 11/20. Exactement pareil. Trois commentaires en rouge. Tu les retournes.",
    is_ending: true,
    ending_type: 'A',
    ending_score: '11/20',
    ending_title: 'Le signal perdu',
    ending_message: "La boucle est restée fermée — ou plutôt, elle n'a jamais été ouverte. Tu n'as pas eu accès à l'information contenue dans la rétroaction, parce que personne ne t'a appris à y accéder.",
    ending_bridge: "Cette compétence s'appelle la littératie à la rétroaction. Elle ne s'acquiert pas spontanément. Elle s'enseigne — dès le primaire, explicitement, de façon progressive. Sans elle, même la rétroaction la plus pertinente reste lettre morte.",
  },

  mur_b: {
    id: 'mur_b',
    narration: "La semaine suivante, même travail. Tu as ajouté quelques phrases. Mme Lambert rend les copies. 12/20. Tu regardes les commentaires, brièvement. Tu ranges.",
    is_ending: true,
    ending_type: 'A',
    ending_score: '12/20',
    ending_title: 'Le signal effleuré',
    ending_message: "Un point de plus. Mais la logique est la même : tu as modifié sans comprendre pourquoi, et sans stratégie pour la prochaine fois.",
    ending_bridge: "La rétroaction n'est pas un message qu'on reçoit passivement. C'est un processus actif qui nécessite des compétences spécifiques. Ces compétences s'enseignent.",
  },

  fin_a_relecture: {
    id: 'fin_a_relecture',
    narration: "Mme Lambert rend les copies. 12/20. Elle a noté : \"Amélioration partielle. La structure est mieux. Les exemples manquent toujours.\" Tu ranges la copie dans ton sac.",
    is_ending: true,
    ending_type: 'A',
    ending_score: '12/20',
    ending_title: 'Le signal perdu',
    ending_message: "Un point de plus. Mais les exemples — le cœur du commentaire — n'ont pas bougé. Le diagnostic était là. La compétence de le transformer en action n'était pas encore construite.",
    ending_bridge: "Cette compétence s'appelle la littératie à la rétroaction. Elle ne s'acquiert pas spontanément. Elle s'enseigne — dès le primaire, explicitement, de façon progressive.",
  },

  fin_a: {
    id: 'fin_a',
    narration: "Mme Lambert rend les copies. 12/20. Elle a noté : \"Peu de changements. Les commentaires n'ont pas été intégrés.\" Tu ranges.",
    is_ending: true,
    ending_type: 'A',
    ending_score: '12/20',
    ending_title: 'Le signal perdu',
    ending_message: "La boucle n'a pas pu se fermer. Pas par manque de volonté — par manque d'une compétence que personne n'a enseignée.",
    ending_bridge: "Cette compétence s'appelle la littératie à la rétroaction. Elle ne s'acquiert pas spontanément. Elle s'enseigne — dès le primaire, explicitement, de façon progressive.",
  },

  fin_b: {
    id: 'fin_b',
    narration: "Mme Lambert rend les copies. 14/20. Elle a noté : \"Nette amélioration sur la structure. Un argument sans exemple.\" Tu es soulagé(e).",
    is_ending: true,
    ending_type: 'B',
    ending_score: '14/20',
    ending_title: 'Les eaux peu profondes',
    ending_message: "Tu as répondu à une remarque. C'est un progrès réel. Mais au prochain travail, dans une autre matière, tu repartiras de zéro. Tu n'as pas encore de stratégie transférable — juste une correction ponctuelle.",
    ending_bridge: "La littératie à la rétroaction, c'est pouvoir fermer la boucle systématiquement, dans toutes les matières, sans qu'on te le rappelle chaque fois. Ça s'enseigne. Et ça s'apprend.",
  },

  fin_bc: {
    id: 'fin_bc',
    narration: "Mme Lambert rend les copies. 15/20. Elle a noté : \"Bonne progression. La structure est là, les exemples sont présents. Continue.\"",
    is_ending: true,
    ending_type: 'B',
    ending_score: '15/20',
    ending_title: 'La boucle entrouverte',
    ending_message: "Tu as suivi les commentaires avec méthode. C'est significatif. La question qui reste : est-ce que tu pourras reproduire cette démarche au prochain travail, seul(e), sans la checklist en tête ?",
    ending_bridge: "L'appropriation durable passe par la métacognition : comprendre pourquoi ça a fonctionné, pas seulement que ça a fonctionné. Ce pas supplémentaire fait la différence entre une correction et un apprentissage.",
  },

  fin_c: {
    id: 'fin_c',
    narration: "Mme Lambert rend les copies. 16/20. Elle a noté : \"Nette progression. La structure est là. Les exemples sont présents et pertinents. Continue dans cette direction.\"",
    is_ending: true,
    ending_type: 'C',
    ending_score: '16/20',
    ending_title: 'La boucle fermée',
    ending_message: "Tu as construit une boucle : rétroaction → compréhension → action → vérification → réflexion. C'est cette boucle, répétée, qui développe l'esprit critique.",
    ending_bridge: "C'est aussi ce qui te permettra d'utiliser l'IA comme un outil — parce que tu sauras évaluer ce qu'elle produit, questionner sa pertinence, distinguer ce qui est actionnable de ce qui ne l'est pas. La remarque de Mme Lambert n'était pas la fin. C'était le départ.",
  },
};

export function getProgression(gauges: { con: number; lit: number; app: number }): number {
  return Math.round((gauges.con + gauges.lit + gauges.app) / 3);
}
