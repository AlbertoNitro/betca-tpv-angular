import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { Provider } from './provider.model';
import { ProviderService } from './provider.service';
import { ProviderCreationEditDialogComponent } from './provider-creation-edit-dialog.component';

@Component({
    templateUrl: `providers.component.html`
})
export class ProvidersComponent implements OnInit {
    static URL = 'providers';

    displayedColumns = ['id', 'company', 'actions'];
    dataSource: MatTableDataSource<Provider>;

    @ViewChild(MatSort) sort: MatSort;

    constructor(public dialog: MatDialog, private providerService: ProviderService) {
    }

    ngOnInit(): void { 
        this.synchronize();
    }

    synchronize() {
        this.providerService.readAll().subscribe(
            data => {
                this.dataSource = new MatTableDataSource<Provider>(data);
                this.dataSource.sort = this.sort;
            }
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
