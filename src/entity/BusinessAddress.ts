
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Business } from "./Business";

@Entity({ name: 'business_addresses' })
export class BusinessAddress extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: true })
  street: string

  @Column({ nullable: true })
  area: string

  @Column({ nullable: true })
  zipcode: string

  @Column({ nullable: true })
  city: string

  @Column({ nullable: true })
  state: string

  // @Column()
  @Column("float")
  lat: number

  @Column("float")
  lng: number

  @Column()
  addressMap: string

  @OneToOne(() => Business, business => business.businessAddress)
  @JoinColumn()
  business: Business

  @Column()
  businessId: number

  @CreateDateColumn()
  createdAt = new Date()

  @UpdateDateColumn()
  updatedAt = new Date()
}