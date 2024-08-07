import { HttpException, Injectable } from '@nestjs/common';
import { UsersAPIErrors } from 'src/utils/dictMessages';
import { createTransport, Transporter } from 'nodemailer';
@Injectable()
export class EmailService {
  private transporter: Transporter;
  constructor() {
    this.transporter = createTransport({
      host: 'smtp.resend.com',
      port: 465,
      secure: true,
      auth: {
        user: 'resend',
        pass: process.env.RESEND_API_KEY,
      },
    });
  }

  async sendEmail(
    to: string,
    templateId: string,
    data: any = {},
  ): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: '"Inlaze Movies 🎬" <inlaze.movies@kesdevs.com>',
        to,
        subject: 'Verificación de correo electronico ✉️✔',
        text: '¡Gracias por registrarte!',
        html: `<div style="background-color: white; color: black;">
        <h1>Bienvenido a Inlaze movies</h1>
        <p>Para activar tu cuenta, veifica tu correo electrónico dando click al botón</p>
        <a style="font-size: 45px; font-weight: 900;" href="kesdevs.com/verify/${data?.code || '123456'}">Verificar correo</a>
        </div>`,
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(UsersAPIErrors['errorSendEmail'], 500);
    }
  }
}
