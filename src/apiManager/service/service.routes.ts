import { Router } from "express";
import { isAuth } from "../../middleware/isAuthManager";
import { ServiceController } from "./service.controller";

const router = Router();
const service = new ServiceController();

router.post('/', isAuth, service.create);
router.get('/', isAuth, service.getAll);

export default router;