const { Router } = require("express");
const postRouter = Router();
const postController = require("../controllers/postController");

postRouter.route("/allposts").get(postController.getAllPosts);

postRouter
  .route("/:postId")
  .get(postController.getPostById)
  .put(postController.updatePost)
  .delete(postController.deletePost);

postRouter
  .route("/:postId/comments")
  .post(postController.createComment)
  .get(postController.getCommentsByPostId);

postRouter
  .route("/:postId/comments/:commentId")
  .put(postController.updateComment)
  .delete(postController.deleteComment);

postRouter
  .route("/")
  .get(postController.getAllPublishedPosts)
  .post(postController.createPost);

module.exports = postRouter;
