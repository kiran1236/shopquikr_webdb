"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartOperationAllowed = function (request, response) {
    var sessionId = response.locals.sessionId;
    // If there is a valid session id stored by middleware in response locals then item can be added to cart, or else no
    if (sessionId)
        return response.send("can add item to cart").status(200);
    else
        return response.status(403);
};
