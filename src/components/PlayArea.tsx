import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from 'react';

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
                src="/images/back.png"
                alt="Card Back"
                className="w-full h-full object-cover rounded-lg border-2 border-slate-200/80"
            />} backContent={<img
                src="/images/card_1.png"
                alt="Card Back"
                className="w-full h-full object-cover rounded-lg border-2 border-slate-200/80"
            />} />

        </motion.div>
    );
};


export const PlayArea = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full space-y-8">
            {/* The Card Grid */}
            <div className="grid grid-cols-4 md:grid-cols-6 gap-4 p-4 bg-slate-950/30 rounded-2xl border border-slate-800/50">
                {Array.from({ length: 16 }).map((_, i) => ( // displaying 16 cards for example
                    <Card key={i} index={i} />
                ))}
            </div>

            <div className="text-sm text-slate-500 italic">
                Select two cards to find a match
            </div>
        </div>
    );
};