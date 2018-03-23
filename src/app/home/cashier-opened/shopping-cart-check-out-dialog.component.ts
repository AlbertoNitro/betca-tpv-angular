import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';

import { CashierClosure } from '../shared/cashier-closure.model';
import { TicketCreation } from '../shared/ticket-creation.model';
import { CashierService } from '../shared/cashier.service';
import { ShoppingCartService } from './shopping-cart.service';
import { UserService } from '../shared/user.service';
import { UserQuickCreationDialogComponent } from './user-quick-creation-dialog.component';
import { UserQuickUpdateInvoiceDialogComponent } from './user-quick-update-invoice-dialog.component';
import { User } from '../shared/user.model';
import { VoucherConsumeDialogComponent } from './voucher-consume-dialog.component';
import { InvoiceCreation } from '../shared/invoice-creation.model';

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
    ivoiceCreation: InvoiceCreation;
    foundMobile = false;
    constructor(public dialog: MatDialog, public shoppingCartService: ShoppingCartService, private userService: UserService) {
        this.ticketCreation = { userMobile: undefined, cash: 0, card: 0, voucher: 0, shoppingCart: null };
    }

    mobileSynchronize(): boolean {
        return this.ticketCreation.userMobile && !this.foundMobile;
    }

    invalidCheckOut(): boolean {
        return this.return() < 0 || this.mobileSynchronize();
    }

    invalidInvoice(): boolean {
        return !((this.foundMobile) && (this.return() >= 0));
    }

    invalidReservation(): boolean {
        return !(this.return() * -1 <= this.total - this.total * 0.1);
    }

    number(value: number): number {
        return ((value === undefined || value === null) ? 0 : value);
    }

    return(): number {
        return Math.round(
            (0 + this.number(this.ticketCreation.cash)
                + this.number(this.ticketCreation.card)
                + this.number(this.ticketCreation.voucher)
                - this.total) * 100
        ) / 100;
    }

    fillCard() {
        if (this.return() < 0) {
            this.ticketCreation.card = -this.return();
        } else {
            this.ticketCreation.card = this.total;
            this.ticketCreation.cash = undefined;
        }
    }

    fillCash() {
        this.ticketCreation.cash = this.number(this.ticketCreation.cash);
        if (this.return() < 0) {
            this.ticketCreation.cash = -this.return();
        } else if (this.ticketCreation.cash < 20) {
            this.ticketCreation.cash = (Math.round(this.ticketCreation.cash / 5) + 1) * 5;
        } else if (this.ticketCreation.cash < 50) {
            this.ticketCreation.cash = (Math.round(this.ticketCreation.cash / 10) + 1) * 10;
        } else {
            this.ticketCreation.cash = (Math.round(this.ticketCreation.cash / 50) + 1) * 50;
        }
    }

    checkOut() {
        this.ticketCreation.cash = this.number(this.ticketCreation.cash);
        this.ticketCreation.card = this.number(this.ticketCreation.card);
        this.ticketCreation.voucher = this.number(this.ticketCreation.voucher);
        this.shoppingCartService.checkOut(this.ticketCreation);
    }

    reservation() {
        console.log('Se ha creado una reserva');
    }

    findMobile() {
        this.userService.readObservable(this.ticketCreation.userMobile).subscribe(
            data => this.foundMobile = true,
            error => this.createUser()
        );
    }

    deleteMobile() {
        this.ticketCreation.userMobile = undefined;
        this.foundMobile = false;
    }

    editMobile() {

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

    checkUser() {
        this.userService.readObservable(this.ticketCreation.userMobile).subscribe(
            data => {
                if (data.username && data.dni && data.address) {
                    this.ivoiceCreation = { userMobile: undefined, cash: 0, card: 0, voucher: 0, shoppingCart: null };
                    this.ivoiceCreation.userMobile = this.ticketCreation.userMobile;
                    this.ivoiceCreation.card = this.ticketCreation.card;
                    this.ivoiceCreation.cash = this.ticketCreation.cash;
                    this.ivoiceCreation.voucher = this.ticketCreation.voucher;
                    this.shoppingCartService.createInvoice(this.ivoiceCreation);
                    this.dialog.closeAll();
                } else {
                    this.updateUserInvoice(data);
                }
            }
        );
    }

    updateUserInvoice(data) {
        const dialogUpdateUserRef = this.dialog.open(UserQuickUpdateInvoiceDialogComponent);
        dialogUpdateUserRef.componentInstance.mobile = this.ticketCreation.userMobile;
        dialogUpdateUserRef.componentInstance.user = data;
    }

    consumeVoucher() {
        const dialogRef = this.dialog.open(VoucherConsumeDialogComponent);
        dialogRef.afterClosed().subscribe(
            result => {
                this.ticketCreation.voucher = (this.ticketCreation.voucher === undefined ? 0 : this.ticketCreation.voucher);
                this.ticketCreation.voucher += (result > 0 ? result : 0);
            }
        );
    }
}
