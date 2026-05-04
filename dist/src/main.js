"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.enableCors({
        origin: [
            'http://localhost:5500',
            'http://localhost:3000',
            'http://127.0.0.1:5500',
            process.env.FRONTEND_URL ?? '',
        ].filter(Boolean),
        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
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
//# sourceMappingURL=main.js.map