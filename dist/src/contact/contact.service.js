"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ContactService = class ContactService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const recentCount = await this.prisma.contact.count({
            where: {
                email: dto.email,
                createdAt: { gte: oneDayAgo },
            },
        });
        if (recentCount >= 3) {
            throw new common_1.BadRequestException('Terlalu banyak pesan dari email ini. Coba lagi besok ya!');
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
    async markAsRead(id) {
        return this.prisma.contact.update({
            where: { id },
            data: { isRead: true },
        });
    }
    async remove(id) {
        await this.prisma.contact.delete({ where: { id } });
        return { success: true, message: 'Pesan dihapus.' };
    }
};
exports.ContactService = ContactService;
exports.ContactService = ContactService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ContactService);
//# sourceMappingURL=contact.service.js.map