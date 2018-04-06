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

    onlyActive = true;

    constructor(public dialog: MatDialog, private providerService: ProviderService) {
    }

    ngOnInit(): void {
        this.synchronize();
    }

    synchronize() {
        if (this.onlyActive) {
            this.providerService.readAllActives().subscribe(
                data => this.data = data
            );
        } else {
            this.providerService.readAll().subscribe(
                data => this.data = data
            );
        }
    }

    edit(provider: Provider) {
        this.providerService.read(provider.id).subscribe(
            providerOne => {
                const dialogRef = this.dialog.open(ProviderCreationEditDialogComponent, {
                    width: '500px',
                    data: { provider: providerOne, edit: true }
                }).afterClosed().subscribe(
                    () => this.synchronize()
                );
            }
        );
    }

    create() {
        const dialogRef = this.dialog.open(ProviderCreationEditDialogComponent);
        dialogRef.componentInstance.edit = false;
        dialogRef.afterClosed().subscribe(
            () => this.synchronize()
        );
    }

}
