import Mongoose from "mongoose";

import WebSocket from 'ws';


    const webSocketGuest = new WebSocket('ws://localhost:6000');
    webSocketGuest.onopen = async () => {
        console.log('Connection Opened');
        webSocketGuest.onmessage = (message) => {
             console.log('Received message: ', JSON.stringify(message.data));
                    };
                    webSocketGuest.send(JSON.stringify("Hi from guest user"));
    };
