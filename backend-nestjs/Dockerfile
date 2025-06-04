FROM --platform=linux/arm64 public.ecr.aws/lambda/nodejs:22 as installer
WORKDIR /usr/app
COPY package*.json ./
RUN npm install

FROM --platform=linux/arm64 public.ecr.aws/lambda/nodejs:22 as builder
WORKDIR /usr/app
COPY --from=installer /usr/app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM --platform=linux/arm64 public.ecr.aws/lambda/nodejs:22
WORKDIR ${LAMBDA_TASK_ROOT}
COPY --from=builder /usr/app/dist .
COPY --from=builder /usr/app/node_modules ./node_modules
CMD ["src/main.handler"]