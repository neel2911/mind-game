import type { CardType } from "@/types/game";

export const DIFFICULTY = [8, 16, 24, 32, 40, 48];
export const DEFAULT_DIFFICULTY = DIFFICULTY[0].toString();
export const LS_SETTINGS_KEY = "memory_game_settings" as const;
export const TOTAL_UNIQUE_CARDS = 24 as const;
export const DEFAULT_PLAYERNAME = "Player 1" as const;
export const DEFAULT_HIGHSCORE = "0" as const;

export const CARDS: CardType[] = Array(24)
  .fill(null)
  .map((_item, index) => ({
    id: index + 1,
    matchKey: index + 1,
    url: `/mind-game/images/card_${index + 1}.png`,
    isMatched: false,
    isFlipped: false,
  }));

export function getRandomInt(value: number): number {
  return Math.floor(Math.random() * (value + 1));
}

export function shuffle<T extends Record<string, unknown>[]>(data: T) {
  const result = [...data];
  for (let i = result.length - 1; i > 0; i--) {
    const j = getRandomInt(i);
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result.map((cards, index) => ({ ...cards, id: index }));
}

export const shuffleCards = (difficulty: number) => {
  const neededCards = difficulty / 2;
  const uniqueCards = CARDS.slice(0, neededCards);
  return Math.floor(Math.random() * difficulty) % 2 == 0
    ? shuffle<CardType[]>([...uniqueCards.reverse(), ...uniqueCards])
    : shuffle<CardType[]>([...uniqueCards, ...uniqueCards.reverse()]);
};

export const calculateScore = (difficulty: number, totalAttempts: number) => {
  const idealAttempts = difficulty / 2; // This is not possible unless all the pairs match in first trial or you are lucky.
  if (totalAttempts <= 0) {
    return 0;
  }

  return Math.floor((idealAttempts / totalAttempts) * 100);
};
