export function deletePost(request, reply) {
    const { slug } = request.params;
    const { db } = request.server;

    const deleteStatement = db.prepare("DELETE FROM posts WHERE slug = ?");
    const result = deleteStatement.run(slug);

    if (!result || result.changes === 0) {
        return reply.status(404).send({ error: "Post not found" });
    }

    return reply.redirect("/");
}
