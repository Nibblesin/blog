import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  providers: [UserService, PrismaService, AuthService, JwtService],
  controllers: [UserController],
  imports: [UserModule],
})
export class UserModule {}
