// backend/src/lembrete/lembrete.module.ts

import { Module } from '@nestjs/common';
import { LembreteService } from './lembrete.service';
import { LembreteController } from './lembrete.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [LembreteController],
  providers: [LembreteService, PrismaService],
})
export class LembreteModule {}

