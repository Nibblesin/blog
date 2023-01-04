import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: { username: string; password: string }) {
    // find the user with the username
    const foundUser = await this.prisma.user.findUnique({
      where: {
        username: user.username,
      },
    });

    if (foundUser === null) {
      throw new UnauthorizedException('Invalid username');
    }

    // compare the password
    if (foundUser.password !== user.password) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = { username: foundUser.username, sub: foundUser.id };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: 3600 }),
    };
  }
}
