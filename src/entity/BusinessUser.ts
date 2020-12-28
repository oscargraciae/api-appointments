import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { Business } from "./Business";
import { User } from "./User";

@Entity({ name: 'business_users' })
export class BusinessUser extends BaseEntity{
  
  @PrimaryGeneratedColumn()
  id: number

  @OneToOne(() => User, user => user.businessUser)
  @JoinColumn()
  user: User

  // @ManyToOne(() => User, user => user.businessUser, { eager: true })
  // @JoinColumn({ name: 'user_id' })
  // user: User;

  @Column({ unique: true })
  userId: number;
  

  @ManyToOne(() => Business, business => business.businessUser)
  @JoinColumn()
  business: Business;

  @Column()
  businessId: number;

  @CreateDateColumn()
  createdAt = new Date()

  @UpdateDateColumn()
  updatedAt = new Date()

}