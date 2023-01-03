import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { GetPostDto, PaginatedDto } from './dto/get-post.dto';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postsService: PostService) {}

  @Post()
  //@Query('category') category: string,
  addPost(@Body() post: CreatePostDto) {
    return this.postsService.insertPost(post);
  }

  @Get()
  getAllPosts(
    @Query('page') page: string = '1',
    @Query('per') per: string = '10',
    @Query('category') category: string[] | undefined,
    @Query('author') author: string | undefined,
  ): Promise<PaginatedDto<GetPostDto>> {
    return this.postsService.getPosts(
      parseInt(page),
      parseInt(per),
      category,
      author,
    );
  }

  @Get(':id')
  getPost(@Param('id') prodId: string) {
    return this.postsService.getSinglePost(prodId);
  }

  @Patch(':id')
  updatePost(
    @Param('id') prodId: string,
    @Body() post: GetPostDto,
  ): Promise<GetPostDto> {
    return this.postsService.updatePost(prodId, post);
  }

  @Delete(':id')
  removePost(@Param('id') prodId: string): Promise<GetPostDto> {
    return this.postsService.deletePost(prodId);
  }
}
