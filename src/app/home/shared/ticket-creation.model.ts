import { Shopping } from './shopping.model';

export interface TicketCreation {
    cash: number;
    card: number;
    voucher: number;
    shoppingCart: Shopping[];
}
