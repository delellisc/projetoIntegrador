import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  app.useStaticAssets(join(__dirname, '../front', 'styles'));
  app.setBaseViewsDir(join(__dirname, '../front', 'paginas'));
  app.setViewEngine('hbs');
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
