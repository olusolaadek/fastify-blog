export async function getRoot(request, reply) {
  const { db } = request.server;
  const posts = db.prepare("SELECT * FROM posts ORDER BY id DESC").all();
  return reply.view("index", { title: "Home Page", posts });
}
