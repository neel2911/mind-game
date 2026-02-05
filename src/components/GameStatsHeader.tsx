import { User, Trophy, Activity } from "lucide-react";
import string from '@/i18n/en.json'

interface StatsProps {
    player: string;
    highScore: string;
    score: string;
}

const { player: playerText, best_score, score: scoreText } = string.stats

export const GameStatsHeader = ({ player, highScore, score }: StatsProps) => {
    return (
        <div className="flex items-center gap-3 bg-slate-900/50 backdrop-blur-md p-2 rounded-xl border border-slate-800">
            <div className="flex flex-col items-center px-4 py-1 border-r border-slate-700">
                <span className="text-[10px] uppercase text-slate-500 font-bold flex items-center gap-1">
                    <User className="w-3 h-3" /> {playerText}
                </span>
                <span className="font-mono text-indigo-300 font-semibold">{player}</span>
            </div>

            <div className="flex flex-col items-center px-4 py-1 border-r border-slate-700">
                <span className="text-[10px] uppercase text-slate-500 font-bold flex items-center gap-1">
                    <Trophy className="w-3 h-3" /> {best_score}
                </span>
                <span className="font-mono text-emerald-400 font-semibold">{highScore}</span>
            </div>

            <div className="flex flex-col items-center px-4 py-1">
                <span className="text-[10px] uppercase text-slate-500 font-bold flex items-center gap-1">
                    <Activity className="w-3 h-3" /> {scoreText}
                </span>
                <span className="font-mono text-amber-400 font-semibold">{score}</span>
            </div>
        </div>
    );
};