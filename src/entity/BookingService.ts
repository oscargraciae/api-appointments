import { BaseEntity, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Booking } from "./Booking";
import { BusinessService } from "./BusinessService";

@Entity({ name: 'booking_services' })
export class BookingService extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @OneToOne(() => Booking)
  @JoinColumn()
  booking: Booking

  @OneToOne(() => BusinessService)
  @JoinColumn()
  businessService: BusinessService
}