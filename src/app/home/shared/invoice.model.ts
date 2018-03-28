import { Ticket } from './ticket.model';

export interface Invoice {
    id: string;
    creationDate?: Date;
    ticket?: Ticket;
}
