import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? ''

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export async function saveSession(payload: {
  choices: Array<{ scene: string; choice: string }>;
  final_score: number;
  ending: 'A' | 'B' | 'C';
  fac_mode: boolean;
  gauges_final: { dis: number; con: number; lit: number; app: number };
}) {
  if (!supabase) return;
  try {
    await supabase.from('sessions_laboucle').insert([payload]);
  } catch (_) {
    // silent — never block UX
  }
}
