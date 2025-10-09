# TSDoc 使用指南

本项目已配置 TSDoc 支持，用于生成高质量的 TypeScript 代码文档。

## 快速开始

### 生成文档

```bash
# 构建文档
pnpm docs:build

# 构建并启动文档服务器
pnpm docs:serve

# 清理生成的文档
pnpm docs:clean
```

### 访问文档

运行 `pnpm docs:serve` 后，在浏览器中访问 `http://localhost:8080` 查看生成的文档。

## TSDoc 注释语法

### 基本函数注释

```typescript
/**
 * 计算两个数字的和
 * 
 * @param a - 第一个数字
 * @param b - 第二个数字
 * @returns 两个数字的和
 * 
 * @example
 * ```typescript
 * const result = add(5, 3);
 * console.log(result); // 输出: 8
 * ```
 */
function add(a: number, b: number): number {
  return a + b;
}
```

### React 组件注释

```typescript
/**
 * 用户信息卡片组件
 * 
 * @remarks
 * 这个组件用于显示用户的基本信息，包括头像、姓名和邮箱。
 * 
 * @param props - 组件属性
 * @param props.user - 用户信息对象
 * @param props.showEmail - 是否显示邮箱地址
 * 
 * @example
 * ```tsx
 * <UserCard 
 *   user={{ name: "张三", email: "zhangsan@example.com" }}
 *   showEmail={true}
 * />
 * ```
 * 
 * @public
 */
export interface UserCardProps {
  /** 用户信息 */
  user: {
    /** 用户姓名 */
    name: string;
    /** 用户邮箱 */
    email: string;
  };
  /** 是否显示邮箱 */
  showEmail?: boolean;
}

/**
 * @see {@link UserCardProps} 查看组件属性定义
 */
export const UserCard: React.FC<UserCardProps> = ({ user, showEmail = false }) => {
  // 组件实现
};
```

### 自定义 Hook 注释

```typescript
/**
 * 用于管理用户状态的自定义 Hook
 * 
 * @param initialUser - 初始用户信息
 * @returns 包含用户状态和更新函数的对象
 * 
 * @example
 * ```typescript
 * const { user, updateUser, isLoading } = useUser({
 *   name: "默认用户",
 *   email: "default@example.com"
 * });
 * ```
 * 
 * @beta 此 Hook 仍在开发中，API 可能会发生变化
 */
export function useUser(initialUser: User) {
  // Hook 实现
}
```

### 工具函数注释

```typescript
/**
 * 格式化日期字符串
 * 
 * @param date - 要格式化的日期
 * @param format - 日期格式，默认为 'YYYY-MM-DD'
 * @returns 格式化后的日期字符串
 * 
 * @throws {@link Error} 当日期格式无效时抛出错误
 * 
 * @example
 * 基本使用：
 * ```typescript
 * const formatted = formatDate(new Date(), 'YYYY-MM-DD');
 * console.log(formatted); // "2024-01-15"
 * ```
 * 
 * @example
 * 自定义格式：
 * ```typescript
 * const formatted = formatDate(new Date(), 'MM/DD/YYYY');
 * console.log(formatted); // "01/15/2024"
 * ```
 * 
 * @since 1.0.0
 */
export function formatDate(date: Date, format: string = 'YYYY-MM-DD'): string {
  // 实现
}
```

## 常用 TSDoc 标签

### 核心标签

- `@param` - 描述函数参数
- `@returns` - 描述返回值
- `@throws` - 描述可能抛出的异常
- `@example` - 提供使用示例
- `@remarks` - 详细说明
- `@see` - 引用相关内容

### 可见性标签

- `@public` - 公共 API
- `@internal` - 内部使用
- `@alpha` - Alpha 版本 API
- `@beta` - Beta 版本 API
- `@deprecated` - 已废弃的 API

### 其他标签

- `@since` - 版本信息
- `@override` - 重写父类方法
- `@virtual` - 虚拟方法
- `@sealed` - 密封类

## 最佳实践

### 1. 为所有公共 API 编写文档

```typescript
// ✅ 好的做法
/**
 * 用户服务类，提供用户相关的操作方法
 * @public
 */
export class UserService {
  /**
   * 根据 ID 获取用户信息
   * @param id - 用户 ID
   * @returns 用户信息的 Promise
   */
  async getUserById(id: string): Promise<User> {
    // 实现
  }
}

// ❌ 避免的做法
export class UserService {
  async getUserById(id: string): Promise<User> {
    // 没有文档注释
  }
}
```

### 2. 提供有意义的示例

```typescript
/**
 * 验证邮箱地址格式
 * 
 * @param email - 要验证的邮箱地址
 * @returns 如果邮箱格式正确返回 true，否则返回 false
 * 
 * @example
 * 有效的邮箱：
 * ```typescript
 * validateEmail("user@example.com"); // true
 * validateEmail("test.email+tag@domain.co.uk"); // true
 * ```
 * 
 * @example
 * 无效的邮箱：
 * ```typescript
 * validateEmail("invalid-email"); // false
 * validateEmail("@domain.com"); // false
 * validateEmail("user@"); // false
 * ```
 */
export function validateEmail(email: string): boolean {
  // 实现
}
```

### 3. 使用类型链接

```typescript
/**
 * 用户配置接口
 */
export interface UserConfig {
  theme: 'light' | 'dark';
  language: string;
}

/**
 * 更新用户配置
 * 
 * @param config - 新的配置对象，参见 {@link UserConfig}
 * @returns 更新后的完整配置
 */
export function updateUserConfig(config: Partial<UserConfig>): UserConfig {
  // 实现
}
```

### 4. 标记 API 状态

```typescript
/**
 * 旧的用户认证方法
 * 
 * @deprecated 请使用 {@link authenticateUserV2} 替代
 * @param credentials - 用户凭据
 */
export function authenticateUser(credentials: any) {
  // 旧实现
}

/**
 * 新的用户认证方法
 * 
 * @param credentials - 用户凭据
 * @since 2.0.0
 * @public
 */
export function authenticateUserV2(credentials: UserCredentials) {
  // 新实现
}
```

## 配置文件说明

### tsdoc.json

项目根目录的 `tsdoc.json` 定义了 TSDoc 的全局配置，包括支持的标签和自定义标签定义。

### typedoc.json

`apps/web/typedoc.json` 配置了 TypeDoc 文档生成器的选项，包括：

- 入口点：`./src`
- 输出目录：`./docs`
- 排除的文件：测试文件、构建文件等
- 验证规则：链接检查、导出检查等

## 故障排除

### 常见问题

1. **文档生成失败**
   - 检查 TypeScript 编译是否成功
   - 确认 `typedoc.json` 配置正确
   - 查看控制台错误信息

2. **链接无法解析**
   - 确保被引用的符号已正确导出
   - 检查 `@link` 标签的语法

3. **示例代码高亮异常**
   - 确认代码块的语言标识符正确
   - 检查代码语法是否有误

### 获取帮助

- [TSDoc 官方文档](https://tsdoc.org/)
- [TypeDoc 官方文档](https://typedoc.org/)
- [TSDoc 标签参考](https://tsdoc.org/pages/tags/)

---

通过遵循这些指南，您可以为项目创建清晰、有用的文档，提高代码的可维护性和团队协作效率。