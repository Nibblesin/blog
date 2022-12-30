import { User } from '@prisma/client';

export class GetUserDto implements User {
  email: string;
  id: string;
  name: string;
  //   post: any;
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
