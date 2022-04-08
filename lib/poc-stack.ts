import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { AnyPrincipal } from 'aws-cdk-lib/aws-iam';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { LambdaFunctionUrl } from './constructs/LambdaFunctionUrl';

export class PocStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const handlerFunction = new NodejsFunction(this, 'FormHandler', {
      entry: './src/lambda-form-handler.ts',
      environment: {
        REDIRECT_URL: 'http://localhost:8080/thanks.html',
      },
      // If your account's Lambda Concurrent executions quota is set to 50
      //  the next line will cause an error. Request a quota increase or comment out the line.
      reservedConcurrentExecutions: 1, // Max 10 requests per second, Source: https://docs.aws.amazon.com/lambda/latest/dg/urls-configuration.html#urls-throttling
    });

    const functionUrl = new LambdaFunctionUrl(this, 'FormHandlerUrl', {
      authorizationType: 'NONE',
      targetFunction: handlerFunction,
      principle: '*',
    });

    new CfnOutput(this, 'FormHandlerUrlOutput', {
      value: functionUrl.functionUrl,
    });
  }
}
