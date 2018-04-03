import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Scheduler } from '../shared/scheduler.model';
import { SchedulerService} from "../shared/scheduler.service";

@Component({
  templateUrl: 'schedule-creation-edit-dialog.component.html',
  styles: [`.mat-dialog-content {
        display: flex;
        flex-direction: column;
    }`]
})

export class ScheduleCreationEditDialogComponent implements OnInit {
  scheduler: Scheduler;
  edit: boolean;

  constructor(public dialogRef: MatDialogRef<ScheduleCreationEditDialogComponent>,
              private scheduleService: SchedulerService) {

  }

  ngOnInit(): void {
    if (!this.scheduler) {
      this.scheduler = { id: undefined, dateTime: undefined, title: ''}
    }
  }

  create(): void {
    this.scheduleService.create(this.scheduler).subscribe(
      data => this.dialogRef.close()
    );
  }

  save(): void {
    this.scheduleService.update(this.scheduler).subscribe(
      data => this.dialogRef.close()
    );
  }

}
