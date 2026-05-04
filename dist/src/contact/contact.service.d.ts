import { PrismaService } from '../prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';
export declare class ContactService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateContactDto): Promise<{
        success: boolean;
        message: string;
        id: number;
    }>;
    findAll(page?: number, limit?: number): Promise<{
        data: {
            name: string;
            email: string;
            message: string;
            isRead: boolean;
            createdAt: Date;
            id: number;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
            unread: number;
        };
    }>;
    markAsRead(id: number): Promise<{
        name: string;
        email: string;
        message: string;
        isRead: boolean;
        createdAt: Date;
        id: number;
    }>;
    remove(id: number): Promise<{
        success: boolean;
        message: string;
    }>;
}
