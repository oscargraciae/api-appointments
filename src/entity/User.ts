import { hash } from "argon2";
import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, Exclusion, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Booking } from "./Booking";

import { BusinessUser } from "./BusinessUser";

@Entity({ name: 'users' })
export class User extends BaseEntity{
  
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  email: string

  @Column({ select: false })
  password: string

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column({ nullable: true })
  phone: string

  @Column({ default: true })
  isActive: boolean

  @CreateDateColumn()
  createdAt = new Date()

  @UpdateDateColumn()
  updatedAt = new Date()

  // @OneToOne(() => BusinessUser)
  // businessUser: BusinessUser

  @OneToOne(() => BusinessUser, businessUser => businessUser.user)
  // @JoinColumn()
  businessUser: BusinessUser

  @OneToMany(() => Booking, booking => booking.customer)
  bookings: Booking[]

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password);
  }
}