
import React from 'react';
import Header from './components/Header';
import Controls from './components/Controls';
import PlinkoBoard from './components/PlinkoBoard';
import { usePlinkoGame } from './hooks/usePlinkoGame';


const App: React.FC = () => {
  const {
    rows,
    setRows,
    playCount,
    setPlayCount,
    pins,
    balls,
    multipliers,
    isAnimating,
    startGame,
    results,
  } = usePlinkoGame();

  return (
    <div className="min-h-screen text-white flex flex-col items-center p-4 selection:bg-green-500/20">
      <div className="w-full max-w-screen-2xl mx-auto">
        <Header />
        <main className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <Controls
              rows={rows}
              setRows={setRows}
              playCount={playCount}
              setPlayCount={setPlayCount}
              onPlay={startGame}
              isAnimating={isAnimating}
            />
          </div>
          <div className="lg:col-span-9">
            <PlinkoBoard 
              pins={pins} 
              balls={balls} 
              multipliers={multipliers}
              results={results}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
