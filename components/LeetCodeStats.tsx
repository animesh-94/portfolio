import { useEffect, useState } from "react";

type LeetCodeData = {
  rating: number;
  topPercentage: number;
  solvedCount: number;
  totalQuestions: number;
};

type CachedData = {
  data: LeetCodeData | null;
  timestamp: number;
};

function LeetCodeStats() {
  const [stats, setStats] = useState<LeetCodeData | null>(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/leetcode");
      const data = await response.json();
      setStats(data);
    }

    fetchData();
  }, []);

  if (!stats) {
    return <div>Loading...</div>;
  }

  return (
    <a target="_blank" href="https://leetcode.com/u/_animesh_94/">
      <div>
        <div className="pl-4 flex flex-start text-lg">
          <span className="text-green-500">LeetCode</span>
        </div>
        <div className="px-4 pt-4 pb-1 text-base">
          <div className="grid grid-cols-3 gap-2">
            <div className="flex items-center">
              <a href="https://leetcode.com/u/_animesh_94/"><span className="text-green-600">@_animesh_94</span></a>
            </div>
            <div className="flex justify-center items-center text-base">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-500 opacity-75 pr-1"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-lime-600 pr-1"></span>
              </span>
              {stats.solvedCount}/{stats.totalQuestions}
            </div>
            <div className="flex flex-col text-base">
              <div className="flex justify-center items-center">
                <div className="flex justify-center item-center">
                  <span className="relative flex h-3 w-3 flex justify-center items-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-500 opacity-75 pr-1"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-lime-600 pr-1"></span>
                  </span>
                  Live {Math.round(stats.rating)}
                </div>
              </div>
            </div>
          </div>
          <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-green-700" />
        </div>
      </div>
    </a>
  );
}

export default LeetCodeStats;
