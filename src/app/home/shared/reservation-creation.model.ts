import { Shopping } from './shopping.model';

export interface ReservationCreation {
    userMobile?: number;
    cash: number;
    card: number;
    voucher: number;
    shoppingCart: Shopping[];
}
