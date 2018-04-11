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

    private subscriptionDatasource: Subscription;

    constructor(private dialog: MatDialog, private shoppingCartService: ShoppingCartService) {
        this.subscriptionDatasource = this.shoppingCartService.shoppingCartObservable().subscribe(
            data => {
                this.dataSource = new MatTableDataSource<Shopping>(data);
            }
        );

    }

    indexShoppingCart(): number {
        return this.shoppingCartService.indexShoppingCart;
    }

    updateAmount(shopping: Shopping, event: any) {
        shopping.amount = Number(event.target.value.replace(/[^0-9]/g, ''));
        shopping.updateTotal();
        this.shoppingCartService.synchronizeCartTotal();
    }

    priceLabel(shopping: Shopping) {
        if (shopping.code === '1') {
            return shopping.total;
        } else {
            return shopping.retailPrice;
        }
    }

    discountLabel(shopping: Shopping): string {
        if (shopping.code === '1') {
            return '';
        } else {
            return '' + shopping.discount;
        }
    }

    updateDiscount(shopping: Shopping, event: any): void {
        if (shopping.code !== '1') {
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

    total(): number {
        return this.shoppingCartService.total;
    }

    delete(shopping: Shopping) {
        this.shoppingCartService.delete(shopping);
    }

    add(code: string) {
        this.shoppingCartService.add(code).subscribe(
            article => { },
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

    stockLabel(): string {
        if (this.shoppingCartService.lastArticle) {
            return 'Stock of ' + this.shoppingCartService.lastArticle.description;
        } else {
            return 'Stock';
        }
    }

    stockValue(): number {
        if (this.shoppingCartService.lastArticle) {
            return this.shoppingCartService.lastArticle.stock;
        } else {
            return null;
        }
    }

    updateStock(stock: number) {
        this.shoppingCartService.updateStock(stock);
    }

    ngOnDestroy(): void {
        this.subscriptionDatasource.unsubscribe();
    }

}
