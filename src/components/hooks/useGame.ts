import { useSettings } from "@/context/SettingContext"
import type { CardType } from "@/types/game"
import { CARDS, getRandomInt, TOTAL_UNIQUE_CARDS } from "@/utils/settings"
import { useEffect, useMemo, useState } from "react"




export const useGame = () => {
    const { settings } = useSettings()
    const { difficulty } = settings


    const [isGameOver, setIsGameOver] = useState(false)
    const [playCards, setPlayCards] = useState<CardType[]>([])



    const getCards = () => {

        const uniqueCardsCount = Number(difficulty) / 2
        const uniqueCards = new Map()
        let playCardList: CardType[] = []

        while (uniqueCards.size < uniqueCardsCount) {
            const index = getRandomInt(1, TOTAL_UNIQUE_CARDS - 1)
            const card = CARDS[index]
            if (!uniqueCards.has(card.id)) {
                uniqueCards.set(card.id, card)
            }
        }

        playCardList = [...uniqueCards.values()]
        const remainingCardsSet = [...uniqueCards.values()]

        while (remainingCardsSet.length > 0) {
            const totalCardsLimit = Number(difficulty) - 1
            const remainingCard = getRandomInt(1, totalCardsLimit) % 2 == 0 ? remainingCardsSet.pop() : remainingCardsSet.shift()

            if (getRandomInt(1, totalCardsLimit) % 2 != 0) {
                playCardList.push(remainingCard)
            } else {
                playCardList.unshift(remainingCard)
            }
        }

        setPlayCards([...playCardList])
    }

    useEffect(() => {
        getCards()
    }, [])

    const checkPair = () => { }

    const updateScore = () => { }

    const resetGame = () => { }

    return {
        playCards,
        columns: Number(difficulty) / 2
    }
}