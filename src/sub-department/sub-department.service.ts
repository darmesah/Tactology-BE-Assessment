import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DepartmentService } from 'src/department/department.service';
import { SubDepartment } from './entities/sub-department.entity';
import { Repository } from 'typeorm';
import { CreateSubDepartmentInput } from './dto/create-sub-department.input';
import { UpdateSubDepartmentInput } from './dto/update-sub-department.input';

@Injectable()
export class SubDepartmentService {
  constructor(
    private readonly departmentService: DepartmentService,
    @InjectRepository(SubDepartment)
    private subDepartmentRepository: Repository<SubDepartment>,
  ) {}

  async create(
    createSubDepartmentInput: CreateSubDepartmentInput,
  ): Promise<SubDepartment> {
    const { name, departmentId } = createSubDepartmentInput;

    const department = await this.departmentService.findOne(departmentId);

    const subDepartment = this.subDepartmentRepository.create({
      name,
      department,
    });

    return await this.subDepartmentRepository.save(subDepartment);
  }

  async findAll(): Promise<SubDepartment[]> {
    return await this.subDepartmentRepository.find();
  }

  async findOne(id: number): Promise<SubDepartment> {
    const subDepartment = await this.subDepartmentRepository.findOne({
      where: { id },
    });
    if (!subDepartment) throw new Error('SubDepartment not found');

    return subDepartment;
  }

  async update(updateSubDepartmentInput: UpdateSubDepartmentInput) {
    const { subDepartmentId, name } = updateSubDepartmentInput;

    const subDepartment = await this.findOne(subDepartmentId);

    subDepartment.name = name;
    return await this.subDepartmentRepository.save(subDepartment);
  }

  async remove(id: number) {
    const subDepartment = await this.findOne(id);

    try {
      await this.subDepartmentRepository.remove(subDepartment);
      return true;
    } catch (error) {
      throw new Error(`Error removing sub-department: ${error.message}`);
    }
  }
}
