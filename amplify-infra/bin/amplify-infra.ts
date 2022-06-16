#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { AmplifyInfraStack } from '../lib/amplify-infra-stack';
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env' })

const { 
  accountNumber
} = process.env;

const app = new cdk.App();
new AmplifyInfraStack(app, 'AmplifyInfraStack', {  env: { account: accountNumber, region: 'sa-east-1' },});