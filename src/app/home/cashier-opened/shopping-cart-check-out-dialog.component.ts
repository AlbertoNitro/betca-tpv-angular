import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';

import { CashierClosure } from '../shared/cashier-closure.model';
import { TicketCreation } from '../shared/ticket-creation.model';
import { CashierService } from '../shared/cashier.service';
import { ShoppingCartService } from './shopping-cart.service';
import { UserQuickCreationDialogComponent } from './user-quick-creation-dialog.component';

import { UserService } from './user.service';

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


    constructor(public dialog: MatDialog, public shoppingCartService: ShoppingCartService, private userService: UserService) {
        this.ticketCreation = { cash: 0, card: 0, voucher: 0, shoppingCart: null };
    }

    return(): number {
        return Math.round(
            ((this.ticketCreation.cash + this.ticketCreation.card + this.ticketCreation.voucher) - this.total) * 100
        ) / 100;
    }

    fill(type: string) {
        this.ticketCreation.cash = 0;
        this.ticketCreation.card = 0;
        this.ticketCreation.voucher = 0;
        this.ticketCreation[type] = this.total;
    }

    checkOut() {
        this.shoppingCartService.checkOut(this.ticketCreation);
    }

    findUser() {
        if (!this.foundMobile && this.mobile) {
            if (this.userService.findUser(this.mobile)) {
                this.foundMobile = true;
            } else {
                const dialogRef = this.dialog.open(UserQuickCreationDialogComponent);
                dialogRef.componentInstance.mobile = this.mobile;
                dialogRef.afterClosed().subscribe(
                    result => {
                        if (result) {
                            this.foundMobile = true;
                        }
                    }
                );
            }
        } else {
            this.mobile = undefined;
            this.foundMobile = false;
        }
    }
}

