import { Router } from 'express';
import { isAuth } from '../../middleware/isAuthManager';
import UserController from './user.controller';

const router = Router();
const user = new UserController();

router.get('/', isAuth, user.getUser);
router.post('/', user.create);
router.post('/auth', user.login);

export default router;