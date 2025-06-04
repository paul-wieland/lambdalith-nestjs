#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import {LambdalithStack} from "../lib/lambdalith-stack";

const app = new cdk.App();
new LambdalithStack(app, 'Lambdalith');