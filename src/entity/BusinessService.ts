import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Business } from "./Business";

@Entity({ name: 'business_services' })
export class BusinessService extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ nullable: true })
  description: string

  @Column("decimal", { precision: 10, scale: 2 })
  price: number

  @Column()
  time: number // tiempo en minutos, ejemplo: 15, 30, 45 minutos

  @ManyToOne(() => Business, business => business.bussinessService)
  @JoinColumn()
  business: Business

  @Column()
  businessId: number

  @Column({ default: true })
  isActive: boolean

  @CreateDateColumn()
  createdAt = new Date()

  @UpdateDateColumn()
  updatedAt = new Date()

}