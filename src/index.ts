import express from "express";
import bodyParser from "body-parser";
import slackRoutes from "./routes/slackRoutes";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file

const app = express();

app.use(bodyParser.json());
app.use("/slack/events", slackRoutes);

export default app;
