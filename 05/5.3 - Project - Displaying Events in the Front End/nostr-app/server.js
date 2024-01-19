const express = require('express');
global.WebSocket = require('ws');
const http = require('http');
const { Relay } = require('nostr-tools');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

/* app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});*/

app.use(express.static(path.join(__dirname, 'public')));

wss.on('connection', ws => {
    console.log('Client connected');

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

async function subscribeToAllTextNotes() {
    const relayUrl = 'wss://relay.damus.io';
    try {
        const relay = await Relay.connect(relayUrl);
        console.log(`Connected to relay ${relay.url}`);

        relay.subscribe([
            { kinds: [1] },
        ], {
            onevent(event) {
                wss.clients.forEach(client => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify(event));
                    }
                });
            },
            oneose() {
                console.log('Subscription closed.');
            }
        });

        console.log("Waiting for text note events...");
    } catch (error) {
        console.error('Error connecting to relay:', error);
    }
}

subscribeToAllTextNotes();

server.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
