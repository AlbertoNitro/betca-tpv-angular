import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MatTableDataSource, MatDialog } from '@angular/material';

import { Shopping } from '../shared/shopping.model';
import { ShoppingCartService } from './shopping-cart.service';
import { TicketService } from '../shared/ticket.service';
import { CheckOutDialogComponent } from './check-out-dialog.component';
import { ArticleQuickCreationDialogComponent } from './article-quick-creation-dialog.component';
import { Article } from '../shared/article.model';


@Component({
    selector: 'app-shopping-cart',
    styleUrls: ['shopping-cart.component.css'],
    templateUrl: 'shopping-cart.component.html'
})
export class ShoppingCartComponent implements OnDestroy {
    displayedColumns = ['id', 'description', 'retailPrice', 'amount', 'discount', 'total', 'committed'];
    dataSource: MatTableDataSource<Shopping>;

    private subscriptionDatasource: Subscription;

    constructor(public shoppingCartService: ShoppingCartService, public dialog: MatDialog) {
        this.subscriptionDatasource = this.shoppingCartService.shoppingCartObservable().subscribe(
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
        this.shoppingCartService.add(code).subscribe(
            article => article,
            error => this.createArticle(code)
        );
    }

    createArticle(code: string) {
        const dialogRef = this.dialog.open(ArticleQuickCreationDialogComponent);
        dialogRef.componentInstance.article = { code: code, description: null, retailPrice: null };
        dialogRef.afterClosed().subscribe(
            isCreatedCode => {
                if (isCreatedCode) {
                    this.add(code);
                }
            }
        );
    }

    checkOut() {
        this.dialog.open(CheckOutDialogComponent, {
            data: {
                total: this.shoppingCartService.total,
                ticketCreation: { cash: 0, card: 0, voucher: 0, shoppingCart: null }
            }
        });
    }

    createBudget() {
        this.shoppingCartService.createBudget();
    }

    exchange() {
        this.shoppingCartService.exchange();
    }

    ngOnDestroy(): void {
        this.subscriptionDatasource.unsubscribe();
    }

}
