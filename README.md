# React Router v7, Vite, DrizzleORM Contact Management App

Testing out the new React Router v7, ie next version of Remix using Vite by trying to build a simple application. This is a contact management application built with React Router and Drizzle ORM. It allows users to view, add, edit, and delete contacts.

## Technologies Used

- [React](https://reactjs.org/)
- [React Router (v7.0.0-pre.1) #dev branch](https://reactrouter.com/dev/guides)
- [Drizzle ORM](https://orm.drizzle.team/)
- [SQLite (via better-sqlite3)](https://github.com/WiseLibs/better-sqlite3)
- [Tailwind CSS](https://tailwindcss.com/)
- TypeScript
- [Vite](https://vitejs.dev/)

## Features

- View a list of contacts
- Add new contacts
- Edit existing contacts
- Delete contacts
- Server-side rendering with React Router


### Nested Routes Example
`route("/contact/:contactId", "routes/contact.tsx", [...])`
- Defines a route with a parameter, `/contact/:contactId`, where `:contactId` is a dynamic segment that can match different values (e.g., /contact/123).
- "`routes/contact.tsx`" specifies the component that will be rendered for this route.
- The third parameter is an array of nested routes, meaning there are additional routes that exist under the `/contact/:contactId` path.
- The nested routes are defined as follows:
   - `index("routes/contact_posts.tsx")`
      - Specifies an index route for `/contact/:contactId`, which will render the `contact_posts.tsx` component when the user navigates to `/contact/:contactId`. This route is used to display a list of posts.
   - `route("post/:postId", "routes/post.tsx")`
      - Defines a nested route under `/contact/:contactId` for a specific post (e.g., `/contact/123/post/456`).
      - "`routes/post.tsx`" specifies the component that will be rendered when this nested route is matched.
      - The `postId` parameter is a dynamic segment that can match different values (e.g., `/contact/123/post/456`).
      - This route allows you to create a nested structure under each contact, allowing you to display related posts or information for each contact.


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
- `npm run seed`: Seed the database with initial data, see `./app/db/seed.ts` for additional information


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
