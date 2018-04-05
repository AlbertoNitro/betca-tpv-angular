import { FamilyType } from './family-type.model';

export interface Family {
    id?: string;
    reference?: string;
    description: string;
    stock?: number;
    familyType?: FamilyType;
    articleId?: string;
}
