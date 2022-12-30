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

import { CreatePostDto } from './dto/create-post.dto';
import { GetPostDto } from './dto/get-post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  addPost(@Body() post: CreatePostDto) {
    return this.postService.insertPost(post);
  }
  @Get()
  getAllPosts(
    @Query('page') page: string = '1',
    @Query('per') per: string = '10',
  ) {
    return this.postService.getPosts(parseInt(page), parseInt(per));
  }

  @Get(':id')
  getPost(@Param('id') postId: string): Promise<GetPostDto> {
    return this.postService.getSingerpost({ id: postId });
  }

  @Patch(':id')
  updatePost(
    @Param('id') postId: string,
    @Body() post: CreatePostDto,
  ): Promise<GetPostDto> {
    return this.postService.updatePost(postId, post);
  }

  @Delete(':id')
  removePost(@Param('id') postId: string): Promise<GetPostDto> {
    return this.postService.deletePost(postId);
  }
}
