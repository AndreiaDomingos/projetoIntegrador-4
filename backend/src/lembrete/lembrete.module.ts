import { Module } from '@nestjs/common';
import { LembreteService } from './lembrete.service';
import { LembreteController } from './lembrete.controller';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service'; // <-- IMPORTAR o MailService

@Module({
  controllers: [LembreteController],
  providers: [LembreteService, PrismaService, MailService], // <-- ADD aqui também
})
export class LembreteModule {}
