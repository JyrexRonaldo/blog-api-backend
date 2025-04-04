const { Router } = require("express");
const authRouter = Router();
const authController = require("../controllers/authController");

authRouter.route("/sign-up").post(authController.createUser);

authRouter
  .route("/log-in")
  .post(authController.handleLogIn);

authRouter.route("/test-auth").post(authController.authenticateUser, authController.testMiddleware);
authRouter.route("/test-auth2").post(authController.testMiddleware);

module.exports = authRouter;
