export interface OrderBase {
    id: string;
    description: string;
    providerCompany: string;
    openingDate: Date;
    openingDateFormat?: string;
}
