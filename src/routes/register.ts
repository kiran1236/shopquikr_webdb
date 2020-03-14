import { Request, Response } from "express";
import bcrypt = require("bcryptjs");
import { User } from "../persistance/User";

export const register = async (request: Request, response: Response) => {
  try {
    const passwordHash = bcrypt.hashSync(
      response.locals.strongParams.get("password"),
      10
    );
    const newUser = await new User({
      firstName: response.locals.strongParams.get("firstName"),
      lastName: response.locals.strongParams.get("lastName"),
      email: response.locals.strongParams.get("email"),
      password: passwordHash
    });
    await newUser.save();
    console.log("New User created is : " + newUser);
    return response.sendStatus(200);
  } catch (error) {
    console.error(error);
    console.log(error);
    return response.sendStatus(501);
  }
};
