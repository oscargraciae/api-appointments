import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BusinessAddress } from "./BusinessAddress";
import { BusinessCategory } from "./BusinessCategory";
import { BusinessHour } from "./BusinessHour";
import { BusinessService } from "./BusinessService";
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

  @Column({ default: false })
  isPublic: boolean

  @Column({ default: false })
  isCompleted: boolean

  @ManyToOne(() => BusinessCategory, businessCategory => businessCategory.business)
  @JoinColumn()
  businessCategory: BusinessCategory;

  @Column()
  businessCategoryId: number

  @OneToOne(() => BusinessAddress, businessAddress => businessAddress.business)
  businessAddress: BusinessAddress

  @OneToMany(() => BusinessHour, businessHour => businessHour.business)
  hours: BusinessHour[]

  @OneToMany(() => BusinessService, businessService => businessService.business)
  businessService: BusinessService

  @OneToMany(() => BusinessUser, businessUser => businessUser.business)
  businessUser: BusinessUser

  @CreateDateColumn()
  createdAt = new Date()


  @UpdateDateColumn()
  updatedAt = new Date()

}