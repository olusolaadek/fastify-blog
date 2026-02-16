export function getDeleteConfirm(request, reply) {
    const { slug } = request.params;
    const { db } = request.server;
    const post = db.prepare("SELECT * FROM posts WHERE slug = ?").get(slug);

    if (!post) {
        return reply.status(404).view("404", { title: "Post not found" });
    }

    return reply.view("confirm-delete", { title: `Confirm delete: ${post.title}`, post });
}
