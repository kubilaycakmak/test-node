import { Router } from "express";

import authentication from "../middleware/authentication.js";
import {
  getAllPosts,
  getPostById,
  createAPost,
  updatePost,
  deletePost,
  createComment,
  likePost,
  unlikePost,
  likeComment,
  unlikeComment,
  updateComment,
  deleteComment
} from "../controller/post.js";
import checkOwner from "../middleware/checkOwner.js";

const router = Router();

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/", authentication, createAPost);
router.put("/:id", authentication, checkOwner, updatePost);
router.delete("/:id", authentication, checkOwner, deletePost);

router.post("/:id/comment", authentication, createComment);
router.put("/comment/:id", authentication, updateComment);
router.delete("/comment/:id", authentication, deleteComment);

router.post("/:id/like", authentication, likePost);
router.delete('/:id/like', authentication, unlikePost);

router.post("/comment/:id/like", authentication, likeComment);
router.delete("/comment/:id/like", authentication, unlikeComment);

export default router;
