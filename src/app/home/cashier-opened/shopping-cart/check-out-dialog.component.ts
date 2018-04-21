import { Component, Input, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

import { TicketCreation } from '../../shared/ticket-creation.model';
import { User } from '../../shared/user.model';
import { UserService } from '../../shared/user.service';
import { VoucherService } from '../../shared/voucher.service';
import { ShoppingCartService } from './shopping-cart.service';
import { VoucherConsumeDialogComponent } from './voucher-consume-dialog.component';

@Component({
    templateUrl: 'check-out-dialog.component.html',
    styleUrls: ['shopping-cart.component.css']
})
export class CheckOutDialogComponent {

    total: number;
    user: User;

    requestedInvoice = false;

    ticketCreation: TicketCreation;

    constructor(@Inject(MAT_DIALOG_DATA) data: any, private dialog: MatDialog, public shoppingCartService: ShoppingCartService,
        private userService: UserService, private voucheService: VoucherService) {

        this.total = data.total;
        this.ticketCreation = data.ticketCreation;

        if (this.shoppingCartService.getReturned() > 0) {
            this.ticketCreation.voucher = this.shoppingCartService.getReturned();
            this.total = this.total + this.ticketCreation.voucher;
        }
    }

    updateUser(user: User) {
        this.user = user;
        if (this.user) {
            this.ticketCreation.userMobile = user.mobile;
        } else {
            this.ticketCreation.userMobile = null;
        }
    }

    uncommited() {
        return this.shoppingCartService.uncommitArticlesExist();
    }

    totalCommited() {
        return this.shoppingCartService.getTotalCommited();
    }

    warning(): boolean {
        return (!this.ticketCreation.userMobile) && this.shoppingCartService.uncommitArticlesExist();
    }

    private formatNumber(value: number): number {
        return ((value === undefined || value === null) ? 0 : value);
    }

    private formatValues() {
        this.ticketCreation.cash = this.formatNumber(this.ticketCreation.cash);
        this.ticketCreation.card = this.formatNumber(this.ticketCreation.card);
        this.ticketCreation.voucher = this.formatNumber(this.ticketCreation.voucher);
    }

    returnedAmount(): number {
        return Math.round(
            (0 + this.formatNumber(this.ticketCreation.cash)
                + this.formatNumber(this.ticketCreation.card)
                + this.formatNumber(this.ticketCreation.voucher)
                - this.total) * 100
        ) / 100;
    }

    returnedCash(): number {
        if (this.ticketCreation.cash >= this.returnedAmount()) {
            return this.returnedAmount();
        } else {
            return this.ticketCreation.cash;
        }
    }

    fillCard() {
        if (this.returnedAmount() < 0) {
            this.ticketCreation.card = -this.returnedAmount();
        } else {
            this.ticketCreation.card = this.total;
            this.ticketCreation.cash = 0;
        }
    }

    fillCash() {
        this.ticketCreation.cash = this.formatNumber(this.ticketCreation.cash);
        if (this.returnedAmount() < 0 && this.ticketCreation.cash === 0) {
            this.ticketCreation.cash = -this.returnedAmount();
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
        return (this.total + this.returnedAmount()) < this.shoppingCartService.getTotalCommited();
    }

    checkOut() {
        const returned = this.returnedAmount();
        const cash = this.ticketCreation.cash;
        let voucher = 0;
        this.formatValues();
        if (returned > 0) {
            this.ticketCreation.cash -= returned;
        }

        if (this.ticketCreation.cash < 0) {
            voucher = -this.ticketCreation.cash;
            this.ticketCreation.cash = 0;
        }

        this.ticketCreation.note = '';
        if (this.ticketCreation.card > 0) {
            this.ticketCreation.note += ' Abonado con Tarjeta: ' + Math.round(this.ticketCreation.card * 100) / 100 + '.';
        }
        if (this.ticketCreation.voucher > 0) {
            this.ticketCreation.note += ' Abonado con vale: ' + Math.round(this.ticketCreation.voucher * 100) / 100 + '.';
        }
        if (this.ticketCreation.cash > 0) {
            this.ticketCreation.note += ' Abonado en efectivo: ' + Math.round(cash * 100) / 100 + '.';
        }
        if (returned > 0) {
            this.ticketCreation.note += ' Devuelto: ' + Math.round(returned * 100) / 100 + '.';
        }
        this.shoppingCartService.checkOut(this.ticketCreation).subscribe(
            () => {
                if (voucher > 0) {
                    this.voucheService.create({ value: voucher }).subscribe(
                        () => this.createInvoice()
                    );
                } else {
                    this.createInvoice();
                }
            }
        );
    }

    createInvoice() {
        if (this.requestedInvoice) {
            this.shoppingCartService.createInvoice(this.ticketCreation.userMobile).subscribe(
                () => this.dialog.closeAll()
            );
        } else {
            this.dialog.closeAll();
        }
    }

    invalidInvoice(): boolean {
        return !this.user || !this.user.dni || !this.user.address || this.returnedAmount() < 0;
    }

    invalidReservation(): boolean {
        return (this.total + this.returnedAmount()) < this.shoppingCartService.getTotalCommited();
    }

}
