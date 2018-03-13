import { Shopping } from './shopping.model';

export interface Ticket {
  id: String;
  creationDate: Date;
  reference: String;
  cashDeposited: number;
  shoppingList: Shopping[];
}
