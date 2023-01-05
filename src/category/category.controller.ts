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
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('category')
@ApiTags('Category')
export class CategoryController {
  constructor(private readonly CategoryService: CategoryService) {}

  @Post()
  @ApiOkResponse({ description: 'Insert category.' })
  addCategory(@Body() category: CreateCategoryDto) {
    return this.CategoryService.insertCategory(category);
  }

  @Get()
  @ApiOkResponse({ description: 'Get all categories.' })
  getAllCategories() {
    return this.CategoryService.getCategories();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Get category by id.' })
  getCategory(@Param('id') id: string) {
    return this.CategoryService.getSingleCategory(id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Update category by id.' })
  updateCategory(
    @Param('id') id: string,
    @Body() category: CreateCategoryDto,
  ): Promise<GetCategoryDto> {
    return this.CategoryService.updateCategory(id, category);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Delete category by id.' })
  deleteCategory(@Param('id') id: string): Promise<GetCategoryDto> {
    return this.CategoryService.deleteCategory(id);
  }
}
