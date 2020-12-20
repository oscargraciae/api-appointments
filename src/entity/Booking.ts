import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BookingStatus } from "./BookingStatus";
import { Business } from "./Business";
import { User } from "./User";

@Entity({ name: 'bookings' })
export class Booking extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  id: number

  @Column('date') // Fecha de la reservación, ej: 15/10/2020
  bookingDate: Date

  @Column('time') // Hora de la reservación, ej: 4:45pm
  bookingTime: Date

  @Column({ nullable: true })
  message: string

  @Column({ default: true })
  isActive: boolean

  @OneToOne(() => User)
  @JoinColumn()
  customer: User

  @OneToOne(() => Business)
  @JoinColumn()
  business: Business

  @OneToOne(() => BookingStatus)
  @JoinColumn()
  bookingStatus: BookingStatus
}