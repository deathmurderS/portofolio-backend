import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
export declare class ContactController {
    private readonly contactService;
    constructor(contactService: ContactService);
    create(dto: CreateContactDto): Promise<{
        success: boolean;
        message: string;
        id: number;
    }>;
    findAll(page?: string, limit?: string): Promise<{
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
