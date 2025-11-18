# AI-Powered Jeopardy Game

An interactive Jeopardy-style trivia game that uses OpenAI's GPT to generate custom questions on any topic you choose!

## Features

- 🎯 **AI-Generated Questions**: Enter any topic and get 6 categories with 5 questions each
- 📊 **Difficulty Progression**: Questions range from $200 (easy) to $1000 (difficult)
- 🎨 **Classic Jeopardy Styling**: Authentic blue and gold color scheme
- 💯 **Smart Answer Checking**: Accepts different word forms (e.g., "marinate" vs "marination")
- ✨ **Beautiful Interface**: Clean, responsive design with smooth animations
- 🔐 **User Authentication**: Create an account to save your game history
- 👤 **Guest Mode**: Play without creating an account
- 📈 **Game History**: Track your performance over time (for registered users)
- 📱 **Fully Responsive**: Works on desktop, tablet, and mobile devices
- 🎲 **Daily Doubles**: Random special questions with wagering

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Vercel KV Database

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project (or create a new one)
3. Navigate to the **Storage** tab
4. Click **Create Database**
5. Select **KV (Redis)**
6. Give it a name (e.g., "jeopardy-db")
7. Click **Create**

Vercel will automatically add the required environment variables (`KV_REST_API_URL`, `KV_REST_API_TOKEN`, etc.) to your project.

### 3. Set Up OpenAI API Key

1. Get an API key from [OpenAI](https://platform.openai.com/api-keys)
2. In your Vercel project, go to **Settings** > **Environment Variables**
3. Add a new variable:
   - Name: `OPENAI_API_KEY`
   - Value: Your OpenAI API key
   - Environment: Production, Preview, Development

### 4. Deploy to Vercel

```bash
vercel deploy
```

Or connect your GitHub repository to Vercel for automatic deployments.

## Local Development

To run locally:

1. Install the Vercel CLI: `npm install -g vercel`
2. Link your project: `vercel link`
3. Pull environment variables: `vercel env pull`
4. Run the development server: `vercel dev`
5. Open http://localhost:3000 in your browser

## How to Play

1. Enter a topic you want to be tested on (e.g., "Ancient Rome", "Space Exploration", "Cooking")
2. Click "Generate Game" and wait a few seconds
3. Click on any dollar amount to see the question
4. Type your answer and click Submit
5. Your score updates based on correct/incorrect answers
6. Click "New Game" to try a different topic

## Technologies Used

- **Frontend**: Vanilla JavaScript, HTML, CSS
- **Backend**: Vercel Serverless Functions (Node.js)
- **Database**: Vercel KV (Redis-based key-value store)
- **AI**: OpenAI GPT-3.5 Turbo
- **Deployment**: Vercel

## Project Structure

```
jeopardy-game/
├── api/
│   ├── auth/
│   │   ├── login.js       # User login endpoint
│   │   └── register.js    # User registration endpoint
│   ├── games/
│   │   ├── history.js     # Get user game history
│   │   └── save.js        # Save game results
│   └── generate.js        # Generate Jeopardy questions with AI
├── auth.js                # Frontend authentication logic
├── script.js              # Main game logic
├── styles.css             # Styles
├── index.html             # Main HTML file
├── config.js              # Configuration (API key handling)
├── package.json           # Dependencies
└── README.md              # This file
```

## Environment Variables

Required environment variables (automatically set by Vercel):

- `OPENAI_API_KEY` - Your OpenAI API key (set manually)
- `KV_REST_API_URL` - Vercel KV connection URL (auto-added)
- `KV_REST_API_TOKEN` - Vercel KV auth token (auto-added)
- `KV_REST_API_READ_ONLY_TOKEN` - Vercel KV read-only token (auto-added)

## How It Works

### Authentication

- Users can register with a username and password
- Passwords are hashed using SHA-256 before storage
- User data is stored in Vercel KV (Redis)
- Guest mode available for users who don't want to create an account

### Game Generation

- Uses OpenAI's GPT-3.5 Turbo to generate questions based on the user's chosen topic
- Creates 6 categories with 5 questions each
- Questions are difficulty-scaled from $200 (easy) to $1000 (hard)
- Includes 2 random Daily Doubles per game

### Data Persistence

- User accounts and game history are stored in Vercel KV
- Vercel KV is a Redis-based key-value store that persists data across serverless function invocations
- Each user's data is stored with the key pattern: `user:{username}`
- Data persists indefinitely (unlike `/tmp` storage which is ephemeral)

## Troubleshooting

### "Invalid username or password" after registration

Make sure you've set up Vercel KV database correctly. The old version used `/tmp` storage which was ephemeral.

### Game history shows 0 games

Same as above - ensure Vercel KV is properly configured.

### Questions not generating

- Check that your `OPENAI_API_KEY` environment variable is set correctly in Vercel
- Verify you have API credits available in your OpenAI account
- Check the Vercel function logs for errors

### Local development not working

- Make sure you've run `vercel link` to link your local project to Vercel
- Run `vercel env pull` to pull environment variables
- Use `vercel dev` (not just opening the HTML file) to run the serverless functions locally

## Security Notes

- **Never commit your `config.js` file** - it contains your API key
- The `.gitignore` file prevents accidental commits
- If you accidentally commit your key, regenerate it immediately on OpenAI's website

## Contributing

Feel free to fork this project and submit pull requests! Some ideas for improvements:

- Add sound effects
- Implement Daily Double
- Add multiplayer support
- Create different difficulty modes
- Add a timer for answering

## License

MIT License - feel free to use this project however you'd like!

## Credits

Built as a learning project to explore:
- JavaScript game development
- AI API integration
- DOM manipulation
- Async/await patterns
