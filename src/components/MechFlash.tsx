import type { FacNote } from '../types';

const DIMENSION_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  dis: { label: 'DISPOSITIONS',  color: '#92400e', bg: '#fffbeb', border: '#fcd34d' },
  con: { label: 'CONCEPTION',    color: '#1e3a5f', bg: '#eff6ff', border: '#93c5fd' },
  lit: { label: 'LITTÉRATIE',    color: '#14532d', bg: '#f0fdf4', border: '#86efac' },
  app: { label: 'APPROPRIATION', color: '#7c2d12', bg: '#fff7ed', border: '#fdba74' },
};

interface MechFlashProps {
  fac: FacNote;
  dimension?: string;
}

export default function MechFlash({ fac, dimension }: MechFlashProps) {
  const dim = dimension && DIMENSION_CONFIG[dimension] ? DIMENSION_CONFIG[dimension] : null;

  return (
    <div
      className="rounded-xl border mt-4 p-4 text-left"
      style={{ backgroundColor: '#f6faf7', borderColor: '#a8d5ba' }}
    >
      {/* Header row */}
      <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
        <span
          className="text-xs font-mono font-bold tracking-widest uppercase"
          style={{ color: '#1a5c2a' }}
        >
          ⚡ Mécanisme activé
        </span>
        {dim && (
          <span
            className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full border"
            style={{ color: dim.color, backgroundColor: dim.bg, borderColor: dim.border }}
          >
            {dim.label}
          </span>
        )}
      </div>

      {/* Mechanism name */}
      <p className="text-sm font-semibold text-ink mb-1 leading-snug">
        {fac.mechanism}
      </p>

      {/* Key implication — first sentence only */}
      <p className="text-xs text-ink-muted leading-relaxed mb-2">
        {fac.implication.split('.')[0]}.
      </p>

      {/* Reference + RISS badge */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs italic" style={{ color: '#4a7a5a' }}>
          {fac.reference}
        </span>
        {fac.riss_id && (
          <span
            className="text-xs font-mono px-1.5 py-0.5 rounded"
            style={{ backgroundColor: '#d1fae5', color: '#065f46' }}
          >
            RISS · {fac.riss_id}
          </span>
        )}
      </div>
    </div>
  );
}
