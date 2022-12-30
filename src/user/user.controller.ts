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
  
  import { CreateUserDto } from './dto/create-user.dto';
  import { GetUserDto } from './dto/get-user.dto';
  import { UserService } from './user.service';
  
  @Controller('user')
  export class UserController {
    constructor(private readonly userService: UserService) {}
  
    @Post()
    addUser(@Body() user: CreateUserDto) {
      return this.userService.insertUser(user);
    }
    @Get()
    getAllUsers(@Query('page') page: string, @Query('per') per: string) {
      return this.userService.getUsers(parseInt(page), parseInt(per));
    }
  
    @Get(':id')
    getUser(@Param('id') userId: string): Promise<GetUserDto> {
      return this.userService.getSingeruser({ id: userId });
    }
  
    @Patch(':id')
    updateUser(
      @Param('id') userId: string,
      @Body() user: CreateUserDto,
    ): Promise<GetUserDto> {
      return this.userService.updateUser(userId, user);
    }
  
    @Delete(':id')
    removeUser(@Param('id') userId: string): Promise<GetUserDto> {
      return this.userService.deleteUser(userId);
    }
  }