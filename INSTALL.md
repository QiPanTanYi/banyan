# 榕树ERP系统 - 安装指南

本文档详细介绍了榕树ERP系统的环境要求、依赖版本和安装步骤。该系统采用前后端分离架构，包含React前端和NestJS后端。

## 🔧 环境要求

### Node.js 版本
- **当前支持版本**: Node.js 18.12.1
- **最低要求版本**: Node.js >= 18.12.0
- **推荐版本**: Node.js 18.x LTS

### 包管理器
- **推荐使用**: pnpm 8.15.0
- **替代选择**: npm (Node.js自带) 或 yarn

### 数据库
- **数据库**: MySQL 8.0+
- **连接方式**: TypeORM
- **端口**: 3306 (默认)

## 📦 依赖版本详情

### 根项目依赖 (package.json)

#### 开发依赖 (devDependencies)
```json
{
  "@biomejs/biome": "^1.4.1",     // 代码格式化和静态检查工具
  "turbo": "^1.10.16",            // Monorepo构建工具
  "typescript": "^5.0.4"          // TypeScript编译器
}
```

### Web应用依赖 (apps/web/package.json)

#### 生产依赖 (dependencies)
```json
{
  "react": "^18.2.0",             // React核心库
  "react-dom": "^18.2.0",         // React DOM渲染器
  "react-router-dom": "^6.30.1",  // React路由库
  "axios": "^1.6.0",              // HTTP客户端
  "zustand": "^4.4.0",            // 状态管理库
  "clsx": "^2.1.1",               // 条件类名工具
  "tailwind-merge": "^3.3.1"      // Tailwind类名合并工具
}
```

#### 开发依赖 (devDependencies)
```json
{
  "@types/react": "^18.0.28",           // React类型定义
  "@types/react-dom": "^18.0.11",       // React DOM类型定义
  "@types/react-router-dom": "^5.3.3",  // React Router类型定义
  "@types/node": "^20.0.0",             // Node.js类型定义
  "@vitejs/plugin-react": "^3.1.0",     // Vite React插件
  "tailwindcss": "^3.3.0",              // Tailwind CSS框架
  "@tailwindcss/forms": "^0.5.0",       // Tailwind表单插件
  "sass": "^1.69.0",                    // SCSS预处理器
  "postcss": "^8.4.0",                  // CSS后处理器
  "autoprefixer": "^10.4.0",            // CSS自动前缀
  "typescript": "^5.0.4",               // TypeScript编译器
  "vite": "^4.2.0"                      // Vite构建工具
}
```

### 后端应用依赖 (apps/backend/package.json)

#### 生产依赖 (dependencies)
```json
{
  "@nestjs/common": "^9.4.3",           // NestJS核心模块
  "@nestjs/core": "^9.4.3",             // NestJS核心功能
  "@nestjs/platform-express": "^9.4.3", // Express平台适配器
  "@nestjs/typeorm": "^9.0.1",          // TypeORM集成
  "@nestjs/config": "^2.3.4",           // 配置管理
  "@nestjs/jwt": "^11.0.0",             // JWT认证
  "@nestjs/passport": "^11.0.5",        // Passport认证策略
  "typeorm": "^0.3.17",                 // TypeORM ORM框架
  "mysql2": "^3.6.0",                   // MySQL数据库驱动
  "bcrypt": "^6.0.0",                   // 密码加密
  "passport": "^0.7.0",                 // 认证中间件
  "passport-jwt": "^4.0.1",             // JWT认证策略
  "passport-local": "^1.0.0",           // 本地认证策略
  "class-validator": "^0.14.2",         // 数据验证
  "class-transformer": "^0.5.1",        // 数据转换
  "js-yaml": "^4.1.0",                  // YAML配置解析
  "reflect-metadata": "^0.1.13",        // 元数据反射
  "rxjs": "^7.8.1"                      // 响应式编程库
}
```

#### 开发依赖 (devDependencies)
```json
{
  "@nestjs/cli": "^9.5.0",              // NestJS CLI工具
  "@nestjs/schematics": "^9.2.0",       // NestJS代码生成器
  "@nestjs/testing": "^9.4.3",          // NestJS测试工具
  "@types/bcrypt": "^6.0.0",            // bcrypt类型定义
  "@types/express": "^4.17.17",         // Express类型定义
  "@types/jest": "^29.5.2",             // Jest类型定义
  "@types/js-yaml": "^4.0.9",           // js-yaml类型定义
  "@types/node": "^18.16.12",           // Node.js类型定义
  "@types/passport-jwt": "^4.0.1",      // Passport JWT类型定义
  "@types/passport-local": "^1.0.38",   // Passport Local类型定义
  "@types/supertest": "^2.0.12",        // Supertest类型定义
  "@typescript-eslint/eslint-plugin": "^5.59.11",  // TypeScript ESLint插件
  "@typescript-eslint/parser": "^5.59.11",         // TypeScript ESLint解析器
  "eslint": "^8.42.0",                  // ESLint代码检查
  "eslint-config-prettier": "^8.8.0",   // Prettier ESLint配置
  "eslint-plugin-prettier": "^4.2.1",   // Prettier ESLint插件
  "jest": "^29.5.0",                    // Jest测试框架
  "prettier": "^2.8.8",                 // 代码格式化
  "supertest": "^6.3.3",                // HTTP测试
  "ts-jest": "^29.1.0",                 // TypeScript Jest
  "ts-loader": "^9.4.3",                // TypeScript加载器
  "ts-node": "^10.9.1",                 // TypeScript Node运行器
  "tsconfig-paths": "^4.2.0",           // TypeScript路径映射
  "typescript": "^5.1.3"                // TypeScript编译器
}
```

## 🚀 安装步骤

### 1. 环境检查

首先检查你的Node.js版本：
```bash
node --version
# 应该显示: v18.12.1 或更高版本
```

检查pnpm是否已安装：
```bash
pnpm --version
# 如果未安装，请执行: npm install -g pnpm
```

### 2. 克隆项目

```bash
git clone <项目地址>
cd banyan
```

### 3. 配置数据库

创建MySQL数据库：
```sql
CREATE DATABASE banyan_erp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 4. 环境变量配置

#### 后端环境变量
复制环境变量配置文件：
```bash
cp apps/backend/.env.example apps/backend/.env
```

编辑 `apps/backend/.env` 文件，配置数据库连接和认证：
```env
# 数据库配置
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_DATABASE=banyan_erp

# 应用配置
NODE_ENV=development
PORT=3001

# JWT配置（认证必需）
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d
```

#### 前端环境变量（可选）
如需配置前端环境变量，可创建 `apps/web/.env` 文件：
```env
# API基础URL
VITE_API_BASE_URL=http://localhost:3001/api

# 应用配置
VITE_APP_TITLE=榕树ERP系统
```

### 5. 安装依赖

使用pnpm安装所有依赖（推荐）：
```bash
pnpm install
```

或者使用npm：
```bash
npm install
```

### 6. 数据库初始化

系统会在首次启动时自动创建数据库表结构。如需手动初始化，可参考 `sql/init.sql` 文件。

### 7. 验证安装

#### 启动前端应用
```bash
pnpm dev:web
```

如果看到以下输出，说明前端安装成功：
```
web:dev:   VITE v4.2.0  ready in XXX ms
web:dev:   ➜  Local:   http://localhost:3000/
```

#### 启动后端应用
```bash
pnpm dev:backend
```

如果看到以下输出，说明后端安装成功：
```
🚀 Banyan ERP Backend is running on: http://localhost:3001/api
```

#### 同时启动前后端
```bash
pnpm dev
```

访问地址验证：
- 前端应用: http://localhost:3000
- 后端API: http://localhost:3001/api
- 健康检查: http://localhost:3001/api/health
- 认证API: http://localhost:3001/api/auth

### 8. 功能验证

#### 认证系统测试
1. 访问 http://localhost:3000/register 注册新用户
2. 访问 http://localhost:3000/login 登录系统
3. 登录成功后会自动跳转到仪表盘
4. 访问 http://localhost:3000/profile 查看个人资料

#### API端点测试
```bash
# 用户注册
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@example.com","password":"123456"}'

# 用户登录
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456"}'
```

## 🔍 版本兼容性说明

### Node.js 18.12.1 兼容性
本项目所有依赖都经过测试，确保与Node.js 18.12.1完全兼容：

#### 前端依赖兼容性
- ✅ **React 18.2.0** - 完全兼容
- ✅ **Vite 4.2.0** - 完全兼容  
- ✅ **TypeScript 5.0.4** - 完全兼容
- ✅ **Tailwind CSS 3.3.0** - 完全兼容
- ✅ **Zustand 4.4.0** - 完全兼容
- ✅ **Axios 1.6.0** - 完全兼容

#### 后端依赖兼容性
- ✅ **NestJS 9.4.3** - 完全兼容
- ✅ **TypeORM 0.3.17** - 完全兼容
- ✅ **JWT 11.0.0** - 完全兼容
- ✅ **bcrypt 6.0.0** - 完全兼容

#### 开发工具兼容性
- ✅ **Biome 1.4.1** - 完全兼容
- ✅ **Turborepo 1.10.16** - 完全兼容

### 避免的版本冲突
项目特意避免了以下可能导致Node.js版本冲突的包：
- `execa@9.x` (需要Node.js >= 18.18.0)
- 其他需要更高Node.js版本的包

## 🛠️ 故障排除

### 常见问题

#### 1. pnpm命令未找到
```bash
# 安装pnpm
npm install -g pnpm
```

#### 2. Node.js版本过低
如果你的Node.js版本低于18.12.0，请升级：
- 访问 [Node.js官网](https://nodejs.org/) 下载最新LTS版本
- 或使用版本管理工具如nvm

#### 3. 依赖安装失败
清除缓存并重新安装：
```bash
# 清除pnpm缓存
pnpm store prune

# 删除node_modules和锁文件
rm -rf node_modules pnpm-lock.yaml

# 重新安装
pnpm install
```

#### 4. 端口占用
如果3000端口被占用，可以指定其他端口：
```bash
pnpm dev --port 3001
```

#### 5. 认证相关问题
如果遇到登录/注册问题：
```bash
# 检查JWT密钥是否配置
grep JWT_SECRET apps/backend/.env

# 检查数据库连接
pnpm dev:backend
# 查看控制台是否有数据库连接错误
```

#### 6. 样式问题
如果样式不生效：
```bash
# 重新构建Tailwind CSS
cd apps/web
npx tailwindcss -i ./src/index.css -o ./dist/output.css --watch

# 检查SCSS编译
pnpm dev:web
# 查看控制台是否有SCSS编译错误
```

### 性能优化建议

1. **开发环境优化**
   - 使用 `pnpm dev:turbo` 并行启动前后端
   - 启用热重载功能提高开发效率
   - 使用Vite的快速热更新功能

2. **生产环境优化**
   - 使用 `pnpm build` 构建优化版本
   - 配置适当的缓存策略
   - 启用Tailwind CSS的生产模式优化
   - 配置适当的JWT过期时间

3. **数据库优化**
   - 为常用查询字段添加索引
   - 配置数据库连接池
   - 定期清理过期的JWT token

4. **工具优化**
   - **使用pnpm**: 相比npm，pnpm能节省磁盘空间并提高安装速度
   - **启用缓存**: Turborepo会自动缓存构建结果，加速后续构建
   - **并行构建**: 利用Turborepo的并行构建能力提高效率

## 📋 安装检查清单

安装完成后，请确认以下项目：

### 基础环境
- [ ] Node.js 18.12.1 已安装
- [ ] pnpm 8.6.12 已安装  
- [ ] MySQL 8.0+ 已安装并运行

### 项目配置
- [ ] 项目依赖已安装 (`pnpm install`)
- [ ] 后端环境变量已配置 (`apps/backend/.env`)
- [ ] 数据库连接配置正确
- [ ] JWT密钥已设置

### 应用启动
- [ ] 前端应用可正常启动 (`pnpm dev:web`)
- [ ] 后端应用可正常启动 (`pnpm dev:backend`)
- [ ] 可以访问 http://localhost:3000
- [ ] 可以访问 http://localhost:3001/api

### 功能验证
- [ ] 用户注册功能正常
- [ ] 用户登录功能正常
- [ ] 路由保护功能正常
- [ ] 样式渲染正常（Tailwind CSS + SCSS）
- [ ] API接口响应正常

## 🔄 更新依赖

定期更新依赖以获得最新功能和安全修复：

```bash
# 检查过时的依赖
pnpm outdated

# 更新所有依赖到最新兼容版本
pnpm update

# 更新特定依赖
pnpm update react react-dom
```

---

如果在安装过程中遇到任何问题，请查看项目的Issue页面或联系开发团队。