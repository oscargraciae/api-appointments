import { Router } from 'express';
import { AddressController } from './address.controller';
import { isAuth } from '../../middleware/isAuthManager';

const router = Router({ mergeParams: true });
const address = new AddressController();

router.post('/', isAuth, address.create);
router.put('/:id', isAuth, address.update);
router.get('/', isAuth, address.get);

export default router;