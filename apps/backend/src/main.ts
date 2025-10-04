import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from './config/config.service';
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // 获取配置服务
  const configService = app.get(ConfigService);
  
  // 启用全局验证管道
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  // 启用全局异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  // 配置CORS跨域支持 - 使用YAML配置
  app.enableCors({
    origin: configService.server.cors.origin,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: configService.server.cors.credentials,
  });

  // 设置全局API前缀
  app.setGlobalPrefix('api');

  const port = configService.server.port;
  await app.listen(port);
  
  console.log(`🚀 Banyan ERP Backend is running on: http://localhost:${port}/api`);
  console.log(`📊 Database: ${configService.database.type}://${configService.database.host}:${configService.database.port}/${configService.database.database}`);
}

bootstrap();