import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { Provider } from '../shared/provider.model';
import { ProviderService } from '../shared/provider.service';
import { ProviderCreationDialogComponent } from './provider-creation-dialog.component';

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
        // this.providerService.readAll().subscribe(
        //     data => {
        //         this.dataSource = new MatTableDataSource<Provider>(data);
        //         this.dataSource.sort = this.sort;
        //     }
        // );
        this.dataSource = new MatTableDataSource<Provider>(this.testProvider);
    }

    edit(provider: Provider) {
        // this.providerService.readObservable(provider.id).subscribe(
        //     data => {
                const dialogRef = this.dialog.open(ProviderCreationDialogComponent);
                // dialogRef.componentInstance.provider = data;
                dialogRef.componentInstance.provider = this.testProvider[provider.id];
                dialogRef.componentInstance.edit = true;
                dialogRef.afterClosed().subscribe(
                    result => this.synchronize()
                );
        //     }
        // );
    }

    create() {
        const dialogRef = this.dialog.open(ProviderCreationDialogComponent);
        dialogRef.componentInstance.edit = false;
        dialogRef.afterClosed().subscribe(
            result => this.synchronize()
        );
    }

    testProvider: Provider[] = [
        {id: 1, company: 'Company 1'},
        {id: 2, company: 'Company 2'},
        {id: 3, company: 'Company 3'}
      ];

}
