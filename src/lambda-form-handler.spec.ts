import * as querystring from 'querystring';
import { handler, LambdaUrlReqeustEvent } from './lambda-form-handler';

describe('lambda-form-handler', () => {
  let consoleSpy: jest.SpyInstance;
  const mockRedirect = 'http://example.com/mock-thanks.html';

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    process.env.REDIRECT_URL = mockRedirect;
  });

  it('returns a redirect', async () => {
    await expect(handler({} as LambdaUrlReqeustEvent)).resolves.toEqual({
      statusCode: 301,
      headers: {
        Location: mockRedirect,
      },
      body: '',
    });
  });

  it('logs a JSON body and returns a redirect', async () => {
    const input = {
      foo: 'bar',
    };

    const event: Partial<LambdaUrlReqeustEvent> = {
      body: JSON.stringify(input),
      headers: {
        'content-type': 'application/json',
      },
    };

    await expect(handler(event as LambdaUrlReqeustEvent)).resolves.toEqual({
      statusCode: 301,
      headers: {
        Location: mockRedirect,
      },
      body: '',
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      'Received form input',
      JSON.stringify(input)
    );
  });

  it('logs a base64 encoded form urlencoded body and redirects', async () => {
    const input = {
      foo: 'bar',
    };

    const event: Partial<LambdaUrlReqeustEvent> = {
      body: Buffer.from(querystring.stringify(input)).toString('base64'),
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      isBase64Encoded: true,
    };

    await expect(handler(event as LambdaUrlReqeustEvent)).resolves.toEqual({
      statusCode: 301,
      headers: {
        Location: mockRedirect,
      },
      body: '',
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      'Received form urlencoded input',
      input
    );
  });
});
