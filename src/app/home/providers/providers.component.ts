import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { Provider } from '../shared/provider.model';
import { ProviderService } from '../shared/provider.service';

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
        // this.synchronize();
        this.dataSource = new MatTableDataSource<Provider>(this.testProvider);
    }

    synchronize() {
        this.providerService.readAll().subscribe(
            data => {
                this.dataSource = new MatTableDataSource<Provider>(data);
                this.dataSource.sort = this.sort;
            }
        );
    }

    testProvider: Provider[] = [
        {id: 1, company: 'Company 1'},
        {id: 2, company: 'Company 2'},
        {id: 3, company: 'Company 3'}
      ];

}
