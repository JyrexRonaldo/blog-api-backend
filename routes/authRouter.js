const { Router } = require("express")
const authRouter = Router()
const authController = require("../controllers/authController")

authRouter.route("/sign-up", authController.createUser)


module.exports = authRouter