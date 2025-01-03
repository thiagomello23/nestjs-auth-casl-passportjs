import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeedService } from './seed/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Running Seed
  // Easiest setup for typeorm seed, not the best but will do
  if(process.env.ENVIRONMENT === "dev") {
    const seed = app.get(SeedService)
    await seed.seed()
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
