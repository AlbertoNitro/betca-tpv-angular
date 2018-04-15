import { OrderBase } from './order-base.model';
import { OrderLine } from './order-line.model';

export interface Order extends OrderBase {
    providerId?: string;
    ordersLine: OrderLine[];
}
