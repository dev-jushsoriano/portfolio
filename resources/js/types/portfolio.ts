export type ProjectCategory = 'web' | 'system' | 'design';

export interface PortfolioProject {
    id: number;
    title: string;
    slug: string;
    category: ProjectCategory;
    client: string | null;
    summary: string;
    users_scale: string | null;
    tech_stack: string[];
    cover_image_url: string | null;
    icon: string | null;
    live_url: string | null;
    is_confidential: boolean;
    is_featured: boolean;
}
