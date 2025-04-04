const { Router } = require("express");
const postRouter = Router();
const postController = require("../controllers/postController");

postRouter
  .route("/")
  .get(postController.getAllPosts)
  .post(postController.createPost);
postRouter
  .route("/:postId")
  .get(postController.getPostById)
  .put(postController.updatePost);
postRouter.route("/:postId/comment").post(postController.createComment);

module.exports = postRouter;
