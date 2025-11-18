import { kv } from '@vercel/kv';

// Load user from KV
async function getUser(username) {
  const user = await kv.get(`user:${username.toLowerCase()}`);
  return user;
}

// Save user to KV
async function saveUser(username, userData) {
  await kv.set(`user:${username.toLowerCase()}`, userData);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, gameData } = req.body;

  if (!username || !gameData) {
    return res.status(400).json({ error: 'Username and game data are required' });
  }

  // Validate game data
  const { topic, totalQuestions, correctAnswers, score } = gameData;

  if (!topic || totalQuestions === undefined || correctAnswers === undefined || score === undefined) {
    return res.status(400).json({ error: 'Invalid game data' });
  }

  try {
    const user = await getUser(username);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Calculate percentage
    const percentCorrect = totalQuestions > 0
      ? Math.round((correctAnswers / totalQuestions) * 100)
      : 0;

    // Add game to user's history
    const game = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      topic: topic,
      totalQuestions: totalQuestions,
      correctAnswers: correctAnswers,
      percentCorrect: percentCorrect,
      score: score
    };

    user.games.push(game);

    await saveUser(username, user);

    res.status(200).json({
      success: true,
      game: game
    });
  } catch (error) {
    console.error('Save game error:', error);
    res.status(500).json({ error: 'Failed to save game' });
  }
}
