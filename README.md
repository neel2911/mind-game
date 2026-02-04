# Pelmanism Game

A memory card matching game built with **React**, **TypeScript**, and **Vite**. Flip cards, find matching pairs, and beat your best score!

## Features

- 🎮 **Classic Memory Gameplay** - Flip cards to find matching pairs
- 📊 **Score Tracking** - Your best score is automatically saved to localStorage
- ⚡ **Fast & Responsive** - Built with Vite for instant development experience
- 🎨 **Clean UI** - Styled with Tailwind CSS for a modern look
- 🏆 **Persistent Stats** - Your high scores survive browser refreshes

## How to Play

1. Click on any card to reveal it
2. Click on another card to find its match
3. If the cards match, they stay flipped
4. If they don't match, both cards flip back over
5. Match all pairs to complete the game
6. Your best score is saved automatically!

## Score Tracking

Your game statistics are stored in your browser's localStorage:
- Best score (fewest moves to complete the game)
- Clear your browser's local storage to reset scores

## Tech Stack

- React 18+ 
- TypeScript
- Vite
- Tailwind CSS

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The game will run at `http://localhost:5173`

## Development

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

## License

MIT