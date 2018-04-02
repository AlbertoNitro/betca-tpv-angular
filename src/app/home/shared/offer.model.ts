export interface Offer {
    code: number;
    percentage: number;
    expiration: Date;
    creationDate?: Date;
    description?: string;
}
