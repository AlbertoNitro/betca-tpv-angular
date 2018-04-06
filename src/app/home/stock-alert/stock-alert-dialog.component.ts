import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { StockAlert } from '../shared/stock-alert.model';

@Component({
    templateUrl: 'stock-alert-dialog.component.html',
    styles: [`.mat-dialog-content {
        display: flex;
        flex-direction: column;
    }`]
})

export class StockAlertDialogComponent implements OnInit {
    detail: boolean;
    stockAlert: StockAlert;

    ngOnInit(): void {
        
    }

    create(): void {
        
    }

    save(): void {
        
    }

    edit(StockAlert: StockAlert) {

    }

    delete(StockAlert: StockAlert) {

    }
    read(StockAlert: StockAlert) {

    }
}
