import { Post } from '@prisma/client';

export class GetPostDto implements Post {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
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
