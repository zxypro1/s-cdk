import fcNodejsApplication from './template/fcNodejsApplication';

const fcapp = new fcNodejsApplication({
  functionName: 'fcNodejsApplication', 
  handler: 'index.handler', 
  runtime: 'nodejs14', 
  memorySize: 128, 
  timeout: 60, 
  region: 'cn-hangzhou', 
  description: 'fcNodejsApplication',
  access: 'default-2',
  triggers: [
    {
      triggerName: 'httpTrigger',
      triggerType: 'http',
      description: 'httpTrigger',
      qualifier: 'LATEST',
      triggerConfig: {
        authType: 'anonymous',
        disableURLInternet: false,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD'],
      },
    },
  ],
});

fcapp.deploy();