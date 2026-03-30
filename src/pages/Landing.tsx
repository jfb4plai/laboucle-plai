export default function Landing({ onStart }: { onStart: () => void }) {
  const facMode = new URLSearchParams(window.location.search).get('fac') === '1';

  return (
    <div className="min-h-screen bg-paper flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-xl w-full">
        {/* PLAI badge */}
        <div className="flex items-center gap-2 mb-8">
          <span className="text-xs font-mono uppercase tracking-widest text-ink-muted px-3 py-1 border border-stone-300 rounded-full">
            PLAI — Sensibilisation
          </span>
          {facMode && (
            <span className="text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-full" style={{ backgroundColor: '#e8f4e8', color: '#1a5c2a', border: '1px solid #b2d8b2' }}>
              Mode facilitation actif
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="font-serif text-4xl font-semibold text-ink-soft mb-2">La Boucle</h1>
        <p className="text-ink-muted text-sm font-mono mb-8">
          Fermer la boucle entre rétroaction et apprentissage
        </p>

        {/* Intro card */}
        <div className="bg-paper-light border border-stone-200 rounded-2xl p-6 mb-8 shadow-sm">
          <p className="narrator text-sm mb-4">
            Tu joues Alex. Deuxième degré, cours de français. Mme Lambert vient de rendre les copies.
          </p>
          <p className="narrator text-sm mb-4">
            Tes choix déterminent ce que tu feras des commentaires en rouge — et si, cette fois, quelque chose change vraiment.
          </p>
          <p className="text-xs font-mono text-ink-muted mt-4 pt-4 border-t border-stone-200">
            4 jauges · 2 actes · 3 fins · environ 8 minutes
          </p>
        </div>

        {/* Gauge legend */}
        <div className="grid grid-cols-2 gap-2 mb-8">
          {[
            { label: 'Dispositions', desc: 'Ouverture à la rétroaction', color: '#d97706' },
            { label: 'Conception', desc: 'Comprendre les critères', color: '#2563eb' },
            { label: 'Littératie', desc: 'Décoder et planifier', color: '#16a34a' },
            { label: 'Appropriation', desc: 'Agir concrètement', color: '#ea580c' },
          ].map(g => (
            <div key={g.label} className="flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: g.color }} />
              <span className="font-semibold text-ink">{g.label}</span>
              <span className="text-ink-muted">— {g.desc}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={onStart}
          className="w-full py-4 rounded-xl font-semibold text-white transition-all"
          style={{ backgroundColor: '#3d2b1f' }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#1c1917')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#3d2b1f')}
        >
          Recevoir la copie →
        </button>

        {facMode && (
          <p className="text-xs text-ink-muted text-center mt-4 font-mono">
            Les notes de facilitation (fond vert) sont visibles tout au long du jeu.
          </p>
        )}
      </div>
    </div>
  );
}
