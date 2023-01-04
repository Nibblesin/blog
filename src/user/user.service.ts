import { Delete, Injectable, NotFoundException } from '@nestjs/common';
import { GetUserDto } from './dto/get-user.dto';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Prisma, User } from '@prisma/client';
import { PaginatedDto } from './dto/get-user.dto';

@Injectable()
export class UserService {
  private users: User[] = [];

  constructor(private readonly prisma: PrismaService) {}

  insertUser(user: CreateUserDto): Promise<GetUserDto> {
    return this.prisma.user.create({
      data: user,
    });
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.name === username);
  }

  async getUsers(page: number, per: number): Promise<PaginatedDto<GetUserDto>> {
    const items = await this.prisma.user.findMany({
      skip: (page - 1) * per,
      take: per,
    });
    const count = await this.prisma.user.count();
    const metadata = {
      total: count,
      totalPage: Math.ceil(count / per),
      page: page,
      per: per,
    };
    return {
      items,
      metadata,
    };
  }

  async getSingeruser(
    userId: Prisma.UserWhereUniqueInput,
  ): Promise<GetUserDto> {
    try {
      const user = await this.prisma.user.findUnique({
        where: userId,
      });
      return user;
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }
  }

  async updateUser(userId: string, user: CreateUserDto): Promise<GetUserDto> {
    try {
      const updatedUser = await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: user,
      });
      return updatedUser;
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }
  }

  async deleteUser(userId: string): Promise<GetUserDto> {
    try {
      const user = await this.prisma.user.delete({
        where: {
          id: userId,
        },
      });
      return user;
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }
  }
}
