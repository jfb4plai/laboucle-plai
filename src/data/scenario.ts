import type { Scene } from '../types';

export const INITIAL_GAUGES = { dis: 20, con: 10, lit: 5, app: 0 };

export const scenes: Record<string, Scene> = {

  // ═══════════════════════════════
  // INTRO
  // ═══════════════════════════════
  intro: {
    id: 'intro',
    dimension: 'dis',
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
      mechanism: 'Feedback paradox — Dimension DISPOSITIONS',
      reference: 'Hausman, M. et al. (2025). Analysis of the Emotions and Emotional Skills of University Students in Processing Distance Formative Feedback. [citant Carless & Boud, 2018]',
      riss_id: '1118375ar',
      implication: 'Malgré des quantités croissantes de rétroaction, les élèves peinent à en tirer profit. La cause n\'est pas l\'absence de feedback, mais l\'incapacité à le traiter (Carless & Boud, 2018). Les choix A et B illustrent deux formes d\'évitement qui protègent l\'estime de soi à court terme — et bloquent l\'apprentissage à long terme.',
    },
  },

  // ═══════════════════════════════
  // REMARQUE 1 — La structure
  // ═══════════════════════════════
  remarque1: {
    id: 'remarque1',
    dimension: 'con',
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
      mechanism: 'Demander des clarifications : force, pas faiblesse — Dimension CONCEPTION',
      reference: 'Rezzonico, L. (2024). Demander de l\'aide en mathématiques pour apprendre ou pour avancer sans effort ? [citant Karabenick & Newman, 2006]',
      riss_id: 'W4399227244',
      implication: 'Les élèves évitent de demander de l\'aide pour ne pas paraître incapables (Karabenick & Newman, 2006). Pourtant, la demande de clarification est le marqueur le plus fiable d\'un apprenant autorégulé. Le choix C — lever la main — est le comportement le plus rare en classe et le plus décisif pour la progression.',
    },
  },

  // Scène intermédiaire : Lambert répond
  lambert_repond: {
    id: 'lambert_repond',
    dimension: 'con',
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
      mechanism: 'Modélisation experte : l\'enseignant verbalise ses critères — Dimension CONCEPTION',
      reference: 'Clayton Bernard, R. (2024). Autorégulation, co-régulation et régulation partagée des apprentissages. [citant Nicol & Macfarlane-Dick, 2006]',
      riss_id: 'tel-04726605',
      implication: 'Quand l\'enseignant explicite ses critères à voix haute, l\'élève accède au raisonnement évaluatif expert (Nicol & Macfarlane-Dick, 2006). Cette co-construction du sens des critères est décisive : sans elle, l\'élève reste dans une compréhension floue de ce qu\'on attend de lui.',
    },
  },

  // ═══════════════════════════════
  // REMARQUE 2 — Le jugement ambigu
  // ═══════════════════════════════
  remarque2: {
    id: 'remarque2',
    dimension: 'lit',
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
      reference: 'Calone, A. & Lafontaine, D. (2023). L\'impact des différents types de feedbacks en contexte de classe. [citant Kluger & DeNisi, 1996 ; Dweck, 2006]',
      riss_id: 'hal-04646895',
      implication: 'La rétroaction centrée sur la personne ("tu es intelligent") diminue la persévérance face à la difficulté (Dweck, 2006) et peut réduire la performance (Kluger & DeNisi, 1996). Seul le feedback centré sur la tâche est actionnable. Apprendre à discriminer ces deux types est une compétence rarement enseignée — et pourtant décisive.',
    },
  },

  // ═══════════════════════════════
  // REMARQUE 3 — L'essentiel
  // ═══════════════════════════════
  remarque3: {
    id: 'remarque3',
    dimension: 'lit',
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
      mechanism: 'Du diagnostic à l\'action : traduire le commentaire en critère — Dimension LITTÉRATIE',
      reference: 'Lepareur, C. (2016). L\'évaluation formative et l\'autorégulation des apprentissages. [citant Sadler, 1989 ; Nicol & Macfarlane-Dick, 2006]',
      riss_id: 'tel-01488023',
      implication: 'Les élèves ne peuvent progresser que s\'ils comprennent l\'écart entre leur production et l\'objectif visé ET savent comment le combler (Sadler, 1989). Comprendre le problème (choix A) n\'est pas suffisant : il faut transformer le diagnostic en stratégie vérifiable. Cette étape est rarement enseignée.',
    },
  },

  // ═══════════════════════════════
  // ACTE 2 — LOW
  // ═══════════════════════════════
  act2_low: {
    id: 'act2_low',
    dimension: 'app',
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
      mechanism: 'Révision sans critère = modification aléatoire — Dimension APPROPRIATION',
      reference: 'Teng, M.F. & Ma, M. (2024). Assessing metacognition-based student feedback literacy for academic writing. [citant Carless & Boud, 2018]',
      riss_id: 'hal-04963137',
      implication: 'Sans plan de révision ancré dans des critères explicites, la relecture tourne en rond (Carless & Boud, 2018). L\'élève modifie sa copie selon son intuition, pas selon les attendus. Le résultat est aléatoire — et décourageant car incompréhensible.',
    },
  },

  // ═══════════════════════════════
  // ACTE 2 — MID
  // ═══════════════════════════════
  act2_mid: {
    id: 'act2_mid',
    dimension: 'app',
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
      mechanism: 'Persévérance dans l\'effort de révision — Dimension APPROPRIATION',
      reference: 'Parada, S. (2020). Mindset, bien-être et réussite académique. [citant Dweck, 2006 ; Zimmerman, 2002]',
      riss_id: 'tel-03767540',
      implication: 'La mentalité de croissance (Dweck, 2006) se manifeste dans la persévérance face à l\'obstacle : croire que l\'effort supplémentaire a une valeur. Zimmerman (2002) montre que les apprenants autorégulés maintiennent leur stratégie face à la difficulté — ils ne l\'abandonnent pas au premier blocage.',
    },
  },

  // ═══════════════════════════════
  // ACTE 2 — HIGH
  // ═══════════════════════════════
  act2_high: {
    id: 'act2_high',
    dimension: 'app',
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
      mechanism: 'Journal de rétroaction : métacognition et autorégulation — Dimension APPROPRIATION',
      reference: 'Da Silva, S. (2025). Autoréguler sa motivation et s\'en sentir capable. [citant Schunk & Zimmerman, 2002]',
      riss_id: 'W4411811193',
      implication: 'L\'apprentissage autorégulé (Zimmerman, 2002) se caractérise par la réflexion sur son propre processus. Le journal de rétroaction installe ce réflexe : "Qu\'ai-je appris ? Que dois-je encore comprendre ? Quelle est ma prochaine action ?" C\'est la différence entre corriger une copie et apprendre à corriger.',
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
