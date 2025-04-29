import { Field, InputType } from '@nestjs/graphql';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  MinLength,
} from 'class-validator';

@InputType()
export class UpdateDepartmentInput {
  @Field()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @IsInt()
  id: number;

  @Field()
  @IsNotEmpty()
  @MinLength(2)
  name: string;
}
