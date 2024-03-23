import express from "express";
import { getFeedPosts, getUserPosts, getCommunityPosts, likePost, patchComment } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

router.get("/:communityName", verifyToken, getCommunityPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);
router.patch("/:id/comment", verifyToken, patchComment);

export default router;
