import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { OrderBase } from './order.model';
import { OrderService } from './orders.service';
import { ProviderService } from '../shared/provider.service';

@Component({
    templateUrl: `orders.component.html`
})
export class OrdersComponent {
    static URL = 'orders';

    columns = ['description', 'providerCompany', 'openingDateFormat'];
    data: OrderBase[];

    constructor(public dialog: MatDialog, private orderService: OrderService, private providerService: ProviderService) {
        this.syncronize();
    }

    syncronize() {
        this.orderService.readAll().subscribe(
            ordersBase => {
                this.data = ordersBase;
            }
        );
    }

    create() {
    }

    edit(orderBase: OrderBase) {
    }
}
