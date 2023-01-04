import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserService } from './user/user.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [UserModule, PostModule, CategoryModule, AuthModule, JwtModule],
  controllers: [AppController],
  providers: [AppService, UserService, JwtService, PrismaService],
})
export class AppModule {}
