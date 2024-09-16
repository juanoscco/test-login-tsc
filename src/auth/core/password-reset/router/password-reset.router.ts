import { Router } from 'express';
import { resetPassword } from '../controller';
const router = Router();
router.post('/:token', resetPassword);

export { router as  resetPasswordRouter };