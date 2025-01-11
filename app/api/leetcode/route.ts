import { NextResponse } from 'next/server';

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

const CACHE_DURATION = 60 * 60 * 1000; // 1 hour
let cachedData: CachedData = { data: null, timestamp: 0 };

export async function GET() {
  try {
    // Return cached data if valid
    if (cachedData.data && Date.now() - cachedData.timestamp < CACHE_DURATION) {
      return NextResponse.json(cachedData.data);
    }

    const contestQuery = `
      query userContestRankingInfo($username: String!) {
        userContestRanking(username: $username) {
          rating
          topPercentage
        }
      }
    `;

    const progressQuery = `
      query userSubmitStats($username: String!) {
        matchedUser(username: $username) {
          submitStats {
            acSubmissionNum {
              count
            }
          }
        }
      }
    `;

    const totalQuestionsQuery = `
      query totalQuestions {
        allQuestionsCount {
          count
        }
      }
    `;

    // Fetch contest data
    const contestResponse = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: contestQuery,
        variables: { username: '_animesh_94' },
      }),
    });

    const contestData = await contestResponse.json();

    if (!contestData.data?.userContestRanking) {
      throw new Error('Invalid contest response from LeetCode API');
    }

    // Fetch progress data
    const progressResponse = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: progressQuery,
        variables: { username: '_animesh_94' },
      }),
    });

    const progressData = await progressResponse.json();

    if (!progressData.data?.matchedUser?.submitStats?.acSubmissionNum) {
      throw new Error('Invalid progress response from LeetCode API');
    }

    // Fetch total questions data
    const totalQuestionsResponse = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: totalQuestionsQuery,
      }),
    });

    const totalQuestionsData = await totalQuestionsResponse.json();

    if (!totalQuestionsData.data?.allQuestionsCount) {
      throw new Error('Invalid total questions response from LeetCode API');
    }

    // Extract data
    const rating = Number(contestData.data.userContestRanking.rating) || 0;
    const topPercentage =
      Number(contestData.data.userContestRanking.topPercentage) || 0;
    const solvedCount =
      Number(progressData.data.matchedUser.submitStats.acSubmissionNum[0]?.count) || 0;
    const totalQuestions =
      Number(totalQuestionsData.data.allQuestionsCount[0]?.count) || 0;

    // Cache the data
    cachedData = {
      data: { rating, topPercentage, solvedCount, totalQuestions },
      timestamp: Date.now(),
    };

    return NextResponse.json(cachedData.data);
  } catch (error) {
    console.error('LeetCode API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch LeetCode data' },
      { status: 500 }
    );
  }
}
