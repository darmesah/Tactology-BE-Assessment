import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateSubDepartmentInput } from './create-sub-department.input';
import { IsInt, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

@InputType()
export class UpdateSubDepartmentInput extends PartialType(
  CreateSubDepartmentInput,
) {
  @Field()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @IsInt()
  subDepartmentId: number;
}
