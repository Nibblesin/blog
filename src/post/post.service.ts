import { Get, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { GetPostDto, PaginatedDto } from './dto/get-post.dto';
import { Post, Prisma, Category } from '@prisma/client';

@Injectable()
export class PostService {
  //make sure only service can interact with posts through methods
  private posts: Post[] = [];

  constructor(private readonly prisma: PrismaService) {}

  async insertPost(post: CreatePostDto, user: string): Promise<GetPostDto> {
    return this.prisma.post.create({
      data: {
        ...post,
        author: {
          connect: {
            id: user,
          },
        },
      },
    });
  }

  async getPosts(
    page: number,
    per: number,
    sel_category: string[] | undefined,
    sel_author: string | undefined,
  ): Promise<PaginatedDto<GetPostDto>> {
    //let is variable
    let items;
    let count;

    if (sel_category && sel_author) {
      // find items by categories and author
      items = await this.prisma.post.findMany({
        where: {
          categoryId: {
            hasSome: sel_category,
          },
          authorId: sel_author,
        },
        skip: (page - 1) * per,
        take: per,
      });
    } else if (sel_category) {
      // find items by categories
      items = await this.prisma.post.findMany({
        where: {
          categoryId: {
            hasSome: sel_category,
          },
        },
        skip: (page - 1) * per,
        take: per,
      });
    } else if (sel_author) {
      // find items by author
      items = await this.prisma.post.findMany({
        where: {
          authorId: sel_author,
        },
        skip: (page - 1) * per,
        take: per,
      });
    } else {
      // returns all items
      items = await this.prisma.post.findMany({
        skip: (page - 1) * per,
        take: per,
      });
    }

    if (sel_category && sel_author) {
      // find items by categories and author
      count = await this.prisma.post.count({
        where: {
          categoryId: {
            hasSome: sel_category,
          },
          authorId: sel_author,
        },
      });
    } else if (sel_category) {
      // find count by categories
      count = await this.prisma.post.count({
        where: {
          categoryId: {
            hasSome: sel_category,
          },
        },
      });
    } else if (sel_author) {
      // find count by author
      count = await this.prisma.post.count({
        where: {
          authorId: sel_author,
        },
      });
    } else {
      // returns all count
      count = await this.prisma.post.count();
    }

    const metadata = {
      total: count,
      totalPage: Math.ceil(count / per),
      page: page,
      per: per,
    };
    return {
      items,
      // items: items,
      metadata,
      // metadata: metadata,
    };
  }

  getSinglePost(postId: string): Promise<GetPostDto> {
    return this.prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
  }

  // return authorId
  getAuthorId(postId: string): Promise<{ authorId: string }> {
    return this.prisma.post.findUnique({
      where: {
        id: postId,
      },
      select: {
        authorId: true,
      },
    });
  }

  updatePost(postId: string, post: CreatePostDto): Promise<GetPostDto> {
    return this.prisma.post.update({
      where: {
        id: postId,
      },
      data: post,
    });
  }

  deletePost(postId: string): Promise<GetPostDto> {
    return this.prisma.post.delete({
      where: {
        id: postId,
      },
    });
  }
}
