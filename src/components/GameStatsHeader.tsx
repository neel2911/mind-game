import { User, Trophy, Activity, InfoIcon } from "lucide-react";
import string from '@/i18n/en.json'
import { useSettings } from "@/context/SettingContext";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";


const { player: playerText, best_score, score: scoreText } = string.stats

const ScoreTooltip = () => {
    return (
        <TooltipProvider delayDuration={300}>
            <Tooltip >
                <TooltipTrigger asChild>
                    <div className="ml-2 inline-flex cursor-help items-center text-slate-500 hover:text-indigo-400 transition-colors">
                        <InfoIcon size={16} />
                    </div>
                </TooltipTrigger>
                <TooltipContent
                    side="bottom"
                    // Increased max-width slightly to accommodate the wider formula row
                    className="max-w-[320px] bg-[#0f172a] border-purple-500/30 p-4 text-slate-300 shadow-[0_0_20px_rgba(0,0,0,0.4)]"
                >
                    <div className="space-y-3">
                        <h4 className="font-semibold text-purple-100 text-sm">How is score calculated?</h4>

                        <div className="flex items-center justify-center gap-4 rounded-md bg-black/40 p-3 text-xs font-mono border border-white/5">

                            <div className="text-center text-yellow-400">
                                <span className="block text-slate-400 mb-1 border-b border-white/10 pb-1">
                                    Min. Possible Attempts
                                </span>
                                <span className="block">
                                    Total Attempts
                                </span>
                            </div>
                            <div className="text-purple-400 font-bold text-sm">
                                × 100
                            </div>
                        </div>

                        <p className="text-xs text-slate-400 leading-relaxed">
                            We compare the perfect game (minimum moves) against your actual moves to determine your accuracy percentage.
                        </p>
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default ScoreTooltip;

export const GameStatsHeader = () => {
    const { settings, states } = useSettings()
    const { playerName } = settings
    const { highScore, score } = states
    return (
        <div className="flex items-center h-16 gap-3 bg-slate-900/50 backdrop-blur-md p-2 rounded-xl border border-slate-800">
            <div className="flex flex-col items-center px-4 py-1">
                <span className="text-[10px] uppercase text-slate-500 font-bold flex items-center gap-1">
                    <User className="w-3 h-3" /> {playerText}
                </span>
                <span className="font-mono text-indigo-300 font-semibold">{playerName}</span>
            </div>
            <Separator orientation="vertical" className="bg-slate-700" />
            <div className="flex flex-col items-center px-4 py-1">
                <span className="text-[10px] uppercase text-slate-500 font-bold flex items-center gap-1">
                    <Trophy className="w-3 h-3" /> {best_score}
                </span>
                <span className="font-mono text-emerald-400 font-semibold">{highScore}</span>
            </div>
            <Separator orientation="vertical" className="bg-slate-700" />
            <div className="flex flex-col items-center px-4 py-1">
                <span className="text-[10px] uppercase text-slate-500 font-bold flex items-center gap-1">
                    <Activity className="w-3 h-3" /> {scoreText} <ScoreTooltip />
                </span>
                <span className="font-mono text-amber-400 font-semibold flex items-center justify-between">
                    {score}
                </span>

            </div>
        </div>
    );
};