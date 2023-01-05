import { ApiProperty } from '@nestjs/swagger';
import { Post } from '@prisma/client';

export class GetPostDto implements Post {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  published: boolean;

  @ApiProperty({
    description: 'The author of the post',
    type: String,
  })
  authorId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  categoryId: string[];
}

export interface PaginatedDto<T> {
  items: T[];
  metadata: {
    total: number;
    totalPage: number;
    page: number;
    per: number;
  };
}
