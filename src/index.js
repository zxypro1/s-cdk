"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fcNodejsApplication_1 = __importDefault(require("./template/fcNodejsApplication"));
const fcapp = new fcNodejsApplication_1.default({
    functionName: 'fcNodejsApplication',
    handler: 'index.handler',
    runtime: 'nodejs12',
    memorySize: 128,
    timeout: 60,
    region: 'cn-hangzhou',
    description: 'fcNodejsApplication',
});
fcapp.deploy();
