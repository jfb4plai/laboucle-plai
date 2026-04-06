export type GaugeKey = 'dis' | 'con' | 'lit' | 'app';

export type Gauges = {
  dis: number;
  con: number;
  lit: number;
  app: number;
};

export type GaugeEffect = Partial<Gauges>;

export type FacNote = {
  mechanism: string;
  reference: string;
  riss_id: string;
  implication: string;
};

export type Choice = {
  id: string;
  label: string;
  sublabel?: string;
  effects: GaugeEffect;
  next: string;
  response?: string;   // narrator text shown after choice, before next scene
};

export type CopyAnnotation = {
  text: string;
  position: 'top' | 'middle' | 'bottom';
};

export type Scene = {
  id: string;
  narration: string;
  copy?: CopyAnnotation;
  choices?: Choice[];
  fac?: FacNote;
  dimension?: 'dis' | 'con' | 'lit' | 'app';  // dimension principale de la scène
  // endings
  is_ending?: boolean;
  ending_type?: 'A' | 'B' | 'C';
  ending_score?: string;
  ending_title?: string;
  ending_message?: string;
  ending_bridge?: string;  // the pedagogical bridge at the end
};

export type GameState = {
  currentScene: string;
  gauges: Gauges;
  history: Array<{ scene: string; choice: string }>;
  lastResponse: string | null;
  facMode: boolean;
  ended: boolean;
  ending: 'A' | 'B' | 'C' | null;
};
