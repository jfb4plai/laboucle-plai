import type { Choice } from '../types';

export default function ChoiceButton({
  choice,
  index,
  onClick,
}: {
  choice: Choice;
  index: number;
  onClick: () => void;
}) {
  const letters = ['A', 'B', 'C', 'D'];
  return (
    <button
      onClick={onClick}
      className="w-full text-left flex items-start gap-3 px-4 py-3 rounded-xl border-2 border-stone-200 bg-paper-light hover:border-stone-400 hover:bg-stone-50 transition-all duration-150 group"
    >
      <span
        className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono text-white mt-0.5"
        style={{ backgroundColor: '#6b5a4e' }}
      >
        {letters[index]}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-ink group-hover:text-ink-soft">{choice.label}</p>
        {choice.sublabel && (
          <p className="text-xs text-ink-muted mt-0.5 font-serif italic">{choice.sublabel}</p>
        )}
      </div>
    </button>
  );
}
