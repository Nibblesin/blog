import { Injectable, NotFoundException } from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { GetCategoryDto } from './dto/get-category.dto';

@Injectable()
export class CategoryService {
  private categories: Category[] = [];

  constructor(private readonly prisma: PrismaService) {}

  async insertCategory(category: CreateCategoryDto): Promise<GetCategoryDto> {
    return this.prisma.category.create({
      data: category,
    });
  }

  async getCategories(): Promise<GetCategoryDto[]> {
    return this.prisma.category.findMany();
  }

  async getSingleCategory(id: string): Promise<GetCategoryDto> {
    const category = await this.prisma.category.findUnique({
      where: {
        id: id,
      },
    });
    if (!category) {
      throw new NotFoundException('Could not find category');
    }
    return category;
  }

  async updateCategory(
    id: string,
    category: CreateCategoryDto,
  ): Promise<GetCategoryDto> {
    return this.prisma.category.update({
      where: {
        id: id,
      },
      data: category,
    });
  }

  async deleteCategory(id: string): Promise<GetCategoryDto> {
    return this.prisma.category.delete({
      where: {
        id: id,
      },
    });
  }
}
