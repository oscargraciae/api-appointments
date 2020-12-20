import { Router } from 'express';
import UserController from './user.controller';

const router = Router();
const user = new UserController();

router.get('/', user.getUser);
router.post('/', user.create);
router.post('/auth', user.login);

export default router;