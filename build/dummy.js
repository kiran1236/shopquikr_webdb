"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = __importDefault(require("ws"));
var webSocket = new ws_1.default('ws://localhost:5000');
webSocket.onopen = function () {
    console.log('Connection Opened');
};
webSocket.onmessage = function (message) {
    console.log('Received message: ', JSON.stringify(message.data));
};
