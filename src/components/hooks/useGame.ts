import { useSettings } from "@/context/SettingsContext";
import { useCallback } from "react";

export const useGame = () => {
  const {
    attemptRef,
    timerIdRef,
    handleUpdateScore,
    handleFlipCard,
    handleMatchCard,
  } = useSettings();

  const updateScore = useCallback(() => {
    handleUpdateScore();
  }, [handleUpdateScore]);

  const areAttemptsMatched = useCallback((item1: number, item2: number) => {
    return item1 === item2;
  }, []);

  const checkMatch = () => {
    if (attemptRef.current[0] !== null && attemptRef.current[1] !== null) {
      const isMatched = areAttemptsMatched(
        attemptRef.current[0][1],
        attemptRef.current[1][1],
      );
      if (isMatched) {
        handleMatchCard(attemptRef.current[0][0], true);
        handleMatchCard(attemptRef.current[1][0], true);
      } else {
        handleFlipCard(attemptRef.current[0][0], false);
        handleFlipCard(attemptRef.current[1][0], false);
      }
      updateScore();
      attemptRef.current = [];
    }
  };

  const handleCardFlip = (id: number, matchKey: number) => {
    if (attemptRef.current.length < 2) {
      handleFlipCard(id, true);
      attemptRef.current.push([id, matchKey]);
    }

    if (attemptRef.current.length >= 2 && timerIdRef.current == null) {
      timerIdRef.current = setTimeout(() => {
        checkMatch();
        timerIdRef.current = null;
      }, 500);
    }
  };

  const restartGame = () => {};

  return {
    handleCardFlip,
    restartGame,
  };
};
