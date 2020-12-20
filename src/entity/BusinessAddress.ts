
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Business } from "./Business";

@Entity({ name: 'business_addresses' })
export class BusinessAddress extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  street: string

  @Column()
  streetNumber: string

  @Column()
  area: string

  @Column({ nullable: true })
  zipcode: string

  @Column()
  city: string

  @Column()
  state: string

  @Column()
  lat: number

  @Column()
  lng: number

  @Column()
  addressMap: string

  @OneToOne(() => Business)
  @JoinColumn()
  business: Business

  @CreateDateColumn()
  createdAt = new Date()

  @UpdateDateColumn()
  updatedAt = new Date()
}