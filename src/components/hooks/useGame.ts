import { useSettings } from "@/context/SettingContext"
import type { CardType } from "@/types/game"
import { shuffleCards } from "@/utils/settings"
import { useEffect, useState } from "react"




export const useGame = () => {
    const { settings } = useSettings()
    const { difficulty } = settings

    const [isGameOver, setIsGameOver] = useState(false)
    const [playCards, setPlayCards] = useState<CardType[]>([])

    useEffect(() => {
        if (difficulty) {
            const cards = shuffleCards(Number(difficulty))
            setPlayCards([...cards])
        }
    }, [settings])

    const handleCardFlip = (id: number) => { }

    const checkPair = () => { }

    const updateScore = () => { }

    const resetGame = () => { }

    return {
        playCards,
        handleCardFlip,
    }
}