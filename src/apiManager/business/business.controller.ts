import { MyContext } from "../../config/types";

import { BusinessUser } from "../../entity/BusinessUser";
import { Business } from "../../entity/Business";

class BusinessController {

  async getBusiness({ req, res }: MyContext) {
    try {
      const business = await BusinessUser.findOne({
        where: { userId: req.session.userId },
        relations: ['business']
      });

      return res.json({
        success: true,
        business,
      })
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
  }

  async create({ req, res }: MyContext) {
    try {
      const body: Business = req.body;
      const business = await Business.create(body).save();
      if (!business) {
        return res.json({ success: false });
      }

      await BusinessUser.create({ userId: req.session.userId, businessId: business.id }).save();

      return res.json({ success: true, business })
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
  }

  async update({ req, res }: MyContext) {
    try {
      // Con este query se consulta el negocio realacionado al usuario que esta en sesion
      // const business = await getConnection()
      //   .getRepository(Business)
      //   .createQueryBuilder("businesses")
      //   .leftJoinAndSelect("businesses.businessUser", "business_user")
      //   .where("business_user.user = :id", { id: req.session.userId })
      //   .getOne();

      
      // Actualizacion con Typeorm Repository
      // const business = await getConnection()
      //   .getRepository(Business)
      //   .update({ id: 5 }, { name: 'Esta es una prueba para actualizar' })
      
      const id : number = Number(req.params.id);
      const business = await Business.update({ id }, { ...req.body });
      
      return res.json({ business });
    } catch (error) {
      return res.json({
        success: false,
        message: error.message,
      })
    }
  }

}

export default BusinessController;