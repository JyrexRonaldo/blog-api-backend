const prisma = require("../config/prisma");

async function getAllComments(req, res) {
  const comments = await prisma.comment.findMany();
  res.json(comments)
}

module.exports = { getAllComments };
