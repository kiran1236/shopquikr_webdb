"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var login_1 = require("./login");
var logout_1 = require("./logout");
var register_1 = require("./register");
var cartOperationAllowed_1 = require("./cartOperationAllowed");
var sessionValidator_1 = require("../middleware/sessionValidator");
var strongParamsMiddleware_1 = require("../middleware/strongParamsMiddleware");
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var mongoose_1 = __importDefault(require("mongoose"));
var server = express_1.default();
mongoose_1.default.connect("mongodb://localhost:27017/test", { useNewUrlParser: true });
var connection = mongoose_1.default.connection.once("open", function () {
    return console.log("Database connected");
});
server.use(express_1.default.json());
server.use(cookie_parser_1.default('secret'));
// route used to login, session is created in the database, email and password are verified with strong params
server.post("/login", [strongParamsMiddleware_1.strongParamsMiddleware({ email: 'string', password: 'string' }, true)], login_1.login);
// route used to logout, session is deleted from database
server.delete("/logout", [sessionValidator_1.sessionValidator({ requireCookie: true })], logout_1.logout);
// route used to check whether the user is signed in or not to perform cart operations by retrieving the existing session of the user
server.get("/cartOperationAllowed", [sessionValidator_1.sessionValidator({ requireCookie: true })], cartOperationAllowed_1.cartOperationAllowed);
// route used to register the user and the parameters are verified with strong params
server.post("/register", [strongParamsMiddleware_1.strongParamsMiddleware({ firstName: 'string', lastName: 'string', email: 'string', password: 'string' }, true)], register_1.register);
var port = process.env.PORT || 4000;
server.listen(port, function () { return console.log('Server is up!'); });
exports.default = server;
