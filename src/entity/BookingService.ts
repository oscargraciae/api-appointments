import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Booking } from "./Booking";
import { BusinessService } from "./BusinessService";

@Entity({ name: 'booking_services' })
export class BookingService extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number
  
  @Column({ default: '' })
  nameService: string

  @Column("decimal", { precision: 10, scale: 0, default: 0 })
  priceService: number

  @Column({ default: 0 })
  timeService: number

  @Column()
  bookingId: number

  @ManyToOne(() => Booking, booking => booking.bookingService)
  @JoinColumn()
  booking: Booking

  @ManyToOne(() => BusinessService)
  @JoinColumn()
  businessService: BusinessService

  // @OneToOne(() => BusinessService)
  // @JoinColumn()
  // businessService: BusinessService

  @Column()
  businessServiceId: number
}