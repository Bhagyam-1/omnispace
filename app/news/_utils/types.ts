export interface NewsArticleI {
    uuid: string;
    title: string;
    description: string;
    keywords: string;
    snippet: string;
    url: string;
    image_url: string;
    language: string;
    published_at: string;
    source: string;
    categories: NewsArticleCategory[];
    relevance_score: null | number;
    locale?: string;
}

export enum NewsArticleCategory {
    Business = "business",
    Entertainment = "entertainment",
    General = "general",
    Health = "health",
    Science = "science",
    Sports = "sports",
    Technology = "tech",
    Politics = "politics",
    Food = "food",
    Travel = "travel"
}