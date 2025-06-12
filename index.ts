const express = require('express');
const { WebClient } = require('@slack/web-api');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const slackClient = new WebClient(process.env.SLACK_BOT_TOKEN);

app.use(bodyParser.json());

// Route for event subscription
app.post('/slack/events', async (req, res) => {
  const { type, challenge, event } = req.body;

  // Respond to Slack URL verification
  if (type === 'url_verification') {
    return res.status(200).send({ challenge });
  }

  // Respond to message events
  if (event && event.type === 'app_mention') {
    try {
      await slackClient.chat.postMessage({
        channel: event.channel,
        // thread_ts: event.ts,
        text: `Hi <@${event.user}>! How can I help?`,
      });
    } catch (err) {
      console.error(err);
    }
  }

  res.status(200).send(); // Acknowledge Slack
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Bot running on http://localhost:${PORT}`);
});
