import Mongoose from "mongoose";

import {User} from "./persistance/User";
import WebSocket from 'ws';
import {Product} from "./persistance/Product";
import {Session} from "./persistance/Session";
import { Message } from "./persistance/Message";
const bcrypt = require("bcryptjs");
// Playground for interfacing with Mongoose
declare module 'mongoose' {
    namespace Schema {
        namespace Types {
            class User extends SchemaType {
            }
        }
    }
}
(async () => {

    await Mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});
   const webSocket = new WebSocket('ws://localhost:5000');
    webSocket.onopen = async () => {
        console.log('Connection Opened');
    webSocket.onmessage = (message) => {
             console.log('Received message: ', JSON.stringify(message.data));
                    };
                    const user = await new User({
                        firstName: 'phanikiran',
                        lastName: 'balla',
                        email: 'testcase1@gmail.com',
                        password: bcrypt.hashSync("testing", 10)
                    });

        const savedUser = await user.save();
        const userMessage = [savedUser, "This is test user"];

        const newMessage = await new Message({message: 'Testing'});
        const savedMessage = await newMessage.save();

        webSocket.send(JSON.stringify(userMessage));
    };


    
    
    /*
    try {
        //const user = await new User({ firstName: 'FIRSTNAME', lastName: 'LAST_NAME', email: 'kiran@gmail.com', password: '123456789123456789123'});
        const testingUser = await new User({
            firstName: 'FIRSTNAME',
            lastName: 'LAST_NAME',
            email: 'testing@gmail.com',
            password: '123456789123456789123'
        });
        //const saveduser = await user.save();
        testingUser.username = 'kiran';
        testingUser.save();
    } catch (error) {
        // Ensure the expected error was thrown
        console.log(error.message);
    }


    /*
        const user = await new User({ firstName: 'kiran', lastName: 'balla', email: 'kiran@gmail.com', password: '123456789123456789123'});
        user.firstName = "KIRANB";
        const savedUser = await user.save();
        console.log(savedUser);
        const kotuser = await new User({ firstName: 'kiran', lastName: 'balla', email: 'kiran1@gmail.com', password: '123456789123456789123'});
        //kotuser.username = 'kiran';
        const session = await new Session({ userId: savedUser});
        const usersession = await session.save();
        console.log(usersession);
        const user = await new User({ firstName: 'FIRSTNAME', lastName: 'LAST_NAME', email: 'kiran@gmail.com', password: '123456789123456789123'});
        const testingUser = await new User({ firstName: 'FIRSTNAME', lastName: 'LAST_NAME', email: 'testing@gmail.com', password: '123456789123456789123'});
        const saveduser = await user.save();
        testingUser.username = 'kiran';
        const product = await new Product({
            productId: 'ppppp',
            name: 'pppppp',
            price: 30.00,
            quantity: 25.00
        });
        await product.save();

     */


})();