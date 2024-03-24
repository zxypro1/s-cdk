import Engine from '@serverless-devs/engine';
import fcNodejsApplication from './template/fcNodejsApplication';

const fcapp = new fcNodejsApplication({
  functionName: 'fcNodejsApplication', 
  handler: 'index.handler', 
  runtime: 'nodejs12', 
  memorySize: 128, 
  timeout: 60, 
  region: 'cn-hangzhou', 
  description: 'fcNodejsApplication'
});

fcapp.deploy();