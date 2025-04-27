import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { LembreteModule } from './lembrete/lembrete.module';
import { MailService } from './mail/mail.service';

@Module({
  imports: [LembreteModule],
  providers: [PrismaService, MailService],
})
export class AppModule {}























