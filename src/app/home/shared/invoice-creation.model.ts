import { Ticket } from './ticket.model';
import { User } from './user.model';

export interface InvoiceCreation {
    mobile: number;
    ticketId: string;
}
