import { Shopping } from './shopping.model';
import { User } from './user.model';

export interface Ticket {
  id: string;
  creationDate?: Date;
  shoppingList?: Shopping[];
  user?: User;
}
