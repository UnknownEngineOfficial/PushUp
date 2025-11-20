# 💪 PushUp Tracker

A modern, manual push-up tracking application that enables clean, comprehensible, and motivating documentation of your training without interrupting your workout flow.

## ✨ Overview

PushUp Tracker is designed with a focus on three core experience qualities:

- **Effortless** - Every action achievable with minimal taps, allowing you to log during workout rest periods without breaking your flow
- **Motivating** - Progress visualization and achievements provide positive reinforcement that encourages consistency and progressive overload
- **Trustworthy** - Data persistence and reliability are paramount; you'll never lose your training history

## 🎯 Key Features

### Core Functionality
- **Quick Rep Entry** - Large tap targets (+1, +5, +10) plus custom number input for zero-friction logging
- **Set & Session Management** - Group multiple sets into training sessions with automatic tracking
- **Variant Selection** - Track different push-up styles (Regular, Wide, Close, Diamond, Pike, Decline, Archer, Custom)
- **Date & Time Tracking** - Automatic timestamp capture for every session and set
- **Session Notes** - Add qualitative observations about technique, energy levels, or environment
- **Undo Last Set** - Quickly correct accidental entries

### Analytics & Progress
- **Statistics Dashboard** - View total reps (daily/weekly/monthly/yearly), personal records, and volume trends
- **Performance Insights** - Discover your best training time, average set size, and peak performance metrics
- **Multi-Timeframe Charts** - View training volume across 7 days, 30 days, 12 months, or all-time
- **Variant Analytics** - Pie chart breakdown of volume by push-up variant
- **Progress Comparison** - Week-over-week and month-over-month volume comparison with percentage changes

### Motivation & Goals
- **Goal System** - Set daily, weekly, and monthly rep targets with progress indicators
- **Achievements System** - Unlock achievements for milestones and streaks
- **Visual Progress Bars** - Real-time goal completion feedback

### Training Tools
- **Rest Timer Controls** - Quick-start rest timers (60s, 90s, 120s) with skip option
- **Session Timer** - Automatic workout duration tracking
- **Body Weight Tracking** - Optional body weight entry for each session
- **Difficulty Rating** - Rate workout difficulty (Easy, Moderate, Hard, Extreme)

### History & Data
- **Session History** - Complete log of all training sessions with filtering
- **History Filtering** - Filter sessions by push-up variant
- **Data Export** - Export complete training history as CSV or JSON

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/UnknownEngineOfficial/PushUp.git
cd PushUp
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production-ready files will be generated in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 🛠️ Technology Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI primitives
- **State Management**: React Hooks + GitHub Spark KV storage
- **Charts**: D3.js & Recharts
- **Icons**: Phosphor Icons
- **Animations**: Framer Motion
- **Date Handling**: date-fns
- **Forms**: React Hook Form with Zod validation
- **Notifications**: Sonner

## 📁 Project Structure

```
PushUp/
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # Reusable UI components
│   │   ├── WorkoutView.tsx
│   │   ├── StatisticsView.tsx
│   │   ├── HistoryView.tsx
│   │   ├── GoalsView.tsx
│   │   └── SettingsView.tsx
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions and types
│   │   ├── types.ts      # TypeScript type definitions
│   │   └── stats.ts      # Statistics calculations
│   ├── styles/           # Global styles
│   ├── App.tsx           # Main application component
│   └── main.tsx          # Application entry point
├── public/               # Static assets
├── PRD.md               # Product Requirements Document
├── package.json         # Project dependencies
└── vite.config.ts       # Vite configuration
```

## 🎨 Design Philosophy

The application follows an **athletic minimalism** design approach:

- **Color Scheme**: Triadic color palette anchored in athletic energy
  - Primary: Energetic orange-red (`oklch(0.55 0.21 25)`)
  - Secondary: Fresh athletic green & cool focused blue
  - Accent: Vibrant coral for CTAs

- **Typography**: 
  - Inter for UI text and labels
  - Outfit for large numbers and statistics

- **Interactions**: Punchy, energetic animations that provide satisfying feedback without delaying functionality

## 💾 Data Storage

All data is stored locally using GitHub Spark's KV storage system. Your training history, goals, and settings persist across sessions without requiring a backend server.

## 🧪 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run optimize` - Optimize dependencies

### Code Quality

The project uses:
- TypeScript for type safety
- ESLint for code linting
- Consistent code formatting standards

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [GitHub Spark](https://githubnext.com/projects/spark)
- UI components powered by [Radix UI](https://www.radix-ui.com/)
- Icons from [Phosphor Icons](https://phosphoricons.com/)

## 📞 Support

For issues, questions, or suggestions, please open an issue in the GitHub repository.

---

**Made with 💪 for athletes who track their progress**
