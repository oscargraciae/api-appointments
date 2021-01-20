import { Response } from "express";
import { getConnection } from "typeorm";

import { BookingService } from "../../entity/BookingService";
import { BusinessService } from "../../entity/BusinessService";

import { MyRequest } from "../../config/types";
import { Booking } from "../../entity/Booking";

export class BookingController {
  async create(req: MyRequest, res: Response) {
    try {
      const body : any = req.body;
      const bodyServices : BusinessService[] = req.body.businessServices;
      const bodyBooking : Booking = req.body;
      const booking = await Booking.create({ ...bodyBooking, customerId: req.session.userId, bookingStatusId: 1 }).save();

      bodyServices.forEach((item) => {
        BookingService.create({ businessServiceId: item.id, bookingId: booking.id }).save();
      })
      
      return res.json({ success: true, booking });
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
  }
}