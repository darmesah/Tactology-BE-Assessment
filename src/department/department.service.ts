import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { Repository } from 'typeorm';
import { CreateDepartmentInput } from './dto/create-department.input';
import { UpdateDepartmentInput } from './dto/update-department.input';
import { SubDepartment } from 'src/sub-department/entities/sub-department.entity';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
    @InjectRepository(SubDepartment)
    private subDepartmentRepository: Repository<SubDepartment>,
  ) {}

  async create(
    createDepartmentInput: CreateDepartmentInput,
  ): Promise<Department> {
    const { name, subDepartments } = createDepartmentInput;

    await this.checkDuplicateDepartmentName(name);

    const department = this.departmentRepository.create({ name });
    await this.departmentRepository.save(department);

    if (subDepartments && subDepartments.length > 0) {
      department.subDepartments = subDepartments.map((subDept) =>
        this.subDepartmentRepository.create({
          name: subDept.name,
          department,
        }),
      );
    } else {
      department.subDepartments = [];
    }

    await this.departmentRepository.save(department);
    return department;
  }

  async findAll(): Promise<Department[]> {
    return await this.departmentRepository.find({
      relations: ['subDepartments'],
    });
  }

  async findOne(id: number): Promise<Department> {
    const department = await this.departmentRepository.findOne({
      where: { id },
      relations: ['subDepartments'],
    });

    if (!department)
      throw new NotFoundException(`Department with ID ${id} not found`);

    return department;
  }

  async update(
    updateDepartmentInput: UpdateDepartmentInput,
  ): Promise<Department> {
    const { id, name } = updateDepartmentInput;

    await this.checkDuplicateDepartmentName(name);

    const department = await this.findOne(id);
    department.name = name;

    try {
      return await this.departmentRepository.save(department);
    } catch (error) {
      throw new Error(`Error updating department: ${error.message}`);
    }
  }

  async remove(id: number): Promise<boolean> {
    const department = await this.findOne(id);

    try {
      await this.departmentRepository.remove(department);
      return true;
    } catch (error) {
      throw new Error(`Error deleting department: ${error.message}`);
    }
  }

  async checkDuplicateDepartmentName(name: string): Promise<false> {
    const existingDepartment = await this.departmentRepository.findOne({
      where: { name },
    });

    if (existingDepartment)
      throw new ConflictException(
        `Department with name ${name} already exists`,
      );

    return false;
  }
}
