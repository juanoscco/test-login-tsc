import { Router } from 'express';
import { forgotPassword } from '../controller';

const router = Router();

router.post('/', forgotPassword);

export { router as forgotPasswordRouter }; 
