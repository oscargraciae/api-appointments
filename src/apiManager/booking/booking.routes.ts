import { Router } from "express";
import { isAuth } from "../../middleware/isAuthManager";
import { BookingController } from "./booking.controller";

const router = Router();

const booking = new BookingController();

router.post('/', booking.create);
router.get('/', isAuth, booking.getAll);
router.get('/:id', isAuth, booking.get);
router.put('/:id', isAuth, booking.update);

export default router;