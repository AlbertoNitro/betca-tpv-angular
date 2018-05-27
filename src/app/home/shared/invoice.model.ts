import {Ticket} from './ticket.model';
import {User} from './user.model';

export interface Invoice {
  id: string;
  baseTax?: number;
  tax?: number;
  creationDate?: Date;
  user?: User;
  ticket?: Ticket;
}
