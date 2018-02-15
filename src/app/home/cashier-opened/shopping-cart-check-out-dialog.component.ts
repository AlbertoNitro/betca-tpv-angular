import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';

import { CashierClosure } from '../shared/cashier-closure.model';
import { TicketCreation } from '../shared/ticket-creation.model';
import { CashierService } from '../shared/cashier.service';
import { ShoppingCartService } from './shopping-cart.service';
import { UserService } from '../shared/user.service';
import { UserQuickCreationDialogComponent } from './user-quick-creation-dialog.component';

@Component({
    templateUrl: 'shopping-cart-check-out-dialog.component.html',
    styles: [`.mat-dialog-content {
        display: flex;
        flex-direction: column;
    }`]
})
export class ShoppingCartCheckOutDialogComponent {

    @Input() total: number;
    ticketCreation: TicketCreation;
    foundMobile = undefined;

    constructor(public dialog: MatDialog, public shoppingCartService: ShoppingCartService, private userService: UserService) {
        this.ticketCreation = { userMobile: undefined, cash: 0, card: 0, voucher: 0, shoppingCart: null };
    }

    invalidCheckOut(): boolean {
        return this.return() < 0 || (this.foundMobile === false);
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
        if (this.foundMobile) {
            this.ticketCreation.userMobile = undefined;
            this.foundMobile = undefined;
        } else {
            this.userService.readObservable(this.ticketCreation.userMobile).subscribe(
                data => this.foundMobile = true,
                error => this.createUser()
            );
        }
    }

    private createUser() {
        const dialogRef = this.dialog.open(UserQuickCreationDialogComponent);
        dialogRef.componentInstance.mobile = this.ticketCreation.userMobile;
        dialogRef.afterClosed().subscribe(
            result => {
                if (result) {
                    this.foundMobile = true;
                } else {
                    this.foundMobile = false;
                }
            }
        );
    }
}

