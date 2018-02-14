import { Component, Input } from '@angular/core';
import { CashierClosure } from '../shared/cashier-closure.model';
import { CashierService } from '../shared/cashier.service';
import { ShoppingCartService } from './shopping-cart.service';
import { TicketCreation } from '../shared/ticket-creation.model';
import { UserQuickCreationDialogComponent } from './user-quick-creation-dialog.component';
import { MatDialog } from '@angular/material';

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


    constructor(public dialog: MatDialog, public shoppingCartService: ShoppingCartService) {
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

