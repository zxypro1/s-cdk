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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yamlCreator_1 = __importDefault(require("../yamlCreator"));
const child_process_1 = require("child_process");
const fs_extra_1 = __importDefault(require("fs-extra"));
const jsCode = `
exports.handler = function (event, context, callback) {
  callback(null, 'hello world');
};`;
class fcNodejsApplication {
    constructor(spec) {
        this.path = './.temp/FCNodejsApplication/';
        this.yamlCreator = new yamlCreator_1.default(this.path);
        this.yamlCreator.addKey('edition', '3.0.0');
        this.yamlCreator.addKey('name', 'nodejs-application');
        this.yamlCreator.addKey('access', 'default');
        this.yamlCreator.addKeys({
            resources: {
                fcNodejsApplication: Object.assign(Object.assign({}, spec), { code: './code' })
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
            yield (0, child_process_1.spawnSync)('s', ['deploy'], { stdio: 'inherit', cwd: this.path });
        });
    }
}
exports.default = fcNodejsApplication;
