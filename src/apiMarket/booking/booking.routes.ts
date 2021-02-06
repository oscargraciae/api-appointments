import { Router } from "express";
import { isAuth } from "../../middleware/isAuthManager";
import { BookingController } from "./booking.controller";

const router = Router();

const booking = new BookingController();

router.post('/', isAuth, booking.create);
router.get('/', isAuth, booking.getAll);

export default router;