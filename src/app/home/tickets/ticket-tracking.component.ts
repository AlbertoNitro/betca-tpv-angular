import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Family } from '../cashier-opened/articles-family/family.model';
import { OrderBase } from '../orders/order-base.model';
import { Order } from '../orders/order.model';
import { TicketTracking } from './ticket-tracking.model';
import { TicketService } from '../shared/ticket.service';
import { OrderService } from '../orders/orders.service';
import { ArticlesFamilyService } from '../shared/articles-family.service';
import { EditTicketDialogComponent } from './edit-ticket-dialog.component';

@Component({
    selector: 'app-tickets',
    templateUrl: 'ticket-tracking.component.html'
})
export class TicketTrackingComponent {
    static URL = 'ticket-tracking';

    orders: OrderBase[];

    families: Family[];
    subfamilies: Family[];


    title = 'Ticket tracking management';
    columns = ['ticketId', 'mobile', 'username', 'articlesEntry', 'articlesNotEntry'];
    data: TicketTracking[];

    constructor(private dialog: MatDialog, private ticketService: TicketService, private orderService: OrderService,
        private articlesFamilyService: ArticlesFamilyService) {

        this.orderService.readAll().subscribe(
            ordersBase => this.orders = ordersBase
        );
        this.articlesFamilyService.findList('root').subscribe(
            families => this.families = families
        );

    }

    nav(id: string) {
        this.articlesFamilyService.findList(id).subscribe(
            families => this.subfamilies = families
        );
    }

    findByOrderId(orderId: string) {
        this.ticketService.findByOrderId(orderId).subscribe(
            ticketTrakingList => this.data = ticketTrakingList
        );
    }

    findByAllTickets() {
        this.ticketService.findByAllTickets().subscribe(
            ticketTrakingList => this.data = ticketTrakingList
        );
    }

    findByFamilyId(familyId: string, subfamilyId: string) {
        const id = (subfamilyId ? subfamilyId : familyId);
        this.ticketService.findByFamilyId(id).subscribe(
            ticketTrakingList => this.data = ticketTrakingList
        );
    }

    edit(ticketTracking: TicketTracking) {
        this.ticketService.readOne(ticketTracking.ticketId).subscribe(
            ticket =>
                this.dialog.open(EditTicketDialogComponent, {
                    width: '900px',
                    data: { ticket: ticket, invoice: null }
                })
        );
    }
}

