// src/projects/projects.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface CreateProjectDto {
  title: string;
  description: string;
  emoji?: string;
  tags?: string[];
  demoUrl?: string;
  githubUrl?: string;
  thumbClass?: string;
  imageUrl?: string;
  order?: number;
  isVisible?: boolean;
}

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  // ── Ambil semua proyek (public) ───────────
  async findAll() {
    return this.prisma.project.findMany({
      where: { isVisible: true },
      orderBy: { order: 'asc' },
    });
  }

  // ── Ambil semua (admin, termasuk yg hidden) ─
  async findAllAdmin() {
    return this.prisma.project.findMany({
      orderBy: { order: 'asc' },
    });
  }

  // ── Ambil satu proyek ─────────────────────
  async findOne(id: number) {
    const project = await this.prisma.project.findUnique({ where: { id } });
    if (!project) throw new NotFoundException(`Proyek #${id} tidak ditemukan`);
    return project;
  }

  // ── Buat proyek baru ──────────────────────
  async create(dto: CreateProjectDto) {
    return this.prisma.project.create({ data: dto });
  }

  // ── Update proyek ─────────────────────────
  async update(id: number, dto: Partial<CreateProjectDto>) {
    await this.findOne(id); // lempar 404 jika tidak ada
    return this.prisma.project.update({
      where: { id },
      data: dto,
    });
  }

  // ── Toggle visibility ─────────────────────
  async toggleVisibility(id: number) {
    const project = await this.findOne(id);
    return this.prisma.project.update({
      where: { id },
      data: { isVisible: !project.isVisible },
    });
  }

  // ── Hapus proyek ──────────────────────────
  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.project.delete({ where: { id } });
    return { success: true, message: `Proyek #${id} dihapus.` };
  }

  // ── Reorder (drag & drop order) ───────────
  async reorder(ids: number[]) {
    const updates = ids.map((id, index) =>
      this.prisma.project.update({
        where: { id },
        data: { order: index + 1 },
      }),
    );
    await this.prisma.$transaction(updates);
    return { success: true, message: 'Urutan proyek diperbarui.' };
  }
}
