import { Shopping } from './shopping.model';

export interface Ticket {
  id: string;
  creationDate: Date;
  reference?: String;
  cashDeposited?: number;
  shoppingList?: Shopping[];
}
