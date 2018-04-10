import { Component, Input, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

import { TicketCreation } from '../../shared/ticket-creation.model';
import { User } from '../../shared/user.model';
import { ReservationCreation } from '../../shared/reservation-creation.model';
import { ShoppingCartService } from './shopping-cart.service';
import { UserService } from '../../shared/user.service';
import { VoucherConsumeDialogComponent } from './voucher-consume-dialog.component';

@Component({
    templateUrl: 'check-out-dialog.component.html',
    styles: [`
    .mat-cell {
        overflow: visible;
      }
      .mat-dialog-content {
        display: flex;
        flex-direction: column;
    }`]
})
export class CheckOutDialogComponent {

    total: number;
    user: User;

    requestedInvoice = false;

    ticketCreation: TicketCreation;

    constructor(@Inject(MAT_DIALOG_DATA) data: any, private dialog: MatDialog, public shoppingCartService: ShoppingCartService,
        private userService: UserService) {

        this.total = data.total;
        this.ticketCreation = data.ticketCreation;
    }

    updateUser(user: User) {
        this.user = user;
        if (this.user) {
            this.ticketCreation.userMobile = user.mobile;
        } else {
            this.ticketCreation.userMobile = null;
        }
    }

    private formatNumber(value: number): number {
        return ((value === undefined || value === null) ? 0 : value);
    }

    private formatValues() {
        this.ticketCreation.cash = this.formatNumber(this.ticketCreation.cash);
        this.ticketCreation.card = this.formatNumber(this.ticketCreation.card);
        this.ticketCreation.voucher = this.formatNumber(this.ticketCreation.voucher);
    }

    returnedCash(): number {
        return Math.round(
            (0 + this.formatNumber(this.ticketCreation.cash)
                + this.formatNumber(this.ticketCreation.card)
                + this.formatNumber(this.ticketCreation.voucher)
                - this.total) * 100
        ) / 100;
    }

    fillCard() {
        if (this.returnedCash() < 0) {
            this.ticketCreation.card = -this.returnedCash();
        } else {
            this.ticketCreation.card = this.total;
            this.ticketCreation.cash = 0;
        }
    }

    fillCash() {
        this.ticketCreation.cash = this.formatNumber(this.ticketCreation.cash);
        if (this.returnedCash() < 0 && this.ticketCreation.cash === 0) {
            this.ticketCreation.cash = -this.returnedCash();
        } else if (this.ticketCreation.cash < 20) {
            this.ticketCreation.cash = (Math.round(this.ticketCreation.cash / 5) + 1) * 5;
        } else if (this.ticketCreation.cash < 50) {
            this.ticketCreation.cash = (Math.round(this.ticketCreation.cash / 10) + 1) * 10;
        } else {
            this.ticketCreation.cash = (Math.round(this.ticketCreation.cash / 50) + 1) * 50;
        }
    }

    consumeVoucher() {
        const dialogRef = this.dialog.open(VoucherConsumeDialogComponent);
        dialogRef.afterClosed().subscribe(
            result => this.ticketCreation.voucher += (result > 0 ? result : 0)
        );
    }

    invalidCheckOut(): boolean {
        return (this.total + this.returnedCash()) < this.shoppingCartService.getTotalCommited();
    }

    checkOut() {
        this.formatValues();
        if (this.returnedCash() > 0) {
            this.ticketCreation.cash -= this.returnedCash();
        }
        this.shoppingCartService.checkOut(this.ticketCreation).subscribe(
            () => {
                if (this.requestedInvoice) {
                    this.shoppingCartService.createInvoice(this.ticketCreation.userMobile).subscribe(
                        () => this.dialog.closeAll()
                    );
                } else {
                    this.dialog.closeAll();
                }
            }
        );
    }

    invalidInvoice(): boolean {
        return !this.user || !this.user.dni || !this.user.address || this.returnedCash() < 0;
    }

    invalidReservation(): boolean {
        return (this.total + this.returnedCash()) < this.shoppingCartService.getTotalCommited();
    }

}
