import express from "express";
import { WebClient } from "@slack/web-api";
import bodyParser from "body-parser";
require("dotenv").config();

const app = express();
const slackClient = new WebClient(process.env.SLACK_BOT_TOKEN);

app.use(bodyParser.json());

app.post(
  "/slack/events",
  (req: express.Request, res: express.Response): void => {
    const { type, challenge, event } = req.body;
    // Respond to Slack URL verification
    if (type === "url_verification") {
      res.status(200).send({ challenge });
    }

    // Respond to message events
    if (event && event.type === "message" && !event.subtype && !event.bot_id) {
      const mentionedBot = event.text.includes(`<@${process.env.BOT_USER_ID}>`);

      if (mentionedBot) {
        slackClient.chat
          .postMessage({
            channel: event.channel,
            text: `Hi <@${event.user}>! How can I help?`,
          })
          .catch(console.error);
      } else {
        slackClient.chat
          .postMessage({
            channel: event.channel,
            text: `You said: ${event.text}`,
          })
          .catch(console.error);
      }
    }

    // Respond to app home opened events
    if (event && event.type === "app_home_opened") {
      slackClient.chat
        .postMessage({
          channel: event.channel,
          text: `Hi <@${event.user}>! How can I help?`,
        })
        .catch((err) => {
          console.error(err);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    res.status(200).send(); // Acknowledge Slack
  }
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Bot running on http://localhost:${PORT}`);
});
