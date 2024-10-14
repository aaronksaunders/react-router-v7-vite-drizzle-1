# React Router Contact Management App

This is a contact management application built with React Router and Drizzle ORM. It allows users to view, add, edit, and delete contacts.

## Technologies Used

- React
- React Router (v7.0.0-pre.1)
- Drizzle ORM
- SQLite (via better-sqlite3)
- Tailwind CSS
- TypeScript
- Vite

## Features

- View a list of contacts
- Add new contacts
- Edit existing contacts
- Delete contacts
- Server-side rendering with React Router

## Prerequisites

- Node.js (v20.0.0 or later)
- npm (comes with Node.js)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:
   ```
   DATABASE_URL=./sqlite.db
   ```

## Setup

1. Generate the database schema:
   ```
   npm run generate
   ```

2. Push the schema to the database:
   ```
   npm run push
   ```

## Running the Application

1. Start the development server:
   ```
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

## Building for Production

1. Build the application:
   ```
   npm run build
   ```

2. Start the production server:
   ```
   npm start
   ```

## Additional Scripts

- `npm run typecheck`: Run TypeScript type checking
- `npm run migrate`: Run database migrations
- `npm run studio`: Open Drizzle Studio for database management

## Project Structure

- `app/`: Contains the main application code
  - `db/`: Database configuration and schema
  - `routes/`: React Router route components
  - `loaders/`: Data loading functions for routes
- `drizzle/`: Contains database migration files
- `public/`: Static assets

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
