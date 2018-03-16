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
import { VoucherConsumeDialogComponent } from '../vouchers/voucher-consume-dialog.component';

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
    foundMobile = false;
    users: User[] = [
        { mobile: 199554353, username: 'user1', dni: '1104402944', address: 'direcccion1' },
        { mobile: 634969957, username: 'user2', dni: '', address: '' },
    ];
    constructor(public dialog: MatDialog, public shoppingCartService: ShoppingCartService, private userService: UserService) {
        this.ticketCreation = { userMobile: undefined, cash: undefined, card: undefined, voucher: undefined, shoppingCart: null };
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

    number(value) {
        return (value === undefined ? 0 : value);
    }
    return(): number {
        return Math.round(
            ((0 + (this.number(this.ticketCreation.cash))
                + (this.number(this.ticketCreation.card))
                + (this.number(this.ticketCreation.voucher))
            ) - this.total) * 100
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
        let user: User;
        for (const item of this.users) {
            if (item.mobile === this.ticketCreation.userMobile) {
                user = item;
            }
        }
        if (user.mobile && user.username && user.dni && user.address) {
            console.log('LLamar al servicio para crear ticket y factura');
        } else {
            console.log('LLamar al servicio actualizacion de usuario');
            this.updateUserInvoice(user);

        }
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
                this.ticketCreation.voucher = (this.ticketCreation.voucher === undefined ? 0 : this.ticketCreation.voucher) + result;
            }
        );
    }
}
