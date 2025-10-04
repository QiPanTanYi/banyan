"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const config_service_1 = require("./config/config.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_service_1.ConfigService);
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    app.enableCors({
        origin: configService.server.cors.origin,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: configService.server.cors.credentials,
    });
    app.setGlobalPrefix('api');
    const port = configService.server.port;
    await app.listen(port);
    console.log(`🚀 Banyan ERP Backend is running on: http://localhost:${port}/api`);
    console.log(`📊 Database: ${configService.database.type}://${configService.database.host}:${configService.database.port}/${configService.database.database}`);
}
bootstrap();
//# sourceMappingURL=main.js.map