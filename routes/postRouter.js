const { Router } = require("express")
const postRouter = Router()
const postController = require("../controllers/postController")


postRouter.route("/").get(postController.getAllPosts)
postRouter.route("/:postId").get(postController.getPostById)



module.exports = postRouter