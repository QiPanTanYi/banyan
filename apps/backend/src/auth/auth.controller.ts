import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Public } from '../decorators/public.decorator';
import { RegisterDto, LoginDto, RefreshTokenDto, AuthResponseDto, UserProfileDto } from '../dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * 用户注册
   */
  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body(ValidationPipe) registerDto: RegisterDto,
  ): Promise<{ code: number; message: string; data: AuthResponseDto }> {
    const result = await this.authService.register(registerDto);
    return {
      code: 200,
      message: '注册成功',
      data: result,
    };
  }

  /**
   * 用户登录
   */
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Request() req,
  ): Promise<{ code: number; message: string; data: AuthResponseDto }> {
    const result = await this.authService.login(req.user);
    return {
      code: 200,
      message: '登录成功',
      data: result,
    };
  }

  /**
   * 获取用户资料
   */
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(
    @Request() req,
  ): Promise<{ code: number; message: string; data: UserProfileDto }> {
    const result = await this.authService.getProfile(req.user.id);
    return {
      code: 200,
      message: '获取用户资料成功',
      data: result,
    };
  }

  /**
   * 刷新token
   */
  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(
    @Body(ValidationPipe) refreshTokenDto: RefreshTokenDto,
  ): Promise<{ code: number; message: string; data: AuthResponseDto }> {
    const result = await this.authService.refreshToken(refreshTokenDto.refresh_token);
    return {
      code: 200,
      message: 'Token刷新成功',
      data: result,
    };
  }

  /**
   * 用户登出
   */
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @Request() req,
  ): Promise<{ code: number; message: string; data: { message: string } }> {
    const result = await this.authService.logout(req.user.id);
    return {
      code: 200,
      message: '登出成功',
      data: result,
    };
  }
}