import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { PocStack } from './poc-stack';

describe('PocStack', () => {
  let template: Template;

  beforeAll(() => {
    const app = new cdk.App();
    template = Template.fromStack(new PocStack(app, 'PocStack'));
  });

  it('has a Lambda URL', () => {
    template.hasResourceProperties('AWS::Lambda::Url', {
      AuthType: 'NONE',
      TargetFunctionArn: {
        'Fn::GetAtt': [
          Object.keys(template.findResources('AWS::Lambda::Function'))[0],
          'Arn',
        ],
      },
    });
  });

  it('grants public access to the Lambda URL', () => {
    template.hasResourceProperties('AWS::Lambda::Permission', {
      Action: 'lambda:InvokeFunctionUrl',
      Principal: '*',
      FunctionUrlAuthType: 'NONE',
      FunctionName: {
        Ref: Object.keys(template.findResources('AWS::Lambda::Function'))[0],
      },
    });
  });
});
