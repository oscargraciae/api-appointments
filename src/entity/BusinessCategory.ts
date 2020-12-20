import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Business } from "./Business";

@Entity({ name: 'business_categories' })
export class BusinessCategory extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @OneToMany(() => Business, business => business.businessCategory)
  business: Business[];
}