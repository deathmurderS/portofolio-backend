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
export declare class ProjectsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        createdAt: Date;
        id: number;
        title: string;
        description: string;
        emoji: string;
        tags: string[];
        demoUrl: string | null;
        githubUrl: string | null;
        thumbClass: string;
        imageUrl: string | null;
        order: number;
        isVisible: boolean;
        updatedAt: Date;
    }[]>;
    findAllAdmin(): Promise<{
        createdAt: Date;
        id: number;
        title: string;
        description: string;
        emoji: string;
        tags: string[];
        demoUrl: string | null;
        githubUrl: string | null;
        thumbClass: string;
        imageUrl: string | null;
        order: number;
        isVisible: boolean;
        updatedAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        createdAt: Date;
        id: number;
        title: string;
        description: string;
        emoji: string;
        tags: string[];
        demoUrl: string | null;
        githubUrl: string | null;
        thumbClass: string;
        imageUrl: string | null;
        order: number;
        isVisible: boolean;
        updatedAt: Date;
    }>;
    create(dto: CreateProjectDto): Promise<{
        createdAt: Date;
        id: number;
        title: string;
        description: string;
        emoji: string;
        tags: string[];
        demoUrl: string | null;
        githubUrl: string | null;
        thumbClass: string;
        imageUrl: string | null;
        order: number;
        isVisible: boolean;
        updatedAt: Date;
    }>;
    update(id: number, dto: Partial<CreateProjectDto>): Promise<{
        createdAt: Date;
        id: number;
        title: string;
        description: string;
        emoji: string;
        tags: string[];
        demoUrl: string | null;
        githubUrl: string | null;
        thumbClass: string;
        imageUrl: string | null;
        order: number;
        isVisible: boolean;
        updatedAt: Date;
    }>;
    toggleVisibility(id: number): Promise<{
        createdAt: Date;
        id: number;
        title: string;
        description: string;
        emoji: string;
        tags: string[];
        demoUrl: string | null;
        githubUrl: string | null;
        thumbClass: string;
        imageUrl: string | null;
        order: number;
        isVisible: boolean;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<{
        success: boolean;
        message: string;
    }>;
    reorder(ids: number[]): Promise<{
        success: boolean;
        message: string;
    }>;
}
