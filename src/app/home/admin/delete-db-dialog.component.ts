import { Component} from '@angular/core';
import { AdminsService } from './admins.service';

@Component({
    templateUrl: 'delete-db-dialog.component.html',
    styleUrls: ['./db-dialog.component.css']
})
export class DeleteDbDialogComponent {
    constructor(private adminsService: AdminsService) {
    }

    deleteDb() {
        this.adminsService.deleteDb();
    }
}
