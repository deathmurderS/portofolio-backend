// src/contact/dto/create-contact.dto.ts
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty({ message: 'Nama tidak boleh kosong' })
  @MaxLength(100, { message: 'Nama maksimal 100 karakter' })
  name: string;

  @IsEmail({}, { message: 'Format email tidak valid' })
  @IsNotEmpty({ message: 'Email tidak boleh kosong' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Pesan tidak boleh kosong' })
  @MinLength(10, { message: 'Pesan minimal 10 karakter' })
  @MaxLength(2000, { message: 'Pesan maksimal 2000 karakter' })
  message: string;
}
