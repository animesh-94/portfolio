"use client";
import { useState } from "react";
import { Gamepad2 } from "lucide-react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";

const TicTacToe = dynamic(() => import("@/components/games/TicTacToe"), { ssr: false });
const SnakeAndLadder = dynamic(() => import("@/components/games/SnakeAndLadder"), { ssr: false });

const games = [
  {
    id: "tictactoe",
    name: "Tic-Tac-Toe",
    desc: "Classic 3×3 game. Play vs a friend or challenge the AI with minimax.",
    tag: "Strategy · 1-2 Players",
    component: TicTacToe,
  },
  {
    id: "snakeladder",
    name: "Snake & Ladder",
    desc: "Roll the dice, climb ladders, dodge snakes. Full 10×10 board.",
    tag: "Luck · 2 Players",
    component: SnakeAndLadder,
  },
];

export default function Games() {
  const [active, setActive] = useState<string | null>(null);
  const activeGame = games.find((g) => g.id === active);

  return (
    <motion.section 
      id="games" 
      className="py-24 section-container bg-white relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Decorative Background Marker */}
      <div className="absolute top-0 left-0 p-8 font-mono text-[80px] text-neutral-50 font-black select-none pointer-events-none hidden lg:block uppercase tracking-tighter leading-none">
        PLAY<br />_ZONE_01
      </div>

      <div className="relative mb-20">
        <motion.div 
          className="flex items-center gap-3 mb-4"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="w-8 h-1 bg-black"></span>
          <span className="font-mono text-xs font-black uppercase tracking-[0.2em] text-neutral-400">Interactive_Modules</span>
        </motion.div>
        <motion.h2 
          className="text-5xl md:text-6xl font-black text-black uppercase tracking-tighter"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Terminal_Games
        </motion.h2>
      </div>

      <AnimatePresence mode="wait">
        {!active ? (
          /* Game picker */
          <motion.div 
            key="picker"
            className="grid md:grid-cols-2 gap-10 mt-12 max-w-4xl mx-auto relative px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {games.map((game, i) => (
              <motion.button
                key={game.id}
                onClick={() => setActive(game.id)}
                className="p-12 bg-white border-2 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all flex flex-col items-center gap-8 group text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * (i + 1) }}
              >
                <div className="w-24 h-24 border-2 border-black flex items-center justify-center bg-white group-hover:bg-black group-hover:text-white transition-all duration-300">
                  <Gamepad2 size={40} />
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest mb-3 font-black">{game.tag}</p>
                  <h3 className="font-black text-black text-2xl uppercase tracking-tighter group-hover:underline underline-offset-8 decoration-4">
                    {game.name}
                  </h3>
                  <p className="text-sm text-neutral-500 mt-6 leading-relaxed font-medium">{game.desc}</p>
                </div>
                <span className="text-[10px] font-mono font-black text-black border-2 border-black px-6 py-3 hover:bg-black hover:text-white transition-all uppercase tracking-widest mt-4">
                  Initialize_Session ↳
                </span>
              </motion.button>
            ))}
          </motion.div>
        ) : (
          /* Active game */
          <motion.div 
            key="game"
            className="bg-white border-2 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] p-8 md:p-16 mt-8 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="flex items-center justify-between mb-16 border-b-2 border-neutral-100 pb-10">
              <div>
                <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest mb-2 font-black">
                  {activeGame?.tag}
                </p>
                <h3 className="text-3xl font-black text-black uppercase tracking-tighter">{activeGame?.name}</h3>
              </div>
              <button
                onClick={() => setActive(null)}
                className="text-[10px] font-mono font-black text-black border-2 border-black px-6 py-3 hover:bg-black hover:text-white transition-all uppercase tracking-widest"
              >
                ← Terminate_Process
              </button>
            </div>
            <div className="flex justify-center overflow-x-auto p-4 bg-neutral-50 border border-dashed border-neutral-200">
              {activeGame && <activeGame.component />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
