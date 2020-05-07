
import WebSocket from 'ws';
import { Message } from '../persistance/Message';

const port: number = 6000;
const webSocketServer: WebSocket.Server = new WebSocket.Server({ port });

webSocketServer.on('connection', (webSocketClient: WebSocket) => {
    console.log('A client has connected to the websocket server!');
    webSocketClient.send('Hello from the websocket server! You have successfully connected!');
    webSocketClient.on('message', async (message) => {
        console.log('Received message from client: ', message);
        const newMessage = await new Message({message: message});
        const savedMessage = await newMessage.save();
        webSocketServer.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send('Broadcast message from the websocket server: ' + message);
            }
        }); 
        console.log('Broadcasted message to all connected clients!');
    });
});
console.log('Websocket server is up and ready for connections on port', port);

