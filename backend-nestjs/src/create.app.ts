import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { INestApplication } from "@nestjs/common/interfaces/nest-application.interface";

export async function createApp(): Promise<INestApplication> {
  const app: INestApplication = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  // Configure app here
  // app.setGlobalPrefix("v1");

  return app;
}
