import {
    registerRouter,
    forgotPasswordRouter,
    loginRouter,
    resetPasswordRouter
} from "../core";
import { Router } from 'express';

const router = Router();

// Definir rutas más específicas para cada funcionalidad de autenticación
router.use("/auth/login", loginRouter);
router.use("/auth/forgot-password", forgotPasswordRouter);
router.use("/auth/reset-password", resetPasswordRouter);
router.use("/auth/register", registerRouter);

export { router as authRouters };