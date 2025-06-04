import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import path from "path";
import * as lambda from "aws-cdk-lib/aws-lambda";
import {Architecture} from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";

export class LambdalithStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaFunction = new lambda.DockerImageFunction(this, id, {
      code: lambda.DockerImageCode.fromImageAsset(
          path.join(__dirname, "../../backend-nestjs"),
      ),
      architecture: Architecture.ARM_64,
      memorySize: 256,
    });


    const apiGateway = new apigateway.RestApi(this, 'LambdalithApiGateway', {
      restApiName: 'LambdalithApiGateway',
      description: 'API Gateway with Lambda Proxy integration',
      deployOptions: {
        stageName: "",
      },
    });

    apiGateway.root.addProxy({
      defaultIntegration: new apigateway.LambdaIntegration(
          lambdaFunction,
      ),
      anyMethod: true,
    });

  }
}
