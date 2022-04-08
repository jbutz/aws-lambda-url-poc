import { CfnPermission, IFunction } from 'aws-cdk-lib/aws-lambda';
import { CfnResource } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AnyPrincipal } from 'aws-cdk-lib/aws-iam';

export interface LambdaUrlProps {
  authorizationType: 'NONE' | 'AWS_IAM';
  cors?: {
    AllowCredentials?: boolean;
    AllowHeaders?: string[];
    AllowMethods?: string[];
    AllowOrigins?: string[];
    ExposeHeaders?: string[];
    MaxAge?: number;
  };
  qualifier?: string;
  targetFunction: IFunction;
  principle?: string;
}

export class LambdaFunctionUrl extends CfnResource {
  constructor(scope: Construct, id: string, props: LambdaUrlProps) {
    super(scope, id, {
      type: 'AWS::Lambda::Url',
      properties: {
        AuthType: props.authorizationType,
        Cors: props.cors,
        Qualifier: props.qualifier,
        TargetFunctionArn: props.targetFunction.functionArn,
      },
    });

    if (props.principle) {
      const permission = new CfnPermission(this, 'PublicAccess', {
        functionName: props.targetFunction.functionName,
        action: 'lambda:InvokeFunctionUrl',
        principal: props.principle,
      });
      permission.addPropertyOverride(
        'FunctionUrlAuthType',
        props.authorizationType
      );
    }
  }

  get functionUrl(): string {
    return this.getAtt('FunctionUrl').toString();
  }
}
