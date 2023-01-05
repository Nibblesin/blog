import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Insert users.' })
  @Post()
  addUser(@Body() user: CreateUserDto) {
    return this.userService.insertUser(user);
  }

  @Get()
  @ApiOkResponse({ description: 'Get all users.' })
  getAllUsers(@Query('page') page: string, @Query('per') per: string) {
    return this.userService.getUsers(parseInt(page), parseInt(per));
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Get user by id.' })
  getUser(@Param('id') userId: string): Promise<GetUserDto> {
    return this.userService.getSingeruser({ id: userId });
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Update user by id.' })
  updateUser(
    @Param('id') userId: string,
    @Body() user: CreateUserDto,
  ): Promise<GetUserDto> {
    return this.userService.updateUser(userId, user);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Delete user by id.' })
  removeUser(@Param('id') userId: string): Promise<GetUserDto> {
    return this.userService.deleteUser(userId);
  }
}
