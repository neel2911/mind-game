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

export function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

