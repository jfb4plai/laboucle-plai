import { useState } from 'react';
import Landing from './pages/Landing';
import Game from './pages/Game';

export default function App() {
  const [started, setStarted] = useState(false);
  const [key, setKey] = useState(0);

  function restart() {
    setKey(k => k + 1);
    setStarted(false);
  }

  return started
    ? <Game key={key} onRestart={restart} />
    : <Landing onStart={() => setStarted(true)} />;
}
