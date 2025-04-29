import { Field, InputType } from '@nestjs/graphql';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateSubDepartmentInput {
  @Field()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @IsInt()
  departmentId: number;

  @Field()
  @IsNotEmpty()
  @MinLength(2)
  name: string;
}
