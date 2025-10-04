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
  "react-router-dom": "^6.8.1"    // React路由库
}
```

#### 开发依赖 (devDependencies)
```json
{
  "@types/react": "^18.0.28",           // React类型定义
  "@types/react-dom": "^18.0.11",       // React DOM类型定义
  "@vitejs/plugin-react": "^3.1.0",     // Vite React插件
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
  "typeorm": "^0.3.17",                 // TypeORM ORM框架
  "mysql2": "^3.6.0",                   // MySQL数据库驱动
  "class-validator": "^0.14.0",         // 数据验证
  "class-transformer": "^0.5.1",        // 数据转换
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
  "@types/express": "^4.17.17",         // Express类型定义
  "@types/jest": "^29.5.2",             // Jest类型定义
  "@types/node": "^18.16.12",           // Node.js类型定义
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

复制环境变量配置文件：
```bash
cp apps/backend/.env.example apps/backend/.env
```

编辑 `apps/backend/.env` 文件，配置数据库连接：
```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_DATABASE=banyan_erp
```

### 4. 安装依赖

使用pnpm安装所有依赖（推荐）：
```bash
pnpm install
```

或者使用npm：
```bash
npm install
```

### 5. 验证安装

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

## 🔍 版本兼容性说明

### Node.js 18.12.1 兼容性
本项目所有依赖都经过测试，确保与Node.js 18.12.1完全兼容：

- ✅ **React 18.2.0** - 完全兼容
- ✅ **Vite 4.2.0** - 完全兼容  
- ✅ **TypeScript 5.0.4** - 完全兼容
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

### 性能优化建议

1. **使用pnpm**: 相比npm，pnpm能节省磁盘空间并提高安装速度
2. **启用缓存**: Turborepo会自动缓存构建结果，加速后续构建
3. **并行构建**: 利用Turborepo的并行构建能力提高效率

## 📋 安装检查清单

- [ ] Node.js 18.12.1+ 已安装
- [ ] pnpm 8.15.0+ 已安装
- [ ] 项目依赖安装成功
- [ ] 开发服务器启动正常
- [ ] 可以访问 http://localhost:3000
- [ ] 代码格式化工具正常工作 (`pnpm format`)
- [ ] 类型检查通过 (`pnpm type-check`)

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