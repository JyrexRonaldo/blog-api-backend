const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("../config/passport");
const asyncHandler = require("express-async-handler");

const createUser = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
    },
  });
  // res.json("Registration successful! You can now login.");
  next();
});

const handleLogIn = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    // passwords do not match!
    return res.status(401).json({ message: "Wrong Password!!!" });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "1d",
    }
  );

  return res.status(200).json({
    message: "Auth Passed",
    token,
    userId: user.id,
    userRole: user.role,
  });
});

const authenticateUser = passport.authenticate("jwt", { session: false });

function testMiddleware(req, res) {
  console.log(req.user, "this works");
  res.end();
}

module.exports = { createUser, handleLogIn, authenticateUser, testMiddleware };
