import fp from "fastify-plugin";
import Database from "better-sqlite3";
import env from "./env.js";

async function dbConnector(fastify, options) {
  const dbFile = env.dbPath || "./blog.db";
  const db = new Database(dbFile, { verbose: console.log });

  db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      content TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // You can set pragmas or initialize the database here if needed
  // db.pragma("journal_mode = WAL");

  fastify.decorate("db", db);

  fastify.addHook("onClose", async (fastifyInstance, done) => {
    db.close();
    done();
  });

  console.log("Database and posts table created successfully");
}

export default fp(dbConnector);
