import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';

@Component({
    templateUrl: `vouchers.component.html`
})
export class VouchersComponent implements OnInit {
    static URL = 'vouchers';

    displayedColumns = ['mobile', 'username', 'actions'];

    ngOnInit(): void {
    }

}
