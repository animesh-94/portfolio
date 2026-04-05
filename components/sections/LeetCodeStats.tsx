"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, TrendingUp, TrendingDown, Minus, Award, Target, BarChart3 } from "lucide-react";

interface ContestHistory {
  attended: boolean;
  rating: number;
  ranking: number;
  trendDirection: string;
  problemsSolved: number;
  totalProblems: number;
  contest: {
    title: string;
    startTime: number;
  };
}

interface LeetCodeData {
  profile: {
    username: string;
    submitStats: {
      acSubmissionNum: { difficulty: string; count: number }[];
    };
    contestBadge?: { name: string; icon: string };
  } | null;
  contest: {
    attendedContestsCount: number;
    rating: number;
    globalRanking: number;
    totalParticipants: number;
    topPercentage: number;
    badge?: { name: string };
  } | null;
  history: ContestHistory[];
}

function smoothPath(points: { x: number; y: number }[]): string {
  if (points.length < 2) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cpx = (prev.x + curr.x) / 2;
    d += ` C ${cpx} ${prev.y}, ${cpx} ${curr.y}, ${curr.x} ${curr.y}`;
  }
  return d;
}

function RatingChart({ history }: { history: ContestHistory[] }) {
  const [drawn, setDrawn] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  const attended = history.filter((h) => h.attended).slice(-20);
  if (attended.length < 2) return null;

  const ratings = attended.map((h) => h.rating);
  const minRating = Math.min(...ratings) - 80;
  const maxRating = Math.max(...ratings) + 80;
  const range = maxRating - minRating;

  const W = 800;
  const H = 200;
  const PAD_X = 52;
  const PAD_Y = 24;

  const points = attended.map((h, i) => ({
    x: PAD_X + (i / (attended.length - 1)) * (W - PAD_X * 2),
    y: H - PAD_Y - ((h.rating - minRating) / range) * (H - PAD_Y * 2),
    rating: h.rating,
    contest: h.contest.title,
    solved: `${h.problemsSolved}/${h.totalProblems}`,
    rank: h.ranking,
  }));

  const linePath = smoothPath(points);
  const last = points[points.length - 1];

  // Area path: smooth curve + close back along bottom
  const areaPath = `${linePath} L ${last.x} ${H - PAD_Y} L ${points[0].x} ${H - PAD_Y} Z`;

  const gridRatings = [0, 0.25, 0.5, 0.75, 1].map((t) => ({
    y: PAD_Y + t * (H - PAD_Y * 2),
    val: Math.round(maxRating - t * range),
  }));

  return (
    <div
      className="w-full overflow-x-auto"
      onMouseLeave={() => setHovered(null)}
    >
      <motion.svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        style={{ minWidth: "340px" }}
        preserveAspectRatio="xMidYMid meet"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 0.4 } }}
        viewport={{ once: true }}
        onViewportEnter={() => setDrawn(true)}
      >
        <defs>
          {/* Gradient fill */}
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#000" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </linearGradient>
          {/* Clip path so area doesn't overflow */}
          <clipPath id="chartClip">
            <rect x={PAD_X} y={0} width={W - PAD_X * 2} height={H} />
          </clipPath>
        </defs>

        {/* Grid lines */}
        {gridRatings.map(({ y, val }, i) => (
          <g key={i}>
            <line
              x1={PAD_X}
              y1={y}
              x2={W - PAD_X}
              y2={y}
              stroke={i === 0 || i === gridRatings.length - 1 ? "#d1d5db" : "#f3f4f6"}
              strokeWidth="1"
              strokeDasharray={i === 0 || i === gridRatings.length - 1 ? "0" : "3 4"}
            />
            <text
              x={PAD_X - 8}
              y={y + 4}
              textAnchor="end"
              fill="#9ca3af"
              fontSize="9"
              fontFamily="monospace"
            >
              {val}
            </text>
          </g>
        ))}

        {/* Vertical tick for each data point */}
        {points.map((p, i) => (
          <line
            key={i}
            x1={p.x}
            y1={H - PAD_Y}
            x2={p.x}
            y2={H - PAD_Y + 4}
            stroke="#d1d5db"
            strokeWidth="1"
          />
        ))}

        {/* Gradient area fill */}
        <path d={areaPath} fill="url(#chartGrad)" clipPath="url(#chartClip)" />

        {/* Animated line draw */}
        <motion.path
          d={linePath}
          fill="none"
          stroke="#000"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: "easeInOut", delay: 0.2 }}
        />

        {/* Hover interaction zones */}
        {points.map((p, i) => (
          <rect
            key={i}
            x={i === 0 ? p.x - 12 : p.x - (p.x - points[i - 1].x) / 2}
            y={0}
            width={
              i === 0
                ? (points[1].x - p.x) / 2 + 12
                : i === points.length - 1
                ? (p.x - points[i - 1].x) / 2 + 12
                : (p.x - points[i - 1].x) / 2 + (points[i + 1].x - p.x) / 2
            }
            height={H}
            fill="transparent"
            style={{ cursor: "crosshair" }}
            onMouseEnter={() => setHovered(i)}
          />
        ))}

        {/* Data dots — only visible ones or hovered */}
        {points.map((p, i) => {
          const isLast = i === points.length - 1;
          const isHov = hovered === i;
          return (
            <g key={i}>
              {(isLast || isHov) && (
                <motion.circle
                  cx={p.x}
                  cy={p.y}
                  r={isLast ? 10 : 8}
                  fill="black"
                  fillOpacity="0.06"
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
              <motion.circle
                cx={p.x}
                cy={p.y}
                r={isLast ? 5 : isHov ? 4 : 3}
                fill="#000"
                stroke="#fff"
                strokeWidth={isLast ? 2 : 1.5}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.04 }}
              />

              {/* Tooltip on hover */}
              {isHov && (
                <g>
                  <rect
                    x={Math.min(p.x - 52, W - PAD_X - 104)}
                    y={p.y - 48}
                    width={104}
                    height={38}
                    rx={2}
                    fill="#000"
                  />
                  <text
                    x={Math.min(p.x, W - PAD_X - 52)}
                    y={p.y - 32}
                    textAnchor="middle"
                    fill="#fff"
                    fontSize="10"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    {Math.round(p.rating)}
                  </text>
                  <text
                    x={Math.min(p.x, W - PAD_X - 52)}
                    y={p.y - 18}
                    textAnchor="middle"
                    fill="#9ca3af"
                    fontSize="8"
                    fontFamily="monospace"
                  >
                    {`RANK #${p.rank.toLocaleString()} · ${p.solved}`}
                  </text>
                </g>
              )}

              {/* Label for last point */}
              {isLast && !isHov && (
                <text
                  x={p.x}
                  y={p.y - 14}
                  textAnchor="middle"
                  fill="#000"
                  fontSize="11"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  {Math.round(p.rating)}
                </text>
              )}
            </g>
          );
        })}
      </motion.svg>
    </div>
  );
}

export default function LeetCodeStats() {
  const [data, setData] = useState<LeetCodeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/leetcode")
      .then((r) => r.json())
      .then((d) => {
        if (d.error) setError(true);
        else setData(d);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const attended = data?.history?.filter((h) => h.attended) ?? [];
  const lastContest = attended[attended.length - 1];
  const prevContest = attended[attended.length - 2];
  const ratingDelta = lastContest && prevContest ? Math.round(lastContest.rating - prevContest.rating) : null;

  const solved =
    data?.profile?.submitStats?.acSubmissionNum?.find((s) => s.difficulty === "All")?.count ?? 0;

  const topPercent = data?.contest?.topPercentage
    ? data.contest.topPercentage.toFixed(1)
    : null;

  return (
    <motion.section
      id="leetcode"
      className="py-12 section-container"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="divider">LeetCode Stats</div>

      <div className="border border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-2 md:p-3">
        <div className="border border-neutral-100 p-6 md:p-10 flex flex-col gap-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-black animate-pulse" />
            <span className="font-mono text-[10px] md:text-xs text-neutral-400 uppercase tracking-widest">
              leetcode.com/u/
              <a
                href="https://leetcode.com/u/_animesh_94/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black font-bold hover:underline"
              >
                _animesh_94
              </a>
            </span>
          </div>
          <a
            href="https://leetcode.com/u/_animesh_94/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-mono text-[9px] uppercase font-black text-black border border-black px-3 py-1.5 hover:bg-black hover:text-white transition-all"
          >
            <ExternalLink size={10} />
            View Profile
          </a>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="font-mono text-xs text-neutral-400 uppercase tracking-widest animate-pulse">
              Fetching rating data...
            </div>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center py-10 gap-4">
            <p className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
              LeetCode API temporarily unavailable
            </p>
            {/* Fallback static display */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mt-4">
              {[
                { label: "Contest Rating", value: "~1500+", icon: Award },
                { label: "Problems Solved", value: "Active", icon: Target },
                { label: "Contests", value: "Regular", icon: BarChart3 },
                { label: "Focus", value: "DSA & CP", icon: TrendingUp },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="border-2 border-black p-4 flex flex-col gap-2">
                  <Icon size={16} className="text-black" />
                  <p className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest">{label}</p>
                  <p className="font-mono text-lg font-black text-black">{value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && !error && data && (
          <>
            {/* Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <motion.div
                className="border-2 border-black p-5 flex flex-col gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.08)]"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <Award size={16} className="text-black" />
                <p className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest">Contest Rating</p>
                <div className="flex items-end gap-2">
                  <p className="font-mono text-2xl font-black text-black">
                    {data.contest?.rating ? Math.round(data.contest.rating) : "—"}
                  </p>
                  {ratingDelta !== null && (
                    <span className={`flex items-center font-mono text-[10px] font-black mb-0.5 ${ratingDelta >= 0 ? "text-black" : "text-neutral-500"}`}>
                      {ratingDelta >= 0 ? <TrendingUp size={12} className="mr-0.5" /> : <TrendingDown size={12} className="mr-0.5" />}
                      {ratingDelta >= 0 ? "+" : ""}{ratingDelta}
                    </span>
                  )}
                </div>
              </motion.div>

              <motion.div
                className="border-2 border-black p-5 flex flex-col gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.08)]"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <BarChart3 size={16} className="text-black" />
                <p className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest">Global Rank</p>
                <p className="font-mono text-2xl font-black text-black">
                  {data.contest?.globalRanking
                    ? `#${data.contest.globalRanking.toLocaleString()}`
                    : "—"}
                </p>
              </motion.div>

              <motion.div
                className="border-2 border-black p-5 flex flex-col gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.08)]"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Target size={16} className="text-black" />
                <p className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest">Contests</p>
                <p className="font-mono text-2xl font-black text-black">
                  {data.contest?.attendedContestsCount ?? "—"}
                </p>
              </motion.div>

              <motion.div
                className="border-2 border-black p-5 flex flex-col gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.08)]"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <TrendingUp size={16} className="text-black" />
                <p className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest">Top %</p>
                <p className="font-mono text-2xl font-black text-black">
                  {topPercent ? `${topPercent}%` : "—"}
                </p>
              </motion.div>
            </div>

            {/* Badge if present */}
            {(data.contest?.badge || data.profile?.contestBadge) && (
              <div className="flex items-center gap-3 border border-dashed border-neutral-200 bg-neutral-50 px-5 py-3">
                <Award size={14} className="text-black" />
                <span className="font-mono text-[10px] font-black uppercase tracking-widest text-black">
                  {data.contest?.badge?.name ?? data.profile?.contestBadge?.name}
                </span>
              </div>
            )}

            {/* Rating Chart */}
            {attended.length >= 2 && (
              <motion.div
                className="flex flex-col gap-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest font-black">
                    Contest Rating Trend — Last {Math.min(attended.length, 20)} contests
                  </span>
                  {lastContest && (
                    <span className="font-mono text-[9px] text-neutral-300 uppercase tracking-widest">
                      {lastContest.contest.title}
                    </span>
                  )}
                </div>
                <div className="bg-neutral-50 border border-neutral-100 p-4">
                  <RatingChart history={data.history} />
                </div>
              </motion.div>
            )}

            {/* Last contest detail */}
            {lastContest && (
              <motion.div
                className="border-t border-neutral-100 pt-5 grid grid-cols-2 md:grid-cols-4 gap-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest">Last Contest</span>
                  <span className="font-mono text-xs font-black text-black truncate">{lastContest.contest.title}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest">Rank</span>
                  <span className="font-mono text-xs font-black text-black">#{lastContest.ranking.toLocaleString()}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest">Solved</span>
                  <span className="font-mono text-xs font-black text-black">{lastContest.problemsSolved}/{lastContest.totalProblems}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest">Direction</span>
                  <span className="flex items-center gap-1 font-mono text-xs font-black text-black">
                    {lastContest.trendDirection === "UP" ? (
                      <TrendingUp size={12} />
                    ) : lastContest.trendDirection === "DOWN" ? (
                      <TrendingDown size={12} />
                    ) : (
                      <Minus size={12} />
                    )}
                    {lastContest.trendDirection}
                  </span>
                </div>
              </motion.div>
            )}
          </>
        )}
        </div>
      </div>
    </motion.section>
  );
}
