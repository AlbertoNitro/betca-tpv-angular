import {Component, ViewChild, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Scheduler} from '../shared/scheduler.model';
import {SchedulerService} from "../shared/scheduler.service";
import {ScheduleCreationEditDialogComponent} from "../schedule/schedule-creation-edit-dialog.component";


@Component({
  templateUrl: `schedule.component.html`,
  providers: []
})
export class ScheduleComponent implements OnInit {
  static URL = 'schedule';
  title = 'Scheduler Events';
  columns = ['dateTime', 'title', 'description'];
  data: Scheduler[];

  constructor(public dialog: MatDialog, private schedulerService: SchedulerService) {

  }

  ngOnInit(): void {
    this.synchronize();
  }

  synchronize() {
    this.schedulerService.readAll().subscribe(data => this.data = data);
  }

  create() {
    const dialogRef = this.dialog.open(ScheduleCreationEditDialogComponent);
    dialogRef.componentInstance.edit = false;
    dialogRef.afterClosed().subscribe(
      () => this.synchronize()
    );
  }

  edit(scheduler: Scheduler){
    console.log("entro en edit con scheduler " + scheduler.id);
    this.schedulerService.read(scheduler.id).subscribe(
      data => {
        const dialogRef = this.dialog.open(ScheduleCreationEditDialogComponent);
        dialogRef.componentInstance.scheduler = data;
        dialogRef.componentInstance.edit = true;
        dialogRef.afterClosed().subscribe(
          () => this.synchronize()
        );
      }
    );
  }
}
