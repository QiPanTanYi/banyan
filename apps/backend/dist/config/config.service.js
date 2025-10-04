"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
const common_1 = require("@nestjs/common");
const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");
let ConfigService = class ConfigService {
    constructor() {
        this.loadConfig();
    }
    loadConfig() {
        try {
            const configPath = path.join(__dirname, '../../config.yaml');
            const fileContents = fs.readFileSync(configPath, 'utf8');
            this.config = yaml.load(fileContents);
        }
        catch (error) {
            console.error('Error loading config.yaml:', error);
            this.config = this.getDefaultConfig();
        }
    }
    getDefaultConfig() {
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
    get database() {
        return this.config.database;
    }
    get server() {
        return this.config.server;
    }
    get jwt() {
        return this.config.jwt;
    }
    get logging() {
        return this.config.logging;
    }
    get(key) {
        return this.config[key];
    }
};
exports.ConfigService = ConfigService;
exports.ConfigService = ConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ConfigService);
//# sourceMappingURL=config.service.js.map