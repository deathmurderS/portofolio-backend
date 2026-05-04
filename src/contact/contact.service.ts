// src/contact/contact.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  constructor(private readonly prisma: PrismaService) {}

  // ── Kirim pesan baru ─────────────────────
  async create(dto: CreateContactDto) {
    // Cek spam: email yang sama tidak bisa kirim lebih dari 3x dalam 24 jam
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentCount = await this.prisma.contact.count({
      where: {
        email: dto.email,
        createdAt: { gte: oneDayAgo },
      },
    });

    if (recentCount >= 3) {
      throw new BadRequestException(
        'Terlalu banyak pesan dari email ini. Coba lagi besok ya!',
      );
    }

    const contact = await this.prisma.contact.create({
      data: {
        name: dto.name.trim(),
        email: dto.email.toLowerCase().trim(),
        message: dto.message.trim(),
      },
    });

    return {
      success: true,
      message: '🎉 Pesan berhasil dikirim! Terima kasih telah menghubungi saya.',
      id: contact.id,
    };
  }

  // ── Ambil semua pesan (admin) ─────────────
  async findAll(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      this.prisma.contact.findMany({
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.contact.count(),
    ]);

    return {
      data: items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        unread: await this.prisma.contact.count({ where: { isRead: false } }),
      },
    };
  }

  // ── Tandai pesan sudah dibaca ─────────────
  async markAsRead(id: number) {
    return this.prisma.contact.update({
      where: { id },
      data: { isRead: true },
    });
  }

  // ── Hapus pesan ───────────────────────────
  async remove(id: number) {
    await this.prisma.contact.delete({ where: { id } });
    return { success: true, message: 'Pesan dihapus.' };
  }
}
