import { Provider } from './provider.model';

export interface Article {
    code: string;
    description: string;
    retailPrice?: number;
    reference?: string;
    stock?: number;
    retailPriceMin?: number;
    retailPriceMax?: number;
    provider?: string;
    discontinued?: boolean;
    registrationDate?: Date;
}
