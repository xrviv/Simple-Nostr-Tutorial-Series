const express = require('express');
const bodyParser = require('body-parser');
const { generateSecretKey, getPublicKey, nip19, finalizeEvent, Relay } = require('nostr-tools');
const WebSocket = require('websocket-polyfill');

const app = express();
app.use(bodyParser.json());

app.post('/publish', async (req, res) => {
  try {
    const content = req.body.content || 'Default NOSTR message';

    let sk = generateSecretKey();
    let pk = getPublicKey(sk);
    let eventTemplate = {
      kind: 1,
      created_at: Math.floor(Date.now() / 1000),
      tags: [],
      content: content,
    };
    let signedEvent = finalizeEvent(eventTemplate, sk);

    const relay = await Relay.connect('wss://nos.lol', { WebSocket });
    await relay.publish(signedEvent);
    relay.close();

    res.status(200).json({ message: 'Event published successfully', event: signedEvent });
  } catch (error) {
    console.error('Error publishing event:', error);
    res.status(500).json({ message: 'Error publishing event', error: error.toString() });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
