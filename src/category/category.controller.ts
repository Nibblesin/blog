import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Query,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { GetCategoryDto } from './dto/get-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly CategoryService: CategoryService) {}

  @Post()
  addCategory(@Body() category: CreateCategoryDto) {
    return this.CategoryService.insertCategory(category);
  }

  @Get()
  getAllCategories() {
    return this.CategoryService.getCategories();
  }

  @Get(':id')
  getCategory(@Param('id') id: string) {
    return this.CategoryService.getSingleCategory(id);
  }

  @Patch(':id')
  updateCategory(
    @Param('id') id: string,
    @Body() category: CreateCategoryDto,
  ): Promise<GetCategoryDto> {
    return this.CategoryService.updateCategory(id, category);
  }

  @Delete(':id')
  deleteCategory(@Param('id') id: string): Promise<GetCategoryDto> {
    return this.CategoryService.deleteCategory(id);
  }
}
