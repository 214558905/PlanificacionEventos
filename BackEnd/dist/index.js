"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
require("./models/asosations");
//import "./libs/initialSetup";
if (process.env.NODE_ENV != 'production') {
    require('dotenv').config();
}
const server = new app_1.default();
