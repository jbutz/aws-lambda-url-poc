#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { PocStack } from '../lib/poc-stack';

const app = new cdk.App();
new PocStack(app, 'PocStack', {
  stackName: 'Lambda-URL-POC',
});
