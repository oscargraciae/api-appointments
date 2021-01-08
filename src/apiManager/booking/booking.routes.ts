import { Router } from "express";
import { BookingController } from "./booking.controller";

const router = Router();

const booking = new BookingController();

router.post('/', booking.create);
router.get('/', booking.getAll);

export default router;