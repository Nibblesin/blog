import { Injectable, NotFoundException } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { GetPostDto, PaginatedDto } from './dto/get-post.dto';

@Injectable()
export class PostService {
  private posts: Post[] = [];

  constructor(private readonly prisma: PrismaService) {}

  insertPost(post: CreatePostDto): Promise<GetPostDto> {
    return this.prisma.post.create({
      data: post,
    });
  }

  async getPosts(page: number, per: number): Promise<PaginatedDto<GetPostDto>> {
    const items = await this.prisma.post.findMany({
      skip: (page - 1) * per,
      take: per,
    });
    const count = await this.prisma.post.count();
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

  async getSingerpost(
    postId: Prisma.PostWhereUniqueInput,
  ): Promise<GetPostDto> {
    try {
      const post = await this.prisma.post.findUnique({
        where: postId,
      });
      return post;
    } catch (error) {
      throw new NotFoundException('Could not find post.');
    }
  }

  async updatePost(postId: string, post: CreatePostDto): Promise<GetPostDto> {
    try {
      const updatedPost = await this.prisma.post.update({
        where: {
          id: postId,
        },
        data: post,
      });
      return updatedPost;
    } catch (error) {
      throw new NotFoundException('Could not find post.');
    }
  }

  async deletePost(postId: string): Promise<GetPostDto> {
    try {
      const deletedPost = await this.prisma.post.delete({
        where: {
          id: postId,
        },
      });
      return deletedPost;
    } catch (error) {
      throw new NotFoundException('Could not find post.');
    }
  }
}
