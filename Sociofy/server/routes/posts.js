import express from "express";
import { getFeedPosts, getUserPosts, getCommunityPosts, likePost, patchComment, getComments } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);
router.get("/:postId/comments", verifyToken, getComments);

router.get("/:communityName", verifyToken, getCommunityPosts);

/* UPDATE */
router.patch("/:postId/like", verifyToken, likePost);
router.patch("/:postId/comment", verifyToken, patchComment);

export default router;