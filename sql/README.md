# 数据库SQL文件说明

## 文件说明

### init.sql
数据库初始化脚本，包含：
- 创建 `banyan` 数据库
- 创建 `user` 用户表
- 插入默认管理员账户

## 使用方法

### 1. 通过MySQL命令行执行
```bash
mysql -u root -p < sql/init.sql
```

### 2. 通过MySQL客户端工具
将 `init.sql` 文件内容复制到MySQL客户端工具中执行

### 3. 通过phpMyAdmin等Web管理工具
导入 `init.sql` 文件

## 默认账户信息

- **用户名**: admin
- **密码**: 123456
- **邮箱**: admin@banyan.com
- **手机**: 13800138000

## 用户表结构

| 字段名 | 类型 | 说明 |
|--------|------|------|
| id | int(11) | 用户ID（主键，自增） |
| username | varchar(50) | 用户名（唯一） |
| password | varchar(255) | 密码（MD5加密） |
| phone | varchar(20) | 手机号码 |
| email | varchar(100) | 邮箱地址（唯一） |
| login_time | datetime | 最后登录时间 |
| logout_time | datetime | 最后退出时间 |
| created_at | datetime | 创建时间 |
| updated_at | datetime | 更新时间 |
| status | tinyint(1) | 用户状态（1-正常，0-禁用） |

## 注意事项

1. 执行前请确保MySQL服务已启动
2. 确保有足够的权限创建数据库和表
3. 默认密码已进行MD5加密，实际使用时建议使用更安全的加密方式
4. 建议在生产环境中修改默认管理员密码