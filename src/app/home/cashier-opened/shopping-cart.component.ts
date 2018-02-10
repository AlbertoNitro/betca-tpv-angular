import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MatTableDataSource, MatDialog } from '@angular/material';

import { Shopping } from '../shared/shopping.model';
import { ShoppingCartService } from './shopping-cart.service';
import { TicketService } from '../shared/ticket.service';
import { ShoppingCartCheckOutDialogComponent } from './shopping-cart-check-out-dialog.component';


@Component({
    selector: 'app-shopping-cart',
    styleUrls: ['shopping-cart.component.css'],
    templateUrl: 'shopping-cart.component.html'
})
export class ShoppingCartComponent implements OnDestroy {
    displayedColumns = ['id', 'description', 'retailPrice', 'amount', 'discount', 'total', 'committed'];
    dataSource: MatTableDataSource<Shopping>;

    private subscription: Subscription;

    constructor(public shoppingCartService: ShoppingCartService, public dialog: MatDialog) {
        this.subscription = this.shoppingCartService.shoppingCartObservable().subscribe(
            data => {
                this.dataSource = new MatTableDataSource<Shopping>(data);
            }
        );
    }

    update(shopping: Shopping, event: any, column: string): void {
        shopping[column] = Number(event.target.value);
        if (column === 'total') {
            shopping.updateDiscount();
        } else {
            shopping.updateTotal();
        }
        this.shoppingCartService.synchronizeTotal();
    }

    changeCommitted(shopping: Shopping) {
        shopping.committed = !shopping.committed;
    }

    delete(shopping: Shopping) {
        this.shoppingCartService.delete(shopping);
    }

    add(code: string) {
        this.shoppingCartService.add(code);
    }

    checkOut() {
        this.dialog.open(ShoppingCartCheckOutDialogComponent).componentInstance.total = this.shoppingCartService.total;
    }

    exchange() {
        this.shoppingCartService.exchange();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

}
