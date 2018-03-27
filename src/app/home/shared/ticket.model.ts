import { Shopping } from './shopping.model';

export interface Ticket {
  id: string;
  creationDate?: Date;
  shoppingList?: Shopping[];
  userId?: string;
}
