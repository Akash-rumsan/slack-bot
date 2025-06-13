import { Request, Response } from "express";
import { slackClient } from "../config/slackClient";
import { getQueryResponse } from "../services/queryService";
import { BOT_USER_ID } from "../constants";

const processedEvents = new Set<string>();

export async function handleSlackEvent(
  req: Request,
  res: Response
): Promise<void> {
  const { type, challenge, event, event_id } = req.body;

  if (type === "url_verification") {
    res.status(200).send({ challenge });
  }
  res.status(200).send(); // Acknowledge immediately

  if (processedEvents.has(event_id)) return;
  processedEvents.add(event_id);

  // Respond to message events
  if (event && event.type === "message" && !event.subtype && !event.bot_id) {
    const userMessage = event.text;
    const mentionedBot = event.text.includes(`<@${BOT_USER_ID}>`);

    if (mentionedBot) {
      slackClient.chat
        .postMessage({
          channel: event.channel,
          text: `Hi <@${event.user}>! How can I help?`,
        })
        .catch(console.error);
    } else {
      try {
        const responseText = await getQueryResponse(userMessage);
        await slackClient.chat.postMessage({
          channel: event.channel,
          text: responseText,
        });
      } catch (error) {
        console.error("Error sending message to Slack:", error);
      }
    }
  }

  if (event && event.type === "app_home_opened") {
    slackClient.chat
      .postMessage({
        channel: event.channel,
        text: `Hi <@${event.user}>! How can I help?`,
      })
      .catch(console.error);
  }
}
