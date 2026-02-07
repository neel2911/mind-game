export type SettingsType = {
  playerName: string | null;
  difficulty: string | null;
  highScore: string | null;
};

export type CardType = {
  id: number;
  matchKey: number;
  url: string;
  isMatched: boolean;
  isFlipped: boolean;
};

export type AttemptType = [number, number][];

export type TimerIdType = ReturnType<typeof setTimeout> | null;

export type TabsType = "play" | "rules" | "settings";
