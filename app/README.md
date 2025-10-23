# ModernBlog — React + Appwrite + Tailwind

A modern, production-ready blog application built with React (Vite), React Router, Redux Toolkit, React Hook Form, TinyMCE rich-text editor, Tailwind CSS, and Appwrite as the backend. Includes theme switching (light/dark) and clean, responsive design.

## Features
- Authentication (register, login, logout) via Appwrite Account API
- Create, read, update, delete posts in Appwrite Databases
- Rich text authoring with TinyMCE React editor
- SEO-friendly slugs, post listing and detail views
- Theme switching (dark mode via Tailwind `class` strategy)
- Responsive UI components built with Tailwind

## Project Structure
```
src/
  components/
    Editor.jsx
    Footer.jsx
    Header.jsx
    PostCard.jsx
    ProtectedRoute.jsx
    ThemeToggle.jsx
  features/
    auth/
      authSlice.js
    theme/
      themeSlice.js
  pages/
    CreatePost.jsx
    EditPost.jsx
    Home.jsx
    Login.jsx
    Post.jsx
    Profile.jsx
  services/
    appwrite.js
  store/
    index.js
  App.jsx
  index.css
  main.jsx
```

## Prerequisites
- Node 18+ (Node 20+ recommended)
- An Appwrite project (self-hosted or Appwrite Cloud)
- Optional: TinyMCE API key (for cloud features)

## Appwrite Setup
1. Create a new Appwrite project.
2. Under Project Settings, note your:
   - Project ID
   - API Endpoint (e.g., `https://cloud.appwrite.io/v1`)
3. Create a Database:
   - Database ID: create one (copy its ID)
   - Collection: `posts` (copy its Collection ID)
4. In the `posts` collection, add attributes:
   - `title` (string, required)
   - `slug` (string, required, unique suggested)
   - `content` (string, required)
   - `authorId` (string, required)
   - `authorName` (string, required)
   - `coverImageUrl` (string, optional)
5. Permissions (basic example):
   - Create/Update/Delete: `users`
   - Read: `any`
6. Authentication:
   - Enable Email/Password auth in Auth Providers

## Environment Variables
Copy `.env.example` to `.env` and fill in values:

```
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=YOUR_PROJECT_ID
VITE_APPWRITE_DATABASE_ID=YOUR_DATABASE_ID
VITE_APPWRITE_POSTS_COLLECTION_ID=YOUR_POSTS_COLLECTION_ID
VITE_TINYMCE_API_KEY=YOUR_TINYMCE_KEY   # optional
```

## Develop
```
pnpm install
pnpm dev
```
Visit `http://localhost:5173`.

## Build
```
pnpm build
pnpm preview
```

## Notes
- Editor skin/theme follows current Tailwind dark mode automatically at mount time.
- Adjust Appwrite document permissions to your needs for moderation and access control.
- You can expand with storage for cover images, tags, comments, etc.
