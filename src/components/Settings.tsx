import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Save } from "lucide-react";

export const Settings = () => {
    return (
        <div className="max-w-md mx-auto py-8 space-y-8">
            <div className="space-y-2 text-center">
                <h2 className="text-2xl font-bold text-white">Game Settings</h2>
                <p className="text-slate-400 text-sm">Customize your gameplay experience</p>
            </div>

            <div className="space-y-6 bg-slate-950/30 p-8 rounded-2xl border border-slate-800">

                {/* Player Name Input */}
                <div className="space-y-2">
                    <Label htmlFor="player" className="text-slate-300">Player Name</Label>
                    <Input
                        id="player"
                        placeholder="Enter name..."
                        defaultValue="dsfsd"
                        className="bg-slate-900 border-slate-700 text-white focus:ring-indigo-500"
                    />
                </div>

                {/* Card Count Dropdown */}
                <div className="space-y-2">
                    <Label htmlFor="cards" className="text-slate-300">Number of Cards</Label>
                    <Select defaultValue="8">
                        <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                            <SelectValue placeholder="Select count" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-slate-700 text-white">
                            <SelectItem value="8">8 Cards (4 Pairs)</SelectItem>
                            <SelectItem value="16">16 Cards (8 Pairs)</SelectItem>
                            <SelectItem value="24">24 Cards (12 Pairs)</SelectItem>
                            <SelectItem value="32">32 Cards (16 Pairs)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Save Button */}
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20">
                    <Save className="w-4 h-4 mr-2" />
                    Save Settings
                </Button>
            </div>
        </div>
    );
};