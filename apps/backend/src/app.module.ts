import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
  imports: [
    // 配置模块，用于环境变量管理
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    
    // 自定义配置模块
    ConfigModule,
    
    // TypeORM数据库连接配置 - 使用YAML配置
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        // console.log('Database config:', configService.database);
        return {
          type: configService.database.type as any,
          host: configService.database.host,
          port: configService.database.port,
          username: configService.database.username,
          password: configService.database.password,
          database: configService.database.database,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: configService.database.synchronize,
          logging: configService.database.logging,
        };
      },
      inject: [ConfigService],
    }),
    
    // 认证模块
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // 全局JWT守卫
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}