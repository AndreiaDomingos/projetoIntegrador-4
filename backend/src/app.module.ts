import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { LembreteModule } from './lembrete/lembrete.module';
import { MailService } from './mail/mail.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), LembreteModule],
  providers: [PrismaService, MailService],
})
export class AppModule {}























