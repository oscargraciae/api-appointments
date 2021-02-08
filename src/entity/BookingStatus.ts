import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Booking } from "./Booking";

@Entity({ name: 'booking_statuses' })
export class BookingStatus extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  // @OneToMany(() => BookingStatus, bookingStatus => bookingStatus.bookings)
  @OneToMany(() => Booking, booking => booking.bookingStatus)
  bookings: Booking[]
}