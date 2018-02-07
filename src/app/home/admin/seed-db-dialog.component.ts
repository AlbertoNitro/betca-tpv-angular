import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AdminsService } from './admins.service';

@Component({
    templateUrl: 'seed-db-dialog.component.html',
    styleUrls: ['./db-dialog.component.css']
})
export class SeedDbDialogComponent {
    constructor(private adminsService: AdminsService) {
    }

    ymlFileName: string;

    seedDb() {
        this.adminsService.seedDb(this.ymlFileName);
    }
}
