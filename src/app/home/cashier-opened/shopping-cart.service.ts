import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Shopping } from '../shared/shopping.model';
import { ArticleService } from '../shared/article.service';
import { BudgetService } from '../shared/budget.service';
import { InvoiceService } from '../shared/invoice.service';
import { InvoiceCreation } from '../shared/invoice-creation.model';
import { TicketService } from '../shared/ticket.service';
import { TicketCreation } from '../shared/ticket-creation.model';
import { Budget } from '../shared/budget.model';
import { Article } from '../shared/article.model';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class ShoppingCartService {

    static SHOPPING_CART_NUM = 4;

    private _total = 0;

    private shoppingCart: Array<Shopping> = new Array();
    private _indexShoppingCart = 0;
    private shoppingCartList: Array<Array<Shopping>> = new Array();

    private shoppingCartSubject: Subject<Shopping[]> = new BehaviorSubject(undefined); // subscripcion implica refresh auto

    constructor(private articleService: ArticleService, private ticketService: TicketService,
        private budgetService: BudgetService, public snackBar: MatSnackBar, private invoiceService: InvoiceService) {
        for (let i = 0; i < ShoppingCartService.SHOPPING_CART_NUM; i++) {
            this.shoppingCartList.push(new Array());
        }
    }

    shoppingCartObservable(): Observable<Shopping[]> {
        return this.shoppingCartSubject.asObservable();
    }

    get indexShoppingCart(): number {
        if (this._indexShoppingCart === 0) {
            return undefined;
        } else {
            return this._indexShoppingCart + 1;
        }
    }

    get total() {
        return this._total;
    }

    synchronizeTotal(): void {
        let total = 0;
        for (const shopping of this.shoppingCart) {
            total = total + shopping.total;
        }
        this._total = Math.round(total * 100) / 100;
    }

    private synchronizeAll() {
        this.shoppingCartSubject.next(this.shoppingCart);
        this.synchronizeTotal();
    }

    delete(shopping: Shopping): void {
        const index = this.shoppingCart.indexOf(shopping);
        if (index > -1) {
            this.shoppingCart.splice(index, 1);
        }
        this.synchronizeAll();
    }

    deleteAll() {
        this.shoppingCart = new Array();
        this.synchronizeAll();
    }

    add(code: string): Observable<Article> {
        return this.articleService.readObservable(code).map(
            (article: Article) => {
                const shopping = new Shopping(article.code, article.description, article.retailPrice);
                if (article.code === '1') {
                    shopping.total = Number(code) / 100;
                    shopping.updateDiscount();
                }
                this.shoppingCart.push(shopping);
                this.synchronizeAll();
                return article;
            }
        );
    }

    exchange(): void {
        this.shoppingCartList[this._indexShoppingCart++] = this.shoppingCart;
        this._indexShoppingCart %= ShoppingCartService.SHOPPING_CART_NUM;
        this.shoppingCart = this.shoppingCartList[this._indexShoppingCart];
        this.synchronizeAll();
    }

    checkOut(ticketCreation: TicketCreation): void {
        ticketCreation.shoppingCart = this.shoppingCart;
        this.ticketService.create(ticketCreation).subscribe(
            () => this.reset()
        );
    }

    createBudget(): void {
        const budget: Budget = { shoppingCart: this.shoppingCart };
        this.budgetService.create(budget).subscribe(
            () => this.reset()

        );
    }

    createInvoice(invoiceCreation: InvoiceCreation): void {
        invoiceCreation.shoppingCart = this.shoppingCart;
        this.invoiceService.create(invoiceCreation).subscribe(
            () => this.reset()
        );
    }

    private reset() {
        this.shoppingCart = new Array();
        this.synchronizeAll();
    }

}
