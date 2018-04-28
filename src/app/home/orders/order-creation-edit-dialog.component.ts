import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar, MatTableDataSource} from '@angular/material';

import {Article} from '../shared/article.model';
import {Provider} from '../shared/provider.model';
import {Order} from './order.model';
import {OrderLine} from './order-line.model';
import {ArticleService} from '../shared/article.service';
import {ProviderService} from '../shared/provider.service';
import {OrderService} from './orders.service';

@Component({
  templateUrl: 'order-creation-edit-dialog.component.html',
  styleUrls: ['orders.component.css']
})
export class OrderCreationEditDialogComponent {

  edit: boolean;
  order: Order;
  providers: Provider[];

  displayedColumns = ['id', 'articleId', 'description', 'stock', 'requiredAmount', 'finalAmount', 'actions'];
  dataSource: MatTableDataSource<OrderLine>;

  article: Article;


  constructor(@Inject(MAT_DIALOG_DATA) data: any, private dialogRef: MatDialogRef<OrderCreationEditDialogComponent>,
              public dialog: MatDialog, private snackBar: MatSnackBar, private providerService: ProviderService,
              private orderService: OrderService, private articleService: ArticleService) {

    this.order = data.order;
    this.edit = data.edit;
    this.providerService.readAll().subscribe(
      (providers: Provider[]) => this.providers = providers
    );
    if (!this.order) {
      this.order = {id: undefined, description: undefined, providerCompany: undefined, ordersLine: []};
    }
    this.dataSource = new MatTableDataSource<OrderLine>(this.order.ordersLine);
  }

  synchronize(): void {
    this.article = {code: null, provider: this.order.providerId};
    this.order.ordersLine = [];
    this.dataSource = new MatTableDataSource<OrderLine>(this.order.ordersLine);
  }

  isActionCompleted() {
    return this.order.description && this.order.providerId && this.order.ordersLine.length > 0;
  }

  create(): void {
    this.orderService.create(this.order).subscribe(
      () => this.dialogRef.close()
    );
  }

  update(): void {
    this.orderService.update(this.order).subscribe(
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

  add(article: Article) {
    this.order.ordersLine.push(
      {
        articleId: article.code, articleDescription: article.description, stock: article.stock,
        requiredAmount: 1, finalAmount: 1
      });
    this.dataSource = new MatTableDataSource<OrderLine>(this.order.ordersLine);
  }

  onDelete(orderLine: OrderLine) {
    const index = this.order.ordersLine.indexOf(orderLine);
    if (index > -1) {
      this.order.ordersLine.splice(index, 1);
    }
    this.dataSource = new MatTableDataSource<OrderLine>(this.order.ordersLine);
  }
}
