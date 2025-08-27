# Personal Trainer Management System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](https://www.typescriptlang.org/)
[![SolidJS](https://img.shields.io/badge/SolidJS-%2300d8ff.svg?style=flat&logo=solid&logoColor=white)](https://solidjs.com/)

A comprehensive web application designed to streamline personal training operations by providing trainers and clients with powerful tools for workout management, program design, and progress tracking.

## 🎯 Overview

The Personal Trainer Management System bridges the gap between fitness professionals and their clients through an intuitive platform that simplifies workout planning, client management, and progress monitoring. Whether you're a solo trainer or managing multiple clients, this application provides the tools needed to deliver professional fitness services efficiently.

## ✨ Key Features

### For Trainers
- **Client Portfolio Management** - Centralized dashboard to oversee all clients and their progress
- **Custom Workout Builder** - Create detailed exercise routines with sets, reps, weights, and rest periods
- **Program Architecture** - Design structured training programs spanning weeks or months
- **Progress Analytics** - Visual insights into client performance and improvements
- **Secure Client Communication** - Built-in messaging and progress sharing capabilities

### For Clients
- **Personalized Dashboard** - Access assigned workouts and track personal fitness journey
- **Workout Logging** - Easy-to-use interface for recording exercise completion and performance
- **Progress Visualization** - Charts and metrics showing fitness improvements over time
- **Program Timeline** - Clear view of upcoming workouts and program milestones

## 🏗️ Technical Architecture

### Frontend
- **[SolidJS](https://solidjs.com/)** - Reactive UI framework for optimal performance and developer experience
- **TypeScript** - Type-safe development with enhanced IDE support
- **Modern CSS** - Responsive design with clean, professional aesthetics

### Backend
- **[Bun](https://bun.sh/)** - High-performance JavaScript runtime and package manager
- **[Hono](https://hono.dev/)** - Lightweight, fast web framework for API development
- **RESTful API Design** - Clean, predictable endpoints following industry standards

### Database & Storage
- **[Drizzle ORM](https://orm.drizzle.team/)** - Type-safe database operations with excellent TypeScript integration
- **[Neon](https://neon.tech/)** - Serverless Postgres for scalable data storage
- **SQLite Support** - Local development flexibility

### Authentication & Security
- **[Clerk](https://clerk.com/)** - Enterprise-grade authentication with role-based access control
- **JWT Token Management** - Secure session handling
- **Role-based Permissions** - Granular access control for trainers and clients

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or Bun runtime
- Git
- A Clerk account for authentication setup

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/personal-trainer-app.git
   cd personal-trainer-app
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   ```
   Configure the following environment variables:
   ```env
   DATABASE_URL=your_database_connection_string
   CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   ```

4. **Database initialization**
   ```bash
   bun run db:migrate
   bun run db:seed # Optional: Add sample data
   ```

5. **Start development server**
   ```bash
   bun run dev
   ```

Visit `http://localhost:3000` to access the application.

## 📖 Usage Guide

### Getting Started as a Trainer
1. Create your account and complete the trainer profile setup
2. Add your first client through the client management dashboard
3. Design a workout program using the workout builder
4. Assign the program to your client and monitor their progress

### Getting Started as a Client
1. Sign up using the invitation link provided by your trainer
2. Complete your fitness profile and goals
3. Access your assigned workouts from the dashboard
4. Log your exercise completion and track your progress

## 🛠️ Development

### Available Scripts
- `bun run dev` - Start development server with hot reload
- `bun run build` - Build production-ready application
- `bun run preview` - Preview production build locally
- `bun run test` - Run test suite
- `bun run lint` - Check code quality and formatting
- `bun run db:migrate` - Apply database migrations
- `bun run db:studio` - Open Drizzle Studio for database management

### Project Structure
```
src/
├── components/        # Reusable UI components
├── pages/            # Route components
├── lib/              # Utilities and configurations
├── api/              # Backend API routes
├── db/               # Database schemas and migrations
└── types/            # TypeScript type definitions
```

## 🤝 Contributing

We welcome contributions from the community! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting pull requests.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes and add tests
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [SolidJS Team](https://github.com/solidjs/solid) for the excellent reactive framework
- [Bun Team](https://github.com/oven-sh/bun) for the fast runtime and tooling
- [Hono Team](https://github.com/honojs/hono) for the lightweight web framework
- [Drizzle Team](https://github.com/drizzle-team/drizzle-orm) for the type-safe ORM

## 📞 Support

If you encounter any issues or have questions:
- Create an [issue](https://github.com/Ebrahimgreat/personal-trainer-app/issues)
---

**Built with ❤️ for the fitness community**