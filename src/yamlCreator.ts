import fs from 'fs-extra';
import yaml from 'js-yaml';

export default class YamlCreator {
  yamlObject: any = {};
  yamlFileContent: string = '';
  path: string;
  constructor (filePath: string) {
    this.path = filePath + 's.yaml';
    fs.ensureDirSync(filePath);
    if (!fs.existsSync(this.path)) {
      fs.createFileSync(this.path);
    }
    this.yamlFileContent = fs.readFileSync(this.path, 'utf8');
    this.yamlObject = yaml.load(this.yamlFileContent) || {};
  }

  addKey (key: string, value: any) {
    this.yamlObject[key] = value;
  }

  addKeys (keys: { [key: string]: any }) {
    this.yamlObject = { ...this.yamlObject, ...keys };
  }

  save () {
    this.yamlFileContent = yaml.dump(this.yamlObject);
    fs.writeFileSync(this.path, this.yamlFileContent);
  }

  getKeys () {
    return Object.keys(this.yamlObject);
  }

  getKey (key: string) {
    return this.yamlObject[key];
  }

  deleteKey (key: string) {
    delete this.yamlObject[key];
  }

  deleteKeys (keys: string[]) {
    keys.forEach(key => {
      delete this.yamlObject[key];
    });
  }

  clear () {
    this.yamlObject = {};
  }

  destroy () {
    this.yamlObject = {};
    this.yamlFileContent = '';
  }
}