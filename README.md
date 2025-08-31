# Todo App

A modern, full-stack todo application built with React Native (Expo), NestJS, and Prisma. Features a beautiful UI with dark/light theme support, GitHub authentication, and comprehensive task management capabilities.

## 🚀 Features

### Task Management

- ✅ Create, read, update, and delete tasks
- 🏷️ Task priorities (LOW, MEDIUM, HIGH, URGENT)
- 📅 Due date support with date picker
- ✔️ Mark tasks as complete/incomplete
- 📝 Task descriptions and titles
- 🗑️ Swipe-to-delete functionality

### User Experience

- 🌙 Dark and light theme support
- 📱 Native mobile app experience with Expo
- 🔐 GitHub OAuth authentication
- 💨 Optimistic updates with React Query
- 🎨 Beautiful UI with NativeWind (Tailwind CSS)
- ♿ Accessible components with proper ARIA support

### Technical Features

- 🔄 Real-time data synchronization
- 📡 RESTful API with NestJS
- 🗄️ PostgreSQL database with Prisma ORM
- 🚀 Turborepo monorepo structure
- 📦 Shared validation schemas across frontend/backend
- 🧪 Type-safe development with TypeScript

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (>= 22.14.0)
- **pnpm** (>= 9.6.0) - Package manager
- **PostgreSQL** - Database
- **Android Studio** or **Xcode** - For mobile development
- **Expo CLI** - For React Native development

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd todo
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Setup

#### Backend Environment Variables

Create a `.env` file in the `packages/api` directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/todo_db"

# Authentication
BETTER_AUTH_SECRET="your-super-secret-key-here"
BETTER_AUTH_URL="http://localhost:3001"

# GitHub OAuth (optional, for authentication)
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
```

> Note
> There's a hard coded value for an absolute Ip in the auth api instance in api/lib/auth.ts figure out what's localhost's
> ip in the machine running the server in your network and replace that value

#### Frontend Environment Variables

Create a `.env.local` file in the `apps/expo` directory:

```env
EXPO_PUBLIC_API_URL="http://localhost:3001"
```

### 4. Database Setup

```bash
# Navigate to the API package
cd packages/api

# Generate Prisma client
pnpm prisma generate

# Run database migrations
pnpm prisma migrate dev

# (Optional) Seed the database
pnpm prisma db seed
```

### 5. Start Development Servers

#### Option 1: Start All Services (Recommended)

```bash
# From the root directory
pnpm dev
```

#### Option 2: Start Services Individually

```bash
# Terminal 1: Start the backend API
cd packages/api
pnpm dev

# Terminal 2: Start the mobile app
cd apps/expo
pnpm dev
```

### 6. Mobile App Setup

#### Android

1. Install Android Studio
2. Set up Android SDK and emulator
3. Run: `pnpm dev:android` or scan QR code with Expo Go

#### iOS (macOS only)

1. Install Xcode
2. Set up iOS Simulator
3. Run: `pnpm dev:ios` or scan QR code with Expo Go

## 📱 Usage Instructions

### Authentication

1. Open the app on your device/emulator
2. Tap "Sign in with GitHub"
3. Complete the OAuth flow in your browser
4. You'll be redirected back to the app

### Task Management

1. **Add Tasks**: Tap the "+" floating action button
2. **Complete Tasks**: Tap the checkbox next to any task
3. **Edit Tasks**: Tap on a task to open the edit modal
4. **Delete Tasks**: Swipe left on any task
5. **Set Priority**: Use the priority selector when creating/editing tasks
6. **Set Due Date**: Tap the calendar icon to set a due date

### Theme Switching

- Navigate to the Settings tab
- Toggle between light and dark themes

## 🏗️ Project Structure

```
todo/
├── apps/
│   └── expo/                 # React Native mobile app
│       ├── src/
│       │   ├── app/          # App router pages
│       │   ├── components/   # Reusable UI components
│       │   ├── hooks/        # React hooks (queries, mutations)
│       │   └── utils/        # Utilities and helpers
│       └── assets/           # Images and static assets
├── packages/
│   ├── api/                  # NestJS backend API
│   │   └── src/
│   │       ├── task/         # Task module (controller, service)
│   │       └── prisma/       # Database schema and models
│   ├── validators/           # Shared validation schemas
│   └── lib/                  # Shared utilities
└── tooling/                  # Shared tooling configs
    ├── eslint/
    ├── prettier/
    ├── tailwind/
    └── typescript/
```

## 📚 Third-Party Libraries

### Frontend (React Native/Expo)

#### Core Framework

- **`expo`** (v53.0.22) - React Native framework for rapid development
- **`react-native`** (v0.79.5) - Core React Native framework
- **`expo-router`** (v5.1.5) - File-based routing for React Native

#### UI & Styling

- **`nativewind`** (v4.1.23) - Tailwind CSS for React Native
- **`tailwind-merge`** (v3.3.1) - Utility for merging Tailwind classes
- **`class-variance-authority`** (v0.7.1) - Type-safe variant API for components
- **`lucide-react-native`** (v0.542.0) - Beautiful icon library
- **`react-native-ui-datepicker`** (v3.1.2) - Native date picker component

#### State Management & Data Fetching

- **`@tanstack/react-query`** (v5.85.5) - Powerful data synchronization and caching
- **`react-hook-form`** (v7.62.0) - Performant forms with easy validation
- **`@hookform/resolvers`** (v5.2.1) - Validation resolvers for react-hook-form

#### Authentication

- **`better-auth`** (v1.3.7) - Modern authentication library
- **`@better-auth/expo`** (v1.3.7) - Expo adapter for better-auth

#### Animations & Gestures

- **`react-native-reanimated`** (v4.0.3) - Smooth animations and gestures
- **`react-native-gesture-handler`** (v2.24.0) - Gesture recognition
- **`@legendapp/list`** (v1.0.15) - Optimized list component with animations

#### Storage & Navigation

- **`@react-native-async-storage/async-storage`** (v2.1.2) - Persistent storage
- **`expo-secure-store`** (v14.2.4) - Secure storage for sensitive data

#### Utilities

- **`date-fns`** (v4.1.0) - Modern date utility library
- **`clsx`** (v2.1.1) - Utility for constructing className strings
- **`superjson`** (v2.2.2) - JSON serialization with support for additional types

### Backend (NestJS)

#### Core Framework

- **`@nestjs/core`** (v11.0.1) - Core NestJS framework
- **`@nestjs/common`** (v11.0.1) - Common NestJS utilities
- **`@nestjs/platform-express`** (v11.0.1) - Express platform adapter

#### Database

- **`@prisma/client`** (v6.14.0) - Type-safe database client
- **`prisma`** (v6.14.0) - Database toolkit and ORM

#### Authentication

- **`better-auth`** (v1.3.7) - Authentication library
- **`@thallesp/nestjs-better-auth`** (v1.0.3) - NestJS integration for better-auth

#### Validation

- **`zod`** (v4.1.3) - TypeScript-first schema declaration and validation

#### Configuration

- **`@nestjs/config`** (v4.0.2) - Configuration module for NestJS

### Development Tools

#### Build Tools

- **`turbo`** (v2.5.4) - High-performance build system for JavaScript/TypeScript monorepos
- **`typescript`** (v5.8.3) - TypeScript language support

#### Code Quality

- **`eslint`** (v9.28.0) - JavaScript/TypeScript linting
- **`prettier`** (v3.5.3) - Code formatting
- **`tailwindcss`** (v3.4.15) - Utility-first CSS framework

#### Package Management

- **`pnpm`** (v10.11.1) - Fast, disk space efficient package manager

## 🔧 Available Scripts

### Root Level

```bash
pnpm dev          # Start all development servers
pnpm build        # Build all packages
pnpm lint         # Lint all packages
pnpm lint:fix     # Fix linting issues
pnpm format       # Format code
pnpm format:fix   # Fix formatting issues
pnpm typecheck    # Run TypeScript checks
pnpm clean        # Clean node_modules
```

### Mobile App (apps/expo)

```bash
pnpm dev          # Start Expo development server
pnpm dev:android  # Start with Android
pnpm dev:ios      # Start with iOS
pnpm android      # Build and run on Android
pnpm ios          # Build and run on iOS
```

### Backend API (packages/api)

```bash
pnpm dev          # Start development server with hot reload
pnpm build        # Build for production
pnpm start        # Start production server
pnpm start:prod   # Start production server (optimized)
```

## 🐛 Troubleshooting

### Common Issues

#### Metro bundler issues

```bash
# Clear Metro cache
npx expo start --clear
```

#### Database connection issues

- Ensure PostgreSQL is running
- Check DATABASE_URL in your .env file
- Verify database permissions

#### Authentication issues

- Verify GitHub OAuth app configuration
- Check BETTER_AUTH_SECRET and BETTER_AUTH_URL
- Ensure redirect URLs are correctly configured

#### Build issues

```bash
# Clean and reinstall dependencies
pnpm clean
pnpm install

# Clear Turbo cache
pnpm clean:workspaces
```
