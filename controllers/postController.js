const prisma = require("../config/prisma");

async function getAllPosts(req, res) {

  console.log(req.headers, "line 5 postController")
  const posts = await prisma.post.findMany({
    include: {
      author: true,
      comments: true,
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });
  res.json(posts);
}

async function getPostById(req, res) {
  const { postId } = req.params;
  const post = await prisma.post.findUnique({
    where: {
      id: +postId,
    },
    include: {
      comments: true,
    },
  });
  res.json(post);
}

async function createComment(req, res) {
    
}

module.exports = { getAllPosts, getPostById };
