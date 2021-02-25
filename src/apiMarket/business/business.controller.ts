import { Response } from "express";
import { Between, getConnection } from "typeorm";

import { Booking } from "../../entity/Booking";
import { Business } from "../../entity/Business";
import { BusinessFile } from "../../entity/BusinessFile";

import { MyRequest } from "../../config/types";
import { BusinessService } from "./business.service";

class BusinessController {

  async getBusiness(req: MyRequest, res: Response) {
    try {
      let { lat, lng, categoryId, zoom } : any = req.query;
      
      let kms = 5;

      if (zoom) {
        kms = 40000 / 2**zoom * 2;
        console.log('kms', kms);
      }
      
      if (!lat && lng) {
        lat = 25.6866142;
        lng = -100.3161126;
      }
      
      const business = await new BusinessService().getAll(kms, { lat, lng }, categoryId);
      // const business = await Business.find({
      //   where: { isActive: true },
      //   relations: ['businessAddress']
      // });
      return res.json({
        success: true,
        business,
      })
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
  }
  
  async get(req: MyRequest, res: Response) {
    try {
      const id : number = Number(req.params.id);
      const business = await getConnection()
        .getRepository(Business)
        .createQueryBuilder('business')
        .leftJoinAndSelect('business.businessAddress', 'businessAddress')
        .leftJoinAndSelect('business.businessCategory', 'businessCategory')
        .leftJoinAndSelect('business.businessService', 'businessService', 'businessService.isActive = true')
        .leftJoinAndSelect('business.hours', 'hours')
        .where("business.id = :id", { id })
        .getOne();
  
      return res.json({ success: true, business });
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
  }

  async getAvailableTime(req: MyRequest, res: Response) {
    try {
      let { startTime, endTime } :any = req.query;
      const bookings = await Booking.find({ where: { businessId: req.params.id, bookingDate: Between(startTime, endTime) } });
    
      return res.json({ bookings });
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
  }

  async getPhotos(req: MyRequest, res: Response) {
    try {
      const businessId : number = Number(req.params.id);
      const photos = await BusinessFile.find({ where: { businessId } })
      return res.json({ success: true, photos });
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
  }

}

export default BusinessController;