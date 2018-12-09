'use strict';

const WebSocketServer = require('ws').Server;
const express = require('express');
const path = require('path');
const server = require('http').createServer();

const app = express();

const PubSubManager = require('./pubsub');
const pubSubManager = new PubSubManager();

app.use(express.static(path.join(__dirname, '/public')));

const wss = new WebSocketServer({server: server});
wss.on('connection', (ws, req) => {
    console.log(`Connection request from: ${req.connection.remoteAddress}`);
    ws.on('message', data => {
        console.log(data);
        const json = JSON.parse(data);
        const request = json.request;
        const message = json.message;
        const channel = json.channel;

        switch (request) {
            case 'PUBLISH':
                pubSubManager.publish(ws, channel, message);
                break;
            case 'SUBSCRIBE':
                pubSubManager.subscribe(ws, channel);
                break;
        }
    });
    ws.on('close', () => {
        console.log('Stopping client connection.');
    });
});

server.on('request', app);
server.listen(8080, () => {
    console.log("Server listening http://localhost:8080");
})