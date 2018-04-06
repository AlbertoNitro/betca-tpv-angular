import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { StockAlert } from '../shared/stock-alert.model';

@Component({
    templateUrl: 'product-alert-dialog.component.html',
    styles: [`.mat-dialog-content {
        display: flex;
        flex-direction: column;
    }`]
})

export class ProductAlertDialogComponent implements OnInit {
    edit: boolean;
    stockAlert: StockAlert;

    ngOnInit(): void {
        
    }

    save(): void {
        
    }

    search(code: string) {
    }

}
