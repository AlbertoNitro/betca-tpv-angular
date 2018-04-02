import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from './user.model';
import { MatDialog, MatFormFieldControl } from '@angular/material';
import { UserService } from './user.service';
import { UserQuickCreationEditDialogComponent } from './user-quick-creation-edit-dialog.component';
import { ControlValueAccessor } from '@angular/forms';


@Component({
    selector: 'app-user-quick-crud',
    templateUrl: 'user-quick-crud.component.html'
})
export class UserQuickCrudComponent {

    viewMobile: number;
    user: User;

    @Output() change = new EventEmitter<any>();


    constructor(private dialog: MatDialog, private userService: UserService) {
    }

    @Input()
    set mobile(mobile: number) {
        this.viewMobile = mobile;
        if (mobile) {
            this.findMobile();
        }
    }

    get mobile(): number {
        return this.viewMobile;
    }

    existUser(): boolean {
        if (this.user) {
            return true;
        } else {
            return false;
        }
    }

    isMobileSynchronized(): boolean {
        return !this.mobile || this.existUser();
    }

    findMobile() {
        this.userService.read(this.mobile).subscribe(
            user => {
                this.user = user;
                this.change.emit(user);
            },
            error => this.createUser()
        );
    }

    private createUser() {
        this.dialog.open(UserQuickCreationEditDialogComponent, {
            data: {
                user: { mobile: this.mobile, username: '' },
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

    deleteMobile() {
        this.mobile = undefined;
        this.user = null;
        this.change.emit(null);
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
