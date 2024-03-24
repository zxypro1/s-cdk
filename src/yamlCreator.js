"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const js_yaml_1 = __importDefault(require("js-yaml"));
class YamlCreator {
    constructor(filePath) {
        this.yamlObject = {};
        this.yamlFileContent = '';
        this.path = filePath + 's.yaml';
        fs_extra_1.default.ensureDirSync(filePath);
        if (!fs_extra_1.default.existsSync(this.path)) {
            fs_extra_1.default.createFileSync(this.path);
        }
        this.yamlFileContent = fs_extra_1.default.readFileSync(this.path, 'utf8');
        this.yamlObject = js_yaml_1.default.load(this.yamlFileContent) || {};
    }
    addKey(key, value) {
        this.yamlObject[key] = value;
    }
    addKeys(keys) {
        this.yamlObject = Object.assign(Object.assign({}, this.yamlObject), keys);
    }
    save() {
        this.yamlFileContent = js_yaml_1.default.dump(this.yamlObject);
        fs_extra_1.default.writeFileSync(this.path, this.yamlFileContent);
    }
    getKeys() {
        return Object.keys(this.yamlObject);
    }
    getKey(key) {
        return this.yamlObject[key];
    }
    deleteKey(key) {
        delete this.yamlObject[key];
    }
    deleteKeys(keys) {
        keys.forEach(key => {
            delete this.yamlObject[key];
        });
    }
    clear() {
        this.yamlObject = {};
    }
    destroy() {
        this.yamlObject = {};
        this.yamlFileContent = '';
    }
}
exports.default = YamlCreator;
