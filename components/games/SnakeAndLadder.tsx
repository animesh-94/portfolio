"use client";
import { useState, useCallback } from "react";
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, RotateCcw } from "lucide-react";

const SNAKES: Record<number, number> = { 17: 7, 54: 34, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 99: 78 };
const LADDERS: Record<number, number> = { 4: 14, 9: 31, 20: 38, 28: 84, 40: 59, 51: 67, 63: 81, 71: 91 };

const DiceIcons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];

function getCellColor(cell: number): string {
  if (SNAKES[cell]) return "bg-red-900/30 border-red-500/30 text-red-400";
  if (LADDERS[cell]) return "bg-green-900/30 border-green-500/30 text-green-400";
  return "border-[#1a2d4a]";
}

export default function SnakeAndLadder() {
  const [positions, setPositions] = useState([0, 0]); // 0 = not started
  const [current, setCurrent] = useState(0);
  const [dice, setDice] = useState(1);
  const [rolling, setRolling] = useState(false);
  const [log, setLog] = useState<string[]>(["🎲 Roll the dice to start!"]);
  const [winner, setWinner] = useState<number | null>(null);

  const roll = useCallback(() => {
    if (winner || rolling) return;
    setRolling(true);

    let count = 0;
    const interval = setInterval(() => {
      setDice(Math.floor(Math.random() * 6) + 1);
      count++;
      if (count >= 8) {
        clearInterval(interval);
        const d = Math.floor(Math.random() * 6) + 1;
        setDice(d);
        setRolling(false);

        setPositions((prev) => {
          const newPos = [...prev];
          let pos = newPos[current] + d;
          const msgs: string[] = [];

          if (pos > 100) {
            msgs.push(`Player ${current + 1} rolled ${d} — needs exact number to win!`);
            setLog((l) => [...msgs, ...l].slice(0, 8));
            return prev;
          }

          msgs.push(`Player ${current + 1} rolled ${d} → moved to ${pos}`);

          if (SNAKES[pos]) {
            msgs.push(`🐍 Snake! Slides from ${pos} → ${SNAKES[pos]}`);
            pos = SNAKES[pos];
          } else if (LADDERS[pos]) {
            msgs.push(`🪜 Ladder! Climbs from ${pos} → ${LADDERS[pos]}`);
            pos = LADDERS[pos];
          }

          newPos[current] = pos;

          if (pos === 100) {
            setWinner(current);
            msgs.push(`🎉 Player ${current + 1} WINS!`);
          }

          setLog((l) => [...msgs, ...l].slice(0, 8));
          return newPos;
        });

        setCurrent((c) => (c + 1) % 2);
      }
    }, 80);
  }, [current, winner, rolling]);

  const reset = () => {
    setPositions([0, 0]);
    setCurrent(0);
    setDice(1);
    setLog(["🎲 Roll the dice to start!"]);
    setWinner(null);
    setRolling(false);
  };

  const DiceIcon = DiceIcons[dice - 1];

  // Build 10x10 board (100 to 1, alternating direction each row)
  const board: number[] = [];
  for (let row = 9; row >= 0; row--) {
    const rowCells: number[] = [];
    for (let col = 0; col < 10; col++) rowCells.push(row * 10 + col + 1);
    if (row % 2 === 1) rowCells.reverse(); // snake pattern
    board.push(...rowCells);
  }

  const playerColors = ["bg-[#00d4ff]", "bg-[#6c5ce7]"];
  const playerEmojis = ["🔵", "🟣"];

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start justify-center w-full">
      {/* Board */}
      <div className="shrink-0">
        <div className="grid grid-cols-10 gap-0.5">
          {board.map((cell) => {
            const p1Here = positions[0] === cell;
            const p2Here = positions[1] === cell;
            const hasSnake = !!SNAKES[cell];
            const hasLadder = !!LADDERS[cell];
            return (
              <div
                key={cell}
                className={`w-8 h-8 rounded-sm border text-[8px] font-mono flex flex-col items-center justify-center relative transition-all duration-200
                  ${getCellColor(cell)} ${(p1Here || p2Here) ? "ring-1 ring-[#00d4ff]/40" : ""}
                `}
              >
                <span className="text-[#475569] leading-none">{cell}</span>
                {hasSnake && <span className="text-red-400 leading-none">🐍</span>}
                {hasLadder && <span className="text-green-400 leading-none">🟢</span>}
                <div className="absolute -top-0.5 -right-0.5 flex gap-0.5">
                  {p1Here && <div className="w-2 h-2 rounded-full bg-[#00d4ff] shadow-[0_0_4px_rgba(0,212,255,0.8)]" />}
                  {p2Here && <div className="w-2 h-2 rounded-full bg-[#6c5ce7] shadow-[0_0_4px_rgba(108,92,231,0.8)]" />}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center gap-4 mt-2 text-[10px] font-mono text-[#475569]">
          <span>🐍 Snake (go down)</span>
          <span>🟢 Ladder (go up)</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-4 min-w-[200px]">
        {/* Players */}
        <div className="card p-4 space-y-2">
          <p className="text-xs font-mono text-[#475569] uppercase tracking-widest mb-3">Players</p>
          {[0, 1].map((i) => (
            <div
              key={i}
              className={`flex items-center justify-between p-2 rounded-lg transition-all ${
                current === i && !winner ? "bg-[#00d4ff]/10 border border-[#00d4ff]/20" : "opacity-60"
              }`}
            >
              <span className="text-sm">{playerEmojis[i]} Player {i + 1}</span>
              <span className="font-mono text-xs text-[#00d4ff] font-bold">
                #{positions[i] === 0 ? "Start" : positions[i]}
              </span>
            </div>
          ))}
        </div>

        {/* Dice */}
        <div className="card p-4 flex flex-col items-center gap-3">
          <DiceIcon
            size={48}
            className={`text-[#00d4ff] transition-all duration-100 ${rolling ? "animate-spin" : ""}`}
          />
          {!winner ? (
            <button
              onClick={roll}
              disabled={rolling}
              className="w-full py-2.5 rounded-lg bg-[#00d4ff] text-[#050d1a] font-bold text-sm hover:bg-[#00b8d9] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-[0_0_15px_rgba(0,212,255,0.3)]"
            >
              {rolling ? "Rolling..." : `Player ${current + 1}: Roll!`}
            </button>
          ) : (
            <div className="text-center">
              <p className="text-[#00ffa3] font-bold text-sm mb-2">Player {(winner ?? 0) + 1} Wins! 🎉</p>
              <button onClick={reset} className="flex items-center gap-1 text-xs text-[#475569] hover:text-[#00d4ff] font-mono transition-colors">
                <RotateCcw size={11} /> Play Again
              </button>
            </div>
          )}
        </div>

        {/* Log */}
        <div className="card p-3">
          <p className="text-[10px] font-mono text-[#475569] uppercase tracking-widest mb-2">Game Log</p>
          <div className="space-y-1 max-h-40 overflow-y-auto">
            {log.map((msg, i) => (
              <p key={i} className="text-[10px] font-mono text-[#94a3b8] leading-relaxed">
                {msg}
              </p>
            ))}
          </div>
        </div>

        <button onClick={reset} className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-[#1a2d4a] text-[#475569] text-xs font-mono hover:border-[#00d4ff]/40 hover:text-[#00d4ff] transition-all">
          <RotateCcw size={11} /> Reset Game
        </button>
      </div>
    </div>
  );
}
