import { IsBoolean, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, IsNumber, Min, IsIn, IsDateString } from 'class-validator';

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

  @IsNumber()
  @Min(0.1)
  doseValor: number;

  @IsString()
  @IsIn(['ml', 'g', 'cápsula', 'comprimido', 'gotas'])
  doseUnidade: string;

  @IsBoolean()
  usoContinuo: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)  // Permite zero se quiser
  dias?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  intervalo?: number;

  @IsString()
  @IsNotEmpty()
  horario: string;

  @IsOptional()
  @IsDateString()
  usoInicio?: string;  // Data no formato ISO, pois no DTO usamos string para datas
}

