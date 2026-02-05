import { ScrollText, MousePointer2, CheckCircle, XCircle, Calculator } from "lucide-react";
import string from '@/i18n/en.json'

const { title } = string.rules
const rules = [
    {
        icon: ScrollText,
        text: "The cards are placed face down. Each card has a matching card hidden elsewhere on the board.",
        color: "text-blue-400"
    },
    {
        icon: MousePointer2,
        text: "For each turn, the player selects two cards to flip them over.",
        color: "text-indigo-400"
    },
    {
        icon: CheckCircle,
        text: "If the cards match, they are removed from the board permanently.",
        color: "text-emerald-400"
    },
    {
        icon: XCircle,
        text: "If the cards don't match, they are turned face down again. Try to remember their positions!",
        color: "text-rose-400"
    },
    {
        icon: Calculator,
        text: "At the end of the game, you receive a score based on the number of correct selections made.",
        color: "text-amber-400"
    }
];

export const Instructions = () => {
    return (
        <div className="max-w-2xl mx-auto py-4">
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3 border-b border-slate-800 pb-4">
                <ScrollText className="w-6 h-6 text-indigo-500" />
                {title}
            </h2>

            <div className="space-y-4">
                {rules.map((rule, idx) => (
                    <div
                        key={idx}
                        className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/20 border border-slate-700 hover:bg-slate-800/40 transition-colors"
                    >
                        <div className={`mt-1 p-2 rounded-lg bg-slate-900 ${rule.color}`}>
                            <rule.icon className="w-5 h-5" />
                        </div>
                        <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                            {rule.text}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};