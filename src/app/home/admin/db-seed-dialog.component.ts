import {Component} from '@angular/core';

import {AdminsService} from './admins.service';

@Component({
  templateUrl: 'db-seed-dialog.component.html',
  styleUrls: ['admin.component.css']
})
export class DbSeedDialogComponent {
  constructor(private adminsService: AdminsService) {
  }

  seedDb(ymlFileName: string) {
    this.adminsService.seedDb(ymlFileName);
  }

}
