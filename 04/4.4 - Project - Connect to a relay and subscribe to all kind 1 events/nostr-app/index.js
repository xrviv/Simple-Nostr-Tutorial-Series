global.WebSocket = require('ws');
const { Relay } = require('nostr-tools');

async function subscribeToAllTextNotes() {
  const relayUrl = 'wss://nos.lol'; // Replace with your relay URL
  try {
    const relay = await Relay.connect(relayUrl);
    console.log(`Connected to relay ${relay.url}`);

    // Subscribe to all events of kind 1 (text notes)
    const sub = relay.subscribe([
      {
        kinds: [1],
      },
    ], {
      onevent(event) {
        console.log('Text note event received:', event);
      },
      oneose() {
        sub.close();
      }
    });

    console.log("Waiting for text note events...");
    setTimeout(() => {
      sub.close();
      console.log('Subscription closed.');
    }, 60000); // Keep subscription open for 60 seconds
  } catch (error) {
    console.error('Error connecting to relay:', error);
  }
}

subscribeToAllTextNotes();
