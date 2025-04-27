import { IsBoolean, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateLembreteDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsInt()
  idade: number;

  @IsBoolean()
  notificacao: boolean;

  @IsOptional()
  @IsString()
  telefone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsString()
  @IsNotEmpty()
  medicamento: string;

  @IsString()
  @IsNotEmpty()
  dose: string;

  @IsInt()
  dias: number;

  @IsString()
  @IsNotEmpty()
  horario: string;
}
