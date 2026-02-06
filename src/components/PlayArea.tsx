import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from 'react';
import string from "@/i18n/en.json"
import { useGame } from "./hooks/useGame";
import clsx from "clsx";

const { instruction } = string.playArea

const FlipCard = ({ frontContent, backContent }: { frontContent: React.ReactNode, backContent: React.ReactNode }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className="h-25 w-20 perspective-[1000px] cursor-pointer relative shadow-lg">

            {/* CARD: The container that actually rotates */}
            <div
                onClick={handleFlip}
                className={cn('relative h-full w-full cursor-pointer rounded-xl shadow-xl transition-all duration-500 transform-3d', { 'transform-[rotateY(180deg)]': isFlipped })}
            >

                {/* FRONT FACE */}
                <div className="absolute inset-0 h-full w-full backface-hidden">
                    {frontContent}
                </div>

                {/* BACK FACE */}
                <div className="absolute inset-0 h-full w-full transform-[rotateY(180deg)] backface-hidden">
                    {backContent}
                </div>

            </div>
        </div>
    );
};

export default FlipCard;




const Card = ({ index }: { index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            style={{ width: '80px', height: '100px' }}
        >
            <FlipCard frontContent={<img
                src="/mind-game/images/back.png"
                alt="Card Back"
                className="w-full h-full object-cover rounded-lg border-2 border-slate-200/80"
            />} backContent={<img
                src="/mind-game/images/card_1.png"
                alt="Card Back"
                className="w-full h-full object-cover rounded-lg border-2 border-slate-200/80"
            />} />

        </motion.div>
    );
};



export const PlayArea = () => {

    const { playCards, columns } = useGame()

    return (
        <div className="flex flex-col items-center justify-center h-full space-y-8">
            {/* The Card Grid */}
            <div className={clsx("grid gap-4 p-4 bg-slate-950/30 rounded-2xl border border-slate-800/50", {
                'grid-cols-4 md:grid-cols-4': columns === 4,
                'grid-cols-8 md:grid-cols-8': columns === 8,
                'grid-cols-12 md:grid-cols-12': columns === 12,
                'grid-cols-16 md:grid-cols-16': columns === 16,
                'grid-cols-20 md:grid-cols-20': columns === 20,
                'grid-cols-24 md:grid-cols-24': columns === 24
            })}>

                {playCards.map((_, i) => (
                    <Card key={i} index={i} />
                ))}
            </div>

            <div className="text-sm text-slate-500 italic">
                {instruction}
            </div>
        </div >
    );
};