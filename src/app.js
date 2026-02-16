import Fastify from "fastify";
import env from "./config/env.js";
import logger from "./config/logger.js";
import routes from "./routes/routes.js";

import path from "node:path";
import { fileURLToPath } from "node:url";
import fastifyview from "@fastify/view";
import ejs from "ejs";
import fastifyStatic from "@fastify/static";
import dbConnector from "./config/db.js";
import fastifyFormbody from "@fastify/formbody";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fastify = Fastify({
  logger: logger,
});

fastify.addHook("onRequest", async (request, reply) => {
  request.log.info(`Incoming request: ${request.method} ${request.url}`);
});

fastify.addHook("onResponse", async (request, reply) => {
  request.log.info(
    `Request completed: ${request.method} ${request.url} - Status ${reply.statusCode}`
  );
});

await fastify.register(fastifyview, {
  engine: {
    ejs: ejs,
  },
  root: path.join(__dirname, "views"),
  viewExt: "ejs",
  layout: "layout.ejs",
});

// Register static files
fastify.register(fastifyStatic, {
  root: path.join(__dirname, "public"),
  prefix: "/public/",
});

await fastify.register(fastifyFormbody);

fastify.register(dbConnector);

await fastify.register(routes);

fastify.listen({ port: env.port }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Blog App is running in ${env.nodeEnv} mode at ${address}`);
});
