import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ProviderCreationEditDialogComponent } from './provider-creation-edit-dialog.component';
import { Provider } from '../shared/provider.model';
import { ProviderService } from '../shared/provider.service';

@Component({
    templateUrl: `providers.component.html`
})
export class ProvidersComponent implements OnInit {
    static URL = 'providers';

    title = 'Providers management';
    columns = ['company'];
    data: Provider[];

    constructor(public dialog: MatDialog, private providerService: ProviderService) {
    }

    ngOnInit(): void { 
        this.synchronize();
    }

    synchronize() {
        this.providerService.readAll().subscribe(
            data => this.data = data
        );
    }

    edit(provider: Provider) {
        this.providerService.readObservable(provider.id).subscribe(
            data => {
                const dialogRef = this.dialog.open(ProviderCreationEditDialogComponent);
                dialogRef.componentInstance.provider = data;
                dialogRef.componentInstance.edit = true;
                dialogRef.afterClosed().subscribe(
                    result => this.synchronize()
                );
            }
        );
    }

    create() {
        const dialogRef = this.dialog.open(ProviderCreationEditDialogComponent);
        dialogRef.componentInstance.edit = false;
        dialogRef.afterClosed().subscribe(
            result => this.synchronize()
        );
    }

}
