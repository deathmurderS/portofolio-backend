import { VisitorService } from './visitor.service';
export declare class VisitorController {
    private readonly visitorService;
    constructor(visitorService: VisitorService);
    record(): Promise<{
        success: boolean;
        todayCount: number;
    }>;
    stats(): Promise<{
        today: number;
        total: number;
        last30Days: {
            date: string;
            count: number;
        }[];
    }>;
}
