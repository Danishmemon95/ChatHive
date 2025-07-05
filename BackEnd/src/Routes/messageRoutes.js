import express from "express";
import { protectRoute } from "../Middlewares/authMiddleware.js";
import {
  getUsersForSideBar,
  getMessages,
  sendMessage,
} from "../Controllers/messageController.js";

const router = express.Router();

router.get("/users", protectRoute, getUsersForSideBar);
router.get("/:id", protectRoute, getMessages);

router.post("/send/:id", protectRoute, sendMessage);

export default router;
