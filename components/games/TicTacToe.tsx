"use client";
import { useState, useCallback } from "react";
import { RotateCcw, User, Bot } from "lucide-react";

type Player = "X" | "O";
type Cell = Player | null;
type Board = Cell[];
type Mode = "pvp" | "cpu";

function checkWinner(board: Board): { winner: Player | null; line: number[] | null } {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a] as Player, line: [a, b, c] };
    }
  }
  return { winner: null, line: null };
}

function minimax(board: Board, isMax: boolean, depth = 0): number {
  const { winner } = checkWinner(board);
  if (winner === "O") return 10 - depth;
  if (winner === "X") return depth - 10;
  if (board.every(Boolean)) return 0;

  const scores: number[] = [];
  board.forEach((cell, i) => {
    if (!cell) {
      const next = [...board];
      next[i] = isMax ? "O" : "X";
      scores.push(minimax(next, !isMax, depth + 1));
    }
  });
  return isMax ? Math.max(...scores) : Math.min(...scores);
}

function bestMove(board: Board): number {
  let best = -Infinity;
  let idx = -1;
  board.forEach((cell, i) => {
    if (!cell) {
      const next = [...board];
      next[i] = "O";
      const score = minimax(next, false);
      if (score > best) { best = score; idx = i; }
    }
  });
  return idx;
}

export default function TicTacToe() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [current, setCurrent] = useState<Player>("X");
  const [mode, setMode] = useState<Mode>("pvp");
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });

  const { winner, line } = checkWinner(board);
  const isDraw = !winner && board.every(Boolean);
  const gameOver = !!winner || isDraw;

  const handleClick = useCallback((i: number) => {
    if (board[i] || gameOver) return;
    const next = [...board];
    next[i] = current;
    const { winner: w } = checkWinner(next);
    
    if (mode === "cpu" && !w && !next.every(Boolean)) {
      next[bestMove(next)] = "O";
    }

    const result = checkWinner(next);
    if (result.winner) {
      setScores((s) => ({ ...s, [result.winner as string]: s[result.winner as keyof typeof s] + 1 }));
    } else if (next.every(Boolean)) {
      setScores((s) => ({ ...s, draws: s.draws + 1 }));
    }

    setBoard(next);
    if (mode === "pvp" && !result.winner) setCurrent(current === "X" ? "O" : "X");
  }, [board, current, gameOver, mode]);

  const reset = () => {
    setBoard(Array(9).fill(null));
    setCurrent("X");
  };

  const symbolColor = (cell: Cell) =>
    cell === "X" ? "text-[#00d4ff]" : "text-[#6c5ce7]";

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Mode toggle */}
      <div className="flex gap-2">
        {(["pvp", "cpu"] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); reset(); }}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-mono transition-all ${
              mode === m
                ? "bg-[#00d4ff]/20 border border-[#00d4ff]/50 text-[#00d4ff]"
                : "border border-[#1a2d4a] text-[#475569] hover:border-[#475569]"
            }`}
          >
            {m === "pvp" ? <><User size={12} /> PvP</> : <><Bot size={12} /> vs AI</>}
          </button>
        ))}
      </div>

      {/* Score */}
      <div className="flex gap-6 font-mono text-sm">
        <div className="text-center">
          <p className="text-[#00d4ff] font-bold text-xl">{scores.X}</p>
          <p className="text-[#475569] text-xs">X (You)</p>
        </div>
        <div className="text-center">
          <p className="text-[#94a3b8] font-bold text-xl">{scores.draws}</p>
          <p className="text-[#475569] text-xs">Draws</p>
        </div>
        <div className="text-center">
          <p className="text-[#6c5ce7] font-bold text-xl">{scores.O}</p>
          <p className="text-[#475569] text-xs">{mode === "cpu" ? "AI" : "O"}</p>
        </div>
      </div>

      {/* Status */}
      <div className="font-mono text-sm">
        {winner && (
          <p className="text-[#00ffa3]">
            🎉 {winner === "X" ? "X Wins!" : mode === "cpu" ? "AI Wins!" : "O Wins!"}
          </p>
        )}
        {isDraw && <p className="text-[#94a3b8]">🤝 It&apos;s a Draw!</p>}
        {!gameOver && (
          <p className="text-[#475569]">
            Turn:{" "}
            <span className={current === "X" ? "text-[#00d4ff]" : "text-[#6c5ce7]"}>
              {current}
            </span>
          </p>
        )}
      </div>

      {/* Board */}
      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, i) => {
          const isWinCell = line?.includes(i);
          return (
            <button
              key={i}
              onClick={() => handleClick(i)}
              className={`w-20 h-20 rounded-xl border text-3xl font-bold transition-all duration-200 flex items-center justify-center
                ${isWinCell ? "border-[#00ffa3]/60 bg-[#00ffa3]/10 shadow-[0_0_15px_rgba(0,255,163,0.2)]" : "border-[#1a2d4a] bg-[#0d1e35]"}
                ${!cell && !gameOver ? "hover:bg-[#112240] hover:border-[#00d4ff]/30 cursor-pointer" : "cursor-default"}
              `}
            >
              {cell && (
                <span className={`${symbolColor(cell)} ${isWinCell ? "drop-shadow-lg" : ""}`}>
                  {cell}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Reset */}
      <button
        onClick={reset}
        className="flex items-center gap-2 px-5 py-2 rounded-lg border border-[#1a2d4a] text-[#475569] text-xs font-mono hover:border-[#00d4ff]/40 hover:text-[#00d4ff] transition-all"
      >
        <RotateCcw size={12} /> New Game
      </button>
    </div>
  );
}
