import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "@app/app.module";
import { ClassSerializerInterceptor, RequestMethod, ValidationPipe } from "@nestjs/common";
import { ValidationException } from "@app/context/common/exception";
import { HttpExceptionFilter } from "@app/context/common/filter/http-exception.filter";

const port = process.env.APP_PORT || 80;

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      strategy: "exposeAll",
    })
  );

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors) => {
        return new ValidationException(validationErrors);
      },
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        exposeDefaultValues: true,
      },
    })
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  app.setGlobalPrefix("api", {
    exclude: [{ path: "_healthcheck", method: RequestMethod.GET }],
  });

  await app.listen(port);
}

bootstrap();
