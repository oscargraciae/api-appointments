import { getConnection } from "typeorm";
import { Business } from "../../entity/Business";

interface ICoords {
  lat: number
  lng: number
}

export class BusinessService {
  async getAll(kms: number, coords : ICoords, categoryId? :number) {
    // if (!params) {
    //   return await Business.find({
    //     where: { isActive: true, isCompleted: true },
    //     relations: ['businessAddress', 'businessCategory']
    //   });
    // }

    const { lat, lng } = coords;
    return await getConnection()
        .getRepository(Business)
        .createQueryBuilder('business')
        .addSelect(`(6371 * acos(cos(radians(${lat})) * cos(radians(lat)) * cos(radians(${lng}) - radians(lng)) + sin(radians(${lat})) * sin(radians(lat))))`, 'distance')
        .where(categoryId ? `business.businessCategoryId = :categoryId` : '1=1', { categoryId })
        .andWhere('business.isPublic = true')
        .innerJoinAndSelect('business.businessCategory', 'businessCategory')
        .innerJoinAndSelect('business.businessAddress', 'businessAddress', '(6371 * acos(cos(radians(:lat)) * cos(radians(lat)) * cos(radians(:lng) - radians(lng)) + sin(radians(:lat)) * sin(radians(lat)))) <= :kms', { lat, lng, kms })
        .orderBy('distance', 'ASC')
        // .where("businessUser.userId = :userId", { userId: req.session.userId })
        // .where('(6371 * acos(cos(radians(:lat)) * cos(radians(lat)) * cos(radians(:lng) - radians(lng)) + sin(radians(:lng)) * sin(radians(lat)))) <= 10', { lat: 25.6866142, lng: -100.3161126 })
        .getMany();

  }
}
