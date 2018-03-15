import { Shopping } from './shopping.model';

export interface BudgetCreation {
    id?: string;
    shoppingCart: Shopping[];
}
