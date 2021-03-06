import {Request, Response} from "express";
import bcrypt = require("bcryptjs");
import {User} from "../persistance/User";
import {Session} from "../persistance/Session";

export const login = async (request: Request, response: Response) => {
    try {
        const email = response.locals.strongParams.get("email");
        const password = response.locals.strongParams.get("password");
        console.log("email : " + email);
        console.log("password : " + password);
        // Finding whether there is an user with that email
        const user = await User.findOne({email: {$eq: email}});
        if (!user) {
            console.log(`Username or password was wrong`);
            return response.sendStatus(403);
        }
        // Checking for whether the user has already session record in the database.
        const userAlreadyHadSession = await Session.findOne({
            userId: {$eq: user}
        });
        console.log("userAlreadyHadSession is : " + userAlreadyHadSession);
        // If the user is already having session record, that means earlier session didnt close properly. Hence force closing the earlier session.
        // By deleting the earlier session record and creating a new one.
        if (userAlreadyHadSession) {
            Session.deleteOne({userId: {$eq: user}}, function (err) {
                if (err) return response.sendStatus(403);
                // deleted at most one session document
            });
        }
        console.log(user.password);
        console.log(bcrypt.hashSync(password, 10));
        console.log(password);
        bcrypt.compare(password, user.password, async function (err, res) {
            if (res === true) {
                // New Session is created
                const newUserSession = await new Session({userId: user});
                await newUserSession.save(function (err) {
                    if (err) return response.sendStatus(403);
                    // saved!
                });
                response.cookie("sessionId", newUserSession.sessionId, {signed: true, httpOnly: true});
                console.log(`User successfully logged in`);
                console.log("User is : " + user);
                return response.send(user).status(200);
            } else {
                console.log(`Username or password is wrong`);
                return response.sendStatus(452);
            }
        });
    } catch (error) {
        console.error(error);
        return response.sendStatus(500);
    }
};
