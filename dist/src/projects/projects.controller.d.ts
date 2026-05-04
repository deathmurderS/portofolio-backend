import { ProjectsService, CreateProjectDto } from './projects.service';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
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
    reorder(ids: number[]): Promise<{
        success: boolean;
        message: string;
    }>;
    remove(id: number): Promise<{
        success: boolean;
        message: string;
    }>;
}
