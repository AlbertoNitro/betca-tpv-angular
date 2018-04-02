export interface ClosedCashier {
    id: string;
    openingDate: Date;
    openingDateFormat?: string;
    initialCash: number;
    salesCash: number;
    salesCard: number;
    deposit: number;
    withdrawal: number;
    comment: string;
    closureDate: Date;
}
