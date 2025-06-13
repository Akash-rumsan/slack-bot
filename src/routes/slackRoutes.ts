import express from "express";
import { handleSlackEvent } from "../controllers/slackController";

const router = express.Router();

router.post("/", handleSlackEvent);

export default router;
