# AWS Lambda URL Proof of Concept

Proof of Concept showing how you can use AWS Lambda URLs to accept form input from a website

## Setup

1. Ensure you have Node.js 14 or Node.js 16 installed on your machine
2. Ensure you have the [AWS CLI](https://aws.amazon.com/cli/) installed on your machine
3. Configure a terminal session with AWS programmatic credentials
4. Install this repo's dependencies
   ```bash
   npm ci
   ```
5. Run the CDK's boostrap command to ensure you AWS account is configured correctly
   ```bash
   npx cdk boostrap
   ```
6. Deploy the AWS resources
   ```bash
   npm run deploy
   ```
7. At the end of the deploy there will be outputs, one will be called `PocStack.FormHandlerUrlOutput`.
   Take the URL next to it and use that as the value of the `action` attribute in `public/index.html`.
8. Start the demo HTTP server then open the demo website in your browser.
   ```bash
   npm run serve
   ```
