import YamlCreator from "../yamlCreator";
import fs from 'fs-extra';
import { spawn } from 'child_process';

interface FCNodeSpec {
  region: 
    'cn-hangzhou' | 
    'cn-shanghai' | 
    'cn-beijing' | 
    'cn-shenzhen' | 
    'cn-zhangjiakou' | 
    'cn-huhehaote';
  description?: string;
  functionName: string;
  handler: string;
  runtime: 'nodejs8' | 'nodejs10' | 'nodejs12' | 'nodejs14';
  memorySize: number;
  timeout: number;
  trigger?: Array<Trigger>;
}

interface TriggerConfig {
  authType: 'anonymous' | 'function';
  disableURLInternet: boolean;
  methods: Array<'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD'>;
}
interface Trigger {
  triggerName: string;
  triggerType: string;
  description: string;
  qualifier: string;
  triggerConfig: TriggerConfig;
}

const jsCode = `
exports.handler = function (event, context, callback) {
  callback(null, 'hello world');
};`

export default class fcNodejsApplication {
  yamlCreator: YamlCreator;
  path: string;
  constructor (spec: FCNodeSpec) {
    this.path = './.temp/FCNodejsApplication/';
    this.yamlCreator = new YamlCreator(this.path);
    this.yamlCreator.addKey('edition', '3.0.0');
    this.yamlCreator.addKey('name', 'nodejs-application');
    this.yamlCreator.addKey('access', 'default');
    this.yamlCreator.addKeys({
      resources: {
        fcNodejsApplication: {
          component: 'fc3',
          props: {
            ...spec,
            code: './code',
          }
        }
      }
    });
    this.yamlCreator.save();
    this.yamlCreator.destroy();
    const codePath = this.path + 'code';
    fs.ensureDirSync(codePath);
    fs.createFileSync(codePath + '/index.js');
    fs.writeFileSync(codePath + '/index.js', jsCode);
  }
  public async deploy () {
    // deploy
    spawn('s', ['deploy'], { stdio: 'inherit', cwd: this.path, shell: true });
  }
}