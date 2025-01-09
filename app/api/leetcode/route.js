import { NextResponse } from 'next/server';

const CACHE_DURATION = 60 * 60 * 1000; // 1 hour
let cachedData = { data: null, timestamp: 0 };

export async function GET() {
  try {
    console.log("Checking cached data...");

    // Return cached data if valid
    if (cachedData.data && Date.now() - cachedData.timestamp < CACHE_DURATION) {
      console.log("Serving from cache:", cachedData.data);
      return NextResponse.json(cachedData.data);
    }

    console.log("Fetching data from LeetCode API...");
    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query userContestRankingInfo($username: String!) {
            userContestRanking(username: $username) {
              rating
              topPercentage
            }
          }
        `,
        variables: { username: '_animesh_94' },
      }),
    });

    console.log("LeetCode API response status:", response.status);

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Parsed response from LeetCode API:", data);

    if (!data.data?.userContestRanking) {
      console.error("Invalid response structure from LeetCode API:", data);
      throw new Error('Invalid response from LeetCode API');
    }

    const contestData = data.data.userContestRanking;

    console.log("Updating cache with new data...");
    cachedData = {
      data: {
        rating: Number(contestData.rating) || 0,
        topPercentage: Number(contestData.topPercentage) || 0,
      },
      timestamp: Date.now(),
    };

    console.log("Returning new data:", cachedData.data);
    return NextResponse.json(cachedData.data);
  } catch (error) {
    console.error("Error occurred in LeetCode API handler:", error.message);
    console.error("Stack trace:", error.stack);
    return NextResponse.json({ error: 'Failed to fetch LeetCode data' }, { status: 500 });
  }
}
