// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ContactModule } from './contact/contact.module';
import { ProjectsModule } from './projects/projects.module';
import { VisitorModule } from './visitor/visitor.module';

@Module({
  imports: [
    // Load .env otomatis ke seluruh app
    ConfigModule.forRoot({ isGlobal: true }),

    // Database
    PrismaModule,

    // Feature modules
    ContactModule,
    ProjectsModule,
    VisitorModule,
  ],
})
export class AppModule {}
