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
exports.VisitorService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let VisitorService = class VisitorService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async recordVisit() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const visitor = await this.prisma.visitor.upsert({
            where: { date: today },
            update: { count: { increment: 1 } },
            create: { date: today, count: 1 },
        });
        return { success: true, todayCount: visitor.count };
    }
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
};
exports.VisitorService = VisitorService;
exports.VisitorService = VisitorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], VisitorService);
//# sourceMappingURL=visitor.service.js.map