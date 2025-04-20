require("dotenv").config();
const express = require("express");
const app = express();
const postRouter = require("./routes/postRouter");
const authRouter = require("./routes/authRouter");
const commentRouter = require("./routes/commentRouter");
const cors = require("cors")

app.use(express.json());

app.use(cors())

app.use("/auth", authRouter);
app.use("/comments", commentRouter)
app.use("/", postRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Express app running at port ${PORT}`);
});
