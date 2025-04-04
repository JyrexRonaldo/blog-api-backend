const { Router } = require("express")
const postRouter = Router()
const postController = require("../controllers/postController")


postRouter.route("/").get(postController.getAllPosts)
postRouter.route("/:postId").get(postController.getPostById)
postRouter.route("/:postId/comment").post(postController.createComment)



module.exports = postRouter