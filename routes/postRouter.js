const { Router } = require("express");
const postRouter = Router();
const postController = require("../controllers/postController");

postRouter
  .route("/")
  .get(postController.getAllPublishedPosts)
  .post(postController.createPost);
postRouter
  .route("/:postId")
  .get(postController.getPostById)
  .put(postController.updatePost)
  .delete(postController.deletePost);
postRouter
  .route("/:postId/comments")
  .post(postController.createComment)
  .get(postController.getCommentsByPostId)

postRouter
  .route("/:postId/comments/:commentId")
  .put(postController.updateComment)
  .delete(postController.deleteComment);

module.exports = postRouter;
