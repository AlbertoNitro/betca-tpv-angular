import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Provider } from '../shared/provider.model';
import { ProviderService } from '../shared/provider.service';

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

    constructor(@Inject(MAT_DIALOG_DATA) data: any, public dialogRef: MatDialogRef<ProviderCreationEditDialogComponent>,
        private providerService: ProviderService) {

        this.provider = data.provider;
        this.edit = data.edit;
    }

    ngOnInit(): void {
        if (!this.provider) {
            this.provider = { id: undefined, company: '' };
        }
    }

    create(): void {
        this.providerService.create(this.provider).subscribe(
            data => this.dialogRef.close()
        );
    }

    save(): void {
        this.providerService.update(this.provider).subscribe(
            data => this.dialogRef.close()
        );
    }
}
