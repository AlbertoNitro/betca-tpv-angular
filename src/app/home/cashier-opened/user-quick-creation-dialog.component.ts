import { Component, Input } from '@angular/core';

@Component({
    templateUrl: 'user-quick-creation-dialog.component.html',
    styles: [`.mat-dialog-content {
        display: flex;
        flex-direction: column;
    }`]
})
export class UserQuickCreationDialogComponent {
    @Input() mobile: number;

    create() {
    }
}
