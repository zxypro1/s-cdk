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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yamlCreator_1 = __importDefault(require("../yamlCreator"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const child_process_1 = require("child_process");
const jsCode = `
exports.handler = function (event, context, callback) {
  callback(null, 'hello world');
};`;
class fcNodejsApplication {
    constructor(spec) {
        const { access } = spec, rest = __rest(spec, ["access"]);
        this.path = './.temp/FCNodejsApplication/';
        this.yamlCreator = new yamlCreator_1.default(this.path);
        this.yamlCreator.addKey('edition', '3.0.0');
        this.yamlCreator.addKey('name', 'nodejs-application');
        this.yamlCreator.addKey('access', access || 'default');
        this.yamlCreator.addKeys({
            resources: {
                fcNodejsApplication: {
                    component: 'fc3',
                    props: Object.assign(Object.assign({}, rest), { code: './code' })
                }
            }
        });
        this.yamlCreator.save();
        this.yamlCreator.destroy();
        const codePath = this.path + 'code';
        fs_extra_1.default.ensureDirSync(codePath);
        fs_extra_1.default.createFileSync(codePath + '/index.js');
        fs_extra_1.default.writeFileSync(codePath + '/index.js', jsCode);
    }
    deploy() {
        return __awaiter(this, void 0, void 0, function* () {
            // deploy
            (0, child_process_1.spawn)('s', ['deploy'], { stdio: 'inherit', cwd: this.path, shell: true });
        });
    }
}
exports.default = fcNodejsApplication;
