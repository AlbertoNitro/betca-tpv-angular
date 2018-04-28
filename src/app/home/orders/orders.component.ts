import {Component} from '@angular/core';
import {MatDialog} from '@angular/material';

import {OrderBase} from './order-base.model';
import {OrderService} from './orders.service';
import {OrderCreationEditDialogComponent} from './order-creation-edit-dialog.component';
import {Order} from './order.model';
import {CancelYesDialogComponent} from '../../core/cancel-yes-dialog.component';

@Component({
  templateUrl: 'orders.component.html'
})
export class OrdersComponent {
  static URL = 'orders';

  columns = ['id', 'description', 'providerCompany', 'dateFormat'];
  data: OrderBase[];

  constructor(public dialog: MatDialog, private orderService: OrderService) {
    this.synchronize();
  }

  synchronize() {
    this.orderService.readAll().subscribe(
      ordersBase => {
        this.data = ordersBase;
        this.data.forEach(element =>
          element['dateFormat'] = new Date(element['openingDate']).toISOString().substring(0, 10) + ' - ' +
            (element['closingDate'] ? new Date(element['closingDate']).toISOString().substring(0, 10) : '')
        );
      }
    );
  }

  create(order: Order, edit: boolean) {
    if (!edit) {
      edit = false;
    }
    this.dialog.open(OrderCreationEditDialogComponent,
      {
        width: '1000px',
        data: {edit: edit, order: order}
      }
    ).afterClosed().subscribe(
      () => this.synchronize()
    );
  }

  edit(orderBase: OrderBase) {
    this.orderService.readOne(orderBase.id).subscribe(
      order => this.dialog.open(OrderCreationEditDialogComponent,
        {
          width: '1000px',
          data: {edit: true, order: order}
        }
      ).afterClosed().subscribe(
        orderCopy => {
          if (orderCopy) {
            orderCopy.closingDate = null;
            this.create(orderCopy, false);
          }
          this.synchronize();
        }
      )
    );
  }

  delete(orderBase: OrderBase) {
    this.dialog.open(CancelYesDialogComponent).afterClosed().subscribe(
      result => {
        if (result) {
          this.orderService.delete(orderBase.id).subscribe(
            () => this.synchronize()
          );
        }
      }
    );
  }

}
