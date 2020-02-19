import Mongoose from "mongoose";

import {User} from "./persistance/User";
import {Product} from "./persistance/Product";
import {Session} from "./persistance/Session";
// Playground for interfacing with Mongoose
declare module 'mongoose' {
    namespace Schema {
        namespace Types {
            class User extends SchemaType {}
        }
    }
}
(async () => {

    await Mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });
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


 */

    const product = await new Product({
        productId: 'product1',
        name: 'product1',
        price: 30.00,
        quantity: 25.00
    });
    await product.save();

    process.exit(0);
})();