import type {
  AttemptType,
  CardType,
  SettingsType,
  TabsType,
  TimerIdType,
} from "@/types/game";
import { createContext, useContext, type RefObject } from "react";

export const SettingsContext = createContext<{
  settings: SettingsType;
  moves: number;
  playCards: CardType[];
  isGameOver: boolean;
  attemptRef: RefObject<AttemptType>;
  timerIdRef: RefObject<TimerIdType>;
  currentTab: TabsType;
  handleUpdateTab: (tab: TabsType) => void;
  handleUpdateSettings: (settings: Omit<SettingsType, "highScore">) => void;
  handleUpdateScore: () => void;
  handleRestartGame: () => void;
  handleChangeSettings: () => void;
  handleFlipCard: (id: number, flip: boolean) => void;
  handleMatchCard: (id: number, match: boolean) => void;
} | null>(null);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
