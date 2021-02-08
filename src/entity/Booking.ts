import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BookingService } from "./BookingService";
import { BookingStatus } from "./BookingStatus";
import { Business } from "./Business";
import { User } from "./User";

@Entity({ name: 'bookings' })
export class Booking extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  id: number

  @Column('timestamp with time zone') // Fecha de la reservación, ej: 15/10/2020
  bookingDate: Date

  @Column('time with time zone') // Hora de la reservación, ej: 4:45pm
  bookingTime: Date


  @Column({ nullable: true })
  message: string

  @Column({ default: true })
  isActive: boolean

  @Column({ default: 0 })
  totalTime: number

  @Column({ default: 0 })
  totalPrice: number

  @ManyToOne(() => User, user => user.bookings)
  @JoinColumn()
  customer: User

  @Column()
  customerId: number

  @ManyToOne(() => Business)
  @JoinColumn()
  business: Business

  @Column()
  businessId: number
  
  @ManyToOne(() => BookingStatus, bookingStatus => bookingStatus.bookings)
  bookingStatus: BookingStatus

  @Column()
  bookingStatusId: number

  @CreateDateColumn()
  createdAt = new Date()

  @UpdateDateColumn()
  updatedAt = new Date()

  @OneToMany(() => BookingService, bookingService => bookingService.booking)
  bookingService: BookingService
}