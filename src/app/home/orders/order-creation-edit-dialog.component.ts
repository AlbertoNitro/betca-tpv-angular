import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatSnackBar } from '@angular/material';

import { Article } from '../shared/article.model';
import { Provider } from '../shared/provider.model';

import { ArticleService } from '../shared/article.service';
import { ProviderService } from '../shared/provider.service';
import { Order } from './order.model';
import { OrderService } from './orders.service';
import { OrderLine } from './order-line.model';

@Component({
    templateUrl: 'order-creation-edit-dialog.component.html',
    styles: [`.mat-dialog-content {
        display: flex;
        flex-direction: column;
    }`]
})
export class OrderCreationEditDialogComponent {

    edit: boolean;
    order: Order;
    providers: Provider[];

    displayedColumns = ['id', 'articleId', 'stock', 'requiredAmount', 'finalAmount'];
    dataSource: MatTableDataSource<OrderLine>;


    constructor(@Inject(MAT_DIALOG_DATA) data: any, private dialogRef: MatDialogRef<OrderCreationEditDialogComponent>,
        private snackBar: MatSnackBar, private providerService: ProviderService, private orderService: OrderService,
        private articleService: ArticleService) {

        this.order = data.order;
        this.edit = data.edit;
        this.providerService.readAll().subscribe(
            (providers: Provider[]) => this.providers = providers
        );
        if (!this.order) {
            this.order = { id: undefined, description: undefined, providerCompany: undefined, ordersLine: new Array() };
        }
        this.dataSource = new MatTableDataSource<OrderLine>(this.order.ordersLine);
    }

    synchronize(): void {

    }

    isActionCompleted() {
        return this.order.description && this.order.providerId && this.order.ordersLine.length > 0;
    }

    create(): void {
        this.orderService.create(this.order).subscribe(
            () => this.dialogRef.close()
        );
    }

    createCopy() {
        this.dialogRef.close(this.order);
    }

    orderEntry(): void {
        this.orderService.close(this.order).subscribe(
            () => this.dialogRef.close()
        );
    }

    findArticle(code: string) {
        this.articleService.readOne(code).subscribe(
            article => {
                if (article.provider !== this.order.providerId) {
                    this.snackBar.open('Article provider is different', 'Error', {
                        duration: 3000
                    });
                } else {
                    this.order.ordersLine.push(
                        {
                            articleId: code, articleDescription: article.description, stock: article.stock,
                            requiredAmount: 1, finalAmount: 1
                        });
                    this.dataSource = new MatTableDataSource<OrderLine>(this.order.ordersLine);
                }
            }
        );
    }
}
