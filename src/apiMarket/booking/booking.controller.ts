import { Response } from "express";
import { LessThan, MoreThanOrEqual } from 'typeorm';

import { BookingService } from "../../entity/BookingService";
import { BusinessService } from "../../entity/BusinessService";

import { MyRequest } from "../../config/types";
import { Booking } from "../../entity/Booking";
import { sendMailReservation } from "../../mails/mails";

export class BookingController {
  
  async getAll(req: MyRequest, res: Response) {
    try {
      const { endDate, startDate } :any = req.query;
      let where : any = {};
      
      if (endDate) {
        where.bookingDate = MoreThanOrEqual(endDate)
      }

      if (startDate) {
        where.bookingDate = LessThan(startDate)
      }

      const bookings = await Booking.find({
        where: { customerId: req.session.userId, ...where },
        relations: ['business'],
        order: { createdAt: 'DESC' },
      })
      return res.json({ success: true, bookings });
    } catch (error) {
      return res.json({ succes: false, message: error.message });
    }
  }

  async create(req: MyRequest, res: Response) {
    try {
      const bodyServices : BusinessService[] = req.body.businessServices;
      const bodyBooking : Booking = req.body;
      const totalPrice = bodyServices.reduce((total :number, service :any) => total + Number(service.price), 0)
      
      const booking = await Booking.create({ ...bodyBooking, customerId: req.session.userId, bookingStatusId: 1, totalPrice: totalPrice }).save();

      bodyServices.forEach((item) => {
        BookingService.create({ businessServiceId: item.id, bookingId: booking.id, nameService: item.name, priceService: item.price, timeService: item.time }).save();
      })


      if (booking) {
        const data = await Booking.findOne({ 
          where:  { id: booking.id },
          relations: ['customer', 'business', 'business.businessUser', 'business.businessUser.user'],
        });
        console.log('Datos de negocio', JSON.stringify(data));
        
        if (data) {
          sendMailReservation(data);
        }
      }

      // if (req.app.socketIo && bodyBooking.businessId) {
      //   console.log('Emitiendo una reservacion', bodyBooking.businessId);
        
      //   req.app.socketIo.in(bodyBooking.businessId).emit('new-booking', { booking });
      // }
      
      return res.json({ success: true, booking });
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
  }
}