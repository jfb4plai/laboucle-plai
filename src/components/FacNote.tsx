import type { FacNote } from '../types';

export default function FacNotePanel({ note }: { note: FacNote }) {
  return (
    <div
      className="mt-6 rounded-xl border p-4 text-sm"
      style={{ backgroundColor: '#e8f4e8', borderColor: '#b2d8b2', color: '#1a5c2a' }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-base">🔬</span>
        <span className="font-semibold text-xs uppercase tracking-wide">Note facilitation</span>
      </div>
      <p className="font-semibold mb-1">{note.mechanism}</p>
      <p className="mb-2 opacity-80 text-xs">
        {note.reference}
        {note.riss_id && (
          <span className="ml-1 font-mono text-[10px] px-1 rounded" style={{ backgroundColor: '#b2d8b2' }}>
            RISS : {note.riss_id}
          </span>
        )}
      </p>
      <p className="leading-relaxed">{note.implication}</p>
    </div>
  );
}
