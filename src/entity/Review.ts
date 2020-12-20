import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Business } from "./Business";
import { User } from "./User";

@Entity({ name: 'reviews' })
export class Review extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  rank: number

  @Column({ nullable: true })
  review: string

  @OneToOne(() => Business)
  @JoinColumn()
  business: Business

  @OneToOne(() => User)
  @JoinColumn()
  customer: User
  
}