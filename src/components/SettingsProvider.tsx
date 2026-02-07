import { SettingsContext } from "@/context/SettingsContext";
import type {
  AttemptType,
  CardType,
  SettingsType,
  TabsType,
  TimerIdType,
} from "@/types/game";
import {
  calculateScore,
  DEFAULT_DIFFICULTY,
  DEFAULT_HIGHSCORE,
  DEFAULT_PLAYERNAME,
  LS_SETTINGS_KEY,
  shuffleCards,
} from "@/utils/settings";
import { CheckCircle2 } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
import { toast } from "sonner";

export const SettingsProvider: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const [settings, setSettings] = useState<SettingsType>(() => {
    const ls_settings_str = localStorage.getItem(LS_SETTINGS_KEY);
    if (ls_settings_str) {
      return JSON.parse(ls_settings_str);
    }
    return {
      playerName: DEFAULT_PLAYERNAME,
      difficulty: DEFAULT_DIFFICULTY,
      highScore: DEFAULT_HIGHSCORE,
    };
  });

  const [playCards, setPlayCards] = useState<CardType[]>(() => {
    const ls_settings_str = localStorage.getItem(LS_SETTINGS_KEY);
    if (ls_settings_str) {
      const data = JSON.parse(ls_settings_str);
      return shuffleCards(Number(data.difficulty));
    }

    return shuffleCards(Number(DEFAULT_DIFFICULTY));
  });

  const [moves, setMoves] = useState<number>(0);

  const [currentTab, setCurrentTab] = useState<TabsType>("play");

  const attemptRef = useRef<AttemptType>([]);
  const timerIdRef = useRef<TimerIdType>(null);

  const isGameOver = playCards.every((card) => card.isMatched === true);

  const handleUpdateSettings = useCallback(
    (newSettings: Omit<SettingsType, "highScore">) => {
      setSettings((preState) => ({ ...preState, ...newSettings }));
      setPlayCards(shuffleCards(Number(newSettings.difficulty)));

      toast("Settings Saved", {
        description: "Your game preferences have been updated.",
        icon: <CheckCircle2 className="h-5 w-5 text-green-400" />,
        duration: 3000,
      });
    },
    [],
  );

  const handleUpdateHighScore = useCallback(() => {
    const score = calculateScore(Number(settings.difficulty), Number(moves));
    const highScore = String(
      score > Number(settings.highScore) ? score : settings.highScore,
    );

    setSettings((preState) => ({ ...preState, highScore }));
  }, [moves, settings.highScore, settings.difficulty]);

  const handleUpdateScore = useCallback(() => {
    setMoves((preState) => preState + 1);
  }, []);

  const handleUpdateTab = useCallback((newTab: TabsType) => {
    setCurrentTab(newTab);
  }, []);

  const handleRestartGame = useCallback(() => {
    handleUpdateHighScore();
    window.location.reload();
  }, [handleUpdateHighScore]);

  const handleChangeSettings = useCallback(() => {
    handleUpdateHighScore();
    setPlayCards(shuffleCards(Number(settings.difficulty)));
    handleUpdateTab("settings");
  }, [handleUpdateHighScore, handleUpdateTab, settings.difficulty]);

  const handleFlipCard = useCallback((id: number, filp: boolean) => {
    setPlayCards((prevState) =>
      prevState.map((card) =>
        card.id === id ? { ...card, isFlipped: filp } : card,
      ),
    );
  }, []);

  const handleMatchCard = useCallback((id: number, match: boolean) => {
    setPlayCards((prevState) =>
      prevState.map((card) =>
        card.id === id ? { ...card, isMatched: match } : card,
      ),
    );
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  return (
    <SettingsContext.Provider
      value={{
        settings,
        moves,
        playCards,
        isGameOver,
        attemptRef,
        timerIdRef,
        currentTab,
        handleUpdateTab,
        handleUpdateSettings,
        handleUpdateScore,
        handleRestartGame,
        handleChangeSettings,
        handleFlipCard,
        handleMatchCard,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
