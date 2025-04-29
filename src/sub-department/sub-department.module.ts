import { Module } from '@nestjs/common';
import { SubDepartmentService } from './sub-department.service';
import { SubDepartmentResolver } from './sub-department.resolver';
import { SubDepartment } from './entities/sub-department.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentModule } from 'src/department/department.module';

@Module({
  imports: [DepartmentModule, TypeOrmModule.forFeature([SubDepartment])],
  providers: [SubDepartmentService, SubDepartmentResolver],
})
export class SubDepartmentModule {}
