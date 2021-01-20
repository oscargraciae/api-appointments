import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Booking } from "./Booking";
import { BusinessService } from "./BusinessService";

@Entity({ name: 'booking_services' })
export class BookingService extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  // @OneToOne(() => Booking)
  // @JoinColumn()
  // booking: Booking

  @Column()
  bookingId: number

  // @OneToOne(() => BusinessService)
  // @JoinColumn()
  // businessService: BusinessService

  @Column()
  businessServiceId: number
}