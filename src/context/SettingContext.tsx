import type { SettingsType, StatsType } from "@/types/game";
import { LS_SETTINGS_KEY, LS_STATES_KEY } from "@/utils/settings";
import { CheckCircle2 } from "lucide-react";
import { createContext, useCallback, useContext, useEffect, useState, type PropsWithChildren } from "react";
import { toast } from "sonner";

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
    const [settings, setSettings] = useState<SettingsType>({ playerName: "", difficulty: null })
    const [states, setStates] = useState<StatsType>({ score: String(0), highScore: String(0) })
    const handleUpdateSettings = useCallback((newSettings: SettingsType) => {
        setSettings({ ...newSettings })
        localStorage.setItem(LS_SETTINGS_KEY, JSON.stringify(newSettings))
        toast("Settings Saved", {
            description: "Your game preferences have been updated.",
            icon: <CheckCircle2 className="h-5 w-5 text-green-400" />, // Adds the green checkmark
            duration: 3000
        })
    }, [])

    const handleUpdateState = useCallback((newStates: StatsType) => {
        localStorage.setItem(LS_STATES_KEY, JSON.stringify(newStates))
    }, [])

    const handleUpdateScore = useCallback((newScore: StatsType['score']) => {
        setStates(preState => ({ ...preState, newScore }))
    }, [])

    useEffect(() => {

        const ls_settings = localStorage.getItem(LS_SETTINGS_KEY)
        const ls_states = localStorage.getItem(LS_STATES_KEY)

        console.log(ls_settings)
        if (ls_settings) {
            setSettings({ ...JSON.parse(ls_settings) })
        }

        if (ls_states) {
            setStates((preState) => ({ ...preState, highScore: JSON.parse(ls_states) }))
        }
    }, [])

    console.log({ settings })

    return <SettingsContext.Provider value={{ settings, states, handleUpdateSettings, handleUpdateState, handleUpdateScore }}>{children}</SettingsContext.Provider>
}