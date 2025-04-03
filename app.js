require("dotenv").config();
const express = require("express");
const app = express();
const postRouter = require("./routes/postRouter");
const authRouter = require("./routes/authRouter")
const prisma = require("./config/prisma");


app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/", postRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Express app running at port ${PORT}`);
});
