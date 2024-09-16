import { Request, Response } from 'express';
import { getRepository, MoreThan } from 'typeorm';
import { User } from "@/models"
import bcrypt from 'bcryptjs';

/**
 * @swagger
 * /auth/reset-password/{token}:
 *   post:
 *     summary: Reset user password
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password has been reset successfully
 */
export const resetPassword = async (req: Request, res: Response) => {
    const { token } = req.params;
    const { newPassword } = req.body;
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
        where: { resetPasswordToken: token, resetPasswordExpires: MoreThan(new Date()) },
    });

    if (!user) {
        return res.status(400).json({ message: 'Token is invalid or has expired' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await userRepository.save(user);

    res.status(200).json({ message: 'Password has been reset successfully' });
};