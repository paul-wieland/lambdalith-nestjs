import serverlessExpress from "@codegenie/serverless-express";
import { Callback, Context, Handler, APIGatewayProxyEvent } from "aws-lambda";
import { RequestListener } from "http";
import { createApp } from "./create.app";

let server: Handler;

async function bootstrap(): Promise<Handler> {
  const app = await createApp();
  await app.init();

  const expressApp: RequestListener = app
      .getHttpAdapter()
      .getInstance() as RequestListener;
  return serverlessExpress({ app: expressApp });
}
//
export const handler: Handler = async (
    event: APIGatewayProxyEvent,
    context: Context,
    callback: Callback,
): Promise<any> => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};
