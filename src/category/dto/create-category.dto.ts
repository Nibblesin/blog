import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'The name of the category',
    type: String,
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Posts in the category',
    type: String,
  })
  @IsNotEmpty()
  postId: string[];
}
