import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Business } from "./Business";

@Entity({ name: 'business_services' })
export class BusinessService extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ nullable: true })
  description: string

  @Column("decimal", { precision: 5, scale: 2 })
  price: number

  @Column()
  time: number // tiempo en minutos, ejemplo: 15, 30, 45 minutos

  @OneToOne(() => Business)
  @JoinColumn()
  business: Business

  @CreateDateColumn()
  createdAt = new Date()

  @UpdateDateColumn()
  updatedAt = new Date()

}