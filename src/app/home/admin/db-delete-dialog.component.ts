import { Component} from '@angular/core';

import { AdminsService } from './admins.service';

@Component({
    templateUrl: 'db-delete-dialog.component.html',
    styleUrls: ['./db-dialog.component.css']
})
export class DbDeleteDialogComponent {
    constructor(private adminsService: AdminsService) {
    }

    deleteDb() {
        this.adminsService.deleteDb();
    }
}
