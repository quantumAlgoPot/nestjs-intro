import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleService } from './utils/console/console.service';
import * as helmet from 'helmet';
import * as csurf from 'csurf';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
declare const module: any;
const consoleService = new ConsoleService();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.enableVersioning();
  app.useGlobalInterceptors();
  app.use(csurf()); // Cross-site request forgery (also known as CSRF or XSRF)
  app.use(cookieParser()); // For Cookies
  app.use(
    // for Session
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );
  // app.use(helmet());
  await app.listen(3000);

  if (module.hot) {
    consoleService.print('Hot Reload in Use');
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
