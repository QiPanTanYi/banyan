import { Injectable } from '@nestjs/common';
import * as yaml from 'js-yaml';
import * as fs from 'fs';
import * as path from 'path';

export interface DatabaseConfig {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  logging: boolean;
  entities: string[];
  migrations: string[];
  subscribers: string[];
}

export interface ServerConfig {
  port: number;
  cors: {
    origin: string;
    credentials: boolean;
  };
}

export interface JwtConfig {
  secret: string;
  expiresIn: string;
}

export interface LoggingConfig {
  level: string;
  format: string;
}

export interface AppConfig {
  database: DatabaseConfig;
  server: ServerConfig;
  jwt: JwtConfig;
  logging: LoggingConfig;
}

@Injectable()
export class ConfigService {
  private config: AppConfig;

  constructor() {
    this.loadConfig();
  }

  private loadConfig(): void {
    try {
      const configPath = path.join(__dirname, '../../config.yaml');
      const fileContents = fs.readFileSync(configPath, 'utf8');
      this.config = yaml.load(fileContents) as AppConfig;
    } catch (error) {
      console.error('Error loading config.yaml:', error);
      // 使用默认配置作为后备
      this.config = this.getDefaultConfig();
    }
  }

  private getDefaultConfig(): AppConfig {
    return {
      database: {
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '123456',
        database: 'banyan',
        synchronize: true,
        logging: true,
        entities: ['dist/**/*.entity{.ts,.js}'],
        migrations: ['dist/migrations/*{.ts,.js}'],
        subscribers: ['dist/subscribers/*{.ts,.js}'],
      },
      server: {
        port: 3001,
        cors: {
          origin: 'http://localhost:3000',
          credentials: true,
        },
      },
      jwt: {
        secret: 'banyan-erp-secret-key',
        expiresIn: '24h',
      },
      logging: {
        level: 'info',
        format: 'combined',
      },
    };
  }

  get database(): DatabaseConfig {
    return this.config.database;
  }

  get server(): ServerConfig {
    return this.config.server;
  }

  get jwt(): JwtConfig {
    return this.config.jwt;
  }

  get logging(): LoggingConfig {
    return this.config.logging;
  }

  get(key: string): any {
    return this.config[key];
  }
}