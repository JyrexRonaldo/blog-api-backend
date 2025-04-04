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
  .put(postController.updatePost)
  .delete(postController.deletePost);
postRouter
  .route("/:postId/comments")
  .post(postController.createComment)
  .put(postController.updateComment);

  postRouter
  .route("/:postId/comments/commentId")
  .put(postController.updateComment);

module.exports = postRouter;
