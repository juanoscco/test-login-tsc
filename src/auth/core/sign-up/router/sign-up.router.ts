import { Router } from 'express';
import { register } from '../controller';

const router = Router();
router.post('/', register);

export { router as registerRouter };