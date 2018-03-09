import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';

@Component({
    templateUrl: `providers.component.html`
})
export class ProvidersComponent implements OnInit {
    static URL = 'providers';

    @ViewChild(MatSort) sort: MatSort;

    constructor(public dialog: MatDialog) {
    }

    ngOnInit(): void { 
        
    }

}
