import { useReducer, useEffect } from 'react';
import type { GameState, Choice } from '../types';
import { scenes, INITIAL_GAUGES, getProgression } from '../data/scenario';
import { saveSession } from '../lib/supabase';

type Action =
  | { type: 'MAKE_CHOICE'; choice: Choice }
  | { type: 'CONTINUE_FROM_RESPONSE' }
  | { type: 'RESET' };

const initialState = (facMode: boolean): GameState => ({
  currentScene: 'intro',
  gauges: { ...INITIAL_GAUGES },
  history: [],
  lastResponse: null,
  facMode,
  ended: false,
  ending: null,
});

function clamp(v: number, min = 0, max = 30) {
  return Math.max(min, Math.min(max, v));
}

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'MAKE_CHOICE': {
      const choice = action.choice;
      const effects = choice.effects;
      const newGauges = {
        dis: clamp(state.gauges.dis + (effects.dis ?? 0)),
        con: clamp(state.gauges.con + (effects.con ?? 0)),
        lit: clamp(state.gauges.lit + (effects.lit ?? 0)),
        app: clamp(state.gauges.app + (effects.app ?? 0)),
      };
      const nextScene = scenes[choice.next];
      const ended = !!nextScene?.is_ending;
      return {
        ...state,
        gauges: newGauges,
        history: [...state.history, { scene: state.currentScene, choice: choice.id }],
        lastResponse: choice.response ?? null,
        ended,
        ending: ended ? (nextScene?.ending_type ?? null) : state.ending,
        currentScene: choice.response ? state.currentScene : choice.next,
        // if there's a response, we stay in current scene with lastResponse set
        // and wait for CONTINUE_FROM_RESPONSE
      };
    }
    case 'CONTINUE_FROM_RESPONSE': {
      // Find the choice that was last made to get the next scene
      const lastHistoryItem = state.history[state.history.length - 1];
      if (!lastHistoryItem) return state;
      const scene = scenes[lastHistoryItem.scene];
      if (!scene?.choices) return state;
      const choice = scene.choices.find(c => c.id === lastHistoryItem.choice);
      if (!choice) return state;
      const nextScene = scenes[choice.next];
      const ended = !!nextScene?.is_ending;
      return {
        ...state,
        currentScene: choice.next,
        lastResponse: null,
        ended,
        ending: ended ? (nextScene?.ending_type ?? null) : state.ending,
      };
    }
    case 'RESET':
      return initialState(state.facMode);
    default:
      return state;
  }
}

export function useGame() {
  const facMode = new URLSearchParams(window.location.search).get('fac') === '1';
  const [state, dispatch] = useReducer(reducer, initialState(facMode));

  // Save session when game ends
  useEffect(() => {
    if (state.ended && state.ending) {
      const prog = getProgression(state.gauges);
      saveSession({
        choices: state.history,
        final_score: prog,
        ending: state.ending,
        fac_mode: state.facMode,
        gauges_final: state.gauges,
      });
    }
  }, [state.ended, state.ending]);

  return { state, dispatch };
}
