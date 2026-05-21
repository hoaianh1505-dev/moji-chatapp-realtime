import express from "express";
import { sendDirectMessage, sendGroupMessage } from "../controllers/mesageController.js";
import { checkFriendship } from "../middlewares/friendMiddleware.js";

const router = express.Router();

router.post("/direct", checkFriendship, sendDirectMessage);
router.post("/group", sendGroupMessage);

export default router;