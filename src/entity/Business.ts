import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BusinessAddress } from "./BusinessAddress";
import { BusinessCategory } from "./BusinessCategory";
import { BusinessFile } from "./BusinessFile";
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

  @Column({ nullable: true, default: 'https://reserly-dev.s3.us-east-2.amazonaws.com/11-71e78474-351c-4407-88f5-2788c79e9ff2.jpg' })
  cover: string

  @Column({ nullable: true })
  phone: string

  @Column({ default: true })
  isActive: boolean

  @Column({ default: false })
  isCompleted: boolean

  @Column({ default: false })
  isPublic: boolean

  @Column({ default: false })
  hasParallelBookings: boolean

  @Column({ default: true })
  hasBookingConfimation: boolean

  @ManyToOne(() => BusinessCategory, businessCategory => businessCategory.business)
  @JoinColumn()
  businessCategory: BusinessCategory;

  @Column({ nullable: true })
  businessCategoryId: number

  @OneToOne(() => BusinessAddress, businessAddress => businessAddress.business)
  businessAddress: BusinessAddress

  @OneToMany(() => BusinessHour, businessHour => businessHour.business)
  hours: BusinessHour[]

  @OneToMany(() => BusinessFile, businessFiles => businessFiles.business)
  files: BusinessFile[]

  @OneToMany(() => BusinessService, businessService => businessService.business)
  businessService: BusinessService

  @OneToMany(() => BusinessUser, businessUser => businessUser.business)
  businessUser: BusinessUser[]

  @CreateDateColumn()
  createdAt = new Date()

  @UpdateDateColumn()
  updatedAt = new Date()

}