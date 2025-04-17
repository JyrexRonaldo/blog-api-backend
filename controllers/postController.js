const prisma = require("../config/prisma");

async function createPost(req, res) {
  const { title, body, authorId } = req.body;
  await prisma.post.create({
    data: {
      title,
      body,
      authorId,
    },
  });
  res.json(req.body);
}

async function getAllPosts(req, res) {
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
      author : {
        select: {
          username: true
        }
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });
  res.json(post);
}

async function updatePost(req, res) {
  const { title, body, authorId } = req.body;
  const { postId } = req.params;
  await prisma.post.uodate({
    where: {
      id: +postId,
    },
    data: {
      title,
      body,
      authorId,
    },
  });
  res.json(req.body);
}

async function deletePost(req, res) {
  const { postId } = req.params;
  await prisma.post.delete({
    where: {
      id: +postId,
    },
  });
  res.json({ deleted: postId });
}

async function createComment(req, res) {
  const { comment, authorId, postId } = req.body;
  await prisma.comment.create({
    data: {
      comment,
      authorId,
      postId,
    },
  });
  res.json(req.body);
}

async function getCommentsByPostId(req, res) {
  const { postId } = req.params;
  const comments = await prisma.comment.findMany({
    where: {
      postId: +postId,
    },
    include: {
      author: {
        select: {
          username: true,
        },
      },
    },
  });
  res.json(comments);
}

async function updateComment(params) {
  const { comment, authorId, postId } = req.body;
  const { commentId } = req.params;
  await prisma.comment.update({
    where: {
      id: commentId,
    },
    data: {
      comment,
      authorId,
      postId,
    },
  });
  res.json(req.body);
}

async function deleteComment(req, res) {
  const { commentId } = req.params;
  await prisma.comment.delete({
    where: {
      id: +commentId,
    },
  });
  res.json({ deleted: commentId });
}

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  createComment,
  updateComment,
  deleteComment,
  getCommentsByPostId,
};
