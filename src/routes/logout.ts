import { Request, Response } from "express";
import { Session } from "../persistance/Session";

export const logout = async (request: Request, response: Response) => {
    try {
        const sessionId = response.locals.sessionId;
        await Session.deleteOne({ sessionId: sessionId }, function(err) {
          if (err) return response.sendStatus(403);
        });
        response.cookie("sessionId", null);
        return response.send("success").status(200);
      } catch (error) {
        console.error(error);
        return response.sendStatus(500);      
      }
}