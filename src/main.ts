import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleService } from './utils/console/console.service';
import * as helmet from 'helmet';
import * as csurf from 'csurf';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
declare const module: any;
const consoleService = new ConsoleService();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /* const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  ); */
  app.enableCors();
  app.enableVersioning();
  app.useGlobalInterceptors();
  app.use(cookieParser()); // For Cookies
  app.use(
    // for Session
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(csurf()); // Cross-site request forgery (also known as CSRF or XSRF)
  // app.use(helmet());

  if (module.hot) {
    consoleService.print('Hot Reload in Use');
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
