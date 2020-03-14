import { Request, Response } from "express";

export const cartOperationAllowed = (request: Request, response: Response) => {
    const sessionId:string = response.locals.sessionId;
    if(sessionId)
    return response.send("can add item to cart").status(200);
    else
    return response.status(403);
}