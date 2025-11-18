import crypto from 'crypto';
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

// Hash password
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  if (username.length < 3) {
    return res.status(400).json({ error: 'Username must be at least 3 characters' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }

  try {
    // Check if username already exists
    const existingUser = await getUser(username);
    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    // Create new user
    const userId = crypto.randomUUID();
    const userData = {
      id: userId,
      username: username,
      passwordHash: hashPassword(password),
      createdAt: new Date().toISOString(),
      games: []
    };

    await saveUser(username, userData);

    // Return success (don't send password hash to client)
    res.status(201).json({
      success: true,
      user: {
        id: userId,
        username: username
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
}
