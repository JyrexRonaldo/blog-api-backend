const prisma = require("../config/prisma");

async function getAllPosts(req, res) {
  const posts = await prisma.post.findMany();
  res.json(posts);
}

async function getPostById(req, res) {
  const { postId } = req.params;
  const post = await prisma.post.findUnique({
    where: {
      id: +postId
    }
  })

  res.json(post);
}
module.exports = { getAllPosts, getPostById };
