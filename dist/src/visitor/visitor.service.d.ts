import { PrismaService } from '../prisma/prisma.service';
export declare class VisitorService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    recordVisit(): Promise<{
        success: boolean;
        todayCount: number;
    }>;
    getStats(): Promise<{
        today: number;
        total: number;
        last30Days: {
            date: string;
            count: number;
        }[];
    }>;
}
