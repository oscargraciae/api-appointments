import { hash } from "argon2";
import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { BusinessUser } from "./BusinessUser";

@Entity({ name: 'users' })
export class User extends BaseEntity{
  
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  email: string

  @Column()
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

  @OneToMany(() => BusinessUser, businessUser => businessUser.user)
  businessUser: BusinessUser

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password);
  }
}