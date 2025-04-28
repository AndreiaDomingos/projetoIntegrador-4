import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLembreteDto } from './dto/create-lembrete.dto';
import { UpdateLembreteDto } from './dto/update-lembrete.dto';
import { MailService } from '../mail/mail.service'; // <- importamos o MailService
import { SmsService } from '../sms/sms.service'; // <- importamos o SmsService

@Injectable()
export class LembreteService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService, // <- injetamos o MailService aqui
    private smsService: SmsService, // <- injetamos o SmsService aqui
  ) {}

  async create(data: CreateLembreteDto) {
    const lembrete = await this.prisma.lembrete.create({ data });

    // Envia e-mail se a notificação estiver marcada e houver e-mail preenchido
    if (data.notificacao && data.email) {
      await this.mailService.enviarEmailLembrete(
        data.email,
        data.medicamento,
        data.horario,
      );
    }
  // Envia SMS se a notificação estiver marcada e houver telefone preenchido
    if (data.telefone) {
      await this.smsService.enviarSms(
        data.telefone,
        data.medicamento,
        data.horario,
      );
    }

    return lembrete;
  }

  async findAll() {
    return this.prisma.lembrete.findMany();
  }

  async findOne(id: number) {
    return this.prisma.lembrete.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateLembreteDto) {
    return this.prisma.lembrete.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.lembrete.delete({ where: { id } });
  }
}
