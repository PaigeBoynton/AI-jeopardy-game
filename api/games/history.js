import { kv } from '@vercel/kv';

// Load user from KV
async function getUser(username) {
  const user = await kv.get(`user:${username.toLowerCase()}`);
  return user;
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    const user = await getUser(username);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return games sorted by date (newest first)
    const games = [...user.games].sort((a, b) =>
      new Date(b.date) - new Date(a.date)
    );

    res.status(200).json({
      success: true,
      games: games,
      stats: {
        totalGames: games.length,
        averageScore: games.length > 0
          ? Math.round(games.reduce((sum, g) => sum + g.score, 0) / games.length)
          : 0,
        averagePercentCorrect: games.length > 0
          ? Math.round(games.reduce((sum, g) => sum + g.percentCorrect, 0) / games.length)
          : 0
      }
    });
  } catch (error) {
    console.error('Get history error:', error);
    res.status(500).json({ error: 'Failed to get game history' });
  }
}
