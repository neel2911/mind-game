import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState, type ComponentProps } from 'react';
import string from "@/i18n/en.json"
import { useGame } from "./hooks/useGame";
import clsx from "clsx";

const { instruction } = string.playArea

const FlipCard = (props: { frontSide: React.ReactNode, backSide: React.ReactNode, isFlipped: boolean, handleFlip: () => void }) => {
    const { frontSide, backSide, isFlipped, handleFlip } = props
    return (
        <div className="h-25 w-20 perspective-[1000px] cursor-pointer relative shadow-lg">

            {/* CARD: The container that actually rotates */}
            <div
                onClick={handleFlip}
                className={cn('relative h-full w-full cursor-pointer rounded-xl shadow-xl transition-all duration-500 transform-3d', { 'transform-[rotateY(180deg)]': isFlipped })}
            >

                {/* FRONT FACE */}
                <div className="absolute inset-0 h-full w-full backface-hidden">
                    {backSide}
                </div>

                {/* BACK FACE */}
                <div className="absolute inset-0 h-full w-full transform-[rotateY(180deg)] backface-hidden">
                    {frontSide}
                </div>

            </div>
        </div>
    );
};

export default FlipCard;

const Image: React.FC<ComponentProps<'img'>> = (props) => {
    const { src, alt } = props

    return <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover rounded-lg border-2 border-slate-200/80"
    />
}


const Card = (props: {
    index: number,
    cardId: number,
    backImgSrc: string,
    frontImgSrc: string,
    matched: boolean,
    heightInPx: string
    widthInPx: string
}) => {
    const { index, cardId, backImgSrc, frontImgSrc, matched, widthInPx, heightInPx } = props
    const [isFlipped, setIsFlipped] = useState(false);
    const { handleCardFlip } = useGame()

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
        handleCardFlip(cardId)
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            style={{ width: widthInPx, height: heightInPx }}
        >
            {!matched && <FlipCard
                backSide={<Image src={backImgSrc} alt="card back" />}
                frontSide={<Image src={frontImgSrc} alt={`card-${cardId}`} />}
                handleFlip={handleFlip} isFlipped={isFlipped}
            />}

        </motion.div>
    );
};



export const PlayArea = () => {

    const { playCards, columns } = useGame()
    console.log({ playCards })
    return (
        <div className="flex flex-col items-center justify-center h-full space-y-8">
            {/* The Card Grid */}
            <div className={clsx("grid gap-4 p-4 bg-slate-950/30 rounded-2xl border border-slate-800/50 grid-cols-8 md:grid-cols-8", {
                'grid-cols-4 md:grid-cols-4': columns === 4,
            })}>
                {playCards.map((card, i) => (
                    <Card
                        key={`${card.id}-${i}`}
                        index={i}
                        cardId={card.id}
                        backImgSrc="/mind-game/images/back.png"
                        frontImgSrc={card.url}
                        heightInPx="100px"
                        widthInPx="80"
                        matched={false} />
                ))}
            </div>

            <div className="text-sm text-slate-500 italic">
                {instruction}
            </div>
        </div >
    );
};