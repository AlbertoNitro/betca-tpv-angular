import { Component, Input, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

import { CashierClosure } from '../shared/cashier-closure.model';
import { TicketCreation } from '../shared/ticket-creation.model';
import { User } from '../shared/user.model';
import { InvoiceCreation } from '../shared/invoice-creation.model';
import { ReservationCreation } from '../shared/reservation-creation.model';
import { CashierService } from '../shared/cashier.service';
import { ShoppingCartService } from './shopping-cart.service';
import { UserService } from '../shared/user.service';
import { UserQuickCreationDialogComponent } from './user-quick-creation-dialog.component';
import { UserQuickUpdateInvoiceDialogComponent } from './user-quick-update-invoice-dialog.component';
import { VoucherConsumeDialogComponent } from './voucher-consume-dialog.component';

@Component({
    templateUrl: 'check-out-dialog.component.html',
    styles: [`.mat-dialog-content {
        display: flex;
        flex-direction: column;
    }`]
})
export class CheckOutDialogComponent {

    total: number;

    // foundMobile = false;
    user: User;

    ticketCreation: TicketCreation;
    ivoiceCreation: InvoiceCreation;
    reservationCreation: ReservationCreation;

    constructor(@Inject(MAT_DIALOG_DATA) data: any, private dialog: MatDialog, public shoppingCartService: ShoppingCartService,
        private userService: UserService) {
        this.total = data.total;
        this.ticketCreation = data.ticketCreation;
    }

    existUser(): boolean {
        if (this.user) {
            return true;
        } else {
            return false;
        }
    }

    isMobileSynchronized(): boolean {
        return !this.ticketCreation.userMobile || this.existUser();
    }

    findMobile() {
        this.userService.read(this.ticketCreation.userMobile).subscribe(
            user => this.user = user,
            error => this.createUser()
        );
    }

    checkUser() {
        this.userService.read(this.ticketCreation.userMobile).subscribe(
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

    invalidCheckOut(): boolean {
        return this.return() < 0 || !this.isMobileSynchronized();
    }

    invalidInvoice(): boolean {
        return !this.existUser() || this.return() < 0;
    }

    invalidReservation(): boolean {
        return !((this.checkEmail()) && (this.return() * -1 <= this.total - this.total * 0.1));
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
        // this.shoppingCartService.createReservation(this.reservationCreation);
        // this.dialog.closeAll();
    }



    deleteMobile() {
        this.ticketCreation.userMobile = undefined;
        this.user = null;
    }

    editMobile() {

    }

    private createUser() {
        this.dialog.open(UserQuickCreationDialogComponent, {
            data: { mobile: this.ticketCreation.userMobile }
        }).afterClosed().subscribe(
            result => {
                if (result) {
                    this.findMobile();
                }
            }
        );
    }


    checkEmail(): boolean {
        this.userService.read(this.ticketCreation.userMobile).subscribe(
            data => {
                if (data.email) {
                    this.reservationCreation = { userMobile: undefined, cash: 0, card: 0, voucher: 0, reservationState: undefined };
                    this.reservationCreation.userMobile = this.ticketCreation.userMobile;
                    this.reservationCreation.card = this.ticketCreation.card;
                    this.reservationCreation.cash = this.ticketCreation.cash;
                    this.reservationCreation.voucher = this.ticketCreation.voucher;
                    this.reservationCreation.reservationState = 'OPEN';
                    return true;
                } else {
                    console.log('Por favor, introduce el email del usuario');
                    return false;
                }
            }
        );
        return false;
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
