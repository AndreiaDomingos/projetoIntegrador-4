// backend/src/app.module.ts

import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { LembreteModule } from './lembrete/lembrete.module';


@Module({
  imports: [LembreteModule],
  providers: [PrismaService],
})
export class AppModule {}

























