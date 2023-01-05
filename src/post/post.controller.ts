import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PostService } from './post.service';
import { GetPostDto, PaginatedDto } from './dto/get-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { ApiTags } from '@nestjs/swagger';

interface RequestWithUser extends Request {
  user: {
    userId: string;
  };
}

@Controller('post')
@ApiTags('Post')
export class PostController {
  constructor(private readonly postsService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Post created' })
  @Post()
  addPost(@Body() post: CreatePostDto, @Req() req: RequestWithUser) {
    console.log(req.user);
    return this.postsService.insertPost(post, req.user.userId);
  }

  @Get()
  @ApiOkResponse({ description: 'Get all posts.' })
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
  @ApiOkResponse({ description: 'Get post by id.' })
  getPost(@Param('id') prodId: string) {
    return this.postsService.getSinglePost(prodId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Update post by id.(only for author)' })
  @Patch(':id')
  async updatePost(
    @Param('id') prodId: string,
    @Body() post: GetPostDto,
    @Req() req: RequestWithUser,
  ): Promise<GetPostDto> {
    // if user is admin or author of post then update
    const author = await this.postsService.getAuthorId(prodId);
    if (req.user.userId === author.authorId || req.user.userId === 'admin') {
      return this.postsService.updatePost(prodId, post);
    } else {
      throw new Error('Unauthorized');
    }
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Delete post by id.' })
  async removePost(
    @Param('id') prodId: string,
    @Req() req: RequestWithUser,
  ): Promise<GetPostDto> {
    const author = await this.postsService.getAuthorId(prodId);
    if (req.user.userId === author.authorId || req.user.userId === 'admin') {
      return this.postsService.deletePost(prodId);
    } else {
      throw new Error('Unauthorized');
    }
  }
}
