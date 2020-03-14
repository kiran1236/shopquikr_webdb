"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartOperationAllowed = function (request, response) {
    var sessionId = response.locals.sessionId;
    if (sessionId)
        return response.send("can add item to cart").status(200);
    else
        return response.status(403);
};
