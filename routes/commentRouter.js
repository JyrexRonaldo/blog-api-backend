const { Router } = require("express");
const commentRouter = Router();
const commentController = require("../controllers/commentController");

commentRouter.route("/").get(commentController.getAllComments)


module.exports = commentRouter;
