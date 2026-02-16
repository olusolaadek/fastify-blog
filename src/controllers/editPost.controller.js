import slugify from "slugify";

export function getEditPost(request, reply) {
  const { slug } = request.params;
  const { db } = request.server;
  const post = db.prepare("SELECT * FROM posts WHERE slug = ?").get(slug);

  if (!post) {
    return reply.status(404).send({ error: "Post not found" });
  }

  return reply.view("edit", { title: "Edit Post", post });
}

export function editPost(request, reply) {
  const { slug } = request.params;
  const { title, content } = request.body || {};

  if (typeof title !== "string" || typeof content !== "string") {
    return reply.status(400).send({ error: "Title and content are required." });
  }

  const trimmedTitle = title.trim();
  const trimmedContent = content.trim();

  if (!trimmedTitle || !trimmedContent) {
    return reply
      .status(400)
      .send({ error: "Title and content must not be empty." });
  }

  const newSlug = slugify(trimmedTitle, { lower: true, strict: true });
  const { db } = request.server;

  // Ensure the new slug does not conflict with an existing post
  const existingPostWithSlug = db
    .prepare("SELECT slug FROM posts WHERE slug = ?")
    .get(newSlug);

  if (newSlug !== slug && existingPostWithSlug) {
    return reply.status(400).send({ error: "A post with this title already exists" });
  }
  const updateStatement = db.prepare(
    "UPDATE posts SET title = ?, slug = ?, content = ? WHERE slug = ?"
  );

  const result = updateStatement.run(title, newSlug, content, slug);

  if (!result || result.changes === 0) {
    return reply.status(404).send({ error: "Post not found" });
  }
  return reply.redirect(`/post/${newSlug}`);
}
