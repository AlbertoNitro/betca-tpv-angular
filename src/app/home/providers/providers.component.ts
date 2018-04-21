import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Provider } from '../shared/provider.model';
import { ProviderService } from '../shared/provider.service';
import { ProviderCreationEditDialogComponent } from './provider-creation-edit-dialog.component';

@Component({
    templateUrl: 'providers.component.html'
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
        this.dialog.open(ProviderCreationEditDialogComponent).afterClosed().subscribe(
            () => this.synchronize()
        );
    }

}
