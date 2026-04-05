import { NextResponse } from "next/server";

export async function GET() {
  const username = "_animesh_94";

  // Fetch user profile stats
  const profileQuery = {
    query: `
      query userPublicProfile($username: String!) {
        matchedUser(username: $username) {
          username
          profile {
            ranking
            reputation
            starRating
          }
          submitStats {
            acSubmissionNum {
              difficulty
              count
            }
          }
          contestBadge {
            name
            expired
            hoverText
            icon
          }
        }
      }
    `,
    variables: { username },
    operationName: "userPublicProfile",
  };

  // Fetch contest ranking info
  const contestQuery = {
    query: `
      query userContestRankingInfo($username: String!) {
        userContestRanking(username: $username) {
          attendedContestsCount
          rating
          globalRanking
          totalParticipants
          topPercentage
          badge {
            name
          }
        }
        userContestRankingHistory(username: $username) {
          attended
          trendDirection
          problemsSolved
          totalProblems
          finishTimeInSeconds
          rating
          ranking
          contest {
            title
            startTime
          }
        }
      }
    `,
    variables: { username },
    operationName: "userContestRankingInfo",
  };

  try {
    const [profileRes, contestRes] = await Promise.all([
      fetch("https://leetcode.com/graphql/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Referer": "https://leetcode.com",
          "Origin": "https://leetcode.com",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
        body: JSON.stringify(profileQuery),
        next: { revalidate: 3600 }, // cache for 1 hour
      }),
      fetch("https://leetcode.com/graphql/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Referer": "https://leetcode.com",
          "Origin": "https://leetcode.com",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
        body: JSON.stringify(contestQuery),
        next: { revalidate: 3600 },
      }),
    ]);

    const profileData = await profileRes.json();
    const contestData = await contestRes.json();

    return NextResponse.json({
      profile: profileData?.data?.matchedUser ?? null,
      contest: contestData?.data?.userContestRanking ?? null,
      history: contestData?.data?.userContestRankingHistory ?? [],
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch LeetCode data" }, { status: 500 });
  }
}
