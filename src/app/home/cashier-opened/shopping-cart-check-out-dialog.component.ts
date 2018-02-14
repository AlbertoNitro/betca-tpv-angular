import { Component, Input } from '@angular/core';
import { CashierClosure } from '../shared/cashier-closure.model';
import { CashierService } from '../shared/cashier.service';
import { ShoppingCartService } from './shopping-cart.service';
import { TicketCreation } from '../shared/ticket-creation.model';

@Component({
    templateUrl: 'shopping-cart-check-out-dialog.component.html',
    styles: [`.mat-dialog-content {
        display: flex;
        flex-direction: column;
    }`]
})
export class ShoppingCartCheckOutDialogComponent {

    @Input() total: number;
    mobile: number;
    foundMobile = false;


    ticketCreation: TicketCreation;


    constructor(public shoppingCartService: ShoppingCartService) {
        this.ticketCreation = { cash: 0, card: 0, voucher: 0, shoppingCart: null };
    }

    checkOut() {
        this.shoppingCartService.checkOut(this.ticketCreation);
    }

    findUser() {
        if (!this.foundMobile && this.mobile) {
            if (this.mobile === 1) {
                this.foundMobile = true;
            } else {
                console.log('>>>> ' + this.mobile + 'no encontrado');
            }
        } else {
            this.mobile = undefined;
            this.foundMobile = false;
        }

    }
}
