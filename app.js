require("dotenv").config();
const express = require("express");
const app = express();
const postRouter = require("./routes/postRouter");
const authRouter = require("./routes/authRouter");
const cors = require("cors");

// const corsOptions = {
//   origin: [
//     "https://blog-api-users-ires0gf1l-jyrexronaldos-projects.vercel.app/",
//     "https://blog-api-admin-93axs6972-jyrexronaldos-projects.vercel.app/",
//     "https://blog-api-admin.vercel.app/",
//     "https://blog-api-users.vercel.app/"
//   ],
//   credentials: true,
//   methods: ["GET", "POST", "HEAD", "PUT", "PATCH", "DELETE"],
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };

// origin: <FROTNEND-URL>,
// credentials: true,
// methods: ['GET','POST','HEAD','PUT','PATCH','DELETE'],

app.use(cors());

app.use(express.json());

app.use("/auth", authRouter);
app.use("/", postRouter);
app.use((err, req, res, next) => {
  console.error(err);
  // You will see an OH NO! in the page, with a status code of 500 that can be seen in the network tab of the dev tools
  res.status(500).json(err.message);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Express app running at port ${PORT}`);
});
