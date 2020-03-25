import Express, {Application, Request, Response} from 'express';
import {login} from "./login";
import {logout} from "./logout";
import {register} from "./register";
import {cartOperationAllowed} from "./cartOperationAllowed";
import {sessionValidator} from "../middleware/sessionValidator";
import {strongParamsMiddleware} from "../middleware/strongParamsMiddleware";
import cookieParser from 'cookie-parser';
import mongoose from "mongoose";

const server: Application = Express();

mongoose.connect("mongodb://localhost:27017/test", {useNewUrlParser: true});
const connection = mongoose.connection.once("open", () =>
    console.log("Database connected")
);

server.use(Express.json());
server.use(cookieParser('secret'));

// route used to login, session is created in the database, email and password are verified with strong params
server.post("/login", [strongParamsMiddleware({email: 'string', password: 'string'}, true)], login);
// route used to logout, session is deleted from database
server.delete("/logout", [sessionValidator({requireCookie: true})], logout);
// route used to check whether the user is signed in or not to perform cart operations by retrieving the existing session of the user
server.get("/cartOperationAllowed", [sessionValidator({requireCookie: true})], cartOperationAllowed);
// route used to register the user and the parameters are verified with strong params
server.post("/register", [strongParamsMiddleware({
    firstName: 'string',
    lastName: 'string',
    email: 'string',
    password: 'string'
}, true)], register);
const port = process.env.PORT || 4000;
server.listen(port, () => console.log('Server is up!'));
export default server;

