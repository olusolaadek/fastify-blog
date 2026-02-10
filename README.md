# Fastify Blog Application

A blog application built with Fastify, EJS templating, and SQLite database.

## Material

https://betterstack.com/community/guides/scaling-nodejs/introduction-to-fastify/#step-1-understanding-fastify

## Current Progress

### ✅ Implemented Features

#### Core Setup

- [x] Fastify server configuration with custom logger
- [x] Environment variable management with schema validation
- [x] Development mode with hot reload (`--watch` flag)

#### View Layer

- [x] EJS templating engine integration
- [x] Layout system with base template
- [x] Static file serving for CSS and assets
- [x] Views created:
  - `index.ejs` - Homepage
  - `new.ejs` - Create new post form
  - `layout.ejs` - Base layout template
  - `post.ejs` - Individual post view (prepared)
  - `edit.ejs` - Edit post form (prepared)

#### Database

- [x] Better-SQLite3 integration
- [x] Database connector plugin with fastify-plugin
- [x] Posts table schema:
  - `id` - Auto-incrementing primary key
  - `title` - Post title
  - `slug` - URL-friendly slug (unique)
  - `content` - Post content
  - `created_at` - Timestamp
- [x] Database lifecycle management (auto-close on app shutdown)

#### Functionality

- [x] Homepage route (`GET /`)
- [x] Create new post form (`GET /post/new`)
- [x] Create post endpoint (`POST /post`)
- [x] Automatic slug generation from post titles
- [x] Form body parsing

### 🚧 Planned Features (Not Yet Implemented)

- [ ] Display posts on homepage
- [ ] View individual post (`GET /post/:slug`)
- [ ] Edit post functionality (`GET /post/:slug/edit`, `POST /post/:slug`)
- [ ] Delete post functionality (`DELETE /post/:slug`)
- [ ] Pagination for post listings
- [ ] Search functionality
- [ ] Post categories/tags
- [ ] Markdown support for post content
- [ ] Input validation and error handling
- [ ] Flash messages for user feedback

## Setup Instructions

### 1. Install Dependencies

Install all necessary dependencies:

```bash
npm install
```

**Dependencies installed:**

- `fastify` - Fast and low overhead web framework
- `@fastify/view` - Template rendering plugin
- `@fastify/static` - Static file serving plugin
- `@fastify/formbody` - Form body parser
- `ejs` - Embedded JavaScript templating
- `better-sqlite3` - SQLite database driver
- `slugify` - URL slug generation
- `env-schema` - Environment variable validation

### 2. Environment Configuration

Create a `.env` file in the root directory:

```env
PORT=3000
LOG_LEVEL=info
NODE_ENV=development
DB_FILE=./blog.db
```

**Environment Variables:**

- `PORT` - Server port (default: 3000)
- `LOG_LEVEL` - Logging level (trace, debug, info, warn, error)
- `NODE_ENV` - Environment mode (development, production)
- `DB_FILE` - SQLite database file path

### 3. Start the Server

```bash
npm run dev
```

The server will start with hot reload enabled. Any changes to the source code will automatically restart the server.

### 4. Access the Application

Open your browser and navigate to:

- **Homepage:** `http://localhost:3000/`
- **Create Post:** `http://localhost:3000/post/new`

## Project Structure

```
fastify-blog/
├── src/
│   ├── app.js                 # Main application entry point
│   ├── logger.js              # Logger configuration
│   ├── config/
│   │   ├── db.js              # Database connector plugin
│   │   ├── env.js             # Environment variable loader
│   │   └── logger.js          # Logger settings
│   ├── controllers/
│   │   ├── root.controller.js # Homepage controller
│   │   └── createPost.controller.js # Post creation controller
│   ├── routes/
│   │   └── routes.js          # Application routes
│   ├── views/
│   │   ├── layout.ejs         # Base layout template
│   │   ├── index.ejs          # Homepage view
│   │   ├── new.ejs            # Create post form
│   │   ├── post.ejs           # Single post view
│   │   └── edit.ejs           # Edit post form
│   └── public/
│       └── styles.css         # Application styles
├── package.json
├── .env                       # Environment variables
└── blog.db                    # SQLite database (auto-created)
```

## Usage

### Creating a New Post

1. Navigate to `http://localhost:3000/post/new`
2. Fill in the post title and content
3. Click "Create Post"
4. You'll be redirected to the homepage

The application automatically generates a URL-friendly slug from the post title.

## Technologies Used

- **Fastify** - Web framework
- **EJS** - Templating engine
- **Better-SQLite3** - SQL database
- **Slugify** - URL slug generation
- **env-schema** - Environment validation

## Next Steps

To continue development, consider implementing:

1. Displaying posts on the homepage
2. Individual post view page
3. Edit and delete functionality
4. Input validation and error handling
5. Markdown support for rich content formatting
