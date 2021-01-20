import { Response } from 'express'

import { MyRequest } from "../../config/types";

// ENTITIES
import { BusinessUser } from '../../entity/BusinessUser';
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
      const { status } :any = req.query;

      const where :any = {};
      where.businessId = req.user.businessUser.businessId;
      if(status) {
        where.bookingStatusId = status;
      }

      const bookings = await Booking.find({ 
        where,
        relations: ['customer']
      });
      return res.json({ success: true, bookings });
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