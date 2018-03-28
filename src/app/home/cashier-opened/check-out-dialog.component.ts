import { Component, Input, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

import { CashierClosure } from '../shared/cashier-closure.model';
import { TicketCreation } from '../shared/ticket-creation.model';
import { User } from '../shared/user.model';
import { ReservationCreation } from '../shared/reservation-creation.model';
import { CashierService } from '../shared/cashier.service';
import { ShoppingCartService } from './shopping-cart.service';
import { UserService } from '../shared/user.service';
import { UserQuickCreationEditDialogComponent } from './user-quick-creation-edit-dialog.component';
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
    user: User;

    ticketCreation: TicketCreation;

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

    private createUser() {
        this.dialog.open(UserQuickCreationEditDialogComponent, {
            data: {
                user: { mobile: this.ticketCreation.userMobile, username: '' },
                type: 'create'
            }
        }).afterClosed().subscribe(
            result => {
                if (result) {
                    this.findMobile();
                }
            }
        );
    }

    findMobile() {
        this.userService.read(this.ticketCreation.userMobile).subscribe(
            user => this.user = user,
            error => this.createUser()
        );
    }

    deleteMobile() {
        this.ticketCreation.userMobile = undefined;
        this.user = null;
    }

    editMobile() {
        this.dialog.open(UserQuickCreationEditDialogComponent, {
            data: {
                user: this.user,
                type: 'edit'
            }
        }).afterClosed().subscribe(
            result => {
                if (result) {
                    this.findMobile();
                }
            }
        );
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
        if (this.returnedCash() < 0) {
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
        return this.returnedCash() < 0 || !this.isMobileSynchronized();
    }

    checkOut() {
        this.formatValues();
        this.shoppingCartService.checkOut(this.ticketCreation);
    }

    invalidInvoice(): boolean {
        return !this.existUser() || this.returnedCash() < 0 || !this.user.dni || !this.user.address;
    }

    createInvoice() {
        this.formatValues();
        this.shoppingCartService.createInvoice(this.ticketCreation).subscribe(
            () => this.dialog.closeAll()
        );
    }

    invalidReservation(): boolean {
        return !((this.checkEmail()) && (this.returnedCash() * -1 <= this.total - this.total * 0.1));
    }

    reservation() {
        console.log('Se ha creado una reserva');
        // this.shoppingCartService.createReservation(this.reservationCreation);
        // this.dialog.closeAll();
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

}
