export interface ClosedCashier {
    id: string;
    openingDate: Date;
    openingDateFormat?: string;
    initialCash: number;
    usedVouchers: number;
    salesCash: number;
    salesCard: number;
    salesTotal: number;
    deposit: number;
    withdrawal: number;
    finalCash: number;
    comment: string;
    closureDate: Date;
}
