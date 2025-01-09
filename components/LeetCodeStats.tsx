import { useEffect, useState } from 'react';

type LeetCodeData = {
  rating: number
  topPercentage: number
}

type CachedData = {
  data: LeetCodeData | null
  timestamp: number
}

function LeetCodeStats() {
  const [stats, setStats] = useState<LeetCodeData | null>(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/leetcode');
      const data = await response.json();
      setStats(data);
    }

    fetchData();
  }, []);

  if (!stats) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>LeetCode Stats</h2>
      <ul>
        <li>LeetCode Rating: {stats.rating  || 0}</li>
        <li>Above Percentage: {stats.topPercentage || 'N/A'}</li>
        {/* Add more fields as needed */}
      </ul>
    </div>
  );
}

export default LeetCodeStats;
