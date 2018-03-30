import {Component, ViewChild, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Scheduler} from '../shared/scheduler.model';
import {SchedulerService} from "../shared/scheduler.service";
import {ScheduleCreationEditDialogComponent} from "../schedule/schedule-creation-edit-dialog.component";

//import {ProviderCreationEditDialogComponent} from "../providers/provider-creation-edit-dialog.component";

@Component({
  templateUrl: `schedule.component.html`,
  providers: []
})
export class ScheduleComponent implements OnInit {
  static URL = 'schedule';
  title = 'Scheduler Events';
  columns = ['dateTime', 'Title', 'Description'];
  data: Scheduler[];

  constructor(public dialog: MatDialog, private schedulerService: SchedulerService) {

  }

  ngOnInit(): void {
    console.log('paso por ngOninit');
    this.synchronize();
  }

  synchronize() {
    console.log('paso por synchornize');
    this.schedulerService.readAll().subscribe(data => this.data = data);
  }

  create() {
    console.log('entro en create');
    const dialogRef = this.dialog.open(ScheduleCreationEditDialogComponent);
    dialogRef.componentInstance.edit = false;
    dialogRef.afterClosed().subscribe(
      () => this.synchronize()
    );
  }
}
