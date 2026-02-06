import type { CardType } from "@/types/game"

export const DIFFICULTY = [8, 16, 24, 32, 40, 48]
export const DEFAULT_DIFFICULTY = DIFFICULTY[0].toString()
export const LS_SETTINGS_KEY = "memory_game_settings" as const
export const LS_STATES_KEY = "memory_game_states" as const
export const TOTAL_UNIQUE_CARDS = 24

export const CARDS: CardType[] = Array(24).fill(null).map((_item, index) => ({
    id: index + 1,
    url: `/mind-game/images/card_${index + 1}.png`
}))

export function getRandomInt(value: number): number {
    return Math.floor(Math.random() * (value + 1));
}

export function shuffle<T extends any[]>(data: T) {
    const result = [...data];
    for (let i = result.length - 1; i > 0; i--) {
        const j = getRandomInt(i);
        [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
}


export const shuffleCards = (difficulty: number) => {
    const neededCards = difficulty / 2
    const uniqueCards = CARDS.slice(0, neededCards)
    return Math.floor(Math.random() * difficulty) % 2 == 0 ?
        shuffle<CardType[]>([...uniqueCards.reverse(), ...uniqueCards]) :
        shuffle<CardType[]>([...uniqueCards, ...uniqueCards.reverse()])
}