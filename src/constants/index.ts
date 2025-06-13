import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file

export const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN || "";
export const SLACK_SIGNING_SECRET = process.env.SLACK_SIGNING_SECRET || "";
export const PORT = process.env.PORT || 3000;
export const BOT_USER_ID = process.env.BOT_USER_ID || "";
