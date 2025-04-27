import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLembreteDto } from './dto/create-lembrete.dto';
import { UpdateLembreteDto } from './dto/update-lembrete.dto';

@Injectable()
export class LembreteService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateLembreteDto) {
    return this.prisma.lembrete.create({ data });
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

