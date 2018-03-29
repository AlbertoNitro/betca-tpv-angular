import { Component } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { UserService } from '../shared/user.service';
import { TicketService } from '../shared/ticket.service';
import { InvoiceService } from '../shared/invoice.service';
import { UserQuickCreationEditDialogComponent } from '../cashier-opened/user-quick-creation-edit-dialog.component';
import { User } from '../shared/user.model';

@Component({
    templateUrl: './invoice-creation-dialog.component.html',
    styles: [`
    .mat-cell {
        overflow: visible;
      }
      .mat-dialog-content {
        display: flex;
        flex-direction: column;
    }`]
})
export class InvoiceCreationDialogComponent {
    mobile: number;
    mobileSynchronized = false;

    ticketId: string;
    ticketIdSynchronized = false;

    user: User;

    constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private userService: UserService,
        private ticketService: TicketService, private invoiceService: InvoiceService) {
    }

    findMobile() {
        this.userService.read(this.mobile).subscribe(
            user => {
                this.mobile = user.mobile;
                this.mobileSynchronized = true;
                this.user = user;
            }
        );
    }

    deleteMobile() {
        this.mobile = undefined;
        this.mobileSynchronized = false;
    }

    findTicket() {
        this.invoiceService.findByTicket(this.ticketId).subscribe(
            invoice => {
                if (!invoice.id) {
                    this.ticketService.readOne(this.ticketId).subscribe(
                        ticket => {
                            this.ticketId = ticket.id;
                            this.ticketIdSynchronized = true;
                        }
                    );
                } else {
                    this.snackBar.open('Ticket already has an invoice', 'Error', {
                        duration: 8000
                    });
                }
            }
        );
    }

    deleteTicket() {
        this.ticketId = undefined;
        this.ticketIdSynchronized = false;
    }

    invalidUser() {
        return this.mobileSynchronized && (!this.user.dni || !this.user.address);
    }

    invalidInvoice() {
        return !this.ticketIdSynchronized || !this.mobileSynchronized || this.invalidUser();
    }

    createInvoice() {
        this.invoiceService.create({ mobile: this.mobile, ticketId: this.ticketId }).subscribe(
            () => this.dialog.closeAll()
        );
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




}
