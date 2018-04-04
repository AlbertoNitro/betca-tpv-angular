import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MatTableDataSource, MatDialog } from '@angular/material';

import { Shopping } from '../../shared/shopping.model';
import { ShoppingCartService } from './shopping-cart.service';
import { CheckOutDialogComponent } from './check-out-dialog.component';
import { ArticleQuickCreationDialogComponent } from './article-quick-creation-dialog.component';

@Component({
    selector: 'app-shopping-cart',
    styleUrls: ['shopping-cart.component.css'],
    templateUrl: 'shopping-cart.component.html'
})
export class ShoppingCartComponent implements OnDestroy {
    displayedColumns = ['id', 'description', 'retailPrice', 'amount', 'discount', 'total', 'actions'];
    dataSource: MatTableDataSource<Shopping>;

    stockLabel: string;
    stock: number;

    private subscriptionDatasource: Subscription;

    constructor(public shoppingCartService: ShoppingCartService, public dialog: MatDialog) {
        this.resetStock();
        this.subscriptionDatasource = this.shoppingCartService.shoppingCartObservable().subscribe(
            data => {
                this.dataSource = new MatTableDataSource<Shopping>(data);
            }
        );

    }

    resetStock() {
        this.stockLabel = 'Stock';
        this.stock = null;
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
            article => {
                this.stockLabel = `Stock of ${article.description} (code: ${article.code})`;
                this.stock = article.stock;
            },
            error => {
                this.createArticle(code);
                this.stock = null;
            }
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
        this.resetStock();
        this.dialog.open(CheckOutDialogComponent, {
            data: {
                total: this.shoppingCartService.total,
                ticketCreation: { cash: 0, card: 0, voucher: 0, shoppingCart: null }
            }
        });
    }

    createBudget() {
        this.resetStock();
        this.shoppingCartService.createBudget();
    }

    exchange() {
        this.shoppingCartService.exchange();
    }

    ngOnDestroy(): void {
        this.subscriptionDatasource.unsubscribe();
    }

}
