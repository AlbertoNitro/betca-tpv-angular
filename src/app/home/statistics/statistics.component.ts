import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';

@Component({
    templateUrl: `statistics.component.html`,
    styleUrls: [`statistics.component.css`]
})
export class StatisticsComponent implements OnInit {
    static URL = 'statistics';

    ngOnInit(): void {
    }

    
}
