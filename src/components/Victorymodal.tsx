import { Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import string from '@/i18n/en.json'

const { game, stats, controls } = string.victory

const VictoryModal = ({ isOpen, moves, onRestart, onClose }: {
    isOpen: boolean,
    moves: number,
    onRestart: () => void,
    onClose: () => void
}) => {

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

                    {/* BACKDROP: Fades in/out */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* MODAL CARD: Pops up with a bounce */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{
                            type: "spring",
                            damping: 25,
                            stiffness: 300
                        }}
                        className="relative w-full max-w-md overflow-hidden rounded-3xl bg-[#0f172a] p-10 text-center shadow-2xl border border-white/10"
                    >

                        {/* TROPHY ICON */}
                        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-indigo-600/20 ring-4 ring-indigo-600/30">
                            <Trophy className="h-12 w-12 text-indigo-400 animate-bounce" />
                        </div>

                        {/* HEADLINES */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <h3 className="text-4xl font-extrabold leading-none text-white tracking-tight">
                                {game.victory_title}
                            </h3>
                            <p className="mt-4 text-lg text-gray-300 font-medium">
                                {game.victory_subtitle}
                            </p>
                        </motion.div>

                        {/* STATS GRID */}
                        <motion.div
                            className="mt-10"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                        >
                            <div className="flex flex-col items-center justify-center rounded-2xl bg-white/5 p-6 border border-white/10">
                                <span className="text-sm font-bold uppercase tracking-wider text-indigo-300">
                                    {stats.moves_label}
                                </span>
                                <span className="mt-2 text-5xl font-black text-yellow-400">
                                    {moves}
                                </span>
                            </div>
                        </motion.div>

                        {/* BUTTONS */}
                        <motion.div
                            className="mt-10 flex flex-col gap-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <button
                                onClick={onRestart}
                                className="w-full inline-flex justify-center items-center rounded-xl bg-indigo-600 px-6 py-4 text-lg font-bold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#0f172a] transition-all duration-200"
                            >
                                {controls.play_again}
                            </button>

                            <button
                                onClick={onClose}
                                className="w-full inline-flex justify-center rounded-xl px-6 py-3 text-base font-semibold text-gray-400 hover:text-white transition-colors"
                            >
                                {controls.close}
                            </button>
                        </motion.div>

                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default VictoryModal;