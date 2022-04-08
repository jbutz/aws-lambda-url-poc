import * as querystring from 'querystring';

export async function handler(
  event: LambdaUrlReqeustEvent
): Promise<LambdaUrlResponse> {
  if (event.body && typeof event.body === 'string') {
    let input = event.body;

    if (event.isBase64Encoded) {
      input = Buffer.from(event.body as string, 'base64').toString();
    }

    if (event.headers['content-type'] === 'application/x-www-form-urlencoded') {
      const queryStringInput = Object.entries(
        querystring.parse(input as string)
      ).reduce((acc, [key, value]) => {
        return {
          ...acc,
          [key]: value,
        };
      }, {});

      console.log('Received form urlencoded input', queryStringInput);
    } else {
      console.log('Received form input', input);
    }
  }

  return {
    statusCode: 301,
    headers: {
      Location: process.env.REDIRECT_URL!!,
    },
    body: '',
  };
}

export interface LambdaUrlReqeustEvent {
  version: '2.0';
  routeKey: '$default';
  rawPath: string;
  rawQueryString: string;
  cookies: string[];
  headers: Record<string, string>;
  queryStringParameters: Record<string, string>;
  requestContext: {
    accountId: string;
    apiId: string;
    authentication: null;
    authorizer: null | {
      iam: {
        accessKey: string;
        accountId: string;
        callerId: string;
        cognitoIdentity: null;
        principalOrgId: string | null;
        userArn: string;
        userId: string;
      };
    };
    domainName: string;
    domainPrefix: string;
    http: {
      method: 'GET' | 'POST' | 'PUT' | 'HEAD' | 'OPTIONS' | 'PATCH' | 'DELETE';
      path: string;
      protocol: string;
      sourceIp: string;
      userAgent: string;
    };
    requestId: string;
    routeKey: '$default';
    stage: '$default';
    time: string;
    timeEpoch: number;
  };
  body: unknown;
  pathParameters: null;
  isBase64Encoded: boolean;
  stageVariables: null;
}

export interface LambdaUrlResponse {
  statusCode: number;
  headers?: Record<string, string>;
  body: object | string | unknown;
  cookies?: string[];
  isBase64Encoded?: boolean;
}
