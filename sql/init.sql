-- 榕树ERP系统数据库初始化脚本
-- Banyan ERP System Database Initialization Script

-- 创建数据库
CREATE DATABASE IF NOT EXISTS `banyan` 
DEFAULT CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- 使用数据库
USE `banyan`;

-- 创建用户表
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `username` varchar(50) NOT NULL COMMENT '用户名',
  `password` varchar(255) NOT NULL COMMENT '密码（加密后）',
  `phone` varchar(20) DEFAULT NULL COMMENT '手机号码',
  `email` varchar(100) DEFAULT NULL COMMENT '邮箱地址',
  `login_time` datetime DEFAULT NULL COMMENT '最后登录时间',
  `logout_time` datetime DEFAULT NULL COMMENT '最后退出时间',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `status` tinyint(1) DEFAULT 1 COMMENT '用户状态：1-正常，0-禁用',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_username` (`username`),
  UNIQUE KEY `uk_email` (`email`),
  KEY `idx_phone` (`phone`),
  KEY `idx_login_time` (`login_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户表';

-- 插入默认管理员用户（密码为123456的MD5加密）
INSERT INTO `user` (`username`, `password`, `phone`, `email`, `status`) VALUES
('admin', 'e10adc3949ba59abbe56e057f20f883e', '13800138000', 'admin@banyan.com', 1)
ON DUPLICATE KEY UPDATE `username` = `username`;

-- 创建索引以优化查询性能
CREATE INDEX IF NOT EXISTS `idx_user_status` ON `user` (`status`);
CREATE INDEX IF NOT EXISTS `idx_user_created_at` ON `user` (`created_at`);

-- 显示创建结果
SELECT 'Database and tables created successfully!' as message;