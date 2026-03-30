import type { Gauges } from '../types';

const GAUGES = [
  { key: 'dis' as const, label: 'Dispositions', color: '#d97706', bg: '#fef3c7' },
  { key: 'con' as const, label: 'Conception',   color: '#2563eb', bg: '#dbeafe' },
  { key: 'lit' as const, label: 'Littératie',   color: '#16a34a', bg: '#dcfce7' },
  { key: 'app' as const, label: 'Appropriation',color: '#ea580c', bg: '#ffedd5' },
];

export default function GaugeBar({ gauges }: { gauges: Gauges }) {
  return (
    <div className="w-full bg-paper-light border-b border-stone-200 px-4 py-3">
      <div className="max-w-2xl mx-auto grid grid-cols-4 gap-3">
        {GAUGES.map(g => {
          const pct = Math.round((gauges[g.key] / 30) * 100);
          return (
            <div key={g.key} className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-ink-muted uppercase tracking-wide">{g.label}</span>
                <span className="text-[10px] font-mono font-semibold" style={{ color: g.color }}>{gauges[g.key]}/30</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: g.bg }}>
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${pct}%`, backgroundColor: g.color }}
                  role="progressbar"
                  aria-valuenow={gauges[g.key]}
                  aria-valuemin={0}
                  aria-valuemax={30}
                  aria-label={g.label}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
