import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SubDepartment } from './entities/sub-department.entity';
import { SubDepartmentService } from './sub-department.service';
import { CreateSubDepartmentInput } from './dto/create-sub-department.input';
import { UpdateSubDepartmentInput } from './dto/update-sub-department.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Resolver(() => SubDepartment)
@UseGuards(JwtAuthGuard)
export class SubDepartmentResolver {
  constructor(private readonly subDepartmentService: SubDepartmentService) {}

  @Mutation(() => SubDepartment)
  createSubDepartment(
    @Args('input') createSubDepartmentInput: CreateSubDepartmentInput,
  ) {
    return this.subDepartmentService.create(createSubDepartmentInput);
  }

  @Query(() => [SubDepartment], { name: 'subDepartments' })
  findAll() {
    return this.subDepartmentService.findAll();
  }

  @Query(() => SubDepartment, { name: 'subDepartment' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.subDepartmentService.findOne(id);
  }

  @Mutation(() => SubDepartment)
  updateSubDepartment(
    @Args('input') updateSubDepartmentInput: UpdateSubDepartmentInput,
  ) {
    return this.subDepartmentService.update(updateSubDepartmentInput);
  }

  @Mutation(() => Boolean)
  removeSubDepartment(@Args('id', { type: () => Int }) id: number) {
    return this.subDepartmentService.remove(id);
  }
}
