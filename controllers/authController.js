const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs");

async function createUser(req, res) {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10)
  await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
    },
  });
  res.json(req.body)
}

module.exports = { createUser };
