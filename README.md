### Testing the App

## Material
https://betterstack.com/community/guides/scaling-nodejs/introduction-to-fastify/#step-1-understanding-fastify

To get started with testing the app, follow these steps:

Install all necessary dependencies:

```bash
npm install @fastify/view ejs
npm install @fastify/static


npm install
```

Create a `.env` file in the root directory of your project with the following contents:

```env
PORT=3000
LOG_LEVEL=info
NODE_ENV=development
DB_FILE=./blog.db

```

Start the server:

```bash
npm run dev
```

Once the server is running, open your browser and navigate to `http://localhost:3000/`.

By following these steps, you can set up and run the server, allowing you to access the application locally in your browser.
