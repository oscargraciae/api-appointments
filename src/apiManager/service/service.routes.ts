import { Router } from "express";
import { isAuth } from "../../middleware/isAuthManager";
import { ServiceController } from "./service.controller";

const router = Router();
const service = new ServiceController();

router.get('/', isAuth, service.getAll);
router.post('/', isAuth, service.create);
router.put('/:id', isAuth, service.update);
router.delete('/:id', isAuth, service.delete);

export default router;