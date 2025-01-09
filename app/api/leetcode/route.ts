import { NextResponse } from 'next/server'

type LeetCodeData = {
  rating: number
  topPercentage: number
}

type CachedData = {
  data: LeetCodeData | null
  timestamp: number
}

const CACHE_DURATION = 60 * 60 * 1000 // 1 hour
let cachedData: CachedData = { data: null, timestamp: 0 }

export async function GET() {
  try {
    // Return cached data if valid
    if (cachedData.data && Date.now() - cachedData.timestamp < CACHE_DURATION) {
      return NextResponse.json(cachedData.data)
    }

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
    })

    const data = await response.json()

    if (!data.data?.userContestRanking) {
      throw new Error('Invalid response from LeetCode API')
    }

    const contestData = data.data.userContestRanking

    cachedData = {
      data: {
        rating: Number(contestData.rating) || 0,
        topPercentage: Number(contestData.topPercentage) || 0,
      },
      timestamp: Date.now(),
    }

    return NextResponse.json(cachedData.data)
  } catch (error) {
    console.error('LeetCode API Error:', error)
    return NextResponse.json({ error: 'Failed to fetch LeetCode data' }, { status: 500 })
  }
}
