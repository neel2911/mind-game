import { useState } from 'react';
import { GameTabs } from '@/components/GameTabs';
import { GameStatsHeader } from '@/components/GameStatsHeader';

// The "Elegant" Dark Background
const Background = () => (
  <div className="fixed inset-0 -z-10 h-full w-full bg-slate-950">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
    <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
  </div>
);

export default function App() {
  // State lifted up for display in Header
  const [player] = useState("dsfsd"); // Default from your screenshot
  const [score] = useState("80%");
  const [highScore] = useState("75%");

  return (
    <div className="relative min-h-screen flex flex-col items-center pt-20 px-4 font-sans text-slate-100">
      <Background />

      <div className="w-full max-w-4xl space-y-8">
        {/* Header Section with Stats */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-white bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
                Memory Game
              </h1>
              <p className="text-slate-400 mt-1">Challenge your cognitive reflexes</p>
            </div>
            {/* Stats Display from Screenshot */}
            <GameStatsHeader player={player} score={score} highScore={highScore} />
          </div>
        </div>

        {/* Main Tabbed Interface */}
        <GameTabs />
      </div>
    </div>
  );
}