import { Component } from '@angular/core';

import { AdminsService } from './admins.service';
import { MatDialogRef } from '@angular/material';

@Component({
    templateUrl: 'db-seed-dialog.component.html',
    styles: [`.mat-dialog-content {
        display: flex;
        flex-direction: column;
    }`]
})
export class DbSeedDialogComponent {
    constructor(private adminsService: AdminsService) {
    }

    seedDb( ymlFileName: string) {
        this.adminsService.seedDb(ymlFileName);
    }

}
