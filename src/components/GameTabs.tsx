import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlayCircle, BookOpen, Settings2 } from "lucide-react";
import { PlayArea } from "./PlayArea";
import { Instructions } from "./Instructions";
import { Settings } from "./Settings";

export const GameTabs = () => {
    return (
        <Tabs defaultValue="play" className="w-full flex flex-col items-center">

            {/* CUSTOM TAB DESIGN 
         Based on your screenshot: Floating dark capsule with purple active state 
      */}
            <TabsList className="relative flex items-center justify-center h-14 p-1 rounded-full bg-slate-950/80 border border-slate-800/60 backdrop-blur-xl shadow-2xl mb-8">

                <TabsTrigger
                    value="play"
                    className="flex items-center gap-2 hover:text-white rounded-full px-8 py-2.5 text-sm font-medium text-slate-400 transition-all data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-[0_0_20px_rgba(79,70,229,0.4)]"
                >
                    <PlayCircle className="w-4 h-4" />
                    <span>Play</span>
                </TabsTrigger>

                <TabsTrigger
                    value="rules"
                    className="flex items-center gap-2 hover:text-white rounded-full px-8 py-2.5 text-sm font-medium text-slate-400 transition-all data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-[0_0_20px_rgba(79,70,229,0.4)]"
                >
                    <BookOpen className="w-4 h-4" />
                    <span>Rules</span>
                </TabsTrigger>

                <TabsTrigger
                    value="settings"
                    className="flex items-center gap-2 hover:text-white rounded-full px-8 py-2.5 text-sm font-medium text-slate-400 transition-all data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-[0_0_20px_rgba(79,70,229,0.4)]"
                >
                    <Settings2 className="w-4 h-4" />
                    <span>Settings</span>
                </TabsTrigger>

            </TabsList>

            {/* Content Container - Glassmorphism */}
            <div className="w-full max-w-4xl bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl min-h-[400px]">
                <TabsContent value="play" className="mt-0 outline-none animate-in fade-in zoom-in-95 duration-300">
                    <PlayArea />
                </TabsContent>

                <TabsContent value="rules" className="mt-0 outline-none animate-in fade-in slide-in-from-right-4 duration-300">
                    <Instructions />
                </TabsContent>

                <TabsContent value="settings" className="mt-0 outline-none animate-in fade-in slide-in-from-right-4 duration-300">
                    <Settings />
                </TabsContent>
            </div>
        </Tabs>
    );
};