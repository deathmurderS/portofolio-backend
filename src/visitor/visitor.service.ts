// src/visitor/visitor.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VisitorService {
  constructor(private readonly prisma: PrismaService) {}

  // ── Catat kunjungan hari ini ──────────────
  async recordVisit() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Upsert: kalau record hari ini sudah ada, tambah count
    // kalau belum ada, buat baru dengan count = 1
    const visitor = await this.prisma.visitor.upsert({
      where: { date: today },
      update: { count: { increment: 1 } },
      create: { date: today, count: 1 },
    });

    return { success: true, todayCount: visitor.count };
  }

  // ── Statistik kunjungan ───────────────────
  async getStats() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [todayRecord, totalResult, last30Days] = await Promise.all([
      this.prisma.visitor.findUnique({ where: { date: today } }),
      this.prisma.visitor.aggregate({ _sum: { count: true } }),
      this.prisma.visitor.findMany({
        where: { date: { gte: thirtyDaysAgo } },
        orderBy: { date: 'asc' },
      }),
    ]);

    return {
      today: todayRecord?.count ?? 0,
      total: totalResult._sum.count ?? 0,
      last30Days: last30Days.map((v) => ({
        date: v.date.toISOString().split('T')[0],
        count: v.count,
      })),
    };
  }
}
