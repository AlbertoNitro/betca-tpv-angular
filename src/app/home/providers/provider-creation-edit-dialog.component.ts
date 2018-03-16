import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Provider } from './provider.model';
import { ProviderService } from './provider.service';

@Component({
    templateUrl: 'provider-creation-edit-dialog.component.html',
    styles: [`.mat-dialog-content {
        display: flex;
        flex-direction: column;
    }`]
})
export class ProviderCreationEditDialogComponent implements OnInit {
    edit: boolean;
    provider: Provider;

    constructor(public dialogRef: MatDialogRef<ProviderCreationEditDialogComponent>,
        private providerService: ProviderService) {
    }

    ngOnInit(): void {
        if (!this.provider) {
            this.provider = { id: undefined, company: '' };
        }
    }

    create(): void {
        this.providerService.createObservable(this.provider).subscribe(
            data => this.dialogRef.close()
        );
    }

    save(): void {
        this.providerService.putObservable(this.provider).subscribe(
            data => this.dialogRef.close()
        );
    }
}
