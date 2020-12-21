import { Response } from 'express'

import { MyRequest } from "../../config/types";

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
}