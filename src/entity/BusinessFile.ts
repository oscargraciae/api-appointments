import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'business_files' })
export class BusinessFile extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  file: string

  @CreateDateColumn()
  createdAt = new Date()

  @UpdateDateColumn()
  updatedAt = new Date()
}