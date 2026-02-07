import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { type ComponentProps } from "react";
import string from "@/i18n/en.json";
import { useGame } from "./hooks/useGame";
import clsx from "clsx";
import { useSettings } from "@/context/SettingsContext";

const { instruction } = string.playArea;

interface FlipCardProps {
  frontSide: React.ReactNode;
  backSide: React.ReactNode;
  isFlipped: boolean;
  isMatched: boolean;
  handleFlip: () => void;
}

const FlipCard = ({
  frontSide,
  backSide,
  isFlipped,
  isMatched,
  handleFlip,
}: FlipCardProps) => {
  return (
    <motion.div
      className="h-25 w-20 perspective-[1000px] relative"
      // Animation: Fade out and shrink slightly when matched
      animate={
        isMatched ? { opacity: 0, scale: 0.9 } : { opacity: 1, scale: 1 }
      }
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {/* CARD: The container that actually rotates */}
      <div
        onClick={!isFlipped ? handleFlip : undefined}
        className={cn(
          "relative h-full w-full rounded-xl shadow-xl transition-all duration-500 transform-3d",
          // Rotate if flipped
          { "transform-[rotateY(180deg)]": isFlipped },
          // Disable pointer events if matched so you can't click the empty space
          { "pointer-events-none": isMatched },
          // Add cursor pointer only if interactable
          isMatched ? "cursor-default" : "cursor-pointer",
        )}
      >
        {/* FRONT FACE (Usually the Card Back Design) */}
        <div className="absolute inset-0 h-full w-full backface-hidden">
          {backSide}
        </div>

        {/* BACK FACE (The Revealed Content) */}
        <div className="absolute inset-0 h-full w-full transform-[rotateY(180deg)] backface-hidden">
          {frontSide}
        </div>
      </div>
    </motion.div>
  );
};

const Image: React.FC<ComponentProps<"img">> = (props) => {
  const { src, alt } = props;

  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover rounded-lg border-2 border-slate-200/80"
    />
  );
};

const Card = (props: {
  index: number;
  matchKey: number;
  backImgSrc: string;
  frontImgSrc: string;
  heightInPx: string;
  widthInPx: string;
  isFlipped: boolean;
  isMatched: boolean;
}) => {
  const {
    index,
    matchKey,
    backImgSrc,
    frontImgSrc,
    isMatched,
    isFlipped,
    widthInPx,
    heightInPx,
  } = props;

  const { handleCardFlip } = useGame();

  const handleFlip = () => {
    handleCardFlip(index, matchKey);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      style={{ width: widthInPx, height: heightInPx }}
    >
      <FlipCard
        backSide={<Image src={backImgSrc} alt="card back" />}
        frontSide={<Image src={frontImgSrc} alt={`card-${index}`} />}
        handleFlip={handleFlip}
        isFlipped={isFlipped}
        isMatched={isMatched}
      />
    </motion.div>
  );
};

export const PlayArea = () => {
  const { playCards } = useSettings();
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-8">
      {/* The Card Grid */}
      <div
        className={clsx(
          "grid gap-4 p-4 bg-slate-950/30 rounded-2xl border border-slate-800/50 grid-cols-8 md:grid-cols-8",
        )}
      >
        {playCards.map((card) => (
          <Card
            key={card.id}
            index={card.id}
            matchKey={card.matchKey}
            backImgSrc="/mind-game/images/back.png"
            frontImgSrc={card.url}
            heightInPx="100px"
            widthInPx="80"
            isMatched={card.isMatched}
            isFlipped={card.isFlipped}
          />
        ))}
      </div>

      <div className="text-sm text-slate-500 italic">{instruction}</div>
    </div>
  );
};
