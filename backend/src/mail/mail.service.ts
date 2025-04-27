import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: 'email-smtp.us-east-1.amazonaws.com', // Região usada
      port: 465,
      secure: true,
      auth: {
        user: this.configService.get('AWS_SES_ACCESS_KEY'),
        pass: this.configService.get('AWS_SES_SECRET_KEY'),
      },
    });
  }

  async enviarEmailLembrete(destinatario: string, medicamento: string, horario: string) {
    await this.transporter.sendMail({
      from: this.configService.get('AWS_SES_EMAIL_FROM'),
      to: destinatario,
      subject: 'Lembrete de Medicamento',
      html: `
        <h1>Olá!</h1>
        <p>Este é um lembrete para tomar seu medicamento <strong>${medicamento}</strong> no horário <strong>${horario}</strong>.</p>
        <p>Cuide da sua saúde! 💊⏰</p>
      `,
    });
  }
}
