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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Public } from '../decorators/public.decorator';
import { RegisterDto, LoginDto, RefreshTokenDto, AuthResponseDto, UserProfileDto } from '../dto/auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * 用户注册
   */
  @ApiOperation({ summary: '用户注册', description: '创建新用户账户' })
  @ApiCreatedResponse({ description: '注册成功', type: AuthResponseDto })
  @ApiBadRequestResponse({ description: '请求参数错误' })
  @ApiBody({ type: RegisterDto })
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
  @ApiOperation({ summary: '用户登录', description: '用户账户登录验证' })
  @ApiOkResponse({ description: '登录成功', type: AuthResponseDto })
  @ApiUnauthorizedResponse({ description: '用户名或密码错误' })
  @ApiBadRequestResponse({ description: '请求参数错误' })
  @ApiBody({ type: LoginDto })
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
  @ApiOperation({ summary: '获取用户资料', description: '获取当前登录用户的详细信息' })
  @ApiOkResponse({ description: '获取成功', type: UserProfileDto })
  @ApiUnauthorizedResponse({ description: '未授权访问' })
  @ApiBearerAuth('JWT-auth')
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
  @ApiOperation({ summary: '刷新访问令牌', description: '使用刷新令牌获取新的访问令牌' })
  @ApiOkResponse({ description: '刷新成功', type: AuthResponseDto })
  @ApiUnauthorizedResponse({ description: '刷新令牌无效或已过期' })
  @ApiBadRequestResponse({ description: '请求参数错误' })
  @ApiBody({ type: RefreshTokenDto })
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
  @ApiOperation({ summary: '用户登出', description: '用户退出登录，使令牌失效' })
  @ApiOkResponse({ description: '登出成功' })
  @ApiUnauthorizedResponse({ description: '未授权访问' })
  @ApiBearerAuth('JWT-auth')
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