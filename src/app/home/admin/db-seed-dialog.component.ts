import { Component } from '@angular/core';

import { AdminsService } from './admins.service';

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

    ymlFileName: string;

    seedDb() {
        this.adminsService.seedDb(this.ymlFileName);
    }
}
