import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BusinessCategory } from "./BusinessCategory";
import { BusinessUser } from "./BusinessUser";

@Entity({ name: 'businesses' })
export class Business extends BaseEntity{
  
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ nullable: true })
  description: string

  @Column({ nullable: true })
  cover: string

  @Column({ nullable: true })
  phone: string

  @Column({ default: true })
  isActive: boolean

  @ManyToOne(() => BusinessCategory, businessCategory => businessCategory.business)
  @JoinColumn()
  businessCategory: BusinessCategory;

  @OneToMany(() => BusinessUser, businessUser => businessUser.business)
  businessUser: BusinessUser

  @CreateDateColumn()
  createdAt = new Date()

  @UpdateDateColumn()
  updatedAt = new Date()

}