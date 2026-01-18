"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("@nestjs/config");
const app_module_1 = require("./app.module");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('PORT') || 3001;
    const apiPrefix = configService.get('API_PREFIX') || 'api/v1';
    const frontendUrl = configService.get('FRONTEND_URL') || 'http://localhost:3000';
    app.setGlobalPrefix(apiPrefix);
    const isDevelopment = process.env.NODE_ENV !== 'production';
    app.enableCors({
        origin: isDevelopment ? true : frontendUrl,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const uploadsPath = (0, path_1.join)(process.cwd(), 'uploads');
    app.useStaticAssets(uploadsPath, {
        prefix: '/uploads',
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('اطلبها QR API')
        .setDescription('منصة متعددة المستأجرين لقوائم المطاعم الرقمية')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    await app.listen(port);
    console.log(`🚀 Server running on http://localhost:${port}/${apiPrefix}`);
    console.log(`📚 Swagger docs available at http://localhost:${port}/api/docs`);
    console.log(`📁 Static files served from: ${uploadsPath}`);
}
bootstrap();
//# sourceMappingURL=main.js.map