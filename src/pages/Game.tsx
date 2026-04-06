import { useEffect, useRef } from 'react';
import { useGame } from '../hooks/useGame';
import { scenes, getProgression } from '../data/scenario';
import GaugeBar from '../components/GaugeBar';
import CopyCard from '../components/CopyCard';
import FacNotePanel from '../components/FacNote';
import MechFlash from '../components/MechFlash';
import ChoiceButton from '../components/ChoiceButton';

// ── C — Dimension badge ──────────────────────────────────────────────────────
const DIM_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  dis: { label: 'DISPOSITIONS',  color: '#92400e', bg: '#fffbeb', border: '#fcd34d' },
  con: { label: 'CONCEPTION',    color: '#1e3a5f', bg: '#eff6ff', border: '#93c5fd' },
  lit: { label: 'LITTÉRATIE',    color: '#14532d', bg: '#f0fdf4', border: '#86efac' },
  app: { label: 'APPROPRIATION', color: '#7c2d12', bg: '#fff7ed', border: '#fdba74' },
};

function DimensionBadge({ dimension }: { dimension: string }) {
  const cfg = DIM_CONFIG[dimension];
  if (!cfg) return null;
  return (
    <span
      className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full border"
      style={{ color: cfg.color, backgroundColor: cfg.bg, borderColor: cfg.border }}
    >
      {cfg.label}
    </span>
  );
}

// ── D — Bilan mécanismes (fin de partie) ────────────────────────────────────
function BilanMecanismes({ history }: { history: Array<{ scene: string; choice: string }> }) {
  const visited: string[] = [];
  for (const h of history) {
    if (!visited.includes(h.scene)) visited.push(h.scene);
  }
  const entries = visited.map((id) => scenes[id]).filter((s) => s && s.fac && s.dimension);
  if (entries.length === 0) return null;

  return (
    <div className="mb-6">
      <h3
        className="text-xs font-mono font-bold uppercase tracking-widest mb-3"
        style={{ color: '#1a5c2a' }}
      >
        ⚡ Mécanismes rencontrés dans ce parcours
      </h3>
      <div className="space-y-3">
        {entries.map((s) => (
          <div
            key={s.id}
            className="rounded-xl border p-3"
            style={{ backgroundColor: '#f6faf7', borderColor: '#a8d5ba' }}
          >
            <div className="flex items-center justify-between mb-1 flex-wrap gap-1">
              <span className="text-xs font-semibold text-ink leading-snug">
                {s.fac!.mechanism}
              </span>
              {s.dimension && <DimensionBadge dimension={s.dimension} />}
            </div>
            <p className="text-xs text-ink-muted mb-1 leading-relaxed">
              {s.fac!.implication.split('.')[0]}.
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs italic" style={{ color: '#4a7a5a' }}>
                {s.fac!.reference}
              </span>
              {s.fac!.riss_id && (
                <span
                  className="text-xs font-mono px-1.5 py-0.5 rounded"
                  style={{ backgroundColor: '#d1fae5', color: '#065f46' }}
                >
                  RISS · {s.fac!.riss_id}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Composant principal ──────────────────────────────────────────────────────
export default function Game({ onRestart }: { onRestart: () => void }) {
  const { state, dispatch } = useGame();
  const topRef = useRef<HTMLDivElement>(null);
  const scene = scenes[state.currentScene];

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [state.currentScene, state.lastResponse]);

  if (!scene) return null;

  // ── ENDING SCREEN ──────────────────────────────────────────────────────────
  if (state.ended) {
    const endScene = scene;
    const prog = getProgression(state.gauges);
    const endingColor =
      endScene.ending_type === 'C' ? '#16a34a' :
      endScene.ending_type === 'B' ? '#2563eb' : '#6b5a4e';

    return (
      <div className="min-h-screen bg-paper flex flex-col">
        <GaugeBar gauges={state.gauges} />
        <div className="flex-1 flex flex-col items-center justify-start px-6 py-10">
          <div className="max-w-xl w-full">
            <div ref={topRef} />
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white font-mono text-sm font-semibold mb-6"
              style={{ backgroundColor: endingColor }}
            >
              <span>{endScene.ending_score}</span>
              <span className="opacity-60">·</span>
              <span>Progression : {prog}/30</span>
            </div>

            <h2 className="font-serif text-3xl font-semibold text-ink-soft mb-4">
              {endScene.ending_title}
            </h2>

            <div className="bg-paper-light border border-stone-200 rounded-2xl p-6 mb-6 shadow-sm">
              <p className="narrator text-sm mb-4">{endScene.narration}</p>
              <p className="text-sm text-ink leading-relaxed">{endScene.ending_message}</p>
            </div>

            {endScene.ending_bridge && (
              <div
                className="rounded-xl p-5 mb-6 border"
                style={{ backgroundColor: '#f0f7f0', borderColor: '#b2d8b2' }}
              >
                <p className="text-sm leading-relaxed" style={{ color: '#1a5c2a' }}>
                  {endScene.ending_bridge}
                </p>
              </div>
            )}

            {/* D — Bilan des mécanismes rencontrés dans ce parcours */}
            <BilanMecanismes history={state.history} />

            <details className="mb-6 text-xs text-ink-muted">
              <summary className="cursor-pointer font-mono hover:text-ink">
                Voir le parcours complet
              </summary>
              <div className="mt-2 space-y-1 pl-2 border-l-2 border-stone-200">
                {state.history.map((h, i) => (
                  <p key={i} className="font-mono">
                    {h.scene} → {h.choice}
                  </p>
                ))}
              </div>
            </details>

            <button
              onClick={onRestart}
              className="w-full py-3 rounded-xl border-2 border-stone-300 text-sm font-semibold text-ink-soft hover:border-stone-500 transition"
            >
              ↺ Rejouer
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── RESPONSE SCREEN ────────────────────────────────────────────────────────
  if (state.lastResponse) {
    return (
      <div className="min-h-screen bg-paper flex flex-col">
        <GaugeBar gauges={state.gauges} />
        <div className="flex-1 flex flex-col items-center px-6 py-10">
          <div className="max-w-xl w-full" ref={topRef}>
            <div className="bg-paper-light border border-stone-200 rounded-2xl p-6 mb-4 shadow-sm">
              <p className="narrator text-sm">{state.lastResponse}</p>
            </div>

            {/* A — Flash mécanisme : toujours visible après chaque choix */}
            {scene.fac && (
              <MechFlash fac={scene.fac} dimension={scene.dimension} />
            )}

            <button
              onClick={() => dispatch({ type: 'CONTINUE_FROM_RESPONSE' })}
              className="w-full py-3 rounded-xl text-sm font-semibold text-white transition mt-4"
              style={{ backgroundColor: '#3d2b1f' }}
            >
              Continuer →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── NORMAL SCENE ───────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <GaugeBar gauges={state.gauges} />
      <div className="flex-1 flex flex-col items-center px-6 py-8">
        <div className="max-w-xl w-full" ref={topRef}>

          {/* C — Badge dimension + narration */}
          <div className="bg-paper-light border border-stone-200 rounded-2xl p-6 mb-4 shadow-sm">
            {scene.dimension && (
              <div className="flex justify-end mb-3">
                <DimensionBadge dimension={scene.dimension} />
              </div>
            )}
            <p className="narrator text-sm">{scene.narration}</p>
            {scene.copy && <CopyCard copy={scene.copy} />}
          </div>

          {/* Choices */}
          {scene.choices && scene.choices.length > 0 && (
            <div className="space-y-3 mb-6">
              {scene.choices.map((choice, i) => (
                <ChoiceButton
                  key={choice.id}
                  choice={choice}
                  index={i}
                  onClick={() => dispatch({ type: 'MAKE_CHOICE', choice })}
                />
              ))}
            </div>
          )}

          {/* B — FacNote complète visible uniquement en mode facilitation */}
          {state.facMode && scene.fac && <FacNotePanel note={scene.fac} />}

          <div className="mt-8 flex items-center justify-between text-xs font-mono text-ink-muted">
            <span>{state.history.length} choix effectués</span>
            <span>Progression : {getProgression(state.gauges)}/30</span>
          </div>
        </div>
      </div>
    </div>
  );
}
