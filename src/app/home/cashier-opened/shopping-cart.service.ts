import { Injectable } from '@angular/core';
import { Shopping } from '../shared/shopping.model';
import { ArticleService } from '../shared/article.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { TicketService } from '../shared/ticket.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ShoppingCartService {
    static SHOPPING_CART_NUM = 4;

    private _total = 0;

    private shoppingCart: Array<Shopping> = new Array();

    private shoppingCartList: Array<Array<Shopping>> = new Array();
    private indexShoppingCart = 0;

    private shoppingCartSubject: Subject<Shopping[]> = new BehaviorSubject(undefined); // subscripcion implica refresh auto

    constructor(private articleService: ArticleService, private ticketService: TicketService) {
        for (let i = 0; i < ShoppingCartService.SHOPPING_CART_NUM; i++) {
            this.shoppingCartList.push(new Array());
        }
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
        this._total = total;
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

    add(code: string) {
        this.articleService.readObservable(code).subscribe(
            article => {
                this.shoppingCart.push(new Shopping(code, article.description, article.retailPrice));
                this.synchronizeAll();
            }
        );
    }

    checkOut(): void {
        this.ticketService.createObservable(this.shoppingCart).subscribe(
            data => {
                this.shoppingCart = new Array();
                this.synchronizeAll();
            }
        );
    }

    exchange(): void {
        this.shoppingCartList[this.indexShoppingCart++] = this.shoppingCart;
        this.indexShoppingCart %= ShoppingCartService.SHOPPING_CART_NUM;
        this.shoppingCart = this.shoppingCartList[this.indexShoppingCart];
        this.synchronizeAll();
    }

}
