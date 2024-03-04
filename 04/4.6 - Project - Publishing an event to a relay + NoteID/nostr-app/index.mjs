import { finalizeEvent, generateSecretKey, getPublicKey } from 'nostr-tools/pure';
import { Relay, useWebSocketImplementation } from 'nostr-tools/relay';
import WebSocket from 'ws';

useWebSocketImplementation(WebSocket); // This is necessary for Node.js environments

async function connectAndPublish() {
  const relay = await Relay.connect('wss://nos.lol');
  console.log(`Connected to ${relay.url}`);

  const sk = generateSecretKey();
  const pk = getPublicKey(sk);

  // Subscribe to events of kind 1 authored by the generated public key
  const subscription = relay.subscribe([
    {
      kinds: [1],
      authors: [pk],
    },
  ], {
    onevent(event) {
      console.log('Received an event:', event);
    },
    onclose() {
      console.log('Subscription closed');
    }
  });

  // Create and sign a new event
  const eventTemplate = {
    kind: 1,
    created_at: Math.floor(Date.now() / 1000),
    tags: [],
    content: 'Hello World! This is a kind 1 note from the Simple Nostr Tutorial Series',
  };
  const signedEvent = finalizeEvent(eventTemplate, sk);

  // Publish the new event
  await relay.publish(signedEvent);

  // Optionally, close the relay connection when done
  // Consider keeping it open if you're expecting to receive events
  // relay.close();
}

connectAndPublish().catch(console.error);
