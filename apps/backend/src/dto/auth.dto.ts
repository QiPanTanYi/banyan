import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ description: '用户名', example: 'john_doe', minLength: 3, maxLength: 50 })
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString({ message: '用户名必须是字符串' })
  @MinLength(3, { message: '用户名至少3个字符' })
  @MaxLength(50, { message: '用户名最多50个字符' })
  username: string;

  @ApiProperty({ description: '密码', example: 'password123', minLength: 6, maxLength: 20 })
  @IsNotEmpty({ message: '密码不能为空' })
  @IsString({ message: '密码必须是字符串' })
  @MinLength(6, { message: '密码至少6个字符' })
  @MaxLength(20, { message: '密码最多20个字符' })
  password: string;

  @ApiPropertyOptional({ description: '手机号', example: '13800138000', maxLength: 20 })
  @IsOptional()
  @IsString({ message: '手机号必须是字符串' })
  @MaxLength(20, { message: '手机号最多20个字符' })
  phone?: string;

  @ApiPropertyOptional({ description: '邮箱地址', example: 'john@example.com', maxLength: 100 })
  @IsOptional()
  @IsEmail({}, { message: '邮箱格式不正确' })
  @MaxLength(100, { message: '邮箱最多100个字符' })
  email?: string;
}

export class LoginDto {
  @ApiProperty({ description: '用户名', example: 'john_doe' })
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString({ message: '用户名必须是字符串' })
  username: string;

  @ApiProperty({ description: '密码', example: 'password123' })
  @IsNotEmpty({ message: '密码不能为空' })
  @IsString({ message: '密码必须是字符串' })
  password: string;
}

export class RefreshTokenDto {
  @ApiProperty({ description: '刷新令牌', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  @IsNotEmpty({ message: 'refresh_token不能为空' })
  @IsString({ message: 'refresh_token必须是字符串' })
  refresh_token: string;
}

export class AuthResponseDto {
  @ApiProperty({ description: '访问令牌', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  access_token: string;

  @ApiProperty({ description: '刷新令牌', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  refresh_token: string;

  @ApiProperty({ description: '令牌过期时间（秒）', example: 3600 })
  expires_in: number;

  @ApiProperty({
    description: '用户信息',
    example: {
      id: 1,
      username: 'john_doe',
      email: 'john@example.com',
      phone: '13800138000',
      status: 1
    }
  })
  user: {
    id: number;
    username: string;
    email?: string;
    phone?: string;
    status: number;
  };
}

export class UserProfileDto {
  @ApiProperty({ description: '用户ID', example: 1 })
  id: number;

  @ApiProperty({ description: '用户名', example: 'john_doe' })
  username: string;

  @ApiPropertyOptional({ description: '邮箱地址', example: 'john@example.com' })
  email?: string;

  @ApiPropertyOptional({ description: '手机号', example: '13800138000' })
  phone?: string;

  @ApiPropertyOptional({ description: '最后登录时间', example: '2024-01-01T12:00:00Z' })
  login_time?: Date;

  @ApiProperty({ description: '创建时间', example: '2024-01-01T12:00:00Z' })
  created_at: Date;

  @ApiProperty({ description: '用户状态', example: 1 })
  status: number;
}