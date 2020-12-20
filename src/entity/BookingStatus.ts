import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'booking_statuses' })
export class BookingStatus extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string
}