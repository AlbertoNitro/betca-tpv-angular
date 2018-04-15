export interface OrderBase {
    id: string;
    description: string;
    providerCompany: string;
    openingDate?: Date;
    closingDate?: Date;
    dateFormat?: string;
}
