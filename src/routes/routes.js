import { getRoot } from "../controllers/root.controller.js";
import {
  getNewPost,
  createPost,
} from "../controllers/createPost.controller.js";

export default async function routes(fastify, options) {
  fastify.get("/", getRoot);
  // Register post routes with the /post prefix
  fastify.register(
    async function (postRoutes) {
      postRoutes.get("/new", getNewPost);
      postRoutes.post("/", createPost);
    },
    { prefix: "/post" },
  );
}
