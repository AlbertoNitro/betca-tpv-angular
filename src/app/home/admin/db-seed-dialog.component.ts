import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AdminsService } from './admins.service';

@Component({
    templateUrl: 'db-seed-dialog.component.html',
    styleUrls: ['./db-dialog.component.css']
})
export class DbSeedDialogComponent {
    constructor(private adminsService: AdminsService) {
    }

    ymlFileName: string;

    seedDb() {
        this.adminsService.seedDb(this.ymlFileName);
    }
}
