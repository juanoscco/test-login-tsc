import dotenv from 'dotenv';

dotenv.config();

export const JWT_SECRET: any = process.env.JWT_SECRET;