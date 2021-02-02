import { Response } from 'express'

import { MyRequest } from "../../config/types";

// ENTITIES
import { Booking } from '../../entity/Booking';
import { In, LessThan, MoreThanOrEqual } from 'typeorm';

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
      console.log('STATUS', req.query);
      const { status, statuses, dateEnd, startDate } :any = req.query;

      const where :any = {};
      where.businessId = req.user.businessUser.businessId;
      
      if (statuses) {
        console.log('STATUS', status);
        console.log('tipo de status', typeof status);
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
        relations: ['customer'],
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

}