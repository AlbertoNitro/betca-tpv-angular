import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Shopping } from '../shared/shopping.model';
import { ArticleService } from '../shared/article.service';
import { BudgetService } from '../shared/budget.service';
import { TicketService } from '../shared/ticket.service';
import { TicketCreation } from '../shared/ticket-creation.model';
import { BudgetCreation } from '../shared/budget-creation.model';

@Injectable()
export class ShoppingCartService {
    static SHOPPING_CART_NUM = 4;

    private _total = 0;

    private shoppingCart: Array<Shopping> = new Array();
    private aux: Subject<String> = new BehaviorSubject(undefined);
    private indexShoppingCart = 0;
    private shoppingCartList: Array<Array<Shopping>> = new Array();

    private shoppingCartSubject: Subject<Shopping[]> = new BehaviorSubject(undefined); // subscripcion implica refresh auto

    private budgetCreation: BudgetCreation;

    constructor(private articleService: ArticleService, private ticketService: TicketService, private budgetService: BudgetService) {
        for (let i = 0; i < ShoppingCartService.SHOPPING_CART_NUM; i++) {
            this.shoppingCartList.push(new Array());
        }
        this.budgetCreation = { shoppingCart: null };
    }

    shoppingCartObservable(): Observable<Shopping[]> {
        return this.shoppingCartSubject.asObservable();
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

    getAux(): Observable<String> {
        return this.aux.asObservable();
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

    add(code: string) {
        this.articleService.readObservable(code).subscribe(
            article => {
                const shopping = new Shopping(article.code, article.description, article.retailPrice);
                if (article.code === '1') {
                    shopping.total = Number(code) / 100;
                    shopping.updateDiscount();
                }
                this.shoppingCart.push(shopping);
                this.synchronizeAll();
                this.aux.next('0');

            },
            error => {
                this.aux.next('1');
            },
        );
    }

    exchange(): void {
        this.shoppingCartList[this.indexShoppingCart++] = this.shoppingCart;
        this.indexShoppingCart %= ShoppingCartService.SHOPPING_CART_NUM;
        this.shoppingCart = this.shoppingCartList[this.indexShoppingCart];
        this.synchronizeAll();
    }

    checkOut(ticketCreation: TicketCreation): void {
        ticketCreation.shoppingCart = this.shoppingCart;
        this.ticketService.create(ticketCreation).subscribe(
            blob => {
                this.shoppingCart = new Array();
                this.synchronizeAll();
                const url = window.URL.createObjectURL(blob);
                window.open(url);
            }
        );
    }

    createBudget(): void {
        this.budgetCreation.shoppingCart = this.shoppingCart;
        this.budgetService.create(this.budgetCreation);
    }

}
