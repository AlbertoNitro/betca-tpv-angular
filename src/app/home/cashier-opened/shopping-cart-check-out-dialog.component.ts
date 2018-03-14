import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';

import { CashierClosure } from '../shared/cashier-closure.model';
import { TicketCreation } from '../shared/ticket-creation.model';
import { CashierService } from '../shared/cashier.service';
import { ShoppingCartService } from './shopping-cart.service';
import { UserService } from '../shared/user.service';
import { UserQuickCreationDialogComponent } from './user-quick-creation-dialog.component';
import { UserQuickCreateInvoiceDialogComponent } from './user-quick-creation-invoice-dialog.component';
import { UserQuickUpdateDialogComponent } from './user-quick-update-dialog.component';
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
        if (!this.ticketCreation.cash) {
            this.ticketCreation.cash = 0;
        }
        if (!this.ticketCreation.card) {
            this.ticketCreation.card = 0;
        }
        if (!this.ticketCreation.voucher) {
            this.ticketCreation.voucher = 0;
        }
        this.shoppingCartService.checkOut(this.ticketCreation);
    }

    reservation() {
        console.log('Se ha creado una reserva');
    }

    checkMobile() {
        if (this.foundMobile) {
            this.ticketCreation.userMobile = undefined;
            this.foundMobile = false;
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
    private updateUserInvoice(data) {
        const dialogUpdateUserRef = this.dialog.open(UserQuickUpdateDialogComponent);
        dialogUpdateUserRef.componentInstance.mobile = this.ticketCreation.userMobile;
        dialogUpdateUserRef.componentInstance.user = data;
    }


    private consumeVoucher() {
        const dialogRef = this.dialog.open(VoucherConsumeDialogComponent);
        dialogRef.afterClosed().subscribe(
            result => {
                if (result == '1') {
                    this.ticketCreation.voucher = 11;
                } else {
                    this.ticketCreation.voucher = 0;
                }
            }
        )
    }
}
