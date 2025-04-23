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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Express app running at port ${PORT}`);
});
