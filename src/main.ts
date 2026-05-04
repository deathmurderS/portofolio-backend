// src/main.ts
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ── Prefix semua route dengan /api ────────
  app.setGlobalPrefix('api');

  // ── CORS: izinkan frontend portofolio ─────
  app.enableCors({
    origin: [
      'http://localhost:5500',   // Live Server VS Code
      'http://localhost:3000',   // Development
      'http://127.0.0.1:5500',
      process.env.FRONTEND_URL ?? '', // Production URL dari .env
    ].filter(Boolean),
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
  });

  // ── Validasi DTO otomatis (class-validator) ─
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,         // Buang field yang tidak ada di DTO
      forbidNonWhitelisted: true,
      transform: true,         // Auto-cast string ke number dll
    }),
  );

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  console.log(`\n🚀 Portofolio Backend berjalan di: http://localhost:${port}/api`);
  console.log(`📋 Endpoints:`);
  console.log(`   POST   /api/contact`);
  console.log(`   GET    /api/contact`);
  console.log(`   GET    /api/projects`);
  console.log(`   POST   /api/visitors`);
  console.log(`   GET    /api/visitors/stats\n`);
}

bootstrap();
