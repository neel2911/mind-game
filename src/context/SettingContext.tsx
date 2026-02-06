import type { SettingsType, StatsType } from "@/types/game";
import { DEFAULT_DIFFICULTY, LS_SETTINGS_KEY, LS_STATES_KEY } from "@/utils/settings";
import { createContext, useCallback, useContext, useEffect, useState, type PropsWithChildren } from "react";

export const SettingsContext = createContext<{
    settings: SettingsType,
    states: StatsType,
    handleUpdateSettings: (settings: SettingsType) => void
    handleUpdateState: (state: StatsType) => void
    handleUpdateScore: (state: StatsType['score']) => void
} | null>(null)

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
}

export const SettingsProvider: React.FC<PropsWithChildren> = (props) => {
    const { children } = props
    const [settings, setSettings] = useState<SettingsType>({ playerName: "", difficulty: DEFAULT_DIFFICULTY })
    const [states, setStates] = useState<StatsType>({ score: String(0), highScore: String(0) })
    const handleUpdateSettings = useCallback((newSettings: SettingsType) => {
        setSettings({ ...newSettings })
        localStorage.setItem(LS_SETTINGS_KEY, JSON.stringify(newSettings))
    }, [])

    const handleUpdateState = useCallback((newStates: StatsType) => {
        localStorage.setItem(LS_STATES_KEY, JSON.stringify(newStates))
    }, [])

    const handleUpdateScore = useCallback((newScore: StatsType['score']) => {
        setStates(preState => ({ ...preState, newScore }))
    }, [])

    useEffect(() => {
        const settings = localStorage.getItem(LS_SETTINGS_KEY)
        const states = localStorage.getItem(LS_STATES_KEY)

        if (settings) {
            setSettings(JSON.parse(settings))
        }

        if (states) {
            setStates((preState) => ({ ...preState, highScore: JSON.parse(states) }))
        }
    }, [])

    return <SettingsContext.Provider value={{ settings, states, handleUpdateSettings, handleUpdateState, handleUpdateScore }}>{children}</SettingsContext.Provider>
}