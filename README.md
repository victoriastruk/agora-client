# Agora Client

A modern Agora client built with React, TypeScript, TanStack Router, and TanStack Query. Features file-based routing, automatic code splitting, and **automatic environment setup**.

## Features

- **Modern React**: Built with React 19 and TypeScript
- **File-Based Routing**: TanStack Router with automatic code splitting
- **Data Fetching**: TanStack Query for efficient data management
- **UI Framework**: Tailwind CSS for styling
- **Development Tools**: Hot reload, routing and query devtools
- **Environment Management**:
  - `.env` files are generated automatically from `.env.example`
  - Type-safe environment variables with Zod validation

## Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Routing**: TanStack Router (file-based)
- **State Management**: TanStack Query
- **Styling**: Tailwind CSS
- **Build Tool**: Rsbuild
- **Package Manager**: Bun

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd agora-client
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

   > **Note:** During installation, the `setup-dev.ts` script runs automatically.
   > It scans the project for `.env.example` files and creates corresponding `.env` files if they do not already exist.

3. **Start development server**
   ```bash
   bun run dev
   ```

## Environment Variables

- `.env` files are automatically generated from `.env.example`.
- Variables are validated using **Zod** for type safety.

## 📁 Project Structure (FSD)

Following **Feature-Sliced Design (FSD)** architecture:

```
src/
├── app/                     # Application layer
│   ├── index.tsx            # Application entry point
│   ├── providers/           # App-wide providers
│   ├── routing/             # Routing configuration
│   └── styles/              # Global styles
│       └── index.css
├── pages/                   # Page components
│   ├── home/                # Home page
│   │   └── index.tsx
│   └── root/                # Root layout
│       └── __root.tsx
├── widgets/                 # Complex UI components
├── features/                # Business features
├── entities/                # Business entities
├── shared/                  # Shared resources
│   ├── ui/                  # Reusable UI components
│   ├── utils/               # Utility functions
│   │   ├── env.ts           # Environment configuration
│   │   └── query-client.ts  # Query client setup
│   ├── lib/                 # External libraries config
│   ├── config/              # App configuration
│   └── assets/              # Static assets
├── routeTree.gen.ts         # Auto-generated route tree
└── index.html
```

### FSD Layers Explained

- **`app`** - Application initialization, providers, global config
- **`pages`** - Page components and routing logic (formerly routes)
- **`widgets`** - Composite UI components combining features/entities
- **`features`** - Business features (auth, posts, comments, etc.)
- **`entities`** - Business entities (user, post, subreddit, etc.)
- **`shared`** - Reusable code across the application

## Commands

```bash
#Generate routeTree.gen.ts
bun run generate:routes

# Start development server with HMR and auto-open browser
bun run dev

# Build the project (production mode by default)
bun run build

# Build in development mode (useful for debugging build output)
bun run build:dev

# Explicit production build
bun run build:prod

# Analyze bundle size
bun run build:analyze

# Preview production build locally
bun run preview

# Lint source code
bun run lint

# Lint with type awareness
bun run lint:aware

# Auto-fix lint issues and format code
bun run lint:fix

# Format code
bun run fmt

# Check formatting only
bun run fmt:check

# TypeScript type checking
bun run type-check
```

📱 Phone mock code: 123456

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
