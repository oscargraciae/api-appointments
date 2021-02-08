import { Response } from "express";
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { getConnection } from "typeorm";
import { S3 } from "aws-sdk";
import imagemin from "imagemin";
import mozjpeg from "imagemin-mozjpeg";
import sharp from 'sharp';

import { BusinessUser } from "../../entity/BusinessUser";
import { Business } from "../../entity/Business";
import { BusinessHour } from "../../entity/BusinessHour";
import { BusinessFile } from "../../entity/BusinessFile";
import { User } from "../../entity/User";

import { MyRequest } from "../../config/types";
import { addContactBusiness, sendMailWelcomeStore } from "../../mails/mails";

const s3 = new S3({ region: 'us-east-2', credentials: { accessKeyId: 'AKIAX64L7XCVTA7JXFEM', secretAccessKey: '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' } });

const convertToJpg = async (input: Buffer) => {
  return sharp(input)
    .resize(720)
    .toBuffer();
};

class BusinessController {
  
  async getBusiness(req: MyRequest, res: Response) {
    try {
      // const business = await BusinessUser.findOne({
      //   where: { userId: req.session.userId },
      //   relations: ['business']
      // });

      // const business = await Business.findOne({
      //   // where: { userId: req.session.userId },
      //   relations: ['businessUser'],
      //   where: {
      //     businessUser: {
      //       userId: req.session.userId,
      //     }
      // }
      //   // where: { 'businessUser.userId': req.session.id },
      // });

      const business = await getConnection()
        .getRepository(Business)
        .createQueryBuilder('business')
        .leftJoinAndSelect('business.businessUser', 'businessUser')
        // .where('businessUser.userId', req.session.userId)
        .where("businessUser.userId = :userId", { userId: req.session.userId })
        .getOne();

      return res.json({
        success: true,
        business,
      })
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
  }

  async create(req: MyRequest, res: Response) {
    let business : Business;
    var bussinessId : number = 0;
    try {
      const body: Business = req.body;
      business = await Business.create(body).save();
      if (!business) {
        return res.json({ success: false });
      }

      bussinessId = business.id;
      await BusinessUser.create({ userId: req.session.userId, businessId: business.id }).save();


      const user = await User.findOne({ id: req.session.userId });

      if (user) {
        sendMailWelcomeStore(user.email)
        addContactBusiness(user);
      }
      
      return res.json({ success: true, business })
    } catch (error) {
      await Business.delete({ id: bussinessId })
      return res.json({ success: false, message: error.message });
    }
  }

  async update(req: MyRequest, res: Response) {
    try {
      const id : number = Number(req.params.id);
      const business = await Business.update({ id }, { ...req.body });
      
      return res.json({success: true, business });
    } catch (error) {
      return res.json({
        success: false,
        message: error.message,
      })
    }
  }

  async createHours(req: MyRequest, res: Response) {
    try {
      const values : BusinessHour[] = req.body.days;
      const businessId : number = Number(req.params.id);
      const businessHrs = await BusinessHour.findOne({ where: { businessId } })
      if (businessHrs) {
        await BusinessHour.delete({ businessId });
      }

      console.log('Valores a insertar', values);
      
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(BusinessHour)
        .values(values)
        .execute();
      return res.json({ success: true, values });
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
  }

  async getHours(req: MyRequest, res: Response) {
    try {
      const businessId : number = Number(req.params.id);
      const hours = await BusinessHour.find({ where: { businessId }, order: { dayOfWeek: 'ASC' } })
      return res.json({ success: true, hours });
    } catch (error) {
      return res.json({ success: false, message: error.messahe });
    }
  }

  async uploadCover (req: MyRequest, res: Response) {
    try {
      // const s3 = new S3({ region: 'us-east-2', credentials: { accessKeyId: 'AKIAX64L7XCVTA7JXFEM', secretAccessKey: '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' } });

      const business = await Business.findOne({ where: { id: req.user.businessUser.businessId } })

      if (business && business.cover) {
        const imgName = business.cover.split('/')[4];
        await s3.deleteObject({
          Bucket: 'reserly-dev',
          Key: `${req.user.businessUser.businessId}/${imgName}`
        }).promise();
      }

      const miniBuffer = await imagemin.buffer(req.file.buffer, {
        plugins: [convertToJpg, mozjpeg({ quality: 80 })]
      });
      const fileName = `${req.user.businessUser.businessId}-${uuidv4()}${path.extname(req.file.originalname)}`
      const response = await s3.upload({
        Bucket: 'reserly-dev',
        Key: `${req.user.businessUser.businessId}/${fileName}`,
        Body: miniBuffer,
        ACL: 'public-read',
      }).promise();
      
      await Business.update({ id: req.user.businessUser.businessId }, { cover: response.Location });

      
      return res.json({ message: 'subiendo imagen', data: req.file });
    } catch (error) {
      // throw error;
      return res.json({ success: false, message: error.message });
    }
  }

  // async uploadPhotos (req: MyRequest, res: Response) {
  //   try {
  //     console.log('Fotos', req.files);
  //     console.log('Fotos', req.files);
      
  //     if (req.files.length > 0) {
  //       req.files.forEach(async (item :any) => {
  //         const miniBuffer = await imagemin.buffer(item.buffer, {
  //           plugins: [convertToJpg, mozjpeg({ quality: 80 })]
  //         });
  //         console.log('miniBuffer', miniBuffer);
          
  //         const fileName = `${req.user.businessUser.businessId}-${uuidv4()}${path.extname(item.originalname)}`
  //         let resp = await s3.upload({
  //           Bucket: 'reserly-dev',
  //           Key: `${req.user.businessUser.businessId}/${fileName}`,
  //           Body: miniBuffer,
  //           ACL: 'public-read',
  //         }).promise();

  //         await BusinessFile.create({ file: resp.Location, businessId: req.user.businessUser.businessId }).save();
  //       })
  //     }

  //     const files = await BusinessFile.find({ where: { businessId: req.user.businessUser.businessId } });
      
  //     // await Business.update({ id: req.user.businessUser.businessId }, { cover: response.Location });

  //     return res.json({ success: true, message: 'subiendo imagen', data: req.file, files });
  //   } catch (error) {
  //     // throw error;
  //     return res.json({ success: false, message: error.message });
  //   }
  // }

  async uploadPhoto (req: MyRequest, res: Response) {
    try {
      const miniBuffer = await imagemin.buffer(req.file.buffer, {
        plugins: [convertToJpg, mozjpeg({ quality: 80 })]
      });
      
      const fileName = `${req.user.businessUser.businessId}-${uuidv4()}${path.extname(req.file.originalname)}`
      let resp = await s3.upload({
        Bucket: 'reserly-dev',
        Key: `${req.user.businessUser.businessId}/${fileName}`,
        Body: miniBuffer,
        ACL: 'public-read',
      }).promise();

      await BusinessFile.create({ file: resp.Location, businessId: req.user.businessUser.businessId }).save();

      const files = await BusinessFile.find({ where: { businessId: req.user.businessUser.businessId } });
      
      return res.json({ success: true, message: 'subiendo imagen', data: req.file, files });
    } catch (error) {
      // throw error;
      return res.json({ success: false, message: error.message });
    }
  }

  async getPhotos(req: MyRequest, res: Response) {
    try {
      const { businessId } = req.user.businessUser;
      const photos = await BusinessFile.find({ where: { businessId } });
      return res.json({ success: true, photos });
    } catch (error) {
      return res.json({ success: false, message: error.message })
    }
  }

  async deletePhoto(req: MyRequest, res: Response) {
    try {
      const id : number = Number(req.params.id);
      const businessFile = await BusinessFile.findOne({ id });
      
      if (businessFile && businessFile.file) {
        console.log('Eliminando');
        
        const imgName = businessFile.file.split('/')[4];
        console.log('Eliminando',imgName);
        
        await s3.deleteObject({
          Bucket: 'reserly-dev',
          Key: `${req.user.businessUser.businessId}/${imgName}`
        }).promise();
      }

      businessFile?.remove();

      // const photo = await BusinessFile.delete({ id });

      return res.json({ success: true, businessFile });
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
  }

}

export default BusinessController;