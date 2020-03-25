import { Request, Response, NextFunction, RequestHandler } from "express";
import { Session } from "../persistance/Session";

export function sessionValidator({ requireCookie = false}: { requireCookie: boolean}): RequestHandler {
  // The middleware is configurable so return a function from a function
  return async function (request: Request, response: Response, next: NextFunction) {
    // Does the signed 'userCookie' exist? If so add it to the response locals
    if (request.signedCookies && request.signedCookies.sessionId) {
      const sessionId: string = request.signedCookies.sessionId;
      const userAlreadyHadSession = await Session.findOne({ sessionId: { $eq: sessionId }  });
      console.log("userAlreadyHadSession is : " + userAlreadyHadSession);
      if (userAlreadyHadSession) {
        response.locals.sessionId = sessionId;
        return next();
      } else {
        if (requireCookie) {
          response.sendStatus(403);
          return next(new Error("Cookie was required for request but no cookie was found"));
        }
        return next();
      }
    } else {
      // No cookie was found, is it even required? If so respond with a 403 and throw an error
      if (requireCookie) {
        response.sendStatus(403);
        return next(new Error("Cookie was required for request but no cookie was found"));
      }
    return next();
    }
  }
}
