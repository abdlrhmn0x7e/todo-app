import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";
import { HttpErrorFilter } from "./common/filters/http-error.filter";
import { ResponseInterceptor } from "./common/interceptors/response.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });

  app.setGlobalPrefix("api");
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpErrorFilter());

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
