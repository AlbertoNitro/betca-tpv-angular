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

    updateAmount(shopping: Shopping, event: any) {
        shopping.amount = Number(event.target.value.replace(/[^0-9]/g, ''));
        shopping.updateTotal();
        this.shoppingCartService.synchronizeCartTotal();
    }

    updateDiscount(shopping: Shopping, event: any): void {
        shopping.discount = Number(event.target.value);
        if (shopping.discount < 0) {
            shopping.discount = 0;
        }
        if (shopping.discount > 100) {
            shopping.discount = 100;
        }
        shopping.updateTotal();
        this.shoppingCartService.synchronizeCartTotal();
    }

    updateTotal(shopping: Shopping, event: any): void {
        shopping.total = Number(event.target.value);
        if (shopping.total < 0) {
            shopping.total = 0;
        }
        if (shopping.total > shopping.retailPrice) {
            shopping.total = shopping.retailPrice;
        }
        shopping.updateDiscount();
        this.shoppingCartService.synchronizeCartTotal();
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
