import { Router } from "express";
import { isAuth } from "../../middleware/isAuthManager";
import { CustomerController } from "./customer.controller";

const router = Router();
const service = new CustomerController();

router.get('/', isAuth, service.getAll);

export default router;