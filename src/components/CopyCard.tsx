import type { CopyAnnotation } from '../types';

export default function CopyCard({ copy }: { copy: CopyAnnotation }) {
  return (
    <div className="relative my-4 bg-paper-light border border-stone-200 rounded-lg p-5 shadow-sm">
      {/* Decorative ruled lines */}
      <div className="absolute inset-x-5 top-8 space-y-4 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-px bg-blue-100 opacity-60" />
        ))}
      </div>
      {/* Red ink annotation */}
      <div
        className="relative z-10 font-serif italic text-sm leading-relaxed"
        style={{ color: '#a82520' }}
      >
        <span className="mr-2 text-xs font-mono not-italic opacity-60">
          {copy.position === 'top' && '↗ marge haut'}
          {copy.position === 'middle' && '→ marge droite'}
          {copy.position === 'bottom' && '↘ bas de page'}
        </span>
        {copy.text}
      </div>
    </div>
  );
}
