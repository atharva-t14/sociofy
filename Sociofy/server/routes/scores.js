import express from "express";
import { updateScore } from "../controllers/scores.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* UPDATE */
router.patch("/:id", verifyToken, updateScore);

export default router;
