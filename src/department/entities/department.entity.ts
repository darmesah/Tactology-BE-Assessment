import { Field, ObjectType } from '@nestjs/graphql';
import { SubDepartment } from 'src/sub-department/entities/sub-department.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Department {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [SubDepartment], { nullable: true })
  @OneToMany(() => SubDepartment, (subDepartment) => subDepartment.department, {
    cascade: true,
    eager: true,
  })
  subDepartments: SubDepartment[];
}
