import { Injectable, ConflictException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../entities/user.entity';
import { RegisterDto, LoginDto, AuthResponseDto, UserProfileDto } from '../dto/auth.dto';
import { CryptoUtil } from '../utils/crypto.util';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  /**
   * 用户注册
   */
  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    const { username, password, email, phone } = registerDto;

    // 检查用户名是否已存在
    const existingUser = await this.userRepository.findOne({
      where: { username },
    });
    if (existingUser) {
      throw new ConflictException('用户名已存在');
    }

    // 检查邮箱是否已存在
    if (email) {
      const existingEmail = await this.userRepository.findOne({
        where: { email },
      });
      if (existingEmail) {
        throw new ConflictException('邮箱已被注册');
      }
    }

    // 加密密码
    const hashedPassword = await CryptoUtil.hashPassword(password);

    // 创建用户
    const user = this.userRepository.create({
      username,
      password: hashedPassword,
      email,
      phone,
      status: 1,
    });

    const savedUser = await this.userRepository.save(user);

    // 生成JWT token
    return this.generateTokens(savedUser);
  }

  /**
   * 用户登录
   */
  async login(user: User): Promise<AuthResponseDto> {
    // 更新最后登录时间
    await this.userRepository.update(user.id, {
      login_time: new Date(),
    });

    return this.generateTokens(user);
  }

  /**
   * 验证用户凭据
   */
  async validateUser(username: string, password: string): Promise<User | null> {
    // 支持用户名、邮箱或手机号码登录
    const user = await this.userRepository.findOne({
      where: [
        { username, status: 1 },
        { email: username, status: 1 },
        { phone: username, status: 1 }
      ],
    });

    if (user && await CryptoUtil.comparePassword(password, user.password)) {
      return user;
    }

    return null;
  }

  /**
   * 根据ID验证用户
   */
  async validateUserById(userId: number): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { id: userId, status: 1 },
    });

    return user;
  }

  /**
   * 获取用户资料
   */
  async getProfile(userId: number): Promise<UserProfileDto> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: ['id', 'username', 'email', 'phone', 'login_time', 'created_at', 'status'],
    });

    if (!user) {
      throw new NotFoundException('用户不存在');
    }

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      login_time: user.login_time,
      created_at: user.created_at,
      status: user.status,
    };
  }

  /**
   * 刷新token
   */
  async refreshToken(refreshToken: string): Promise<AuthResponseDto> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET', 'banyan-refresh-secret-key'),
      });

      const user = await this.validateUserById(payload.sub);
      if (!user) {
        throw new UnauthorizedException('用户不存在或已被禁用');
      }

      return this.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedException('refresh token无效或已过期');
    }
  }

  /**
   * 用户登出
   */
  async logout(userId: number): Promise<{ message: string }> {
    await this.userRepository.update(userId, {
      logout_time: new Date(),
    });

    return { message: '登出成功' };
  }

  /**
   * 生成JWT tokens
   */
  private async generateTokens(user: User): Promise<AuthResponseDto> {
    const payload = { sub: user.id, username: user.username };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET', 'banyan-jwt-secret-key'),
      expiresIn: this.configService.get<string>('JWT_EXPIRES_IN', '15m'),
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET', 'banyan-refresh-secret-key'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN', '7d'),
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: 15 * 60, // 15分钟，单位秒
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        status: user.status,
      },
    };
  }
}