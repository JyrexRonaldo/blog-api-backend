const { Router } = require("express")
const postRouter = Router()
const postController = require("../controllers/postController")


postRouter.route("/").get(postController.getAllPosts)



module.exports = postRouter