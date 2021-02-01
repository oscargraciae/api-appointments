import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Business } from "./Business";

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

  @ManyToOne(() => Business, business => business.files)
  @JoinColumn()
  business: Business


  @Column()
  businessId: number
}