import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { ApiOkResponse, ApiProperty, ApiResponse } from '@nestjs/swagger';

class AuthenticationPostDto {
  @ApiProperty({
    description: 'Username',
    type: String,
  })
  username: string;
  @ApiProperty({
    description: 'Password',
    type: String,
  })
  password: string;
}

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Post('auth/login')
  @ApiOkResponse({ description: 'Login successful' })
  async login(@Body() body: AuthenticationPostDto) {
    console.log(body);
    return this.authService.login(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
