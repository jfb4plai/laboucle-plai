import { useEffect, useRef } from 'react';
import { useGame } from '../hooks/useGame';
import { scenes, getProgression } from '../data/scenario';
import GaugeBar from '../components/GaugeBar';
import CopyCard from '../components/CopyCard';
import FacNotePanel from '../components/FacNote';
import ChoiceButton from '../components/ChoiceButton';

export default function Game({ onRestart }: { onRestart: () => void }) {
  const { state, dispatch } = useGame();
  const topRef = useRef<HTMLDivElement>(null);

  const scene = scenes[state.currentScene];

  // Scroll to top on scene change
  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [state.currentScene, state.lastResponse]);

  if (!scene) return null;

  // ── ENDING SCREEN ──
  if (state.ended) {
    const endScene = scene;
    const prog = getProgression(state.gauges);
    const endingColor = endScene.ending_type === 'C' ? '#16a34a' : endScene.ending_type === 'B' ? '#2563eb' : '#6b5a4e';

    return (
      <div className="min-h-screen bg-paper flex flex-col">
        <GaugeBar gauges={state.gauges} />
        <div className="flex-1 flex flex-col items-center justify-start px-6 py-10">
          <div className="max-w-xl w-full">
            <div ref={topRef} />
            {/* Score badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white font-mono text-sm font-semibold mb-6"
              style={{ backgroundColor: endingColor }}
            >
              <span>{endScene.ending_score}</span>
              <span className="opacity-60">·</span>
              <span>Progression : {prog}/30</span>
            </div>

            <h2 className="font-serif text-3xl font-semibold text-ink-soft mb-4">{endScene.ending_title}</h2>

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

            {/* Parcours summary */}
            <details className="mb-6 text-xs text-ink-muted">
              <summary className="cursor-pointer font-mono hover:text-ink">Voir le parcours complet</summary>
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

  // ── RESPONSE SCREEN (after a choice, before the next scene) ──
  if (state.lastResponse) {
    return (
      <div className="min-h-screen bg-paper flex flex-col">
        <GaugeBar gauges={state.gauges} />
        <div className="flex-1 flex flex-col items-center px-6 py-10">
          <div className="max-w-xl w-full" ref={topRef}>
            <div className="bg-paper-light border border-stone-200 rounded-2xl p-6 mb-6 shadow-sm">
              <p className="narrator text-sm">{state.lastResponse}</p>
            </div>
            <button
              onClick={() => dispatch({ type: 'CONTINUE_FROM_RESPONSE' })}
              className="w-full py-3 rounded-xl text-sm font-semibold text-white transition"
              style={{ backgroundColor: '#3d2b1f' }}
            >
              Continuer →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── NORMAL SCENE ──
  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <GaugeBar gauges={state.gauges} />

      <div className="flex-1 flex flex-col items-center px-6 py-8">
        <div className="max-w-xl w-full" ref={topRef}>

          {/* Scene narration */}
          <div className="bg-paper-light border border-stone-200 rounded-2xl p-6 mb-4 shadow-sm">
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

          {/* Facilitation note */}
          {state.facMode && scene.fac && <FacNotePanel note={scene.fac} />}

          {/* Progress indicator */}
          <div className="mt-8 flex items-center justify-between text-xs font-mono text-ink-muted">
            <span>{state.history.length} choix effectués</span>
            <span>Progression : {getProgression(state.gauges)}/30</span>
          </div>
        </div>
      </div>
    </div>
  );
}
