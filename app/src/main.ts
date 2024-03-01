import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "@app/app.module";
import { ClassSerializerInterceptor, RequestMethod } from "@nestjs/common";

const port = process.env.APP_PORT || 80;

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      strategy: "exposeAll",
    }),
  );

  // App.useGlobalPipes(
  //   new ValidationPipe({
  //     exceptionFactory: (validationErrors) => {
  //       return new ValidationException(validationErrors);
  //     },
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //     transform: true,
  //     transformOptions: {
  //       exposeDefaultValues: true,
  //     },
  //   })
  // );

  app.setGlobalPrefix("api", {
    exclude: [{ path: "_healthcheck", method: RequestMethod.GET }],
  });

  await app.listen(port);
}

bootstrap();
