const { Router } = require("express");
const authRouter = Router();
const authController = require("../controllers/authController");

authRouter
  .route("/sign-up")
  .post(authController.createUser, authController.handleLogIn);

authRouter.route("/log-in").post(authController.handleLogIn);

authRouter
  .route("/test-auth")
  .get(authController.authenticateUser, authController.testMiddleware);
authRouter.route("/test-auth2").get(authController.testMiddleware);

module.exports = authRouter;
