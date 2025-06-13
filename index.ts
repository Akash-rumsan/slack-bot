// import express from "express";
// import { WebClient } from "@slack/web-api";
// import bodyParser from "body-parser";
// import { getQueryResponse } from "./services/queryService";
// require("dotenv").config();

// const app = express();
// const slackClient = new WebClient(process.env.SLACK_BOT_TOKEN);

// app.use(bodyParser.json());

// const processedEvents = new Set<string>();

// app.post(
//   "/slack/events",
//   async (req: express.Request, res: express.Response) => {
//     const { type, challenge, event, event_id } = req.body;
//     // Respond to Slack URL verification
//     if (type === "url_verification") {
//       res.status(200).send({ challenge });
//     }
//     res.status(200).send();

//     if (processedEvents.has(event_id)) {
//       res.status(200).send(); // Already handled
//     }

//     // Mark this event_id as processed
//     processedEvents.add(event_id);

//     // Respond to message events
//     if (event && event.type === "message" && !event.subtype && !event.bot_id) {
//       const userMessage = event.text;

//       const mentionedBot = event.text.includes(`<@${process.env.BOT_USER_ID}>`);

//       if (mentionedBot) {
//         slackClient.chat
//           .postMessage({
//             channel: event.channel,
//             text: `Hi <@${event.user}>! How can I help?`,
//           })
//           .catch(console.error);
//       } else {
//         try {
//           const responseText = await getQueryResponse(userMessage);
//           await slackClient.chat.postMessage({
//             channel: event.channel,
//             text: responseText,
//           });
//         } catch (error) {
//           console.error("Error sending message to Slack:", error);
//         }
//       }
//     }

//     // Respond to app home opened events
//     if (event && event.type === "app_home_opened") {
//       slackClient.chat
//         .postMessage({
//           channel: event.channel,
//           text: `Hi <@${event.user}>! How can I help?`,
//         })
//         .catch((err) => {
//           console.error(err);
//         })
//         .catch((err) => {
//           console.error(err);
//         });
//     }
//     res.status(200).send(); // Acknowledge Slack
//   }
// );

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Bot running on http://localhost:${PORT}`);
// });
