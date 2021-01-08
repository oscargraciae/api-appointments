import { getConnection } from "typeorm";
import { Business } from "../../entity/Business";

export class BusinessService {
  async getAll() {
    // if (!params) {
    //   return await Business.find({
    //     where: { isActive: true, isCompleted: true },
    //     relations: ['businessAddress', 'businessCategory']
    //   });
    // }


    return await getConnection()
        .getRepository(Business)
        .createQueryBuilder('business')
        .innerJoinAndSelect('business.businessAddress', 'businessAddress', '(6371 * acos(cos(radians(:lat)) * cos(radians(lat)) * cos(radians(:lng) - radians(lng)) + sin(radians(:lat)) * sin(radians(lat)))) <= 10', { lat: 25.6866142, lng: -100.3161126 })
        // .where('businessUser.userId', req.session.userId)
        // .where("businessUser.userId = :userId", { userId: req.session.userId })
        // .where('(6371 * acos(cos(radians(:lat)) * cos(radians(lat)) * cos(radians(:lng) - radians(lng)) + sin(radians(:lng)) * sin(radians(lat)))) <= 10', { lat: 25.6866142, lng: -100.3161126 })
        .getMany();

  }
}
