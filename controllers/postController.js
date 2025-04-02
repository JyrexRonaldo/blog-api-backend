const prisma = require("../config/prisma");

async function getAllPosts(req, res) {
  const posts = await prisma.post.findMany();
  res.json(posts);
}

module.exports = { getAllPosts };
