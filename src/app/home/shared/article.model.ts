export interface Article {
    code: string;
    reference?: string;
    description: string;
    retailPrice?: number;
    stock?: number;
    retailPriceMin?: number;
    retailPriceMax?: number;
    provider?: string;
}
