import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Booking } from "./Booking";

@Entity({ name: 'booking_statuses' })
export class BookingStatus extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string
}