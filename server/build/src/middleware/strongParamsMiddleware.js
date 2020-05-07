"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 1) allMandatoryFields will be useful when it is turned on that means there should not be a mismatch at all,
//    in case of mismatch of types we can directly throw an error response from the middleware instead of going to the route call back function.
// 2) if allMandatoryFields is turned off by sending false while calling that means there are optional fields in the request and route call back function
//    will take whether the request is legitimate or not.
function strongParamsMiddleware(params, allMandatoryFields) {
    return function (request, response, next) {
        var strongParams = new Map();
        Object.entries(params).forEach(function (_a) {
            var weakParamKey = _a[0], specifiedType = _a[1];
            if (request.body && request.body[weakParamKey] !== undefined) {
                if (typeof request.body[weakParamKey] === specifiedType) {
                    strongParams.set(weakParamKey, request.body[weakParamKey]);
                    // Need to check with john why this is not working, only set is working like above
                    //strongParams[weakParamKey] = request.body[weakParamKey];
                }
                else 
                // If all the fields are mandatory and there is atleast one attribute type mismatch then there is no point going forward, hence throwing an error
                if (allMandatoryFields) {
                    next(new Error("All mandatory parameters are not supplied as per specification"));
                }
            }
        });
        request.body = null;
        response.locals.strongParams = strongParams;
        return next();
    };
}
exports.strongParamsMiddleware = strongParamsMiddleware;
