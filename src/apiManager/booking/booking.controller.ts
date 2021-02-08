import { Response } from 'express'
import { In, LessThan, MoreThanOrEqual } from 'typeorm';

import { sendMailNotificationCustomer } from '../../mails/mails';
import { MyRequest } from "../../config/types";

// ENTITIES
import { Booking } from '../../entity/Booking';

export class BookingController {
  async create(req: MyRequest, res: Response) {
    try {
      const body : Booking = req.body;
       const booking = await Booking.create({ ...body, customerId: req.session.userId, bookingStatusId: 1 }).save();
       return res.json({
         success: true,
         booking,
       });
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
  }

  async getAll(req: MyRequest, res: Response) {
    try {
      const { status, statuses, dateEnd, startDate } :any = req.query;

      const where :any = {};
      where.businessId = req.user.businessUser.businessId;
      
      if (statuses) {
        where.bookingStatusId = In(statuses);
      }

      if(status) {
        where.bookingStatusId = status;
      }

      if (dateEnd) {
        where.bookingDate = MoreThanOrEqual(dateEnd)
      }

      if (startDate) {
        where.bookingDate = LessThan(startDate)
      }

      const bookings = await Booking.find({ 
        where,
        relations: ['customer', 'bookingStatus'],
        order: { id: 'DESC' }
      });
      return res.json({ success: true, bookings });
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
  }

  async get(req: MyRequest, res: Response) {
    try {
      const id : number = Number(req.params.id);
      const booking = await Booking.findOne({ 
        where:  { id },
      relations: ['customer', 'bookingService', 'bookingService.businessService'],
      });
      return res.json({ success: true, booking });
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
  }

  async update(req: MyRequest, res: Response) {
    try {
      const id : number = Number(req.params.id);
      const body: Booking = req.body;
      const booking = await Booking.update({ id }, body);
      
      return res.json({ success: true, booking });
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
  }

  async bookingAccepted(req: MyRequest, res: Response) {
    try {
      const id : number = Number(req.params.id);
      const booking = await Booking.update({ id }, { bookingStatusId: 2 });
      
      const bookingDetail = await Booking.findOne({ 
        where:  { id },
        relations: ['customer', 'business'],
      });

      if (bookingDetail) {
        sendMailNotificationCustomer(bookingDetail, bookingDetail.customer.email, 'Aceptada');
      }
      
      return res.json({ success: true, booking });
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
  }

  async bookingCanceled(req: MyRequest, res: Response) {
    try {
      const id : number = Number(req.params.id);
      const booking = await Booking.update({ id }, { bookingStatusId: 3 });
      
      const bookingDetail = await Booking.findOne({ 
        where:  { id },
        relations: ['customer', 'business'],
      });

      if (bookingDetail) {
        sendMailNotificationCustomer(bookingDetail, bookingDetail.customer.email, 'Cancelada');
      }

      return res.json({ success: true, booking });
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
  }

}