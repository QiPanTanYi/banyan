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
export declare class ConfigService {
    private config;
    constructor();
    private loadConfig;
    private getDefaultConfig;
    get database(): DatabaseConfig;
    get server(): ServerConfig;
    get jwt(): JwtConfig;
    get logging(): LoggingConfig;
    get(key: string): any;
}
