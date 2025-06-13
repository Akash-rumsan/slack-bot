import express from 'express';
import { WebClient } from '@slack/web-api';
import bodyParser from 'body-parser';
require('dotenv').config();

const app = express();
const slackClient = new WebClient(process.env.SLACK_BOT_TOKEN);

app.use(bodyParser.json());

app.post('/slack/events', (req: express.Request, res: express.Response): void => {
  const { type, challenge, event } = req.body;
  console.log('Received Slack event:',event.type);

  // Respond to Slack URL verification
  if (type === 'url_verification') {
    res.status(200).send({ challenge });
  }

  // Respond to message events
  if (event && event.type === 'app_mention') {
    slackClient.chat.postMessage({
      channel: event.channel,
      text: `Hi <@${event.user}>! How can I help?`,
    }).catch(err => {
      console.error(err);
    });
  }
  res.status(200).send(); // Acknowledge Slack
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Bot running on http://localhost:${PORT}`);
});
