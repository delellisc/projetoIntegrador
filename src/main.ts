import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  app.use(
    session({
      secret: 'chave',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false } 
    }),
  );

  app.useStaticAssets(join(__dirname, '../front', 'public'));
  app.setBaseViewsDir(join(__dirname, '../front', 'paginas'));
  app.setViewEngine('hbs');
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
