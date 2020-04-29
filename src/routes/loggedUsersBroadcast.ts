import WebSocket from 'ws';
import { IUser } from '../model/IUser';
import { Session } from '../persistance/Session';
import { Message } from '../persistance/Message';

const port: number = 5000;

const webSocketServer: WebSocket.Server = new WebSocket.Server({ port });

webSocketServer.on('connection', (webSocketClient: WebSocket) => {

    console.log('A client has connected to the websocket server!');
    webSocketClient.send('Hello from the websocket server! You have successfully connected!');
    webSocketClient.on('message', (message:string) => {
        const messageArray = JSON.parse(message);
        const user = messageArray[0];
        const userMessage = messageArray[1];
        
        console.log('Received message from client: ', userMessage);
        console.log('Received userId from client: ', user);
        if(user){
            (async () => {
            const newMessage = await new Message({message: userMessage});
            const savedMessage = await newMessage.save();
            })();
            webSocketServer.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send('Message from '+user.firstName+' is '+userMessage);
                }
            });
        }
        else
            console.log('This chat option is only for logged in users');
        console.log('Broadcasted message to all connected clients!'); 
    });
});
console.log('Websocket server is up and ready for connections on port', port);
