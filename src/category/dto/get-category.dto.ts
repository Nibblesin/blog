import { Category } from '@prisma/client';

export class GetCategoryDto implements Category {
  id: string;
  name: string;
  postId: string[];
}
