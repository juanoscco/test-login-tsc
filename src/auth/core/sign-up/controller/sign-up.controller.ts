import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';

import { User } from "@/models";
import { transporter } from '@/auth/utils';

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 */
export const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const userRepository = getRepository(User);
  
    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = userRepository.create({ name, email, password: hashedPassword });
    await userRepository.save(user);
  
    const mailOptions = {
      from: 'testtesting32@gmail.com',
      to: email,
      subject: 'Bienvenido a nuestra plataforma',
      text: `Hola ${name},\n\n¡Bienvenido a nuestra plataforma! Gracias por registrarte.`,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error al enviar el correo: ', error);
      } else {
        console.log('Correo enviado: ' + info.response);
      }
    });
  
    res.status(201).json({ message: 'User registered successfully and welcome email sent' });
  };