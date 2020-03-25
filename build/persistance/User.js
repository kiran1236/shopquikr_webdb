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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
/**
 * User schema with custom validations.
 */
var userSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function (value) {
                return value.length > 0 && /^[a-zA-Z]*$/.test(value);
            },
            message: "First name may only contain letters"
        }
    },
    lastName: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return value.length > 2;
            },
            message: "Last name name must have more than two characters"
        }
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate: {
            validator: function (value) {
                var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                return emailRegex.test(value);
            },
            message: "Email id is not valid"
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                console.log("length : " + value.length);
                return value.length === 60;
            },
            message: "Password hash is not valid"
        }
    }
});
/**
 * Prior to validation, check and see if there is an user already registered with that email id.
 * If so, promptly throw an error which will prevent the model from saving if this middleware is called.
 */
userSchema.pre("validate", function (next) {
    return __awaiter(this, void 0, void 0, function () {
        var userAlreadyInDatabase;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.User.findOne({
                        email: { $eq: this.email }
                    })];
                case 1:
                    userAlreadyInDatabase = _a.sent();
                    if (userAlreadyInDatabase) {
                        next(new Error("User already registered with that email"));
                    }
                    //this.username = this.email.split('@').slice(0, -1).join();
                    next();
                    return [2 /*return*/];
            }
        });
    });
});
/**
 * username is just the email id with out the domain
 * for example email is kiran1236@gmail.com then kiran1236 is the username without the ending domain.
 */
userSchema
    .virtual("username")
    .get(function () {
    // Split and slice it so that ending element after @ is eliminated. This doesnt eliminate if there is a @ in the email id itself.
    return this.email
        .split("@")
        .slice(0, -1)
        .join();
})
    .set(function (username) {
    return __awaiter(this, void 0, void 0, function () {
        var userInDB;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // Before setting a new username the email id also should be replaced, since email id and username should be unique so checking for it in db for its uniqueness.
                    console.log("username : " + username);
                    console.log("email : " + this.email);
                    console.log("computed new email : " + username + "@" + this.email.split("@").pop());
                    return [4 /*yield*/, exports.User.findOne({
                            email: { $eq: username + "@" + this.email.split("@").pop() }
                        })];
                case 1:
                    userInDB = _a.sent();
                    console.log("userInDB : " + userInDB);
                    if (userInDB) {
                        console.log("In if block");
                        throw new Error("There is an email id with that username and domain as yours");
                    }
                    else {
                        console.log("In else block");
                        this.email = username + "@" + this.email.split("@").pop();
                    }
                    return [2 /*return*/];
            }
        });
    });
});
/**
 * fullname is combination of firstname and lastname
 */
userSchema
    .virtual("fullName")
    .get(function () {
    // Assemble the full name from the first and last namesfullName
    return this.firstName + " " + this.lastName;
})
    .set(function (fullName) {
    // For a simple example, the full name must separate the first name and last name with a hyphen
    // If the full name doesn't have a hyphen, throw an error
    if (!fullName.includes("-")) {
        // A proper full name for us would be 'Phillip-Fry'
        throw new Error("Full name must have a hyphen between the first and last name");
    }
    // Split should return two strings in an array, destructure assign them
    // Note: Logic here is brittle, if there are multiple dashes this will get thrown off
    var _a = fullName.split("-"), firstName = _a[0], lastName = _a[1];
    // Set the first name and last name based on pulling apart the full name
    this.firstName = firstName;
    this.lastName = lastName;
});
// Export the compiled model
exports.User = mongoose_1.default.model("user", userSchema);
