import nodemailer from 'nodemailer';
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        // user: 'ttesttesting32@gmail.com',
        // pass: 'yzum pmmi xciq ygrz',
        user: emailUser,  // Aquí usas el user del .env
        pass: emailPass,  // Aquí usas el pass del .env
    },
});