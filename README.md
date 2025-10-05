# 榕树ERP系统 (Banyan ERP System)

一个基于现代全栈技术构建的通用ERP系统，采用Monorepo架构，支持模块化开发和部署。系统包含完整的用户认证体系、现代化UI界面和可扩展的后端架构。

## 🌟 项目特点

- 🚀 **现代化技术栈**: React 18 + NestJS + TypeScript + Vite
- 🔐 **完整认证系统**: JWT认证、用户注册/登录、个人资料管理
- 🛡️ **路由保护**: 基于认证状态的路由守卫和权限控制
- 🎨 **现代化UI**: Tailwind CSS + SCSS 构建响应式界面
- 🗄️ **数据库支持**: TypeORM + MySQL 数据持久化
- 🌐 **跨域支持**: 内置CORS配置，支持前后端分离
- 📦 **Monorepo架构**: 使用 Turborepo 管理多包项目
- 🔧 **代码质量**: Biome 提供代码格式化和静态检查
- ⚡ **快速开发**: Vite 提供极速的开发体验
- 📋 **包管理**: pnpm workspace 高效管理依赖
- 🎯 **状态管理**: Zustand 轻量级状态管理
- 🌐 **HTTP客户端**: Axios 处理API请求

## 🚀 快速开始

### 安装依赖
```bash
pnpm install
```

### 启动开发服务器

#### 使用 Turbo 同时启动前后端 (推荐)
```bash
# 使用 turbo 并行启动所有应用
pnpm dev

# 或者直接使用 turbo 命令
npx turbo dev
```

#### 使用 Turbo 的优势
- 🚀 **并行执行**: 同时启动前端和后端，无需等待
- 📦 **智能缓存**: 基于文件变更的增量构建和缓存
- 🔄 **依赖管理**: 自动处理应用间的依赖关系
- 📊 **执行日志**: 清晰的彩色输出，便于调试

#### 单独启动应用

##### 仅启动前端 (端口: 3000)
```bash
pnpm dev:web
# 或使用 turbo 过滤器
npx turbo dev --filter=web
```

##### 仅启动后端 (端口: 3001)
```bash
pnpm dev:backend
# 或使用 turbo 过滤器
npx turbo dev --filter=backend
```

#### Turbo 高级用法

##### 查看任务执行图
```bash
npx turbo dev --graph
```

##### 强制重新运行（忽略缓存）
```bash
npx turbo dev --force
```

##### 并行度控制
```bash
# 限制并发任务数量
npx turbo dev --concurrency=2
```

访问地址:
- 前端应用: http://localhost:3000
- 后端API: http://localhost:3001/api

### 构建项目
```bash
pnpm build
```

### 代码格式化
```bash
pnpm format
```

### 代码检查和修复
```bash
pnpm check
```

### 类型检查
```bash
pnpm type-check
```

## 📁 项目结构

```
banyan/
├── apps/                    # 应用目录
│   ├── web/                # 前端Web应用
│   │   ├── src/            # 源代码
│   │   │   ├── components/ # 组件目录
│   │   │   │   ├── auth/   # 认证相关组件
│   │   │   │   ├── layout/ # 布局组件
│   │   │   │   └── ui/     # UI基础组件
│   │   │   ├── pages/      # 页面组件 (Dashboard, Login, Register, Profile)
│   │   │   ├── services/   # API服务层
│   │   │   ├── stores/     # Zustand状态管理
│   │   │   ├── types/      # TypeScript类型定义
│   │   │   ├── utils/      # 工具函数
│   │   │   ├── styles/     # SCSS样式文件
│   │   │   ├── router/     # 路由配置
│   │   │   ├── App.tsx     # 主应用组件
│   │   │   └── main.tsx    # 应用入口
│   │   ├── index.html      # HTML模板
│   │   ├── package.json    # 应用依赖配置
│   │   ├── vite.config.ts  # Vite配置
│   │   ├── tailwind.config.js # Tailwind CSS配置
│   │   └── tsconfig.json   # TypeScript配置
│   └── backend/            # NestJS后端应用
│       ├── src/            # 源代码
│       │   ├── auth/       # 认证模块
│       │   ├── user/       # 用户模块
│       │   ├── config/     # 配置服务
│       │   ├── app.module.ts    # 应用模块
│       │   ├── app.controller.ts # 应用控制器
│       │   ├── app.service.ts   # 应用服务
│       │   └── main.ts     # 应用入口
│       ├── .env.example    # 环境变量示例
│       ├── config.yaml     # 应用配置文件
│       ├── package.json    # 后端依赖配置
│       ├── tsconfig.json   # TypeScript配置
│       └── nest-cli.json   # NestJS CLI配置
├── sql/                    # 数据库脚本
├── packages/               # 共享包目录
├── .turbo/                 # Turborepo缓存
├── biome.json             # Biome配置
├── package.json           # 根项目配置
├── pnpm-workspace.yaml    # pnpm workspace配置
├── turbo.json             # Turborepo配置
└── pnpm-lock.yaml         # 依赖锁定文件
```

## 🛠️ 技术栈

### 前端技术
- **前端框架**: React 18.2.0
- **路由**: React Router DOM 6.30.1
- **状态管理**: Zustand 4.4.0
- **HTTP客户端**: Axios 1.6.0
- **UI框架**: Tailwind CSS 3.3.0
- **样式预处理**: SCSS (Sass 1.69.0)
- **工具库**: clsx 2.1.1, tailwind-merge 3.3.1
- **构建工具**: Vite 4.2.0
- **语言**: TypeScript 5.0.4

### 后端技术
- **后端框架**: NestJS 9.4.3
- **认证**: JWT (@nestjs/jwt 11.0.0, Passport)
- **密码加密**: bcrypt 6.0.0
- **数据库ORM**: TypeORM 0.3.17
- **数据库**: MySQL 8.0+ (mysql2 3.6.0)
- **验证**: class-validator 0.14.2 + class-transformer 0.5.1
- **配置管理**: @nestjs/config 2.3.4 + js-yaml 4.1.0

### 开发工具
- **代码质量**: Biome 1.4.1
- **Monorepo**: Turborepo 1.10.16
- **包管理**: pnpm 8.15.0
- **测试框架**: Jest 29.5.0

## 📋 可用脚本

### 基础命令
| 命令 | 描述 |
|------|------|
| `pnpm dev` | 使用 Turbo 同时启动前端和后端开发服务器 |
| `pnpm dev:web` | 仅启动前端开发服务器 |
| `pnpm dev:backend` | 仅启动后端开发服务器 |
| `pnpm start:backend` | 启动后端生产服务器 |
| `pnpm build` | 构建生产版本 |
| `pnpm lint` | 运行代码检查 |
| `pnpm format` | 格式化代码 |
| `pnpm check` | 检查并修复代码问题 |
| `pnpm type-check` | TypeScript类型检查 |

### Turbo 专用命令
| 命令 | 描述 |
|------|------|
| `npx turbo dev` | 并行启动所有应用的开发服务器 |
| `npx turbo build` | 并行构建所有应用 |
| `npx turbo dev --filter=web` | 仅启动前端应用 |
| `npx turbo dev --filter=backend` | 仅启动后端应用 |
| `npx turbo dev --graph` | 显示任务执行依赖图 |
| `npx turbo dev --force` | 强制重新运行，忽略缓存 |
| `npx turbo dev --concurrency=N` | 限制并发任务数量 |
| `npx turbo prune --scope=web` | 创建应用的精简副本 |

## 🔧 开发环境要求

- Node.js >= 18.12.0
- pnpm >= 8.15.0
- MySQL >= 8.0 (用于数据存储)

## 🔐 认证系统

系统内置完整的用户认证功能：

### 功能特性
- **用户注册**: 支持邮箱注册，密码加密存储
- **用户登录**: JWT Token认证，支持记住登录状态
- **个人资料**: 用户信息管理和编辑
- **路由保护**: 基于认证状态的页面访问控制
- **自动登录**: Token自动续期和状态持久化

### 可用页面
- **登录页面** (`/login`): 用户登录界面
- **注册页面** (`/register`): 新用户注册界面
- **仪表盘** (`/dashboard`): 主要工作台 (需要登录)
- **个人中心** (`/profile`): 用户资料管理 (需要登录)

### API端点
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录
- `GET /api/auth/profile` - 获取用户信息
- `POST /api/auth/logout` - 用户登出

## 📝 开发指南

1. **添加新页面**: 在 `apps/web/src/pages/` 目录下创建新的页面组件
2. **路由配置**: 在 `apps/web/src/router/index.tsx` 中添加新的路由规则
3. **认证保护**: 使用 `ProtectedRoute` 组件包装需要登录的页面
4. **状态管理**: 使用 `useAuthStore` Hook 管理用户认证状态
5. **API调用**: 使用 `authService` 处理认证相关的API请求
6. **样式开发**: 使用 Tailwind CSS 类名 + SCSS 变量进行样式开发
7. **共享组件**: 在 `apps/web/src/components/ui/` 目录下创建可复用组件
8. **代码规范**: 项目使用 Biome 进行代码格式化，请在提交前运行 `pnpm check`

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

---

**榕树ERP系统** - 构建现代化、可扩展的企业资源规划解决方案