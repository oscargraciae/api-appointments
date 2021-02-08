import { Response } from "express";
import { getConnection } from "typeorm";

import { MyRequest } from "../../config/types";

import { Booking } from "../../entity/Booking";
import { User } from "../../entity/User";

export class CustomerController {
  async getAll(req: MyRequest, res: Response) {
    try {
      // const customers = await Booking.find({ businessId: req.user.businessUser.businessId });
      const customers = await getConnection()
        .getRepository(User)
        .createQueryBuilder("user")
        .leftJoinAndSelect(Booking, "booking", "booking.customer_id = user.id")
        .select('user.firstName as "firstName", user.lastName as "lastName", user.phone, booking.createdAt as "bookingCreatedAt"')
        .distinctOn(['user.id'])
        .where('booking.businessId = :businessId', { businessId: req.user.businessUser.businessId })
        .orderBy('user.id, booking.createdAt', 'DESC')
        .getRawMany();
        // .getMany()
        console.log('customers', customers);
        
      return res.json({
        success: true,
        customers,
      })
    } catch (error) {
      return res.json({ success: false, message: error.message, customers: [] })
    }
  }
}