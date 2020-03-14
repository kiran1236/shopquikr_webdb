"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require("bcryptjs");
var User_1 = require("../persistance/User");
var Session_1 = require("../persistance/Session");
exports.login = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var email, password, user_1, userAlreadyHadSession, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                email = response.locals.strongParams.get("email");
                password = response.locals.strongParams.get("password");
                console.log("email : " + email);
                console.log("password : " + password);
                return [4 /*yield*/, User_1.User.findOne({ email: { $eq: email } })];
            case 1:
                user_1 = _a.sent();
                if (!user_1) {
                    console.log("Username or password was wrong");
                    return [2 /*return*/, response.sendStatus(403)];
                }
                return [4 /*yield*/, Session_1.Session.findOne({
                        userId: { $eq: user_1 }
                    })];
            case 2:
                userAlreadyHadSession = _a.sent();
                console.log("userAlreadyHadSession is : " + userAlreadyHadSession);
                if (userAlreadyHadSession) {
                    Session_1.Session.deleteOne({ userId: { $eq: user_1 } }, function (err) {
                        if (err)
                            return response.sendStatus(403);
                        // deleted at most one session document
                    });
                }
                console.log(user_1.password);
                console.log(bcrypt.hashSync(password, 10));
                console.log(password);
                bcrypt.compare(password, user_1.password, function (err, res) {
                    return __awaiter(this, void 0, void 0, function () {
                        var newUserSession;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(res === true)) return [3 /*break*/, 3];
                                    return [4 /*yield*/, new Session_1.Session({ userId: user_1 })];
                                case 1:
                                    newUserSession = _a.sent();
                                    return [4 /*yield*/, newUserSession.save(function (err) {
                                            if (err)
                                                return response.sendStatus(403);
                                            // saved!
                                        })];
                                case 2:
                                    _a.sent();
                                    response.cookie("sessionId", newUserSession.sessionId, { signed: true, httpOnly: true });
                                    console.log("User successfully logged in");
                                    console.log("User is : " + user_1);
                                    return [2 /*return*/, response.send(user_1).status(200)];
                                case 3:
                                    console.log("Username or password is wrong");
                                    return [2 /*return*/, response.sendStatus(452)];
                            }
                        });
                    });
                });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.error(error_1);
                return [2 /*return*/, response.sendStatus(500)];
            case 4: return [2 /*return*/];
        }
    });
}); };
