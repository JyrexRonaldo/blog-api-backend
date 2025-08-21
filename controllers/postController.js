const prisma = require("../config/prisma");
const asyncHandler = require("express-async-handler");

const createPost = asyncHandler(async (req, res) => {
  const { title, body, authorId, status } = req.body;
    const publishStatus = status === "true" ? true : false;
  const data = await prisma.post.create({
    data: {
      title,
      body,
      authorId: +authorId,
      status: publishStatus,
    },
  });
  res.json(data);
});

const getAllPosts = asyncHandler(async (req, res) => {
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
});

const getAllPublishedPosts = asyncHandler(async (req, res) => {
  const posts = await prisma.post.findMany({
    where: {
      status: true,
    },
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
});

const getPostById = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const post = await prisma.post.findUnique({
    where: {
      id: +postId,
    },
    include: {
      author: {
        select: {
          username: true,
        },
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });
  res.json(post);
});

const updatePost = asyncHandler(async (req, res) => {
  const { title, body, authorId, status } = req.body;
  const { postId } = req.params;
  const publishStatus = status === "true" ? true : false;
  const data = await prisma.post.update({
    where: {
      id: +postId,
    },
    data: {
      title,
      body,
      authorId: +authorId,
      status: publishStatus,
    },
  });
  res.json(data);
});

const deletePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  await prisma.post.delete({
    where: {
      id: +postId,
    },
  });
  res.json({ deleted: postId });
});

const createComment = asyncHandler(async (req, res) => {
  const { comment, authorId, postId } = req.body;
  await prisma.comment.create({
    data: {
      comment,
      authorId: +authorId,
      postId: +postId,
    },
  });
  res.json(req.body);
});

const getCommentsByPostId = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const comments = await prisma.comment.findMany({
    where: {
      postId: +postId,
    },
    include: {
      author: {
        select: {
          username: true,
          role: true,
        },
      },
    },
  });
  res.json(comments);
});

const updateComment = asyncHandler(async (req, res) => {
  const { comment, authorId } = req.body;
  const { postId, commentId } = req.params;
  await prisma.comment.update({
    where: {
      id: +commentId,
    },
    data: {
      comment,
      authorId: +authorId,
      postId: +postId,
    },
  });
  res.json(req.body);
});

const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.body;
  await prisma.comment.delete({
    where: {
      id: +commentId,
    },
  });
  res.json({ deleted: commentId });
});

module.exports = {
  createPost,
  getAllPosts,
  getAllPublishedPosts,
  getPostById,
  updatePost,
  deletePost,
  createComment,
  updateComment,
  deleteComment,
  getCommentsByPostId,
};
