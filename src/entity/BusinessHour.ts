import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Business } from "./Business";

@Entity({ name: 'business_hours' })
export class BusinessHour extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  id: number


  @Column()
  dayOfWeek: number

  @Column('time') // Hora de la reservación, ej: 4:45pm
  openFrom: Date

  @Column('time') // Hora de la reservación, ej: 4:45pm
  openTill: Date

  @Column()
  isOpen: boolean

  @ManyToOne(() => Business, business => business.hours)
  @JoinColumn()
  business: Business


  @Column()
  businessId: number

  // Props, id, dia de semana, horario de apertura, horario de cierre, y booleano para saber si esta abierto o no
}