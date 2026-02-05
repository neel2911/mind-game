import { useCallback, useState } from 'react';
import { GameTabs } from '@/components/GameTabs';
import { GameStatsHeader } from '@/components/GameStatsHeader';
import string from '@/i18n/en.json'
import VictoryModal from './components/Victorymodal';
import { Button } from './components/ui/button';
import confetti from "canvas-confetti"

// The "Elegant" Dark Background
const Background = () => (
  <div className="fixed inset-0 -z-10 h-full w-full bg-slate-950">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
    <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[14px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
  </div>
);

const { title, description } = string.meta

export default function App() {

  const [player] = useState("dsfsd");
  const [score] = useState("80%");
  const [highScore] = useState("75%");
  const [isGameOver, setIsGameOver] = useState(false)

  const handleClick = useCallback(() => {
    setIsGameOver(true)
    const duration = 5 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 50 }
    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min
    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now()
      if (timeLeft <= 0) {
        return clearInterval(interval)
      }
      const particleCount = 50 * (timeLeft / duration)
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    }, 250)



  }, [])
  return (
    <div className="relative min-h-screen flex flex-col items-center pt-20 px-4 font-sans text-slate-100">
      <Background />

      <div className="w-full max-w-4xl space-y-8">
        {/* Header Section with Stats */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-cyan-400">
                {title}
              </h1>
              <p className="text-slate-400 mt-1">{description}</p>
            </div>
            {/* Stats Display from Screenshot */}
            <GameStatsHeader player={player} score={score} highScore={highScore} />
          </div>
        </div>


        {/* Main Tabbed Interface */}
        <GameTabs />

        <Button onClick={handleClick}>Game over</Button>
        <VictoryModal isOpen={isGameOver}
          moves={3}
          onRestart={() => { setIsGameOver(false) }}
          onClose={() => { setIsGameOver(false) }} />
      </div>
    </div>
  );
} 