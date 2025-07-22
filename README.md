# Nemchua - Japanese Vocabulary Learning App

A modern, full-stack flashcard application for learning Japanese vocabulary with intelligent spaced repetition algorithm.

## 🌟 Features

- **Smart Learning**: Adaptive spaced repetition algorithm (SM-2) that optimizes review intervals
- **Deck Management**: Create and organize custom vocabulary decks by topics
- **Flashcard System**: Japanese Kanji on front, Vietnamese meanings on back with examples
- **Progress Tracking**: Detailed statistics and learning analytics
- **User Authentication**: Secure email/password authentication with NextAuth.js
- **Responsive Design**: Beautiful UI that works on desktop and mobile
- **Card States**: NEW → LEARNING → REVIEWING → MASTERED progression
- **Difficulty Levels**: Again, Hard, Good, Easy rating system

## 🛠 Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Database**: MongoDB with Prisma ORM
- **Authentication**: NextAuth.js
- **Styling**: TailwindCSS + shadcn/ui (Emerald theme)
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

## 📋 Prerequisites

- Node.js 18+
- MongoDB (local or MongoDB Atlas)
- npm/yarn/pnpm

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone <repository-url>
cd nemchua
npm install
```

### 2. Environment Setup

Copy `.env.example` to `.env` and update with your configurations:

```env
# Database
DATABASE_URL="mongodb://localhost:27017/nemchua"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-change-in-production"
```

### 3. Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database (for MongoDB)
npm run db:push
```

### 4. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your application running!

## 📱 Application Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Main dashboard
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   └── features/         # Feature-specific components
├── lib/                  # Utility functions
│   ├── auth/             # Authentication config
│   ├── spaced-repetition/ # Learning algorithm
│   └── prisma.ts         # Database client
└── prisma/               # Database schema
```

## 🌐 Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Environment Variables for Production

```env
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/nemchua"
NEXTAUTH_URL="https://your-domain.vercel.app"
NEXTAUTH_SECRET="your-production-secret"
```

## 🧪 Development Commands

```bash
# Development server
npm run dev

# Database management
npm run db:generate    # Generate Prisma client
npm run db:push       # Push schema to database
npm run db:studio     # View database in browser

# Build and production
npm run build         # Build for production
npm run start         # Start production server
npm run lint          # Run ESLint
```

**Happy Learning! 🎌📚**
