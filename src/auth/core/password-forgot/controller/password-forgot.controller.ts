import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import crypto from 'crypto';

import { User } from '@/models';
import { transporter } from '@/auth/utils';

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Request password reset
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset email sent
 */
export const forgotPassword = async (req: Request, res: Response) => {
    const { email } = req.body;
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { email } });
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 3600000);

    await userRepository.save(user);

    const mailOptions = {
        from: 'testtesting32@gmail.com',
        to: email,
        subject: 'Recuperación de contraseña',
        text: `Has solicitado restablecer tu contraseña. Haz clic en el siguiente enlace para cambiarla:\n\n
             http://localhost:8080/reset-password/${resetToken}\n\n
             Este enlace expirará en 1 hora.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error al enviar el correo: ', error);
            return res.status(500).json({ message: 'Error sending email' });
        } else {
            console.log('Correo enviado: ' + info.response);
            return res.status(200).json({ message: 'Password reset email sent' });
        }
    });
};