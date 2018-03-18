import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { StockAlert } from './stock-alert.model';

@Component({
    templateUrl: `stock-alert.component.html`
})

export class StockAlertComponent implements OnInit {
    static URL = 'stock-alert';

    constructor(){  
    }

    ngOnInit(): void {

    }
}