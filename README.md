# Todo Application

A full-stack Todo application built with Next.js, NestJS, and MySQL. This application provides a seamless task management experience with user authentication and real-time updates.

## Features

- User authentication (Login/Logout)
- Create, read, update, and delete todos
- Mark todos as pending/in-progress/done
- Responsive design for all devices
- Secure JWT authentication
- Clean and intuitive user interface

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or later)
- npm or yarn
- MySQL Server (v8.0 or later)
- Docker (For containerized database)

## Tech Stack

- **Frontend**: Next.js with TypeScript
- **Backend**: NestJS with TypeScript
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Tailwind CSS
- **Containerization**: Docker

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/faizkhan01/todo-app-sofofTechTask.git
cd todo-app-sofofTechTask
```

### 2. Set Up Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies and set up environment variables:
   ```bash
   npm install

   cp .env.example .env
   ```

3. Start the database and phpmyadmin (using Docker):
   ```bash
   docker compose up -d
   ```
   
   Or manually create a MySQL database named `todo_db`.

4. Run database migrations:
   ```bash
   npm run migration:run
   ```

5. Start the backend server:
   ```bash
   # Development
   npm run start:dev
   
   # Production
   npm run build
   npm run start:prod
   ```

The backend will be available at `http://localhost:3000` by default.

6. Running Tests:
The backend uses Jest (default with NestJS) for unit and e2e testing.
   ```bash
   # Run all tests
   npm run test

   # Run tests in watch mode
   npm run test:watch

   # Run test coverage
   npm run test:cov

   # Run end-to-end tests
   npm run test:e2e
   ```

### 3. Set Up Frontend

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies and set up environment variables:
   ```bash
   npm install

   cp .env.example .env
   ```

3. Start the development server:
   ```bash
   # Development
   npm run dev
   
   # Production build
   npm run build
   npm start
   ```

The frontend will be available at `http://localhost:3001`.

## Getting Started with the Application

### Sign Up
1. Navigate to the frontend application at `http://localhost:3001`
2. Click on "create a new account" link
3. Fill in the registration form with:
   - Username (minimum 3 characters, letters and numbers only)
   - Password (minimum 6 characters)
   - Confirm password
4. Click "Create account" to register

### Sign In
1. Navigate to the login page at `http://localhost:3001/login`
2. Enter your username and password
3. Click "Sign in" to access your todo dashboard

### Using the Todo Application
- **Create Todos**: Add new tasks using the form at the top
- **Filter Todos**: Use the filter bar to view todos by status (All, Pending, In Progress, Done)
- **Update Status**: Click on todo items to cycle through statuses
- **Delete Todos**: Click the delete button to remove completed tasks

## Available Scripts

### Backend
- `npm run start` - Start the production server
- `npm run start:dev` - Start the development server with hot-reload
- `npm run build` - Build the application
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run e2e tests
- `npm run test:cov` - Run test coverage

### Frontend
- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint

## Project Structure

```
todo-app-sofofTechTask/
├── backend/                    # Backend (NestJS)
│   ├── src/
│   │   ├── auth/               # Authentication module
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── jwt-auth.guard.ts
│   │   │   ├── jwt.strategy.ts
│   │   │   ├── local-auth.guard.ts
│   │   │   └── local.strategy.ts
│   │   │
│   │   ├── database/           # Database configurations
│   │   │   ├── migrations/     # Database migrations
│   │   │   └── seeders/        # Database seeders
│   │   │
│   │   ├── todo/               # Todo module
│   │   │   ├── entities/       # TypeORM entities
│   │   │   ├── repositories/   # Repository implementations
│   │   │   ├── todo.controller.ts
│   │   │   ├── todo.module.ts
│   │   │   ├── todo.service.ts
│   │   │   └── types.ts
│   │   │
│   │   ├── user/               # User module
│   │   │   ├── dto/            # Data Transfer Objects
│   │   │   ├── entities/       # TypeORM entities
│   │   │   ├── user.module.ts
│   │   │   └── user.service.ts
│   │   │
│   │   ├── app.controller.ts
│   │   ├── app.module.ts
│   │   ├── app.service.ts
│   │   └── main.ts             # Application entry point
│   │-- .gitignore              # Git ignore file
│   ├── test/                   # Test files
│   ├── .env.example            # Environment variables example
│   └── package.json
│
├── frontend/                   # Frontend (Next.js)
│   ├── public/                 # Static files
│   │   └── *.svg               # SVG assets
│   │
│   ├── src/
│   │   ├── app/                # Next.js app directory
│   │   │   ├── login/          # Login page
│   │   │   ├── globals.css     # Global styles
│   │   │   ├── layout.tsx      # Root layout
│   │   │   └── page.tsx        # Home page
│   │   │
│   │   ├── components/         # Reusable components
│   │   │   ├── FilterBar.tsx
│   │   │   ├── LoginForm.tsx
│   │   │   ├── TodoForm.tsx
│   │   │   └── TodoList.tsx
│   │   │
│   │   ├── enums/              # TypeScript enums
│   │   │   └── todo-status.enum.ts
│   │   │
│   │   ├── lib/                # Utility functions
│   │   │   └── api.ts          # API client
│   │   │
│   │   ├── types/              # TypeScript type definitions
│   │   │   └── todo.ts
│   │   │
│   │   └── middleware.ts       # Next.js middleware
│   │-- .gitignore              # Git ignore file
│   ├── .env.example            # Environment variables example
│   └── package.json
│
├
├── docker-compose.yml          # Docker configuration
└── README.md                   # Project documentation
```
