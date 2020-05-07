"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("../App.css");
var EmailInput_1 = __importDefault(require("../input/EmailInput"));
var Typography_1 = __importDefault(require("@material-ui/core/Typography"));
var PasswordInput_1 = __importDefault(require("../input/PasswordInput"));
var SubmitButton_1 = __importDefault(require("../input/SubmitButton"));
var react_router_dom_1 = require("react-router-dom");
var IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
var Snackbar_1 = __importDefault(require("@material-ui/core/Snackbar"));
var axios_1 = __importDefault(require("axios"));
var sleep = function (milliseconds) {
    return new Promise(function (resolve) { return setTimeout(resolve, milliseconds); });
};
var LoginPage = /** @class */ (function (_super) {
    __extends(LoginPage, _super);
    function LoginPage(props) {
        var _this = _super.call(this, props) || this;
        _this.snackbarClose = function (event) {
            _this.setState({ snackbaropen: false });
        };
        _this.state = {
            name: '',
            emailAddress: '',
            password: '',
            user_credentials: [],
            snackbaropen: false,
            snackbarmsg: ''
        };
        _this.handleEmailAddressChange = _this.handleEmailAddressChange.bind(_this);
        _this.handlePasswordChange = _this.handlePasswordChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        return _this;
    }
    LoginPage.prototype.handleEmailAddressChange = function (event) {
        console.log("handleEmailAddressChange called" + event.target.value);
        this.setState({ emailAddress: event.target.value });
    };
    LoginPage.prototype.handlePasswordChange = function (event) {
        console.log("handlePasswordChange called" + event.target.value);
        console.log(event.target.value.length);
        this.setState({ password: event.target.value });
    };
    LoginPage.prototype.logout = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("logout called");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1.default.delete('/cart/logout')];
                    case 2:
                        response = _a.sent();
                        console.log(response.data);
                        if (response.data === "success") {
                            this.setState({ snackbaropen: true, snackbarmsg: "Logged out from the current session" });
                            sleep(1000).then(function () { _this.props.history.push('/'); });
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.log("Coming in catch");
                        console.log(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LoginPage.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.logout()];
                    case 1:
                        _a.sent(); // it will wait here untill function finishes
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    LoginPage.prototype.handleSubmit = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var emailAddress, password, _a, emailAddress_1, password_1, data, response_1, error_2;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log("handleSubmit called");
                        emailAddress = this.state.emailAddress;
                        password = this.state.password;
                        if (!(password.length < 6)) return [3 /*break*/, 1];
                        this.setState({ snackbaropen: true, snackbarmsg: "Password should be of length min 6 characters" });
                        return [3 /*break*/, 5];
                    case 1:
                        if (!!emailAddress.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) return [3 /*break*/, 2];
                        this.setState({ snackbaropen: true, snackbarmsg: "Email address not valid" });
                        return [3 /*break*/, 5];
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        _a = this.state, emailAddress_1 = _a.emailAddress, password_1 = _a.password;
                        data = { email: emailAddress_1, password: password_1 };
                        return [4 /*yield*/, axios_1.default.post('/cart/login', data)];
                    case 3:
                        response_1 = _b.sent();
                        console.log(response_1.data);
                        if (response_1.data) {
                            console.log("user is " + response_1.data.name);
                            this.setState({ snackbaropen: true, snackbarmsg: "LogIn Successful" });
                            sleep(1000).then(function () {
                                var userName = "dummy";
                                _this.props.history.push({ pathname: '/products', state: { detail: response_1.data } });
                            });
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        error_2 = _b.sent();
                        console.log("Coming in catch");
                        console.log(error_2.response.status);
                        if (error_2.response.status === 452) {
                            this.setState({ snackbaropen: true, snackbarmsg: "Username or password is wrong" });
                        }
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    LoginPage.prototype.render = function () {
        var emailAddress = this.state.emailAddress;
        var password = this.state.password;
        return (<div className="lcontainer">
                <Typography_1.default variant={"h4"}>
                    Log In
                    </Typography_1.default>
                <EmailInput_1.default email={emailAddress} onChange={this.handleEmailAddressChange}/>
                <br />
                <PasswordInput_1.default password={password} onChange={this.handlePasswordChange}/>
                <br />
                <SubmitButton_1.default onClick={this.handleSubmit}/>
                <Snackbar_1.default anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={this.state.snackbaropen} autoHideDuration={2000} onClose={this.snackbarClose} message={this.state.snackbarmsg} action={[
            <IconButton_1.default key='close' arial-label='Close' color='inherit' onClick={this.snackbarClose}>
                            X
                        </IconButton_1.default>
        ]}/>

            </div>);
    };
    return LoginPage;
}(react_1.default.Component));
exports.default = react_router_dom_1.withRouter(LoginPage);
