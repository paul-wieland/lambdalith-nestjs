# Lambdalith with NestJS

![Project Banner](assets/lambdalith_nestjs_banner.png)

## 🚀 Motivation

- ⚡ **Fast and cost-efficient** development and deployment using serverless infrastructure
- 🧪 Perfect fit for **prototypes and MVPs** that need to ship quickly
- 📦 Fully **Dockerized** for portability and reproducible builds
- 🔁 Combines **NestJS** with **API Gateway proxy integration**, enabling multiple endpoints within a single Lambda
- 🧩 **NestJS provides a full suite** of features like modularization, test frameworks, dependency injection
- 🔄 Provides a **smooth migration path** to containers or other compute environments later on
- 🚀 **Deploy in minutes**, not hours, days, or weeks


### ⚠️ Limitations
- 🧊 Cold starts can take 2–3 seconds, especially in Dockerized Lambdas
- 🧠 Increased complexity from bundling a full NestJS app into a single Lambda (Lambdalith)
- 🧪 Local testing requires a different entry file (See `main.local.ts`, NestJS init without `codegenie`)

## 🏗 Architecture

![Architecture](assets/lambdalith-nestjs.drawio.png)

1. User sends a request to an AWS API Gateway endpoint.
2. API Gateway uses proxy integration to forward all paths and methods directly to the Lambda function. 
3. Lambda invokes the containerized function. 
4. [@codegenie/serverless-express](https://www.npmjs.com/package/@codegenie/serverless-express) handles the incoming event. 
5. Codegenie bootstraps a NestJS app and forwards the request for processing.

## ✅ Testing

Once the backend is deployed, you can test the setup by making HTTPS requests to the API Gateway:

```
curl <API-GATEWAY-BASE-URL>/prod/hello
curl <API-GATEWAY-BASE-URL>/prod/world
```

Both endpoints should return a valid response if the deployment was successful. This proofs, that the routing is properly configured.

### 🛠️ Deploy Instructions
```
# Authenticate with AWS (only for local deployment)
assume <DEPLOYMENT_ROLE>

# Authenticate Docker with AWS ECR Public (only for local deployment)
aws ecr-public get-login-password --region us-east-1 | \
docker login --username AWS --password-stdin public.ecr.aws

# Install dependencies
npm install

# Bootstrap environment (only once per account/region)
cdk bootstrap

# Deploy the stack
cdk deploy
```